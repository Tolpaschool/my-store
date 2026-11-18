import "./ConfirmDialog.css";

function ConfirmDialog({ title, message, confirmText = "تأكيد", onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="btn-danger" onClick={onConfirm}>{confirmText}</button>
          <button className="btn-light" onClick={onCancel}>إلغاء</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;