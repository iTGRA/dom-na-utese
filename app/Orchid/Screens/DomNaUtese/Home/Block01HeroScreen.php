<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

/**
 * Блок 01 · Hero — главный экран-знакомство.
 * Кикер, заголовок (две части: обычная + курсив), подзаголовок, 2 CTA,
 * 4 факта и большая full-bleed картинка.
 */
class Block01HeroScreen extends AbstractBlockScreen
{
    protected function groupKey(): string
    {
        return 'block01';
    }

    public function name(): ?string
    {
        return '01 · Hero — первый экран';
    }

    public function description(): ?string
    {
        return 'Главный баннер страницы: заголовок, подзаголовок, кнопки, фоновая фотография.';
    }
}
