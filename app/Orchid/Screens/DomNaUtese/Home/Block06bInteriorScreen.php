<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

class Block06bInteriorScreen extends Block06ArchitectureScreen
{
    protected function groupKey(): string
    {
        return 'block06b';
    }

    protected function plateBlockKey(): string
    {
        return 'interior';
    }

    public function name(): ?string
    {
        return '06B · Интерьер';
    }

    public function description(): ?string
    {
        return 'Свет, пропорции, панорамное остекление. Пластины Pl. 11–14.';
    }
}
