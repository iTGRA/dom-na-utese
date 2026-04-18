<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

class Block06cCourtyardScreen extends Block06ArchitectureScreen
{
    protected function groupKey(): string
    {
        return 'block06c';
    }

    protected function plateBlockKey(): string
    {
        return 'courtyard';
    }

    public function name(): ?string
    {
        return '06C · Двор';
    }

    public function description(): ?string
    {
        return 'Закрытый двор на кровле паркинга. Пластины Pl. 15–20.';
    }
}
