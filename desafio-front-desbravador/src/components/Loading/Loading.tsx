interface LoadingProps {
  message?: string;
}

function Loading({
  message = 'Carregando...',
}: LoadingProps) {
  return (
    <div
      className="d-flex align-items-center gap-2 py-4"
      role="status"
      aria-live="polite"
    >
      <div
        className="spinner-border spinner-border-sm"
        aria-hidden="true"
      />

      <span>{message}</span>
    </div>
  );
}

export default Loading;