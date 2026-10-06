import SearchForm from '../../components/SearchForm/SearchForm';

function Home() {
  return (
    <main className="container py-5">
      <section className="mx-auto home-search">
        <div className="text-center mb-4">
          <h1 className="display-5 fw-bold">
            Encontre repositórios no GitHub
          </h1>

          <p className="lead text-secondary">
            Busque um usuário para visualizar seus
            dados e repositórios mais populares.
          </p>
        </div>

        <SearchForm />
      </section>
    </main>
  );
}

export default Home;