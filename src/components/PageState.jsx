function PageState({ status, onRetry }) {
  if (status === "loading") {
    return <p className="empty">جاري التحميل...</p>;
  }

  return (
    <div className="empty">
      <p>تعذر تحميل البيانات.</p>
      <button className="btn-light" style={{ margin: "16px auto 0" }} onClick={onRetry}>
        إعادة المحاولة
      </button>
    </div>
  );
}

export default PageState;