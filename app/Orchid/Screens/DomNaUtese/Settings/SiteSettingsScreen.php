<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Settings;

use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Action;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

/**
 * Единый экран настроек сайта.
 *
 * Три таба (contact / legal / meta). Поля — автогенерация из записей
 * БД: label, hint, input_type берутся из таблицы site_settings.
 * Всё, что клиент меняет здесь, — моментально попадает на сайт через
 * глобальный share() в HandleInertiaRequests + кэш сбрасывается при save.
 */
class SiteSettingsScreen extends Screen
{
    /** @var array<string, string> values keyed by setting key */
    public array $values = [];

    /** @var array<string, \Illuminate\Database\Eloquent\Collection> */
    public array $groupedSettings = [];

    public function query(): iterable
    {
        // В этом экране показываем только «операторские» группы:
        // contact / legal / meta / mail. Блочные группы (block01..block12)
        // редактируются из отдельных экранов «Главная страница → 0X …».
        $all = SiteSetting::whereIn('group', ['contact', 'legal', 'meta', 'mail'])
            ->orderBy('group')
            ->orderBy('sort_order')
            ->get();

        $this->groupedSettings = $all->groupBy('group')->all();

        $values = [];
        foreach ($all as $setting) {
            $values[$setting->key] = $setting->value ?? '';
        }
        $this->values = $values;

        return [
            'values' => $values,
        ];
    }

    public function name(): ?string
    {
        return 'Настройки сайта';
    }

    public function description(): ?string
    {
        return 'Контакты, юридическая информация, мета-теги и аналитика.';
    }

    /**
     * @return Action[]
     */
    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить все настройки')
                ->icon('bs.check-circle')
                ->method('save'),
        ];
    }

    public function layout(): iterable
    {
        $tabs = [];

        $groupTitles = [
            'contact' => 'Контакты',
            'legal' => 'Юридическое',
            'meta' => 'SEO и аналитика',
            'mail' => 'Заявки и почта',
        ];

        foreach ($this->groupedSettings as $group => $settings) {
            $fields = [];

            foreach ($settings as $setting) {
                $name = "values.{$setting->key}";

                $fields[] = match ($setting->input_type) {
                    'textarea' => TextArea::make($name)
                        ->title($setting->label)
                        ->help($setting->hint)
                        ->rows(3)
                        ->value($setting->value ?? ''),
                    'email' => Input::make($name)
                        ->type('email')
                        ->title($setting->label)
                        ->help($setting->hint)
                        ->value($setting->value ?? ''),
                    'url' => Input::make($name)
                        ->type('url')
                        ->title($setting->label)
                        ->help($setting->hint)
                        ->value($setting->value ?? ''),
                    default => Input::make($name)
                        ->title($setting->label)
                        ->help($setting->hint)
                        ->value($setting->value ?? ''),
                };
            }

            $title = $groupTitles[$group] ?? ucfirst((string) $group);
            $tabs[$title] = Layout::rows($fields);
        }

        return [
            Layout::tabs($tabs),
        ];
    }

    public function save(Request $request): RedirectResponse
    {
        $values = $request->input('values', []);

        if (! is_array($values)) {
            $values = [];
        }

        foreach ($values as $key => $value) {
            $setting = SiteSetting::where('key', $key)->first();
            if (! $setting) {
                continue;
            }

            $setting->value = $value === '' ? null : $value;
            $setting->save();
        }

        SiteSetting::flushCache();

        Toast::info('Настройки сохранены. Изменения появятся на сайте сразу.');

        return redirect()->route('platform.dnu.settings');
    }
}
