<?php

namespace App\Http\Controllers;

use App\Models\Neighbor;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Shore long-read page controller.
 *
 * Лонгрид /shore — манифест + справочник 14 исторических объектов +
 * сводная хронология. Концепт + список объектов перенесены в БД (таблица
 * neighbors) через NeighborSeeder. Shore.jsx получает их как props.
 */
class ShoreController extends Controller
{
    public function index(): Response
    {
        $neighbors = Neighbor::orderBy('sort_order')->get()->map(fn (Neighbor $n) => [
            'id' => $n->id,
            'num' => str_pad((string) $n->sort_order, 2, '0', STR_PAD_LEFT),
            'title' => $n->title,
            'owner' => $n->owner,
            'dateLabel' => $n->date_label,
            'year' => $n->year,
            'address' => $n->address,
            'style' => $n->style,
            'statusLabel' => $n->status_label,
            'tag' => $n->tag,
            'description' => $n->description,
            'shortDescription' => $n->short_description,
            'image' => $n->image ? Storage::url($n->image) : null,
            'featured' => (bool) $n->featured,
        ]);

        return Inertia::render('Shore', [
            'neighbors' => $neighbors,
        ]);
    }
}
