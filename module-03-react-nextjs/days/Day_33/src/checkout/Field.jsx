function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  type = "text",
  placeholder,
  required = false
}) {
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && <span className="required"> *</span>}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        aria-invalid={touched && Boolean(error)}
        aria-describedby={touched && error ? errorId : undefined}
      />

      {touched && error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Field;