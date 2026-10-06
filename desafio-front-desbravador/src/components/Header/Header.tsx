import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-dark">
      <nav className="container py-3">
        <Link
          to="/"
          className="text-white text-decoration-none fw-bold fs-4"
        >
          GitHub Repository Explorer
        </Link>
      </nav>
    </header>
  );
}

export default Header;