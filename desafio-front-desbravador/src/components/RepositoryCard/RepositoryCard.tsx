import { Link } from 'react-router-dom';

import type { GitHubRepository } from '../../types/github';

interface RepositoryCardProps {
  repository: GitHubRepository;
}

function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <article>
      <h2>
        <Link
          to={`/repository/${repository.owner.login}/${repository.name}`}
        >
          {repository.name}
        </Link>
      </h2>

      <p>{repository.description ?? 'Sem descrição.'}</p>

      <p>⭐ {repository.stargazers_count}</p>

      <p>Linguagem: {repository.language ?? 'Não informada'}</p>

      <p>Forks: {repository.forks_count}</p>
    </article>
  );
}

export default RepositoryCard;