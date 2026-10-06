import { useEffect, useState } from 'react';

import {
  getGithubErrorMessage,
  getRepository,
} from '../services/githubApi';

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

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!owner || !repositoryName) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadRepository() {
      try {
        setLoading(true);
        setError(null);

        const repositoryData = await getRepository(
          owner,
          repositoryName,
        );

        if (!cancelled) {
          setRepository(repositoryData);
        }
      } catch (error) {
        if (!cancelled) {
          setRepository(null);

          setError(
            getGithubErrorMessage(
              error,
              'Repositório não encontrado.',
            ),
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRepository();

    return () => {
      cancelled = true;
    };
  }, [owner, repositoryName]);

  return {
    repository,
    loading,
    error,
  };
}