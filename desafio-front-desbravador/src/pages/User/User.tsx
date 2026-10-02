import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import RepositoryList from '../../components/RepositoryList/RepositoryList';
import { useGithubRepositories } from '../../hooks/useGithubRepositories';
import { useGithubUser } from '../../hooks/useGithubUser';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';

type SortOption =
  | 'stars-desc'
  | 'stars-asc'
  | 'name-asc'
  | 'name-desc';

function User() {
  const { username } = useParams();

  const [sortOption, setSortOption] =
    useState<SortOption>('stars-desc');

  const {
    user,
    loading,
    error,
  } = useGithubUser(username ?? '');

  const {
    repositories,
    loading: repositoriesLoading,
    error: repositoriesError,
  } = useGithubRepositories(username ?? '');

  const sortedRepositories = useMemo(() => {
    const repositoriesCopy = [...repositories];

    switch (sortOption) {
      case 'stars-asc':
        return repositoriesCopy.sort(
          (a, b) => a.stargazers_count - b.stargazers_count,
        );

      case 'name-asc':
        return repositoriesCopy.sort((a, b) =>
          a.name.localeCompare(b.name),
        );

      case 'name-desc':
        return repositoriesCopy.sort((a, b) =>
          b.name.localeCompare(a.name),
        );

      case 'stars-desc':
      default:
        return repositoriesCopy.sort(
          (a, b) => b.stargazers_count - a.stargazers_count,
        );
    }
  }, [repositories, sortOption]);

  if (!username) {
    return <p>Usuário não informado.</p>;
  }

  if (loading) {
    return <Loading message="Carregando usuário..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!user) {
    return <p>Usuário não encontrado.</p>;
  }

  return (
    <main>
      <img
        src={user.avatar_url}
        alt={`Avatar de ${user.login}`}
        width="120"
      />

      <h1>{user.name ?? user.login}</h1>

      <p>@{user.login}</p>

      <p>{user.bio ?? 'Bio não informada.'}</p>

      <p>Seguidores: {user.followers}</p>

      <p>Seguindo: {user.following}</p>

      <p>Repositórios públicos: {user.public_repos}</p>

      <h2>Repositórios</h2>

      {repositoriesLoading && (
        <Loading message="Carregando repositórios..." />
      )}

      {repositoriesError && (
        <ErrorMessage message={repositoriesError} />
      )}

      {!repositoriesLoading && !repositoriesError && (
        <>
          <label htmlFor="repository-sort">
            Ordenar por:
          </label>

          <select
            id="repository-sort"
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value as SortOption)
            }
          >
            <option value="stars-desc">Mais estrelas</option>
            <option value="stars-asc">Menos estrelas</option>
            <option value="name-asc">Nome A-Z</option>
            <option value="name-desc">Nome Z-A</option>
          </select>

          <RepositoryList repositories={sortedRepositories} />
        </>
      )}
    </main>
  );
}

export default User;