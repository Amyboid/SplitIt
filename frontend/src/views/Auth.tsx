import { useHandleSignInCallback } from "@logto/react";
import { useLocation } from "wouter";


export default function Auth() {
  const [_location, setLocation] = useLocation();



  const { isLoading } = useHandleSignInCallback(() => {
    // Navigate to root path when finished
    setLocation("/dashboard");
  });

  // When it's working in progress
  if (isLoading) {
    return <div className="h-screen w-full grid place-items-center">Redirecting...</div>;
  }

  return null;
}
