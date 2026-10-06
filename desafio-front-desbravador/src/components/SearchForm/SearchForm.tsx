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

    navigate(
      `/user/${encodeURIComponent(normalizedUsername)}`,
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="row g-2"
    >
      <div className="col-12 col-md">
        <label
          htmlFor="username"
          className="visually-hidden"
        >
          Usuário do GitHub
        </label>

        <input
          id="username"
          type="text"
          className="form-control form-control-lg"
          placeholder="Digite um usuário do GitHub"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
        />
      </div>

      <div className="col-12 col-md-auto">
        <button
          type="submit"
          className="btn btn-primary btn-lg w-100"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}

export default SearchForm;