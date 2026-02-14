import { useState } from "react";
import "./Cadastro.css";

function Cadastro({ onCadastro }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  // Funções de validação
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarTelefone = (tel) => /^\d{10,11}$/.test(tel); // 10 ou 11 dígitos
  const validarCPF = (cpf) => /^\d{11}$/.test(cpf); // simplificado: apenas 11 dígitos
  const validarSenha = (senha) => senha.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !email || !telefone || !cpf || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (!validarEmail(email)) {
      setErro("Email inválido.");
      return;
    }
    if (!validarTelefone(telefone)) {
      setErro("Telefone inválido. Use apenas números com DDD.");
      return;
    }
    if (!validarCPF(cpf)) {
      setErro("CPF inválido. Digite 11 números.");
      return;
    }
    if (!validarSenha(senha)) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro("");
    // envia os dados para o App.jsx
    onCadastro({ nome, email, telefone, cpf, senha });
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label>Telefone</label>
          <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
        <div className="field">
          <label>CPF</label>
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        </div>
        <div className="field">
          <label>Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <div className="field">
          <label>Confirmar Senha</label>
          <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
        </div>

        {erro && <p className="error">{erro}</p>}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
