<?php

declare(strict_types=1);

use App\Orchid\Screens\DomNaUtese\Lead\LeadListScreen;
use App\Orchid\Screens\DomNaUtese\Lead\LeadShowScreen;
use App\Orchid\Screens\DomNaUtese\Lot\LotEditScreen;
use App\Orchid\Screens\DomNaUtese\Lot\LotListScreen;
use App\Orchid\Screens\DomNaUtese\Neighbor\NeighborEditScreen;
use App\Orchid\Screens\DomNaUtese\Neighbor\NeighborListScreen;
use App\Orchid\Screens\DomNaUtese\Settings\SiteSettingsScreen;
use App\Orchid\Screens\Examples\ExampleActionsScreen;
use App\Orchid\Screens\Examples\ExampleCardsScreen;
use App\Orchid\Screens\Examples\ExampleChartsScreen;
use App\Orchid\Screens\Examples\ExampleFieldsAdvancedScreen;
use App\Orchid\Screens\Examples\ExampleFieldsScreen;
use App\Orchid\Screens\Examples\ExampleGridScreen;
use App\Orchid\Screens\Examples\ExampleLayoutsScreen;
use App\Orchid\Screens\Examples\ExampleScreen;
use App\Orchid\Screens\Examples\ExampleTextEditorsScreen;
use App\Orchid\Screens\PlatformScreen;
use App\Orchid\Screens\Role\RoleEditScreen;
use App\Orchid\Screens\Role\RoleListScreen;
use App\Orchid\Screens\User\UserEditScreen;
use App\Orchid\Screens\User\UserListScreen;
use App\Orchid\Screens\User\UserProfileScreen;
use Illuminate\Support\Facades\Route;
use Tabuna\Breadcrumbs\Trail;

/*
|--------------------------------------------------------------------------
| Dashboard Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the need "dashboard" middleware group. Now create something great!
|
*/

// Main
Route::screen('/main', PlatformScreen::class)
    ->name('platform.main');

// Platform > Profile
Route::screen('profile', UserProfileScreen::class)
    ->name('platform.profile')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push(__('Profile'), route('platform.profile')));

// Platform > System > Users > User
Route::screen('users/{user}/edit', UserEditScreen::class)
    ->name('platform.systems.users.edit')
    ->breadcrumbs(fn (Trail $trail, $user) => $trail
        ->parent('platform.systems.users')
        ->push($user->name, route('platform.systems.users.edit', $user)));

// Platform > System > Users > Create
Route::screen('users/create', UserEditScreen::class)
    ->name('platform.systems.users.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.systems.users')
        ->push(__('Create'), route('platform.systems.users.create')));

// Platform > System > Users
Route::screen('users', UserListScreen::class)
    ->name('platform.systems.users')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push(__('Users'), route('platform.systems.users')));

// Platform > System > Roles > Role
Route::screen('roles/{role}/edit', RoleEditScreen::class)
    ->name('platform.systems.roles.edit')
    ->breadcrumbs(fn (Trail $trail, $role) => $trail
        ->parent('platform.systems.roles')
        ->push($role->name, route('platform.systems.roles.edit', $role)));

// Platform > System > Roles > Create
Route::screen('roles/create', RoleEditScreen::class)
    ->name('platform.systems.roles.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.systems.roles')
        ->push(__('Create'), route('platform.systems.roles.create')));

// Platform > System > Roles
Route::screen('roles', RoleListScreen::class)
    ->name('platform.systems.roles')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push(__('Roles'), route('platform.systems.roles')));

// Example...
Route::screen('example', ExampleScreen::class)
    ->name('platform.example')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Example Screen'));

Route::screen('/examples/form/fields', ExampleFieldsScreen::class)->name('platform.example.fields');
Route::screen('/examples/form/advanced', ExampleFieldsAdvancedScreen::class)->name('platform.example.advanced');
Route::screen('/examples/form/editors', ExampleTextEditorsScreen::class)->name('platform.example.editors');
Route::screen('/examples/form/actions', ExampleActionsScreen::class)->name('platform.example.actions');

Route::screen('/examples/layouts', ExampleLayoutsScreen::class)->name('platform.example.layouts');
Route::screen('/examples/grid', ExampleGridScreen::class)->name('platform.example.grid');
Route::screen('/examples/charts', ExampleChartsScreen::class)->name('platform.example.charts');
Route::screen('/examples/cards', ExampleCardsScreen::class)->name('platform.example.cards');

/*
|--------------------------------------------------------------------------
| Дом на Утёсе · контент-админка
|--------------------------------------------------------------------------
| Лоты, соседи по берегу, заявки, настройки сайта.
| Все экраны в App\Orchid\Screens\DomNaUtese\*.
*/

// Лоты
Route::screen('dnu/lots', LotListScreen::class)
    ->name('platform.dnu.lots')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Лоты', route('platform.dnu.lots')));

Route::screen('dnu/lots/create', LotEditScreen::class)
    ->name('platform.dnu.lots.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.dnu.lots')
        ->push('Новый лот', route('platform.dnu.lots.create')));

Route::screen('dnu/lots/{lot}/edit', LotEditScreen::class)
    ->name('platform.dnu.lots.edit')
    ->breadcrumbs(fn (Trail $trail, $lot) => $trail
        ->parent('platform.dnu.lots')
        ->push("Лот {$lot->number}", route('platform.dnu.lots.edit', $lot)));

// Соседи по берегу
Route::screen('dnu/neighbors', NeighborListScreen::class)
    ->name('platform.dnu.neighbors')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Соседи по берегу', route('platform.dnu.neighbors')));

Route::screen('dnu/neighbors/create', NeighborEditScreen::class)
    ->name('platform.dnu.neighbors.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.dnu.neighbors')
        ->push('Новый объект', route('platform.dnu.neighbors.create')));

Route::screen('dnu/neighbors/{neighbor}/edit', NeighborEditScreen::class)
    ->name('platform.dnu.neighbors.edit')
    ->breadcrumbs(fn (Trail $trail, $neighbor) => $trail
        ->parent('platform.dnu.neighbors')
        ->push($neighbor->title, route('platform.dnu.neighbors.edit', $neighbor)));

// Заявки
Route::screen('dnu/leads', LeadListScreen::class)
    ->name('platform.dnu.leads')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Заявки', route('platform.dnu.leads')));

Route::screen('dnu/leads/{lead}', LeadShowScreen::class)
    ->name('platform.dnu.leads.show')
    ->breadcrumbs(fn (Trail $trail, $lead) => $trail
        ->parent('platform.dnu.leads')
        ->push("Заявка #{$lead->id}", route('platform.dnu.leads.show', $lead)));

// Настройки сайта
Route::screen('dnu/settings', SiteSettingsScreen::class)
    ->name('platform.dnu.settings')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Настройки сайта', route('platform.dnu.settings')));

// Route::screen('idea', Idea::class, 'platform.screens.idea');
