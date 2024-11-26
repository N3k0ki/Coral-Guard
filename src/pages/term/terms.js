import React, { useEffect, useState } from "react";
import "./term.css";
import { useNavigate } from "react-router-dom";

export function Terms() {
  const [checked, setChecked] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(false);
  const [activeSections, setActiveSections] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollVisible(window.pageYOffset > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSection = (index) => {
    setActiveSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleCheckboxClick = () => {
    setChecked(!checked);
  };

  const handleConfirmClick = () => {
    if (checked) {
        navigate('/inicio');
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="terms-page">
      <header className="terms-header">
        <h1 className="terms-header-title">CoralGuard - Termos e Regras de Uso</h1>
      </header>

      <div className="terms-container">
        {[
          {
            title: "Cadastro e Perfil de Usuário",
            content: (
              <div>
                <h3 className="terms-section-subtitle">Cargos Disponíveis</h3>
                <div className="terms-highlight">
                  <p className="terms-paragraph">
                    <strong>Turista:</strong> Para qualquer pessoa interessada em aprender e contribuir com a preservação dos corais.
                  </p>
                  <p className="terms-paragraph">
                    <strong>Profissional:</strong> Reservado para profissionais qualificados em mergulho ou biologia marinha, com documentação comprobatória.
                  </p>
                </div>
                <p className="terms-paragraph">
                  Mantenha seus dados atualizados, especialmente para o perfil Profissional, já que isso garante a veracidade e segurança das informações enviadas.
                </p>
              </div>
            ),
          },
          {
            title: "Uso do Aplicativo e Mapeamento dos Corais",
            content: (
              <div>
                <h3 className="terms-section-subtitle">Propósito do Aplicativo</h3>
                <p className="terms-paragraph">
                  Nosso foco é a conscientização e o turismo ecológico, incentivando usuários a aprenderem sobre corais e a identificarem sinais de branqueamento, contribuindo para um monitoramento comunitário.
                </p>
                <h3 className="terms-section-subtitle">Mapeamento Responsável</h3>
                <p className="terms-paragraph">
                  Qualquer dado enviado deve ser feito de maneira cuidadosa e com responsabilidade. Evite interagir diretamente com os corais para garantir que não sejam danificados.
                </p>
              </div>
            ),
          },
          {
            title: "Diretrizes de Envio de Dados",
            content: (
              <div>
                <h3 className="terms-section-subtitle">Relatório de Observações</h3>
                <p className="terms-paragraph">
                  Ao avistar corais em condição de branqueamento ou qualquer outra alteração, use o guia visual do aplicativo para descrever corretamente a condição observada.
                </p>
                <h3 className="terms-section-subtitle">Imagens e Descrições</h3>
                <p className="terms-paragraph">
                  É obrigatório que qualquer relatório seja acompanhado de uma imagem nítida e uma descrição breve. Evite o envio de imagens duplicadas ou irrelevantes, pois isso compromete a qualidade dos dados.
                </p>
              </div>
            ),
          },
          {
            title: "Interação com Outros Usuários",
            content: (
              <div>
                <h3 className="terms-section-subtitle">Fóruns e Discussões</h3>
                <p className="terms-paragraph">
                  Seja respeitoso em todas as interações dentro dos fóruns e grupos de discussão. Evite linguagem ofensiva ou debates que possam desviar do propósito educacional e colaborativo da plataforma.
                </p>
              </div>
            ),
          },
          {
            title: "Educação e Conscientização",
            content: (
              <div>
                <p className="terms-paragraph">
                  Antes de explorar o aplicativo, aproveite nossos módulos educativos sobre corais. Estes incluem informações sobre o que causa o branqueamento dos corais, a importância dos recifes para o ecossistema e como agir de forma sustentável.
                </p>
              </div>
            ),
          },
          {
            title: "Privacidade e Segurança",
            content: (
              <div>
                <h3 className="terms-section-subtitle">Uso Responsável das Informações</h3>
                <p className="terms-paragraph">
                  Os dados compartilhados são valiosos para a conservação dos recifes. Não compartilhe informações de outros usuários ou dados coletados fora da plataforma sem permissão.
                </p>
                <h3 className="terms-section-subtitle">Segurança de Dados</h3>
                <p className="terms-paragraph">
                  O CoralGuard garante um ambiente seguro para o armazenamento e tratamento dos dados. Siga as recomendações de privacidade e evite expor informações sensíveis.
                </p>
              </div>
            ),
          },
          {
            title: "Penalidades",
            content: (
              <div>
                <h3 className="terms-section-subtitle">Violação das Regras</h3>
                <p className="terms-paragraph">
                  Qualquer usuário que violar as regras poderá ser advertido ou banido da plataforma. Dependendo da gravidade, estará sujeito a processos.
                </p>
                <h3 className="terms-section-subtitle">Falsificação de Informações</h3>
                <p className="terms-paragraph">
                  Usuários que tentarem acessar o perfil Profissional sem documentação válida serão permanentemente banidos.
                </p>
              </div>
            ),
          },          
        ].map((section, index) => (
          <section className="terms-section" key={index}>
            <h2
              className="terms-section-title"
              onClick={() => toggleSection(index)}
            >
              {section.title}
            </h2>
            <div
              className={`terms-section-content ${
                activeSections[index] ? "active" : ""
              }`}
            >
              {section.content}
            </div>
          </section>
        ))}
      </div>

      {scrollVisible && (
        <div className="terms-scroll-top" onClick={handleScrollTop}>
          ↑
        </div>
      )}

      <div className="terms-agreement">
        <div className="terms-checkbox-wrapper">
          <div
            className={`terms-custom-checkbox ${checked ? "checked" : ""}`}
            onClick={handleCheckboxClick}
          ></div>
          <label htmlFor="termsCheckbox">
            Li e concordo com os termos e regras de uso
          </label>
        </div>
        <button
          className={`terms-agree-button ${checked ? "active" : ""}`}
          onClick={handleConfirmClick}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}

export default Terms;
