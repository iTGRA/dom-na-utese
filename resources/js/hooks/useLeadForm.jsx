import { createContext, useCallback, useContext, useState } from 'react';

/**
 * Контекст для открытия лид-формы из любого компонента дерева.
 *
 * Shell оборачивает дерево в <LeadFormProvider>, каждый CTA вызывает
 * `openLeadForm({ source, lot_id })`. Модалка рендерится один раз в
 * Shell — никаких каскадных вложенных Modal'ов.
 *
 * Контракт source (синхронизирован с StoreLeadRequest::rules):
 *   hero · built · final · lot-card · header
 */
const LeadFormContext = createContext({
    isOpen: false,
    source: 'hero',
    lotId: null,
    openLeadForm: () => {},
    closeLeadForm: () => {},
});

export function LeadFormProvider({ children }) {
    const [state, setState] = useState({ isOpen: false, source: 'hero', lotId: null });

    const openLeadForm = useCallback(({ source = 'hero', lot_id = null } = {}) => {
        setState({ isOpen: true, source, lotId: lot_id });
    }, []);

    const closeLeadForm = useCallback(() => {
        setState((prev) => ({ ...prev, isOpen: false }));
    }, []);

    const value = {
        isOpen: state.isOpen,
        source: state.source,
        lotId: state.lotId,
        openLeadForm,
        closeLeadForm,
    };

    return <LeadFormContext.Provider value={value}>{children}</LeadFormContext.Provider>;
}

export function useLeadForm() {
    return useContext(LeadFormContext);
}
