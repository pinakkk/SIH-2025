import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/lib/constants";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-b-2 border-primary-600 rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
}
