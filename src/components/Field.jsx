function Field({ label, error, children }) {
  return (
    <label className={error ? "field invalid" : "field"}>
      <span>{label}</span>
      {children}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

export default Field;