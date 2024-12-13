import { useHandleSignInCallback, useLogto } from "@logto/react";
import { useLocation } from "wouter";

export default function Auth() {
  const [, setLocation] = useLocation();
  const { getIdTokenClaims } = useLogto();

  const { isLoading } = useHandleSignInCallback(() => {
    (async () => {
      const claims = await getIdTokenClaims();
      const isNew = (await (await fetch(`/api/isnewuser/${claims?.sub}`)).json()).new;

      console.log("isNew:", isNew);
      console.log("before onboarding:", claims);

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
        <div className="grid place-items-center">
          <div className="loader"></div>
          Setting things up...
        </div>
      </div>
    );
  }

  return null;
}
