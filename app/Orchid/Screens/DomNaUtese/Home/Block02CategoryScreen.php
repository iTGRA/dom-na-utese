<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

class Block02CategoryScreen extends AbstractBlockScreen
{
    protected function groupKey(): string
    {
        return 'block02';
    }

    public function name(): ?string
    {
        return '02 · Категория';
    }

    public function description(): ?string
    {
        return 'Позиционирование дома на исторической линии Просек. Текст + портретное фото.';
    }
}
