import { useLeadForm } from '../../hooks/useLeadForm';

/**
 * Блок 08 — Девять лотов (планировки).
 *
 * Editorial сетка 9 карточек лотов. Каждая — номер, этаж, площадь,
 * видовая сторона, статус (chip). CTA «Запросить условия» — вспомогательный,
 * открывает ту же форму с `source: 'lot-card'` и `lot_id`.
 *
 * Текст — дословно из dom-na-utese-brief.txt §БЛОК 8.
 * «Примечание. Цен нет. Есть только «запросить условия».» — категорийный сигнал.
 *
 * Данные приходят из HomeController (таблица `lots`, сортировка по sort_order).
 * Если props пустые (миграция не накатилась) — фолбэк на заглушечные 9 карточек.
 */

// Фолбэк на случай пустой БД — держим, чтобы сайт не падал при dev-сбросах.
const fallbackLots = [
    { number: '01', floor: 1, areaTotal: '140–160 м²', view: 'Волга · Жигулёвские ворота', status: 'available' },
    { number: '02', floor: 1, areaTotal: '140–160 м²', view: 'Волга · закат', status: 'available' },
    { number: '03', floor: 1, areaTotal: '140–160 м²', view: 'Волга · Загородный парк', status: 'available' },
    { number: '04', floor: 2, areaTotal: '160–180 м²', view: 'Волга · Жигулёвские ворота', status: 'available' },
    { number: '05', floor: 2, areaTotal: '160–180 м²', view: 'Волга · закат', status: 'reserved' },
    { number: '06', floor: 2, areaTotal: '160–180 м²', view: 'Волга · Загородный парк', status: 'available' },
    { number: '07', floor: 3, areaTotal: '180–220 м²', view: 'Волга · Жигулёвские ворота', status: 'available' },
    { number: '08', floor: 3, areaTotal: '180–220 м²', view: 'Волга · закат', status: 'available' },
    { number: '09', floor: 3, areaTotal: '180–220 м²', view: 'Волга · Загородный парк', status: 'available' },
];

const statusLabels = {
    available: 'Доступен',
    reserved: 'В резерве',
    sold: 'Продан',
};

const statusClasses = {
    available: 'border-success text-success',
    reserved: 'border-tea text-tea bg-tea/10',
    sold: 'border-stamp/60 text-stamp/60',
};

export default function Plans({ lots = [] }) {
    const { openLeadForm } = useLeadForm();

    const items = lots.length ? lots : fallbackLots;

    return (
        <section
            id="plans"
            className="snap-slide bg-paper-light text-handwriting py-rhythm-xl md:py-rhythm-xl-md"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                    08 · Планировки
                </p>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-end mb-rhythm-lg md:mb-rhythm-lg-md">
                    <div>
                        <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] mb-rhythm-xs md:mb-rhythm-xs-md">
                            Девять лотов
                        </h2>
                        <p className="font-serif italic text-[17px] md:text-[22px] leading-[1.3] opacity-80 max-w-[28ch]">
                            Свободная планировка под ваш сценарий жизни.
                        </p>
                    </div>
                    <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-handwriting/60 max-w-[28ch] md:text-right">
                        Цен нет. Есть только «запросить условия».
                    </p>
                </div>

                {/* Editorial lot cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {items.map((lot) => {
                        // Номер лота как число для lot_id (01 → 1).
                        const lotIdNumeric = parseInt(lot.number, 10) || null;
                        const areaText = lot.areaTotal || lot.areaApartment || 'По запросу';

                        return (
                            <article
                                key={lot.number}
                                className={
                                    'group bg-paper border border-handwriting/15 p-6 flex flex-col ' +
                                    (lot.status === 'sold' ? 'opacity-70' : '')
                                }
                            >
                                {/* Header: LOT / FLOOR */}
                                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-handwriting/15">
                                    <div>
                                        <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-handwriting/60 mb-1">
                                            Лот
                                        </p>
                                        <p className="font-sans text-[22px] font-bold tnum">
                                            {lot.number}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-handwriting/60 mb-1">
                                            Этаж
                                        </p>
                                        <p className="font-sans text-[22px] font-bold tnum">
                                            {lot.floor}
                                        </p>
                                    </div>
                                </div>

                                {/* Rows */}
                                <dl className="py-5 space-y-2 flex-1">
                                    <div className="grid grid-cols-[110px_1fr] gap-3">
                                        <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/55">
                                            Площадь
                                        </dt>
                                        <dd className="font-serif text-[14px] leading-[1.5] tnum">
                                            {areaText}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-[110px_1fr] gap-3">
                                        <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/55">
                                            Видовая
                                        </dt>
                                        <dd className="font-serif text-[14px] leading-[1.5]">
                                            {lot.view}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-[110px_1fr] gap-3">
                                        <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/55">
                                            Планировка
                                        </dt>
                                        <dd className="font-serif italic text-[13px] leading-[1.4] opacity-70">
                                            По запросу менеджера
                                        </dd>
                                    </div>
                                </dl>

                                {/* Footer */}
                                <div className="pt-4 border-t border-handwriting/15 flex items-center justify-between">
                                    <span
                                        className={
                                            'font-sans text-[9px] font-bold tracking-[0.12em] uppercase px-[10px] py-[5px] border ' +
                                            (statusClasses[lot.status] || statusClasses.available)
                                        }
                                    >
                                        {statusLabels[lot.status] || lot.status}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openLeadForm({ source: 'lot-card', lot_id: lotIdNumeric })
                                        }
                                        className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-stamp link-underline cursor-pointer"
                                    >
                                        Условия →
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
