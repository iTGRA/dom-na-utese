<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Lot;

use App\Models\Lot;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Action;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Picture;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

/**
 * Экран редактирования лота.
 *
 * Все поля — на русском, с пояснениями. Планировка загружается через
 * Picture-поле (Orchid хранит путь внутри storage/app/public/...).
 *
 * Важно: public-свойство $lot — nullable (см. Na Ugle CLAUDE.md,
 * «Выращенные правила»: Orchid 14 дергает public-поля через reflection
 * до вызова query()). Все обращения идут через `?->`.
 */
class LotEditScreen extends Screen
{
    public ?Lot $lot = null;

    public function query(Lot $lot): iterable
    {
        $this->lot = $lot;

        return [
            'lot' => $lot,
        ];
    }

    public function name(): ?string
    {
        return $this->lot?->exists
            ? "Лот {$this->lot->number}"
            : 'Новый лот';
    }

    public function description(): ?string
    {
        return 'Номер, этаж, площади, видовая сторона, статус, планировка.';
    }

    /**
     * @return Action[]
     */
    public function commandBar(): iterable
    {
        return [
            Button::make('Удалить')
                ->icon('bs.trash3')
                ->type(Color::DANGER)
                ->confirm('Удалить лот? Отменить это действие будет нельзя.')
                ->method('remove')
                ->canSee((bool) $this->lot?->exists),

            Button::make('Сохранить')
                ->icon('bs.check-circle')
                ->method('save'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('lot.number')
                    ->title('Номер лота')
                    ->help('Две цифры: 01, 02, … 09')
                    ->maxlength(2)
                    ->required(),

                Select::make('lot.floor')
                    ->title('Этаж')
                    ->options([
                        1 => '1 этаж',
                        2 => '2 этаж',
                        3 => '3 этаж',
                    ])
                    ->required(),

                Input::make('lot.area_total')
                    ->title('Общая площадь')
                    ->help('Например: ~180 м² или 160–180 м². Формат свободный.')
                    ->maxlength(32),

                Input::make('lot.area_apartment')
                    ->title('Площадь квартиры')
                    ->help('Без террас и балконов. Пример: ~120 м²')
                    ->maxlength(32),

                Input::make('lot.area_summer_terrace')
                    ->title('Площадь летней террасы')
                    ->help('Если есть. Пример: ~35 м²')
                    ->maxlength(32),

                Input::make('lot.area_balcony_terrace')
                    ->title('Площадь балкона / лоджии-террасы')
                    ->help('Если есть. Пример: ~25 м²')
                    ->maxlength(32),

                Input::make('lot.view')
                    ->title('Видовая сторона')
                    ->help('Что видно с окон: «Волга», «Жигулёвские ворота», «Закат»')
                    ->maxlength(64)
                    ->required(),

                Select::make('lot.status')
                    ->title('Статус')
                    ->options([
                        'available' => 'Доступен',
                        'reserved' => 'В резерве',
                        'sold' => 'Продан',
                    ])
                    ->required()
                    ->help('Этот статус сразу появляется на карточке лота на главной.'),

                Picture::make('lot.plan_image')
                    ->title('Планировка')
                    ->targetRelativeUrl()
                    ->help('PNG, JPG или PDF-превью. Показывается при клике на «Условия».'),

                TextArea::make('lot.description')
                    ->title('Описание')
                    ->rows(5)
                    ->help('Короткое описание лота (если нужно — показывается менеджеру).'),

                Input::make('lot.sort_order')
                    ->title('Порядок сортировки')
                    ->type('number')
                    ->help('Чем меньше число, тем выше лот в списке.')
                    ->required(),
            ]),
        ];
    }

    public function save(Lot $lot, Request $request): RedirectResponse
    {
        $data = $request->validate([
            'lot.number' => ['required', 'string', 'max:2'],
            'lot.floor' => ['required', 'integer', 'min:1', 'max:3'],
            'lot.area_total' => ['nullable', 'string', 'max:32'],
            'lot.area_apartment' => ['nullable', 'string', 'max:32'],
            'lot.area_summer_terrace' => ['nullable', 'string', 'max:32'],
            'lot.area_balcony_terrace' => ['nullable', 'string', 'max:32'],
            'lot.view' => ['required', 'string', 'max:64'],
            'lot.status' => ['required', 'in:available,reserved,sold'],
            'lot.plan_image' => ['nullable', 'string'],
            'lot.description' => ['nullable', 'string'],
            'lot.sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $lot->fill($data['lot'])->save();

        Toast::info('Лот сохранён.');

        return redirect()->route('platform.dnu.lots');
    }

    public function remove(Lot $lot): RedirectResponse
    {
        $lot->delete();

        Toast::info('Лот удалён.');

        return redirect()->route('platform.dnu.lots');
    }
}
