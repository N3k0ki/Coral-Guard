import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './term.css';
import logo from '../../assents/logo.svg';

export function Terms() {
    const [isChecked, setIsChecked] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleContinue = (e) => {
        e.preventDefault();
        if (isChecked) {
            navigate('/inicio'); // Substitua com a página de destino desejada
        } else {
            setShowError(true);
        }
    };

    return (
        <div className="terms-body">
            <header className="header-section">
                <div className="header-content">
                    <img src={logo} alt="Imagem do Header" className="header-image" />
                    <p className="header-text">Coral Guard</p>
                </div>
            </header>

            <div className="divider-line"></div>
            <section className="terms">
                <p className="terms-title">Regras e Instruções</p>
                <p className="terms-subtitle">Cadastro e Perfil de Usuário</p>

                <div className="term-container">
                    <p className="term-highlight">Cargos Disponíveis</p>
                    <p className="term-text">
                        Existem dois tipos de perfis no CoralGuard: <span className="term-role">Turista</span> e <span className="term-role">Profissional</span>.
                    </p>
                </div>

                <div className="term_left">
                    <p className="term_left_text"><span className="term-role">Turista:</span> Para qualquer pessoa interessada em aprender e contribuir com a preservação dos corais.</p>
                    <p className="term_left_text"><span className="term-role">Profissional:</span> Este perfil é reservado para aqueles que comprovarem qualificação na área de mergulho ou biologia marinha. Documentação legal e registrada é exigida e será analisada antes da aprovação.</p>
                </div>

                <div className="term-container">
                    <p className="term-text">Mantenha seus dados atualizados, especialmente para o perfil Profissional, já que isso garante a veracidade e segurança das informações enviadas.</p>
                </div>

                <div className="term-container">
                    <p className="terms-subtitle">Uso do Aplicativo e Mapeamento dos Corais</p>
                    <p className="term-highlight">Propósito do Aplicativo</p>
                    <p className="term-text">
                        Nosso foco é a conscientização e o turismo ecológico, incentivando usuários a aprenderem sobre corais e a identificarem sinais de branqueamento, contribuindo para um monitoramento comunitário.
                    </p>
                </div>

                <div className="term-container">
                    <p className="term-highlight">Mapeamento Responsável</p>
                    <p className="term-text">
                        Qualquer dado enviado deve ser feito de maneira cuidadosa e com responsabilidade. Evite interagir diretamente com os corais para garantir que não sejam danificados.
                    </p>
                </div>

                <div className="term-container">
                    <p className="term-highlight">Geolocalização e Precisão de Dados</p>
                    <p className="term-text">
                        Ao capturar dados, verifique se a localização e a descrição são precisas. Essa precisão é essencial para análises científicas e acompanhamento do estado dos recifes.
                    </p>
                </div>

                <div className="term-container">
                    <p className="terms-subtitle">Diretrizes de Envio de Dados</p>
                    <p className="term-highlight">Relatório de Observações</p>
                    <p className="term-text">
                        Ao avistar corais em condição de branqueamento ou qualquer outra alteração, use o guia visual do aplicativo para descrever corretamente a condição observada.
                    </p>
                </div>

                <div className="term-container">
                    <p className="term-highlight">Imagens e Descrições</p>
                    <p className="term-text">
                        É obrigatório que qualquer relatório seja acompanhado de uma imagem nítida e uma descrição breve. Evite o envio de imagens duplicadas ou irrelevantes, pois isso compromete a qualidade dos dados.
                    </p>
                </div>

                <div className="term-container">
                    <p className="term-highlight">Respeito à Vida Marinha</p>
                    <p className="term-text">
                        Não toque nos corais ou na vida marinha ao registrar informações. Contribua para o bem-estar dos ecossistemas mantendo uma distância segura.
                    </p>
                </div>

                <div className="term-container">
                    <p className="terms-subtitle">Interação com Outros Usuários</p>
                    <p className="term-highlight">Fóruns e Discussões</p>
                    <p className="term-text">
                        Seja respeitoso em todas as interações dentro dos fóruns e grupos de discussão. Evite linguagem ofensiva ou debates que possam desviar do propósito educacional e colaborativo da plataforma.
                    </p>
                </div>

                <div className="term-container">
                    <p className="term-highlight">Compartilhamento de Experiências</p>
                    <p className="term-text">
                        Incentivamos o compartilhamento de experiências e conhecimentos. Evite espalhar informações não verificadas ou falsas que possam gerar confusão ou alarmismo.
                    </p>
                </div>

                <div className="term-container">
                    <p className="terms-subtitle">Educação e Conscientização</p>
                    <p className="term-text">
                        Antes de explorar o aplicativo, aproveite nossos módulos educativos sobre corais. Estes incluem informações sobre o que causa o branqueamento dos corais, a importância dos recifes para o ecossistema e como agir de forma sustentável.
                    </p>
                </div>

                <div className="term-container">
                    <p className="terms-subtitle">Privacidade e Segurança dos Dados</p>
                    <p className="term-highlight">Uso Responsável das Informações</p>
                    <p className="term-text">
                        Os dados compartilhados são valiosos para a conservação dos recifes. Não compartilhe informações de outros usuários ou dados coletados fora da plataforma sem permissão.
                    </p>
                </div>

                <div className="term-container">
                    <p className="terms-subtitle">Segurança de Dados</p>
                    <p className="term-text">
                        O CoralGuard garante um ambiente seguro para o armazenamento e tratamento dos dados. Siga as recomendações de privacidade e evite expor informações sensíveis.
                    </p>
                </div>

                <div className="term-container">
                    <p className="terms-subtitle">Penalidades</p>
                    <p className="term-highlight">Violação das Regras</p>
                    <p className="term-text">
                        Qualquer usuário que violar as regras poderá ser advertido ou banido da plataforma.
                    </p>
                </div>

                <div className="term-container">
                    <p className="term-highlight">Falsificação de Informações para Perfil Profissional</p>
                    <p className="term-text">
                        Usuários que tentarem acessar o perfil Profissional sem documentação válida serão permanentemente banidos.
                    </p>
                </div>

                <div className="term-container checkbox-container">
                    <input
                        type="checkbox"
                        id="box"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="box" className="term-label">
                        Li e estou de acordo com as regras e termos de uso
                    </label>
                </div>

                {showError && (
                    <div className="error-container">
                        <p className="error-message">É necessário concordar com os termos acima para continuar.</p>
                    </div>
                )}

                <div className="continue-container">
                    <a
                        href="#"
                        onClick={handleContinue}
                        className="continue-link"
                        style={{
                            backgroundColor: 'orange',
                            borderRadius: '16px',
                            textAlign: 'center',
                            display: 'block',
                            color: 'white',
                            padding: '10px',
                            width: '100px',
                            margin: '0 auto'
                        }}
                    >
                        Continuar
                    </a>
                </div>
            </section>

            <footer className="footer-section">
                <p className="footer-text">© 2024 Coral Guard. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
