import { useHandleSignInCallback, useLogto } from "@logto/react";
import { useLocation } from "wouter";

export default function Auth() {
  const [_location, setLocation] = useLocation();
  const { getIdTokenClaims } = useLogto();

  const { isLoading } = useHandleSignInCallback(() => {
    (async () => {
      const claims = await getIdTokenClaims();
      const isNew = (
        await (await fetch(`/api/isnewuser/${claims?.sub}`)).json()
      ).new;

      if (isNew) {
        setLocation("/onboarding");
      } else {
        setLocation("/dashboard");
      }
    })();
  });

  if (isLoading) {
    return (
      <div className="h-screen w-full grid place-items-center">
        Redirecting...
      </div>
    );
  }

  return null;
}
