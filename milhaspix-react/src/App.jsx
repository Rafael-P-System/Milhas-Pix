import { useState } from "react";
import "./App.css";

function App() {
  // Estados do formulário
  const [cpf, setCpf] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const [quantidadeMilhas, setQuantidadeMilhas] = useState("");
  const [valorMilha, setValorMilha] = useState("");

  // Controle do passo ativo
  const [passoAtivo, setPassoAtivo] = useState(0);
  const [companhiaSelecionada, setCompanhiaSelecionada] = useState("");

  const passos = [
    { id: 0, titulo: "Passo 1", texto: "Escolha a companhia aérea" },
    { id: 1, titulo: "Passo 2", texto: "Oferte suas milhas" },
    { id: 2, titulo: "Passo 3", texto: "Insira os dados do programa" },
    { id: 3, titulo: "Passo 4", texto: "Pedido finalizado" },
  ];

  const avancarPasso = () => {
    setPassoAtivo((prev) => Math.min(prev + 1, passos.length - 1));
  };

  const voltarPasso = () => {
    setPassoAtivo((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Dados enviados:
    CPF: ${cpf}
    Login: ${login}
    Senha: ${senha}
    Telefone: ${telefone}`);
    setPassoAtivo(3);
  };

  const renderizarConteudoPasso = () => {
    switch (passoAtivo) {
      case 0:
        return (
          <>
            <h3>01. Escolha a companhia aérea</h3>
            <p>Selecione o programa de fidelidade do qual deseja vender suas milhas.</p>

            <div className="companhias">
              {[
                { id: "azul", nome: "TudoAzul", img: "/assets/azul.png" },
                { id: "smiles", nome: "Smiles", img: "/assets/smiles.png" },
                { id: "latam", nome: "Latam Pass", img: "/assets/latam.png" },
                { id: "air", nome: "Airlines", img: "/assets/air.png" },
              ].map((cia) => (
                <div
                  key={cia.id}
                  className={`companhia-card ${
                    companhiaSelecionada === cia.id ? "selecionada" : ""
                  }`}
                  onClick={() => setCompanhiaSelecionada(cia.id)}
                >
                  <img src={cia.img} alt={cia.nome} />
                  <p>{cia.nome}</p>
                </div>
              ))}
            </div>

            <div className="actions" style={{ justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={avancarPasso}
                disabled={!companhiaSelecionada}
              >
                Próximo →
              </button>
            </div>
          </>
        );

      case 1:
        return (
          <>
            <h3>02. Oferte suas milhas</h3>
            <form>
              <div className="field">
                <label>Quantidade de Milhas</label>
                <input
                  type="number"
                  placeholder="Mínimo de 10.000 milhas"
                  value={quantidadeMilhas}
                  onChange={(e) => setQuantidadeMilhas(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Valor Desejado por 1.000 Milhas (R$)</label>
                <input
                  type="number"
                  placeholder="Ex: 21.50"
                  value={valorMilha}
                  onChange={(e) => setValorMilha(e.target.value)}
                  step="0.01"
                  required
                />
              </div>

              <p className="total">
                <strong>Valor total estimado:</strong> R${" "}
                {(
                  (parseFloat(quantidadeMilhas || 0) / 1000) *
                  parseFloat(valorMilha || 0)
                ).toFixed(2)}
              </p>

              <div className="actions">
                <button type="button" onClick={voltarPasso}>
                  ← Voltar
                </button>
                <button
                  type="button"
                  onClick={avancarPasso}
                  disabled={!quantidadeMilhas || !valorMilha}
                >
                  Próximo →
                </button>
              </div>
            </form>
          </>
        );

      case 2:
        return (
          <>
            <h3>03. Insira os dados do programa</h3>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>CPF do Titular</label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Login de acesso</label>
                <input
                  type="text"
                  placeholder="Digite seu login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Senha de acesso</label>
                <input
                  type="password"
                  placeholder="••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Telefone</label>
                <input
                  type="text"
                  placeholder="+55 (00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                />
              </div>

              <div className="checkbox">
                <label>
                  <input type="checkbox" required /> Concordo com os termos de uso
                </label>
              </div>

              <div className="actions">
                <button type="button" onClick={voltarPasso}>
                  ← Voltar
                </button>
                <button type="submit">Concluir →</button>
              </div>
            </form>
          </>
        );

      case 3:
        return (
          <div className="placeholder finalizado">
            <h3>Pedido Finalizado!</h3>
            <p>Obrigado! Seu pedido foi enviado.</p>
            <button onClick={() => setPassoAtivo(0)}>Novo Pedido</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <header className="header">
        <img src="/assets/logo.png" alt="logo-milhas" className="logo-left" />
      </header>

      <div className="container">
        <aside className="steps">
          <div className="line"></div>
          {passos.map((passo) => (
            <div
              key={passo.id}
              className={`step ${
                passo.id === passoAtivo ? "ativo" : "inativo"
              } ${passo.id < passoAtivo ? "completo" : ""}`}
              onClick={() =>
                passo.id <= passoAtivo && setPassoAtivo(passo.id)
              }
              style={{ cursor: passo.id <= passoAtivo ? "pointer" : "default" }}
            >
              <div className="circle-outer">
                {passo.id < passoAtivo ? (
                  <span style={{ color: "white" }}>✓</span>
                ) : (
                  passo.id === passoAtivo && <div className="circle-inner" />
                )}
              </div>
              <div className="step-text">
                <strong>{passo.titulo}</strong>
                <p>{passo.texto}</p>
              </div>
            </div>
          ))}
        </aside>

        <main className="form-area">{renderizarConteudoPasso()}</main>

        <aside className="info-box">
          <h4>Média de milhas</h4>
          <p>
            Ao vender mais de 20.000 milhas, ative as opções avançadas para
            definir a média por emissão.
          </p>
          <hr />
          <h4>Total estimado</h4>
          <p>Milhas Ofertadas: {quantidadeMilhas || "0"}</p>
          <p>Valor p/ 1000: R$ {parseFloat(valorMilha || 0).toFixed(2)}</p>
          <p>
            TOTAL: R${" "}
            {(
              (parseFloat(quantidadeMilhas || 0) / 1000) *
              parseFloat(valorMilha || 0)
            ).toFixed(2)}
          </p>
        </aside>
      </div>
    </div>
  );
}

export default App;
