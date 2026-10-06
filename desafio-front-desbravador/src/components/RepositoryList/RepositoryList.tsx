import RepositoryCard from '../RepositoryCard/RepositoryCard';

import type { GitHubRepository } from '../../types/github';

interface RepositoryListProps {
  repositories: GitHubRepository[];
}

function RepositoryList({
  repositories,
}: RepositoryListProps) {
  if (repositories.length === 0) {
    return (
      <div className="alert alert-secondary">
        Nenhum repositório encontrado.
      </div>
    );
  }

  return (
    <section className="row g-3">
      {repositories.map((repository) => (
        <div
          key={repository.id}
          className="col-12 col-lg-6"
        >
          <RepositoryCard repository={repository} />
        </div>
      ))}
    </section>
  );
}

export default RepositoryList;