import { useParams } from 'react-router-dom';

import { useGithubUser } from '../../hooks/useGithubUser';

function User() {
  const { username } = useParams();

  const {
    user,
    loading,
    error,
  } = useGithubUser(username ?? '');

  if (!username) {
    return <p>Usuário não informado.</p>;
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
    </main>
  );
}

export default User;