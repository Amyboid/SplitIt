import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { useLogto } from "@logto/react";
import { useLocation } from "wouter";

export default function Home() {
  const { signIn, isAuthenticated } = useLogto();
  const [_location, setLocation] = useLocation();

  if (isAuthenticated) setLocation("/dashboard");
  return (
    <>
      <TypographyH3 className="text-white z-30 absolute text-4xl w-full p-4">splitit</TypographyH3>
      <img src="/d2.jpg" alt="" className="absolute top-0 z-10"/>
      <div className="grid place-items-center rounded-t-[3.5rem] bg-white h-36 w-full absolute bottom-0 z-20">
        <Button onClick={() => signIn("http://localhost:5173/auth/")} className="bg-black text-white">
            Get Started
        </Button>
      </div>
    </>
  );
}

//   isAuthenticated ? (
//   <button onClick={() => signOut("http://localhost:5173/")}>Sign Out</button>
// ) : (
//   <button onClick={() => signIn("http://localhost:5173/auth/")}>Sign In</button>
