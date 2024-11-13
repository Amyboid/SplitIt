import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Auth() {
  return (
    <>
    <main className="w-full h-screen">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="Register">Register</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="Register">
          Register Tab
        </TabsContent>
        <TabsContent value="Login">Login Tab</TabsContent>
      </Tabs>
      </main>
    </>
  );
}
