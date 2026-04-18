/**
 * Footer — техническая подошва сайта.
 *
 * Согласно брифу (ФИНАЛ):
 *   - Название проекта, логотип
 *   - Проектная декларация, наш.дом.рф
 *   - Политика конфиденциальности
 *   - Юридические данные застройщика
 *   - Разработано [агентство]
 *
 * Реальные юр.данные ещё не получены — ставим заглушки, которые
 * контент-менеджер позже заменит через Orchid.
 */
export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-ink text-paper py-[64px] md:py-[96px]">
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
                <div>
                    <div className="font-serif text-[28px] leading-[1.1] mb-2">
                        Дом <em>на Утёсе</em>
                    </div>
                    <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase opacity-70">
                        Клубный дом на&nbsp;первой линии Волги
                    </p>
                    <p className="font-serif italic text-[15px] mt-4 opacity-80">
                        На одной линии с&nbsp;историей.
                    </p>
                </div>

                <div>
                    <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase opacity-60 mb-3">
                        Контакты
                    </p>
                    <ul className="font-serif text-[14px] leading-[1.6] space-y-1">
                        <li><a href="tel:+70000000000" className="link-underline">Телефон</a></li>
                        <li><a href="https://wa.me/" target="_blank" rel="noopener" className="link-underline">WhatsApp</a></li>
                        <li><a href="https://t.me/" target="_blank" rel="noopener" className="link-underline">Telegram</a></li>
                        <li><a href="mailto:info@dom-na-utese.ru" className="link-underline">info@dom-na-utese.ru</a></li>
                    </ul>
                </div>

                <div>
                    <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase opacity-60 mb-3">
                        Разделы
                    </p>
                    <ul className="font-serif text-[14px] leading-[1.6] space-y-1">
                        <li><a href="#place" className="link-underline">Место</a></li>
                        <li><a href="#architecture" className="link-underline">Архитектура</a></li>
                        <li><a href="#lot" className="link-underline">Лот</a></li>
                        <li><a href="/shore" className="link-underline">Берег</a></li>
                    </ul>
                </div>

                <div>
                    <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase opacity-60 mb-3">
                        Документы
                    </p>
                    <ul className="font-serif text-[14px] leading-[1.6] space-y-1">
                        <li><a href="https://xn--80az8a.xn--d1aqf.xn--p1ai/" target="_blank" rel="noopener" className="link-underline">Проектная декларация · наш.дом.рф</a></li>
                        <li><a href="/privacy" className="link-underline">Политика конфиденциальности</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1320px] mx-auto px-5 md:px-10 mt-[64px] pt-[24px] border-t border-paper/15 flex flex-col md:flex-row justify-between gap-3 font-sans text-[10px] tracking-[0.1em] uppercase opacity-50">
                <span>© {year} · Дом на Утёсе</span>
                <span>Самара · ул. Максима Горького, ориентир: первая линия Волги</span>
            </div>
        </footer>
    );
}
