interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div role="alert">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;