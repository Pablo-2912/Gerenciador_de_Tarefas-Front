// Header.tsx
import './Header.css'
import headerImage from '../../../../assets/header.png' // ajuste o caminho conforme a estrutura real

const Header = () => {
  return (
    <header className="header" style={{ backgroundImage: `url(${headerImage})` }}>
      <div className="header-content">
        <h1>
          <span className="titulo-principal">Bem-vindo ao seu</span><br />
          <span className="titulo-destaque">Gerenciador de Tarefas</span>
        </h1>
        {/* <p>
          <span className="descricao">Desenvolvido para atender suas necessidades de </span>
          <span className="descricao-destaque">gerenciamento eficiente</span>
        </p> */}
      </div>
    </header>
  )
}

export default Header
