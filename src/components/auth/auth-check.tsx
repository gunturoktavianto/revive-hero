"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthCheckProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

// A component to handle auth redirects client-side
export function AuthCheck({ 
  children, 
  requireAuth = true, 
  redirectTo = requireAuth ? "/login" : "/dashboard" 
}: AuthCheckProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    // Skip redirect during loading to prevent flashes
    if (isLoading) return;

    // Redirect if not authenticated and auth is required
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
    }
    
    // Redirect if authenticated and accessing a public-only route
    if (!requireAuth && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isLoading, isAuthenticated, redirectTo, requireAuth, router]);

  // Show nothing while loading
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Show children only if authentication status matches requirements
  if ((requireAuth && isAuthenticated) || (!requireAuth && !isAuthenticated)) {
    return <>{children}</>;
  }

  // Return null if redirecting
  return null;
} 