<?php

declare(strict_types=1);

namespace App\Orchid;

use App\Models\Lead;
use Orchid\Platform\Dashboard;
use Orchid\Platform\ItemPermission;
use Orchid\Platform\OrchidServiceProvider;
use Orchid\Screen\Actions\Menu;
use Orchid\Support\Color;

class PlatformProvider extends OrchidServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @param Dashboard $dashboard
     *
     * @return void
     */
    public function boot(Dashboard $dashboard): void
    {
        parent::boot($dashboard);

        // ...
    }

    /**
     * Register the application menu.
     *
     * @return Menu[]
     */
    public function menu(): array
    {
        return [
            Menu::make('Панель')
                ->icon('bs.house')
                ->title('Дом на Утёсе')
                ->route(config('platform.index')),

            // -------- Главная страница · блоки --------
            Menu::make('01 · Hero')
                ->icon('bs.file-earmark-richtext')
                ->title('Главная страница')
                ->route('platform.dnu.home.block01')
                ->active('*/dnu/home/block-01*'),
            Menu::make('02 · Категория')
                ->icon('bs.file-earmark-text')
                ->route('platform.dnu.home.block02')
                ->active('*/dnu/home/block-02*'),
            Menu::make('03 · Берег')
                ->icon('bs.map')
                ->route('platform.dnu.home.block03')
                ->active('*/dnu/home/block-03*'),
            Menu::make('06 · Архитектура')
                ->icon('bs.image')
                ->route('platform.dnu.home.block06')
                ->active('*/dnu/home/block-06$'),
            Menu::make('06B · Интерьер')
                ->icon('bs.image')
                ->route('platform.dnu.home.block06b')
                ->active('*/dnu/home/block-06b*'),
            Menu::make('06C · Двор')
                ->icon('bs.image')
                ->route('platform.dnu.home.block06c')
                ->active('*/dnu/home/block-06c*'),
            Menu::make('07 · Лот')
                ->icon('bs.list-ul')
                ->route('platform.dnu.home.block07')
                ->active('*/dnu/home/block-07*'),
            Menu::make('08 · Планы')
                ->icon('bs.grid-3x3')
                ->route('platform.dnu.home.block08')
                ->active('*/dnu/home/block-08*'),
            Menu::make('09 · Уклад')
                ->icon('bs.sun')
                ->route('platform.dnu.home.block09')
                ->active('*/dnu/home/block-09*'),
            Menu::make('10 · Инфраструктура')
                ->icon('bs.building-gear')
                ->route('platform.dnu.home.block10')
                ->active('*/dnu/home/block-10*'),
            Menu::make('11 · Дом построен')
                ->icon('bs.check2-square')
                ->route('platform.dnu.home.block11')
                ->active('*/dnu/home/block-11*'),
            Menu::make('12 · Финальный CTA')
                ->icon('bs.envelope-check')
                ->route('platform.dnu.home.block12')
                ->active('*/dnu/home/block-12*')
                ->divider(),

            Menu::make('Лоты')
                ->icon('bs.building')
                ->title('Контент')
                ->route('platform.dnu.lots')
                ->active('*/dnu/lots*'),

            Menu::make('Соседи по берегу')
                ->icon('bs.collection')
                ->route('platform.dnu.neighbors')
                ->active('*/dnu/neighbors*'),

            Menu::make('Заявки')
                ->icon('bs.inbox')
                ->route('platform.dnu.leads')
                ->active('*/dnu/leads*')
                ->badge(fn () => Lead::where('status', 'new')->count(), Color::PRIMARY),

            Menu::make('Настройки сайта')
                ->icon('bs.gear')
                ->route('platform.dnu.settings')
                ->divider(),

            Menu::make(__('Users'))
                ->icon('bs.people')
                ->route('platform.systems.users')
                ->permission('platform.systems.users')
                ->title(__('Access Controls')),

            Menu::make(__('Roles'))
                ->icon('bs.shield')
                ->route('platform.systems.roles')
                ->permission('platform.systems.roles')
                ->divider(),

            Menu::make('Documentation')
                ->title('Docs')
                ->icon('bs.box-arrow-up-right')
                ->url('https://orchid.software/en/docs')
                ->target('_blank'),

            Menu::make('Changelog')
                ->icon('bs.box-arrow-up-right')
                ->url('https://github.com/orchidsoftware/platform/blob/master/CHANGELOG.md')
                ->target('_blank')
                ->badge(fn () => Dashboard::version(), Color::DARK),
        ];
    }

    /**
     * Register permissions for the application.
     *
     * @return ItemPermission[]
     */
    public function permissions(): array
    {
        return [
            ItemPermission::group(__('System'))
                ->addPermission('platform.systems.roles', __('Roles'))
                ->addPermission('platform.systems.users', __('Users')),
        ];
    }
}
