/**
 * Field — editorial form input.
 *
 * Ни рамки, ни скругления. Только label caps + 1px линия снизу
 * (см. `.field` в resources/css/app.css).
 *
 * Props:
 *   label        string (uppercase caps-label)
 *   name         string
 *   type         string (default 'text')
 *   value
 *   onChange
 *   placeholder  string (italic при отображении)
 *   error        string — сообщение об ошибке (включает .field--error)
 *   tone         'light' | 'dark' | 'stamp' — под фон блока
 *   textarea     boolean — рендерить <textarea> вместо <input>
 *   required     boolean
 *   autoComplete string
 *   id           string — если не передан, генерируется из name
 */
export default function Field({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    tone = 'light',
    textarea = false,
    required = false,
    autoComplete,
    id,
    ...rest
}) {
    const fieldId = id || `field-${name}`;
    const errorId = `${fieldId}-error`;

    const wrapperClasses = [
        'field',
        tone === 'dark' ? 'field--on-dark' : '',
        tone === 'stamp' ? 'field--on-stamp' : '',
        error ? 'field--error' : '',
    ]
        .filter(Boolean)
        .join(' ');

    const commonProps = {
        id: fieldId,
        name,
        value,
        onChange,
        placeholder,
        required,
        autoComplete,
        'aria-invalid': !!error,
        'aria-describedby': error ? errorId : undefined,
        ...rest,
    };

    return (
        <label className={wrapperClasses} htmlFor={fieldId}>
            {label && <span className="field__label">{label}</span>}
            {textarea ? (
                <textarea className="field__textarea" rows={3} {...commonProps} />
            ) : (
                <input className="field__input" type={type} {...commonProps} />
            )}
            {error && (
                <span id={errorId} className="field__error" role="alert">
                    {error}
                </span>
            )}
        </label>
    );
}
