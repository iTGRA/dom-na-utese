<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

class Block12FinalCtaScreen extends AbstractBlockScreen
{
    protected function groupKey(): string
    {
        return 'block12';
    }

    public function name(): ?string
    {
        return '12 · Финальный CTA';
    }

    public function description(): ?string
    {
        return 'Форма заявки в подвале страницы: заголовок, пояснение, подписи.';
    }
}
