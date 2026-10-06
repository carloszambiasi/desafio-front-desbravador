import { useEffect, useState } from 'react';

import {
  getGithubErrorMessage,
  getUserRepositories,
} from '../services/githubApi';

import type { GitHubRepository } from '../types/github';

interface UseGithubRepositoriesResult {
  repositories: GitHubRepository[];
  loading: boolean;
  error: string | null;
}

export function useGithubRepositories(
  username: string,
): UseGithubRepositoriesResult {
  const [repositories, setRepositories] =
    useState<GitHubRepository[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadRepositories() {
      try {
        setLoading(true);
        setError(null);

        const repositoriesData =
          await getUserRepositories(username);

        if (!cancelled) {
          setRepositories(repositoriesData);
        }
      } catch (error) {
        if (!cancelled) {
          setRepositories([]);

          setError(
            getGithubErrorMessage(
              error,
              'Não foi possível encontrar os repositórios.',
            ),
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRepositories();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return {
    repositories,
    loading,
    error,
  };
}