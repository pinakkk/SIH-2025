import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { lazy, Suspense } from "react";

const NewsAndUpdates = lazy(() => import("../pages/NewsAndUpdatesPage"));

export function NewsAndUpdatesRoute() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-b-2 border-primary-600 rounded-full" />
          </div>
        }
      >
        <NewsAndUpdates />
      </Suspense>
    </div>
  );
}