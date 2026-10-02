import { Link, useParams } from 'react-router-dom';

import { useGithubRepository } from '../../hooks/useGithubRepository';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';

function Repository() {
  const { owner, repo } = useParams();

  const {
    repository,
    loading,
    error,
  } = useGithubRepository(owner ?? '', repo ?? '');

  if (!owner || !repo) {
    return <p>Repositório não informado.</p>;
  }

  if (loading) {
    return <Loading message="Carregando repositório..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!repository) {
    return <p>Repositório não encontrado.</p>;
  }

  return (
    <main>
      <Link to={`/user/${repository.owner.login}`}>
        ← Voltar para o usuário
      </Link>

      <h1>{repository.name}</h1>

      <p>{repository.description ?? 'Sem descrição.'}</p>

      <p>Proprietário: {repository.owner.login}</p>

      <p>
        Linguagem: {repository.language ?? 'Não informada'}
      </p>

      <p>⭐ Estrelas: {repository.stargazers_count}</p>

      <p>Forks: {repository.forks_count}</p>

      <p>Watchers: {repository.watchers_count}</p>

      <p>Issues abertas: {repository.open_issues_count}</p>

      <p>Branch padrão: {repository.default_branch}</p>

      <p>Visibilidade: {repository.visibility}</p>

      <p>
        Atualizado em:{' '}
        {new Date(repository.updated_at).toLocaleDateString('pt-BR')}
      </p>

      <a
        href={repository.html_url}
        target="_blank"
        rel="noreferrer"
      >
        Ver repositório no GitHub
      </a>
    </main>
  );
}

export default Repository;