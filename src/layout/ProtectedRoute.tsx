// src/layout/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useEffect, useState, ReactNode } from 'react';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

type Props = {
  children: ReactNode;
  requiredGroups?: string[];     // e.g. ["Admins"] or ["Coaches"]
  redirectTo?: string;           // where to send if logged out
  forbiddenTo?: string;          // where to send if logged in but no permission
};

function getGroupsFromIdTokenPayload(payload: any): string[] {
  const groups = payload?.["cognito:groups"];
  if (Array.isArray(groups)) return groups;
  return [];
}

export default function ProtectedRoute({
  children,
  requiredGroups,
  redirectTo = "/iniciasesion",
  forbiddenTo = "/",
}: Props) {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await getCurrentUser();
        setIsAuthed(true);

        // If no group restriction, allow
        if (!requiredGroups || requiredGroups.length === 0) {
          setHasAccess(true);
          return;
        }

        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken;
        const payload = idToken?.payload;
        const userGroups = getGroupsFromIdTokenPayload(payload);

        const ok = requiredGroups.some(g => userGroups.includes(g));
        setHasAccess(ok);
      } catch {
        setIsAuthed(false);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [requiredGroups]);

  if (loading) return null;

  if (!isAuthed) return <Navigate to={redirectTo} replace />;
  if (!hasAccess) return <Navigate to={forbiddenTo} replace />;

  return <>{children}</>;
}
