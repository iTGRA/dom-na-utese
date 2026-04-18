<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

class Block11BuiltScreen extends AbstractBlockScreen
{
    protected function groupKey(): string
    {
        return 'block11';
    }

    public function name(): ?string
    {
        return '11 · Дом построен';
    }

    public function description(): ?string
    {
        return 'Предпоследний блок с большой фотографией готового дома и CTA «Записаться на показ».';
    }
}
