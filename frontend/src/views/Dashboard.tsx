import { useEffect } from "react";
import { useLogto } from "@logto/react";
import WavingHandSvg from "@/assets/waving_hand_color_default.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { Bell, Bolt, CalendarPlus, ChartLine, Mic, RefreshCcw, UserPlus, Users } from "lucide-react";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/user";
import { Link, useLocation } from "wouter";

export default function Dashboard() {
  const { isAuthenticated, fetchUserInfo } = useLogto();
  const [, setLocation] = useLocation();
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const userInfo = await fetchUserInfo();
        setUser(userInfo);
      }
    })();
  }, [fetchUserInfo, isAuthenticated]);

  if (!isAuthenticated) setLocation("/");

  return (
    <>
      <div className="flex mt-4 mx-4">
        <TypographyH3 className="inline">
          Hi,{" "}
          <span className="capitalize mr-2 gradiented-greet-text">
            {user?.name?.toLowerCase()}
          </span>
          <img
            src={WavingHandSvg}
            alt="waving hand emoji"
            className="inline w-8 ml-2 mb-1"
          />
        </TypographyH3>
        <Link to="/notification" className="inline ml-auto mr-4 self-center">
          <Bell size={20} />
        </Link>
        <Link to="/settings" className="inline self-center">
          <Bolt size={20} />
        </Link>
      </div>
      <Card className="mt-10 mx-auto w-[90%] overflow-hidden">
        <div className="notification-card-background">
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Notification
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-5 pl-3">
            Automate your savings! Set aside a small percentage of your income
            each month.
          </CardContent>
        </div>
      </Card>
      <div className="mt-10 mx-auto w-[90%]">
        <div className="grid grid-cols-2 gap-4 my-8">
          <Card className="border-red-600">
            <CardHeader>
              <CardTitle>₹ 500000</CardTitle>
              <CardDescription className="text-red-600">debt</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-green-600">
            <CardHeader>
              <CardTitle>₹ 5000</CardTitle>
              <CardDescription className="text-green-600">
                credit
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <h1 className="mb-5 text-xl">Quick Actions</h1>
        <div className="grid grid-cols-4 grid-rows-4 gap-4">
          <Button onClick={() => setLocation("/add/group")} variant="secondary" className="h-auto col-span-1 row-span-1">
            <UserPlus />
          </Button>
          <Button onClick={() => setLocation("/groups")} variant="outline" className="h-auto col-span-3 row-span-1">
            <Users className="mr-2" /> View Existing Groups
          </Button>
          <Button onClick={() => setLocation("/")} variant="outline" className="h-auto col-span-2 row-span-2 flex-wrap">
            <CalendarPlus className="mb-[-40px]" />
            <div>Recurring Payments</div>
          </Button>
          <Button onClick={() => setLocation("/")} variant="secondary" className="h-16 col-span-1">
            <ChartLine />
          </Button>
          <Button onClick={() => setLocation("/")} variant="secondary" className="h-16 col-span-1">
            <RefreshCcw />
          </Button>
          <Button onClick={() => setLocation("/")} variant="secondary" className="h-16 col-span-2">
            Export Data
          </Button>
          <Button onClick={() => setLocation("/")} variant="secondary" className="h-16 col-span-4">
            <Mic className="mr-2" /> Add Expense With Voice Input
          </Button>
        </div>
      </div>
    </>
  );
}
