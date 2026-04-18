import { usePage } from '@inertiajs/react';

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
 * Все контакты, юр.данные и ссылки на документы берутся из глобального
 * `settings` (share в HandleInertiaRequests → SiteSetting::cached).
 * Пустые значения — показываем плейсхолдеры, чтобы сайт выглядел цельно
 * до того, как контент-менеджер заполнит настройки.
 */
export default function Footer() {
    const year = new Date().getFullYear();
    const { props } = usePage();
    const settings = props?.settings || {};

    const phone = settings['contact.phone'];
    const whatsapp = settings['contact.whatsapp'];
    const telegram = settings['contact.telegram'];
    const email = settings['contact.email'];
    const office = settings['contact.office_address'];

    const entity = settings['legal.entity_name'];
    const inn = settings['legal.inn'];
    const ogrn = settings['legal.ogrn'];
    const declarationUrl = settings['legal.declaration_url'];
    const privacyUrl = settings['legal.privacy_url'];

    // Нормализуем ссылки: phone — tel:, whatsapp — wa.me, telegram — t.me,
    // плюс фолбэки на href="#" если поле не заполнено (ссылка остаётся
    // кликабельной, но никуда не ведёт — норма для плейсхолдера).
    const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : '#';
    const whatsappHref = whatsapp ? `https://wa.me/${whatsapp.replace(/[^\d]/g, '')}` : '#';
    const telegramHref = telegram ? `https://t.me/${telegram.replace(/^@/, '')}` : '#';
    const emailHref = email ? `mailto:${email}` : '#';

    const declarationHref = declarationUrl || 'https://xn--80az8a.xn--d1aqf.xn--p1ai/';
    const privacyHref = privacyUrl || '/privacy';

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
                    {office && (
                        <p className="font-serif text-[13px] mt-6 opacity-70 whitespace-pre-line leading-[1.5]">
                            {office}
                        </p>
                    )}
                </div>

                <div>
                    <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase opacity-60 mb-3">
                        Контакты
                    </p>
                    <ul className="font-serif text-[14px] leading-[1.6] space-y-1">
                        <li>
                            <a href={phoneHref} className="link-underline">
                                {phone || 'Телефон'}
                            </a>
                        </li>
                        {whatsapp && (
                            <li>
                                <a href={whatsappHref} target="_blank" rel="noopener" className="link-underline">
                                    WhatsApp
                                </a>
                            </li>
                        )}
                        {telegram && (
                            <li>
                                <a href={telegramHref} target="_blank" rel="noopener" className="link-underline">
                                    Telegram
                                </a>
                            </li>
                        )}
                        <li>
                            <a href={emailHref} className="link-underline">
                                {email || 'info@dom-na-utese.ru'}
                            </a>
                        </li>
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
                        <li>
                            <a href={declarationHref} target="_blank" rel="noopener" className="link-underline">
                                Проектная декларация · наш.дом.рф
                            </a>
                        </li>
                        <li>
                            <a href={privacyHref} className="link-underline">
                                Политика конфиденциальности
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1320px] mx-auto px-5 md:px-10 mt-[64px] pt-[24px] border-t border-paper/15 flex flex-col md:flex-row justify-between gap-3 font-sans text-[10px] tracking-[0.1em] uppercase opacity-50">
                <span>© {year} · Дом на Утёсе{entity ? ` · ${entity}` : ''}</span>
                <span>
                    {inn && `ИНН ${inn}`}
                    {inn && ogrn && ' · '}
                    {ogrn && `ОГРН ${ogrn}`}
                    {!inn && !ogrn && 'Самара · ул. Максима Горького, первая линия Волги'}
                </span>
            </div>
        </footer>
    );
}
