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


export default function Auth() {
  return (
    <>
    <main className="w-full h-screen flex items-center justify-center pb-20">
      <Tabs defaultValue="Register" className="w-[350px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Register">Register</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="Register">
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
        <TabsContent value="Login">
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
