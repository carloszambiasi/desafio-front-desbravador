interface LoadingProps {
  message?: string;
}

function Loading({ message = 'Carregando...' }: LoadingProps) {
  return (
    <div role="status" aria-live="polite">
      <p>{message}</p>
    </div>
  );
}

export default Loading;