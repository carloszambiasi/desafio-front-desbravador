import { useEffect, useState } from 'react';

import { getUserRepositories } from '../services/githubApi';
import type { GitHubRepository } from '../types/github';

interface UseGithubRepositoriesResult {
  repositories: GitHubRepository[];
  loading: boolean;
  error: string | null;
}

export function useGithubRepositories(
  username: string,
): UseGithubRepositoriesResult {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRepositories() {
      try {
        setLoading(true);
        setError(null);

        const repositoriesData = await getUserRepositories(username);

        const sortedRepositories = [...repositoriesData].sort(
          (a, b) => b.stargazers_count - a.stargazers_count,
        );

        setRepositories(sortedRepositories);
      } catch {
        setRepositories([]);
        setError('Não foi possível carregar os repositórios.');
      } finally {
        setLoading(false);
      }
    }

    loadRepositories();
  }, [username]);

  return {
    repositories,
    loading,
    error,
  };
}