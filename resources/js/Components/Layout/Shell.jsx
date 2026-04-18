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
 * Props:
 *   children    контент страницы
 *   snap        boolean — включить scroll-snap-type:y proximity на mobile.
 *               Home.jsx включает, Shore.jsx — нет (лонгрид с плавным скроллом).
 */
export default function Shell({ children, snap = false }) {
    return (
        <LeadFormProvider>
            <Header />
            <main id="main" className={snap ? 'snap-root' : ''}>
                {children}
            </main>
            <Footer />
            <LeadFormModal />
            <Toast />
        </LeadFormProvider>
    );
}
