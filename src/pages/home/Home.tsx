// src/pages/Home.tsx
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleAvancar = () => {
    navigate('/Task');
  };

return (
  <>
    <div className='home-container'>
      <div className="home-content">
        <h2 className="home-title">Projeto desenvolvido para o teste técnico da data system</h2>

        <p>
          Este sistema foi construído com <b>C#</b> (.NET Core) no backend, utilizando o <b>Entity Framework</b> para persistência dos dados, e <b>React com JavaScript</b> no frontend.
        </p>

        <p>
          Ele permite o gerenciamento de tarefas com funcionalidades completas de <b>CRUD</b> (Criar, Ler, Atualizar e Excluir), além de filtros por <b>status</b> e validações de regras de negócio.
        </p>

        <p>
          As tarefas são armazenadas localmente em um banco de dados <b>SQL Server</b>. Para o funcionamento completo, o backend precisa estar conectado ao banco e executando localmente.
        </p>

        <p>
          A estrutura do projeto segue a arquitetura em camadas baseada em <b>DDD</b> (Domain, Application, Infrastructure e Presentation), com aplicação de princípios como <b>SOLID</b>, <b>Clean Code</b> e boas práticas de desenvolvimento.
        </p>

        <p>
          Também foi incluído um arquivo <b>Dockerfile</b>, permitindo o download e execução da imagem do servidor de forma prática e padronizada.
        </p>
      </div>

      <button onClick={handleAvancar}>
        Avançar <span className="home-arrow">→</span>
      </button>

      <div className='home-space'></div>
    </div>
  </>
);

};

export default Home;
