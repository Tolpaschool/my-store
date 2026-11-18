import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Field from "../components/Field";
import "../components/ProductForm.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (login(password)) {
      navigate("/admin");
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  }

  return (
    <main className="container" style={{ maxWidth: 420 }}>
      <h2 className="section-title">دخول الإدارة</h2>

      <form className="form" onSubmit={handleSubmit}>
        <Field label="كلمة المرور" error={error}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <button type="submit" className="details-btn">دخول</button>
      </form>
    </main>
  );
}

export default Login;