// src/pages/ErrorPage.tsx
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  // Narrow the unknown to something we can read
  let title = 'Oops!';
  let message: string;

  if (isRouteErrorResponse(error)) {
    // This is a special React Router error response
    title = `${error.status} ${error.statusText}`;
    // error.data might have more info
    message = typeof error.data === 'string'
      ? error.data
      : JSON.stringify(error.data);
  } else if (error instanceof Error) {
    // A standard JS Error
    message = error.message;
  } else {
    // Fallback for anything else
    message = String(error);
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}
