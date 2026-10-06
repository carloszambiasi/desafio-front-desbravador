import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
import RepositoryList from '../../components/RepositoryList/RepositoryList';

import { useGithubRepositories } from '../../hooks/useGithubRepositories';
import { useGithubUser } from '../../hooks/useGithubUser';

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
          (a, b) =>
            a.stargazers_count - b.stargazers_count,
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
          (a, b) =>
            b.stargazers_count - a.stargazers_count,
        );
    }
  }, [repositories, sortOption]);

  if (!username) {
    return (
      <main className="container py-5">
        <ErrorMessage message="Usuário não informado." />
      </main>
    );
  }

  if (loading) {
    return (
      <main className="container py-5">
        <Loading message="Carregando usuário..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-5">
        <ErrorMessage message={error} />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="container py-5">
      <section className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-auto text-center">
              <img
                src={user.avatar_url}
                alt={`Avatar de ${user.login}`}
                width="150"
                height="150"
                className="rounded-circle img-fluid"
              />
            </div>

            <div className="col">
              <h1 className="h2 mb-1">
                {user.name ?? user.login}
              </h1>

              <p className="text-secondary mb-3">
                @{user.login}
              </p>

              <p>
                {user.bio ?? 'Bio não informada.'}
              </p>

              {user.email && (
                <p className="mb-2">
                  <strong>E-mail:</strong>{' '}
                  {user.email}
                </p>
              )}

              <div className="d-flex flex-wrap gap-3">
                <span>
                  <strong>{user.followers}</strong>{' '}
                  seguidores
                </span>

                <span>
                  <strong>{user.following}</strong>{' '}
                  seguindo
                </span>

                <span>
                  <strong>{user.public_repos}</strong>{' '}
                  repositórios
                </span>
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-dark mt-3"
              >
                Ver perfil no GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
          <h2 className="h3 mb-0">
            Repositórios
          </h2>

          <div>
            <label
              htmlFor="repository-sort"
              className="form-label me-2 mb-0"
            >
              Ordenar por
            </label>

            <select
              id="repository-sort"
              className="form-select d-inline-block sort-select"
              value={sortOption}
              onChange={(event) =>
                setSortOption(
                  event.target.value as SortOption,
                )
              }
            >
              <option value="stars-desc">
                Mais estrelas
              </option>

              <option value="stars-asc">
                Menos estrelas
              </option>

              <option value="name-asc">
                Nome A-Z
              </option>

              <option value="name-desc">
                Nome Z-A
              </option>
            </select>
          </div>
        </div>

        {repositoriesLoading && (
          <Loading message="Carregando repositórios..." />
        )}

        {repositoriesError && (
          <ErrorMessage
            message={repositoriesError}
          />
        )}

        {!repositoriesLoading &&
          !repositoriesError && (
            <RepositoryList
              repositories={sortedRepositories}
            />
          )}
      </section>
    </main>
  );
}

export default User;