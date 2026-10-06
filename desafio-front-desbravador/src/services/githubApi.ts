import axios from 'axios';

import type {
  GitHubRepository,
  GitHubUser,
} from '../types/github';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',

  headers: {
    Accept: 'application/vnd.github+json',
  },
});

export async function getUser(
  username: string,
): Promise<GitHubUser> {
  const response = await githubApi.get<GitHubUser>(
    `/users/${encodeURIComponent(username)}`,
  );

  return response.data;
}

export async function getUserRepositories(
  username: string,
): Promise<GitHubRepository[]> {
  const repositories: GitHubRepository[] = [];

  let page = 1;

  while (true) {
    const response =
      await githubApi.get<GitHubRepository[]>(
        `/users/${encodeURIComponent(username)}/repos`,
        {
          params: {
            per_page: 100,
            page,
          },
        },
      );

    repositories.push(...response.data);

    if (response.data.length < 100) {
      break;
    }

    page += 1;
  }

  return repositories;
}

export async function getRepository(
  owner: string,
  repository: string,
): Promise<GitHubRepository> {
  const response =
    await githubApi.get<GitHubRepository>(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`,
    );

  return response.data;
}

export function getGithubErrorMessage(
  error: unknown,
  notFoundMessage: string,
): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      return notFoundMessage;
    }

    if (
      error.response?.status === 403 ||
      error.response?.status === 429
    ) {
      return 'O limite de requisições da API do GitHub foi atingido. Tente novamente mais tarde.';
    }

    if (!error.response) {
      return 'Não foi possível conectar à API do GitHub.';
    }
  }

  return 'Ocorreu um erro inesperado. Tente novamente.';
}

export default githubApi;