import axios from 'axios';

import type { GitHubRepository, GitHubUser } from '../types/github';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
  },
});

export async function getUser(username: string): Promise<GitHubUser> {
  const response = await githubApi.get<GitHubUser>(
    `/users/${encodeURIComponent(username)}`,
  );

  return response.data;
}

export async function getUserRepositories(
  username: string,
): Promise<GitHubRepository[]> {
  const response = await githubApi.get<GitHubRepository[]>(
    `/users/${encodeURIComponent(username)}/repos`,
    {
      params: {
        per_page: 100,
      },
    },
  );

  return response.data;
}

export async function getRepository(
  owner: string,
  repository: string,
): Promise<GitHubRepository> {
  const response = await githubApi.get<GitHubRepository>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`,
  );

  return response.data;
}

export default githubApi;