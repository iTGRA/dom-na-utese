<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

/**
 * Shore long-read page controller.
 *
 * Renders `/shore` — a deep-dive monograph on the Volga coast between
 * Postnikov Ravine and Barbashina Polyana: manifest, 14 historical
 * objects reference, and timeline. Source copy lives in
 * docs/design-system/dom-na-utese-concept.txt and is rendered directly
 * inside the React page — no props from backend at this stage.
 */
class ShoreController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Shore');
    }
}
