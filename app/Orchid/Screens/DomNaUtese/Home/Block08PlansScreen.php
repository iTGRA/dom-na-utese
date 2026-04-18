<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

class Block08PlansScreen extends AbstractBlockScreen
{
    protected function groupKey(): string
    {
        return 'block08';
    }

    public function name(): ?string
    {
        return '08 · Планы';
    }

    public function description(): ?string
    {
        return 'Заголовок блока с 9 карточками лотов. Сами карточки лотов — в разделе «Лоты».';
    }
}
