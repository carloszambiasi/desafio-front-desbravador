import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="container py-5 text-center">
      <div className="py-5">
        <h1 className="display-1 fw-bold">
          404
        </h1>

        <h2 className="h3">
          Página não encontrada
        </h2>

        <p className="text-secondary">
          A página que você tentou acessar não existe.
        </p>

        <Link
          to="/"
          className="btn btn-primary"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </main>
  );
}

export default NotFound;