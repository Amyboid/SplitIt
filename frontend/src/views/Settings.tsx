import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { PSRedirectURI } from "@/lib/const";
import { useLogto } from "@logto/react";
import { ChevronLeft, CircleUser, Languages, LogOut, Scale } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Settings() {
  const { isAuthenticated, signOut } = useLogto();
  const [, setLocation ] = useLocation();

  
  if (!isAuthenticated) setLocation("/");

  return (
    <>
      <div className="flex items-center mt-4 mx-4">
        <span className="mt-[.37rem] mr-auto"><Link to="/dashboard"><ChevronLeft /></Link></span>
        <TypographyH3 className="-ml-6 mr-auto">
          Settings
        </TypographyH3>
      </div>
      <div className="grid gap-4 mt-8 mx-4">
        <Card>
          <CardHeader className="p-4 flex flex-row items-center">
            <CircleUser size={20} className="mt-1 mr-4" /> <CardTitle className=" text-lg">Account</CardTitle>
          </CardHeader>
        </Card>
        <Card onClick={async () => await signOut(PSRedirectURI)}>
          <CardHeader className="p-4 flex flex-row items-center">
            <LogOut size={20} className="mt-1 mr-4" /> <CardTitle className=" text-lg">Log Out</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4 flex flex-row items-center">
            <ModeToggle /> <CardTitle className=" text-lg ml-9 z-10">Theme</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4 flex flex-row items-center">
            <Languages size={20} className="mt-1 mr-4" /> <CardTitle className=" text-lg">Language</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4 flex flex-row items-center">
            <Scale size={20} className="mt-1 mr-4" /> <CardTitle className=" text-lg">Licences</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </>
  )
}
