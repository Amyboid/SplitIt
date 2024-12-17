import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { RedirectURI } from "@/lib/const";
import { useLogto } from "@logto/react";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const { signIn, isAuthenticated } = useLogto();
  const [_location, setLocation] = useLocation();

  if (isAuthenticated) setLocation("/dashboard");
  return (
    <div>
      <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(2) rotate(25)'><rect x='0' y='0' width='100%' height='100%' fill='#00000000'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='1' stroke='hsla(47,80.9%,61%,1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)'/></svg>
      <img src="/homepage-bg.png" alt="money animation" width={240} className="mt-16 mx-auto rounded-2xl" />
      <TypographyH3 className="font-bold mt-24 z-30 absolute text-4xl w-full p-4 text-center">Splitting,<br />Made Simple.</TypographyH3>
      <div id='div-after-pattern' className="grid place-items-center h-36 w-full absolute bottom-10 z-20">
        <Button onClick={() => signIn(RedirectURI)}>
            Get Started <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

//   isAuthenticated ? (
//   <button onClick={() => signOut("http://localhost:5173/")}>Sign Out</button>
// ) : (
//   <button onClick={() => signIn("http://localhost:5173/auth/")}>Sign In</button>
