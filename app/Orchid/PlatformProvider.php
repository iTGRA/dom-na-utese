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

            Menu::make('Лоты')
                ->icon('bs.building')
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
