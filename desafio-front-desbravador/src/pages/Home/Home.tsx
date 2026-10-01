import SearchForm from '../../components/SearchForm/SearchForm';

function Home() {
  return (
    <main>
      <h1>GitHub Repository Explorer</h1>

      <p>Busque um usuário do GitHub para visualizar seus repositórios.</p>

      <SearchForm />
    </main>
  );
}

export default Home;