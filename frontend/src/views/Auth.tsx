import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { CustomRegister } from "@/components/ui/CustomRegister";
import { CustomLogin } from "@/components/ui/CustomLogin";
import { useRoute ,useLocation } from "wouter";



export default function Auth() {
  const [match,params]= useRoute("/auth/:path");
  const [_location,setLocation]  =useLocation();
  const defualtValue  = match?params?.path:"register"

  const handleTabChange = (path:string) => {
    setLocation(`/auth/${path}`)
  }
  
  return (
    <>
    <main className="w-full h-screen flex items-center justify-center pb-24">
      <Tabs defaultValue={defualtValue} className="w-[350px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register" onClick={()=>handleTabChange("register")}>Register</TabsTrigger>
          <TabsTrigger value="login" onClick={()=>handleTabChange("login")}>Login</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Create your account by giving details and click create account 
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <CustomRegister/>
          </CardContent>
        </Card>
        </TabsContent>
        <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Join with us to fill your information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <CustomLogin/>
          </CardContent>
        </Card>
        </TabsContent>
      </Tabs>
      </main>
    </>
  );
}
