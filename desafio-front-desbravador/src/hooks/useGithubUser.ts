import { useEffect, useState } from 'react';

import {
  getGithubErrorMessage,
  getUser,
} from '../services/githubApi';

import type { GitHubUser } from '../types/github';

interface UseGithubUserResult {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
}

export function useGithubUser(
  username: string,
): UseGithubUserResult {
  const [user, setUser] =
    useState<GitHubUser | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadUser() {
      try {
        setLoading(true);
        setError(null);

        const userData = await getUser(username);

        if (!cancelled) {
          setUser(userData);
        }
      } catch (error) {
        if (!cancelled) {
          setUser(null);

          setError(
            getGithubErrorMessage(
              error,
              'Usuário não encontrado.',
            ),
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return {
    user,
    loading,
    error,
  };
}