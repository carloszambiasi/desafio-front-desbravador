import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedUsername = username.trim();

    if (!normalizedUsername) {
      return;
    }

    navigate(`/user/${encodeURIComponent(normalizedUsername)}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">GitHub username</label>

      <input
        id="username"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Ex: carloszambiasi"
      />

      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchForm;