import { Link } from 'react-router-dom';

import type { GitHubRepository } from '../../types/github';

interface RepositoryCardProps {
  repository: GitHubRepository;
}

function RepositoryCard({
  repository,
}: RepositoryCardProps) {
  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h2 className="h5 card-title">
          <Link
            to={`/repository/${repository.owner.login}/${repository.name}`}
            className="text-decoration-none"
          >
            {repository.name}
          </Link>
        </h2>

        <p className="card-text text-secondary flex-grow-1">
          {repository.description ?? 'Sem descrição.'}
        </p>

        <div className="d-flex flex-wrap gap-3 small text-secondary">
          <span>
            ⭐ {repository.stargazers_count}
          </span>

          <span>
            Forks: {repository.forks_count}
          </span>

          <span>
            {repository.language ?? 'Linguagem não informada'}
          </span>
        </div>
      </div>
    </article>
  );
}

export default RepositoryCard;