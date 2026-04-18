import { Head } from '@inertiajs/react';
import Shell from '../Components/Layout/Shell';
import Hero from '../Components/Blocks/01-Hero';
import Category from '../Components/Blocks/02-Category';
import Shore from '../Components/Blocks/03-Shore';
// Отключён от главной 2026-04-18. Перенесён на /shore. См. Shore.jsx.
// import Neighbors from '../Components/Blocks/04-Neighbors';
import Dacha from '../Components/Blocks/05-Dacha';
import Architecture from '../Components/Blocks/06-Architecture';
import Lot from '../Components/Blocks/07-Lot';
import Plans from '../Components/Blocks/08-Plans';
import Uklad from '../Components/Blocks/09-Uklad';
import Infrastructure from '../Components/Blocks/10-Infrastructure';
import Built from '../Components/Blocks/11-Built';
import FinalCTA from '../Components/Blocks/12-FinalCTA';

/**
 * Home — главный лендинг «Дом на Утёсе».
 *
 * Одностраничник из 11 блоков (по брифу их 12, блок «Команда» в первой
 * итерации не реализован — клиент решил показать на второй).
 *
 * Порядок строго как в брифе:
 *   Акт I   — 01 Hero, 02 Category
 *   Акт II  — 03 Shore, 04 Neighbors, 05 Dacha
 *   Акт III — 06 Architecture, 07 Lot, 08 Plans, 09 Uklad
 *   Акт IV  — 10 Infrastructure, 11 Built, 12 FinalCTA
 *
 * snap=true в Shell → mobile получает scroll-snap-type: y proximity
 * (мягкий, не mandatory) через класс `.snap-root` на <main>.
 * Каждый блок имеет `.snap-slide` для scroll-snap-align: start +
 * min-height: 100svh на mobile (правила в app.css).
 *
 * `data-server-rendered` — QA-якорь, проверяется в smoke-тестах
 * (по соглашению с проектом «На Угле»).
 *
 * Пропсы:
 *   lots             — массив 9 лотов из HomeController (для блока 08)
 *   featuredNeighbor — один объект (Дача со Слонами) для блока 05
 */
export default function Home({ lots = [], featuredNeighbor = null }) {
    return (
        <Shell snap>
            <Head>
                <title>Дом на Утёсе — клубный дом на первой линии Волги, Самара</title>
                <meta
                    name="description"
                    content="Девять лотов на исторической линии самарских просек. Потолки 3,5–4 м, панорамное остекление, подземный паркинг. Дом сдан в 2024 году."
                />
            </Head>
            <div data-server-rendered="true">
                <Hero />
                <Category />
                <Shore />
                {/* <Neighbors /> — отключён 2026-04-18, 8 соседей переехали на /shore#neighbors. Дача со Слонами — ниже, в блоке 05. */}
                <Dacha neighbor={featuredNeighbor} />
                <Architecture />
                <Lot />
                <Plans lots={lots} />
                <Uklad />
                <Infrastructure />
                <Built />
                <FinalCTA />
            </div>
        </Shell>
    );
}
