import { Head } from '@inertiajs/react';
import Shell from '../Components/Layout/Shell';
import Hero from '../Components/Blocks/01-Hero';
import Category from '../Components/Blocks/02-Category';
import Shore from '../Components/Blocks/03-Shore';
// Отключены от главной 2026-04-18. Перенесены на /shore.
// import Neighbors from '../Components/Blocks/04-Neighbors';
// import Dacha from '../Components/Blocks/05-Dacha';
import Architecture from '../Components/Blocks/06-Architecture';
import Interior from '../Components/Blocks/06B-Interior';
import Courtyard from '../Components/Blocks/06C-Courtyard';
import Lot from '../Components/Blocks/07-Lot';
import Plans from '../Components/Blocks/08-Plans';
import Uklad from '../Components/Blocks/09-Uklad';
import Infrastructure from '../Components/Blocks/10-Infrastructure';
import Built from '../Components/Blocks/11-Built';
import FinalCTA from '../Components/Blocks/12-FinalCTA';

/**
 * Home — главный лендинг «Дом на Утёсе».
 *
 * Одностраничник из 11 блоков. Порядок строго как в брифе:
 *   Акт I   — 01 Hero, 02 Category
 *   Акт II  — 03 Shore
 *   Акт III — 06 Architecture, 06B Interior, 06C Courtyard, 07 Lot, 08 Plans, 09 Uklad
 *   Акт IV  — 10 Infrastructure, 11 Built, 12 FinalCTA
 *
 * Фаза 2 CMS (2026-04-18):
 *   - Тексты и картинки каждого блока читаются из shared `settings`
 *     (HandleInertiaRequests::share) через хук useSetting().
 *   - Структурные сущности (plates, uklad, infra, lotFeatures, lots)
 *     приходят массивами через props из HomeController.
 *   - У каждого блока есть внутренний fallback — сайт рендерится даже
 *     при пустых миграциях / сбросе БД.
 *
 * `data-server-rendered` — QA-якорь, проверяется smoke-тестами.
 */
export default function Home({
    lots = [],
    plates = { arch: [], interior: [], courtyard: [] },
    uklad = [],
    infra = [],
    lotFeatures = [],
    // featuredNeighbor — не используется на главной (осталось для совместимости
    // с текущим HomeController, см. /shore#neighbors).
    featuredNeighbor = null, // eslint-disable-line no-unused-vars
}) {
    return (
        <Shell snap withHero>
            <Head>
                <title>Дом на Утёсе — клубный дом на первой линии Волги, Самара</title>
                <meta
                    name="description"
                    content="Девять лотов на исторической линии самарских просек. Потолки 3,5–4 м, панорамное остекление, подземный паркинг. Дом сдан в 2026 году."
                />
            </Head>
            <div data-server-rendered="true">
                <Hero />
                <Category />
                <Shore />
                <Architecture plates={plates.arch || []} />
                <Interior plates={plates.interior || []} />
                <Courtyard plates={plates.courtyard || []} />
                <Lot lotFeatures={lotFeatures} />
                <Plans lots={lots} />
                <Uklad uklad={uklad} />
                <Infrastructure infra={infra} />
                <Built />
                <FinalCTA />
            </div>
        </Shell>
    );
}
