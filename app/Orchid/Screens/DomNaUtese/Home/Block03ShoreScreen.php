<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

class Block03ShoreScreen extends AbstractBlockScreen
{
    protected function groupKey(): string
    {
        return 'block03';
    }

    public function name(): ?string
    {
        return '03 · Берег (Место)';
    }

    public function description(): ?string
    {
        return 'Самарская Ривьера: текст о берегу, 3 цифры (1877 · 10 км · 0), карта.';
    }
}
