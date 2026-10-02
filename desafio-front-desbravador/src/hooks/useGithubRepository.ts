import { useEffect, useState } from 'react';

import { getRepository } from '../services/githubApi';
import type { GitHubRepository } from '../types/github';

interface UseGithubRepositoryResult {
  repository: GitHubRepository | null;
  loading: boolean;
  error: string | null;
}

export function useGithubRepository(
  owner: string,
  repositoryName: string,
): UseGithubRepositoryResult {
  const [repository, setRepository] =
    useState<GitHubRepository | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRepository() {
      try {
        setLoading(true);
        setError(null);

        const repositoryData = await getRepository(
          owner,
          repositoryName,
        );

        setRepository(repositoryData);
      } catch {
        setRepository(null);
        setError('Não foi possível carregar o repositório.');
      } finally {
        setLoading(false);
      }
    }

    loadRepository();
  }, [owner, repositoryName]);

  return {
    repository,
    loading,
    error,
  };
}