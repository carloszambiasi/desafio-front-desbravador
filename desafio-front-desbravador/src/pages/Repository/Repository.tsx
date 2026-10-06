import { Link, useParams } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';

import { useGithubRepository } from '../../hooks/useGithubRepository';

function Repository() {
  const { owner, repo } = useParams();

  const {
    repository,
    loading,
    error,
  } = useGithubRepository(
    owner ?? '',
    repo ?? '',
  );

  if (!owner || !repo) {
    return (
      <main className="container py-5">
        <ErrorMessage message="Repositório não informado." />
      </main>
    );
  }

  if (loading) {
    return (
      <main className="container py-5">
        <Loading message="Carregando repositório..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-5">
        <ErrorMessage message={error} />
      </main>
    );
  }

  if (!repository) {
    return null;
  }

  const updatedAt = new Date(
    repository.updated_at,
  ).toLocaleDateString('pt-BR');

  const createdAt = new Date(
    repository.created_at,
  ).toLocaleDateString('pt-BR');

  return (
    <main className="container py-5">
      <Link
        to={`/user/${repository.owner.login}`}
        className="btn btn-outline-secondary mb-4"
      >
        ← Voltar para o usuário
      </Link>

      <article className="card shadow-sm">
        <div className="card-body p-4">
          <h1 className="mb-3">
            {repository.name}
          </h1>

          <p className="lead text-secondary">
            {repository.description ??
              'Sem descrição.'}
          </p>

          <hr />

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <strong>Proprietário</strong>
              <div>
                {repository.owner.login}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <strong>Linguagem</strong>
              <div>
                {repository.language ??
                  'Não informada'}
              </div>
            </div>

            <div className="col-6 col-md-3">
              <strong>Estrelas</strong>
              <div>
                {repository.stargazers_count}
              </div>
            </div>

            <div className="col-6 col-md-3">
              <strong>Forks</strong>
              <div>
                {repository.forks_count}
              </div>
            </div>

            <div className="col-6 col-md-3">
              <strong>Watchers</strong>
              <div>
                {repository.watchers_count}
              </div>
            </div>

            <div className="col-6 col-md-3">
              <strong>Issues abertas</strong>
              <div>
                {repository.open_issues_count}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <strong>Branch padrão</strong>
              <div>
                {repository.default_branch}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <strong>Visibilidade</strong>
              <div>
                {repository.visibility}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <strong>Criado em</strong>
              <div>{createdAt}</div>
            </div>

            <div className="col-12 col-md-6">
              <strong>Atualizado em</strong>
              <div>{updatedAt}</div>
            </div>
          </div>

          <a
            href={repository.html_url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark mt-4"
          >
            Ver repositório no GitHub
          </a>
        </div>
      </article>
    </main>
  );
}

export default Repository;