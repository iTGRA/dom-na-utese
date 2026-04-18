<?php

namespace App\Http\Controllers;

use App\Models\Lot;
use App\Models\Neighbor;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Homepage controller for Дом на Утёсе landing.
 *
 * Рендерит Home.jsx и передаёт данные, редактируемые через админку:
 *   - lots: 9 лотов для блока 08 Plans.jsx (номер, этаж, площади, статус)
 *   - featuredNeighbor: «Дача со Слонами» для блока 05 Dacha.jsx
 *
 * settings (контакты, юр.инфо, мета) шарятся глобально через
 * HandleInertiaRequests::share() — используются в Footer и Head.
 */
class HomeController extends Controller
{
    public function index(): Response
    {
        $lots = Lot::orderBy('sort_order')->get()->map(fn (Lot $l) => [
            'id' => $l->id,
            'number' => $l->number,
            'floor' => $l->floor,
            'areaTotal' => $l->area_total,
            'areaApartment' => $l->area_apartment,
            'areaSummerTerrace' => $l->area_summer_terrace,
            'areaBalconyTerrace' => $l->area_balcony_terrace,
            'view' => $l->view,
            'status' => $l->status,
            'planImage' => $l->plan_image ? Storage::url($l->plan_image) : null,
            'description' => $l->description,
        ]);

        $featuredNeighbor = Neighbor::where('featured', true)->first();

        return Inertia::render('Home', [
            'lots' => $lots,
            'featuredNeighbor' => $featuredNeighbor ? [
                'id' => $featuredNeighbor->id,
                'title' => $featuredNeighbor->title,
                'owner' => $featuredNeighbor->owner,
                'dateLabel' => $featuredNeighbor->date_label,
                'address' => $featuredNeighbor->address,
                'style' => $featuredNeighbor->style,
                'statusLabel' => $featuredNeighbor->status_label,
                'description' => $featuredNeighbor->description,
                'shortDescription' => $featuredNeighbor->short_description,
                'image' => $featuredNeighbor->image ? Storage::url($featuredNeighbor->image) : null,
            ] : null,
        ]);
    }
}
