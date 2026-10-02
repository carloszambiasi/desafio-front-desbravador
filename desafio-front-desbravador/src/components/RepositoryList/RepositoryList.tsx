import RepositoryCard from '../RepositoryCard/RepositoryCard';
import type { GitHubRepository } from '../../types/github';

interface RepositoryListProps {
  repositories: GitHubRepository[];
}

function RepositoryList({ repositories }: RepositoryListProps) {
  if (repositories.length === 0) {
    return <p>Nenhum repositório encontrado.</p>;
  }

  return (
    <section>
      {repositories.map((repository) => (
        <RepositoryCard
          key={repository.id}
          repository={repository}
        />
      ))}
    </section>
  );
}

export default RepositoryList;