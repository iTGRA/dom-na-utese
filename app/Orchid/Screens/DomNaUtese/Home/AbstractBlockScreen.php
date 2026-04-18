<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Action;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Picture;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

/**
 * Общий родитель для экранов редактирования блоков главной страницы.
 *
 * Потомки определяют:
 *   - `groupKey()` — группа в site_settings (block01, block02, …)
 *   - `title()` / `subtitle()` — заголовок и подпись экрана
 *   - `extraLayouts()` — дополнительные layout'ы после основной формы
 *                        (CRUD подмоделей через Matrix и т.п.)
 *   - `onAfterSave()` — хук после сохранения site_settings
 *
 * Основная форма рисуется автоматически из записей site_settings,
 * сгруппированных по `group`. Типы полей: text / email / url / textarea / image.
 *
 * Сохранение site_settings + подмоделей — общий метод `save()`. Кэш
 * SiteSetting сбрасывается после любой правки.
 */
abstract class AbstractBlockScreen extends Screen
{
    /** @var array<string, string> */
    public array $values = [];

    /**
     * Ключ группы в site_settings.
     */
    abstract protected function groupKey(): string;

    public function query(): iterable
    {
        $settings = SiteSetting::where('group', $this->groupKey())
            ->orderBy('sort_order')
            ->get();

        $values = [];
        foreach ($settings as $setting) {
            $values[$setting->key] = $setting->value ?? '';
        }
        $this->values = $values;

        return array_merge(['values' => $values], $this->extraQuery());
    }

    /**
     * Доп. данные для query() (CRUD подмоделей в потомке).
     *
     * @return array<string, mixed>
     */
    protected function extraQuery(): array
    {
        return [];
    }

    /**
     * @return Action[]
     */
    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить блок')
                ->icon('bs.check-circle')
                ->method('save'),
        ];
    }

    public function layout(): iterable
    {
        return array_merge(
            [Layout::rows($this->fields())],
            $this->extraLayouts()
        );
    }

    /**
     * Доп. layout'ы после основной формы (подмодели и т.п.).
     *
     * @return iterable<\Orchid\Screen\Layout>
     */
    protected function extraLayouts(): iterable
    {
        return [];
    }

    /**
     * Автоматически собирает Input/TextArea/Picture поля из site_settings,
     * сгруппированных по текущей группе.
     *
     * @return array<int, \Orchid\Screen\Field>
     */
    protected function fields(): array
    {
        $settings = SiteSetting::where('group', $this->groupKey())
            ->orderBy('sort_order')
            ->get();

        $fields = [];

        foreach ($settings as $setting) {
            $name = "values.{$setting->key}";
            $value = $setting->value ?? '';

            $fields[] = match ($setting->input_type) {
                'textarea' => TextArea::make($name)
                    ->title($setting->label)
                    ->help($setting->hint)
                    ->rows(4)
                    ->value($value),
                'email' => Input::make($name)
                    ->type('email')
                    ->title($setting->label)
                    ->help($setting->hint)
                    ->value($value),
                'url' => Input::make($name)
                    ->type('url')
                    ->title($setting->label)
                    ->help($setting->hint)
                    ->value($value),
                'image' => Picture::make($name)
                    ->title($setting->label)
                    ->help($setting->hint ?: 'Загрузите картинку (JPG/PNG).')
                    ->targetRelativeUrl()
                    ->value($value),
                default => Input::make($name)
                    ->title($setting->label)
                    ->help($setting->hint)
                    ->value($value),
            };
        }

        return $fields;
    }

    public function save(Request $request): RedirectResponse
    {
        $values = $request->input('values', []);

        if (! is_array($values)) {
            $values = [];
        }

        foreach ($values as $key => $value) {
            $setting = SiteSetting::where('key', $key)
                ->where('group', $this->groupKey())
                ->first();
            if (! $setting) {
                continue;
            }

            $setting->value = $value === '' ? null : $value;
            $setting->save();
        }

        $this->onAfterSave($request);

        SiteSetting::flushCache();

        Toast::info('Блок сохранён. Изменения появятся на сайте сразу.');

        return back();
    }

    /**
     * Хук для сохранения подмоделей (Plate / UkladTile / ...).
     */
    protected function onAfterSave(Request $request): void
    {
        // default: nothing
    }
}
