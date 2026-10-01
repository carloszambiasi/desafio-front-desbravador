import { useEffect, useState } from 'react';

import { getUser } from '../services/githubApi';
import type { GitHubUser } from '../types/github';

interface UseGithubUserResult {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
}

export function useGithubUser(username: string): UseGithubUserResult {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError(null);

        const userData = await getUser(username);

        setUser(userData);
      } catch {
        setUser(null);
        setError('Não foi possível carregar o usuário.');
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [username]);

  return {
    user,
    loading,
    error,
  };
}