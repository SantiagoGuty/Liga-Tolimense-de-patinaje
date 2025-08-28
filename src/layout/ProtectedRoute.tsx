// src/layout/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useEffect, useState, ReactNode } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';

type Props = { children: ReactNode };

export default function ProtectedRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async () => {
      try { await getCurrentUser(); setOk(true); }
      catch { setOk(false); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return null;                // show a spinner if you want
  return ok ? <>{children}</> : <Navigate to="/iniciasesion" replace />;
}
