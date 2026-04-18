import Header from './Header';
import Footer from './Footer';
import LeadFormModal from '../UI/LeadFormModal';
import Toast from '../UI/Toast';
import { LeadFormProvider } from '../../hooks/useLeadForm';

/**
 * Shell — общий каркас страниц.
 *
 * Обёртка Provider → Header → main → Footer → LeadFormModal → Toast.
 * LeadFormProvider должен стоять выше Header (хедер вызывает useLeadForm).
 * Модалка и тост рендерятся один раз на всю страницу.
 *
 * Header теперь `fixed top-0` — не занимает места в layout flow и лежит
 * поверх контента. Поэтому страницы, не начинающиеся с полноэкранного
 * Hero (например /shore — лонгрид), должны сами отступить сверху. Это
 * контролируется пропом `withHero`.
 *
 * Props:
 *   children    контент страницы
 *   snap        boolean — включить scroll-snap-type:y proximity на mobile.
 *               Home.jsx включает, Shore.jsx — нет (лонгрид с плавным скроллом).
 *   withHero    boolean — у страницы первый блок это full-bleed Hero,
 *               который сам "прячется" под прозрачным header'ом. Тогда
 *               main начинается с top:0. Иначе добавляем padding под header.
 */
export default function Shell({ children, snap = false, withHero = false }) {
    const classes = [];
    if (snap) classes.push('snap-root');
    if (!withHero) classes.push('pt-[52px]', 'md:pt-16');

    return (
        <LeadFormProvider>
            <Header />
            <main id="main" className={classes.join(' ')}>
                {children}
            </main>
            <Footer />
            <LeadFormModal />
            <Toast />
        </LeadFormProvider>
    );
}
