// Forçando redeploy no Vercel

import { useState } from "react";
import "./Login.css";

function Login({ onLogin, setMostrarCadastro }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }
    if (!validarEmail(email)) {
      setErro("Email inválido.");
      return;
    }
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setErro("");
    onLogin(email); // login bem-sucedido
  };

  return (
    <div className="login-container">
      <h2>Entrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Senha</label>
          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {erro && <p className="error">{erro}</p>}

        <button type="submit">Login</button>
      </form>

      <p>
        Não tem conta?{" "}
        <button type="button" onClick={() => setMostrarCadastro(true)}>
          Cadastre-se
        </button>
      </p>
    </div>
  );
}

export default Login;
