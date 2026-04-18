<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Neighbor;

use App\Models\Neighbor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Action;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Picture;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

/**
 * Редактирование «соседа» — исторического объекта берега.
 *
 * Nullable public $neighbor — обязательное условие для Orchid 14
 * (см. Na Ugle CLAUDE.md, правило про reflection).
 *
 * Поле `featured` отмечено подсказкой: на главной должен быть
 * строго один featured-объект (Дача со Слонами).
 */
class NeighborEditScreen extends Screen
{
    public ?Neighbor $neighbor = null;

    public function query(Neighbor $neighbor): iterable
    {
        $this->neighbor = $neighbor;

        return [
            'neighbor' => $neighbor,
        ];
    }

    public function name(): ?string
    {
        return $this->neighbor?->exists
            ? $this->neighbor->title
            : 'Новый объект';
    }

    public function description(): ?string
    {
        return 'Исторический объект с волжского берега. Появляется в справочнике на /shore.';
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
                ->confirm('Удалить объект из справочника? Отменить это будет нельзя.')
                ->method('remove')
                ->canSee((bool) $this->neighbor?->exists),

            Button::make('Сохранить')
                ->icon('bs.check-circle')
                ->method('save'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('neighbor.title')
                    ->title('Название')
                    ->help('Например: «Дача К.П. Головкина — Дача со Слонами»')
                    ->required()
                    ->maxlength(255),

                Input::make('neighbor.owner')
                    ->title('Владелец / заказчик')
                    ->help('Имя и краткая характеристика — одной строкой')
                    ->maxlength(255),

                Input::make('neighbor.date_label')
                    ->title('Годы (как показать на сайте)')
                    ->help('Текст в свободной форме: «1908–1909», «Начало XX века», «1941 – 1943»')
                    ->maxlength(64),

                Input::make('neighbor.year')
                    ->title('Год для сортировки')
                    ->type('number')
                    ->help('Цифрой — чтобы можно было отсортировать. Для «1908–1909» ставим 1908.'),

                Input::make('neighbor.address')
                    ->title('Адрес / локация')
                    ->help('«4-я просека», «7-я просека, санаторий Волга»')
                    ->maxlength(128),

                Input::make('neighbor.style')
                    ->title('Стиль')
                    ->help('«Модерн», «Псевдомавританский» и т.п.')
                    ->maxlength(128),

                Input::make('neighbor.status_label')
                    ->title('Статус сохранности (текстом)')
                    ->help('Как показывается на сайте: «Федеральный памятник архитектуры», «Сохранилась» и т.д.')
                    ->maxlength(255),

                Select::make('neighbor.tag')
                    ->title('Категория (для фильтра / бейджа)')
                    ->options([
                        'federal' => 'Федеральный памятник',
                        'regional' => 'Региональный памятник',
                        'preserved' => 'Сохранился',
                        'lost' => 'Утрачен',
                        'other' => 'Иное / уточнение',
                    ])
                    ->required(),

                TextArea::make('neighbor.description')
                    ->title('Описание (полное)')
                    ->rows(8)
                    ->required()
                    ->help('Абзац 400–800 символов. Показывается на /shore под карточкой.'),

                TextArea::make('neighbor.short_description')
                    ->title('Короткое описание')
                    ->rows(3)
                    ->help('1–2 предложения. Показывается в карточке блока 04 (если он снова появится).'),

                Picture::make('neighbor.image')
                    ->title('Фотография объекта')
                    ->targetRelativeUrl()
                    ->help('Для featured-объекта — формат 4:5 (вертикальная). Минимум 1200px по длинной стороне.'),

                CheckBox::make('neighbor.featured')
                    ->title('Показывать на главной')
                    ->placeholder('Отметить как «главный сосед»')
                    ->sendTrueOrFalse()
                    ->help('ВНИМАНИЕ: на главной должен быть только ОДИН featured-объект (Дача со Слонами, подсвеченная на блоке 05).'),

                Input::make('neighbor.sort_order')
                    ->title('Порядок в справочнике')
                    ->type('number')
                    ->help('Чем меньше число, тем выше в списке на /shore.')
                    ->required(),
            ]),
        ];
    }

    public function save(Neighbor $neighbor, Request $request): RedirectResponse
    {
        $data = $request->validate([
            'neighbor.title' => ['required', 'string', 'max:255'],
            'neighbor.owner' => ['nullable', 'string', 'max:255'],
            'neighbor.date_label' => ['nullable', 'string', 'max:64'],
            'neighbor.year' => ['nullable', 'integer'],
            'neighbor.address' => ['nullable', 'string', 'max:128'],
            'neighbor.style' => ['nullable', 'string', 'max:128'],
            'neighbor.status_label' => ['nullable', 'string', 'max:255'],
            'neighbor.tag' => ['required', 'in:federal,regional,preserved,lost,other'],
            'neighbor.description' => ['required', 'string'],
            'neighbor.short_description' => ['nullable', 'string'],
            'neighbor.image' => ['nullable', 'string'],
            'neighbor.featured' => ['nullable', 'boolean'],
            'neighbor.sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $neighbor->fill($data['neighbor'])->save();

        Toast::info('Сосед сохранён.');

        return redirect()->route('platform.dnu.neighbors');
    }

    public function remove(Neighbor $neighbor): RedirectResponse
    {
        $neighbor->delete();

        Toast::info('Объект удалён из справочника.');

        return redirect()->route('platform.dnu.neighbors');
    }
}
