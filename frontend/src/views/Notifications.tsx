import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { userAtom } from "@/lib/user";
import { useLogto } from "@logto/react";
import { useAtom } from "jotai";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Notifications() {
  const { isAuthenticated } = useLogto();
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useAtom(userAtom)
  const [, setLocation] = useLocation();
  useEffect(() => {
    fetch(`/api/notifications/${user?.username}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setNotifications(data)
        console.log("sujit: ", data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error); // Handle any errors
      });
  }, [])

  // mock data


  if (!isAuthenticated) setLocation("/");

  return (
    <>
      <div className="flex items-center mt-4 mx-4">
        <span className="inline mt-[.37rem] mr-auto"><Link to="/dashboard"><ChevronLeft /></Link></span>
        <TypographyH3 className="inline -ml-6 mr-auto">
          Notifications
        </TypographyH3>
      </div>
      <div className="grid gap-4 my-8 mx-4">
        {notifications.map((n: any) => (

          <Card>
            <CardHeader className="pt-3 pb-3">
              <CardDescription>{n.Type}</CardDescription>
            </CardHeader>
            <CardContent>
              {n.Title.split("#")[0]}
              {
                n.Type === "invitation" ?
                  <>
                    <Button onClick={() => fetch(`/api/invitation/accept/${n.Title.split("#")[1]}`)}>
                      Accept
                    </Button>
                    <Button onClick={() => fetch(`/api/invitation/reject/${n.Title.split("#")[1]}`)}>
                      Reject
                    </Button>
                  </> : ""
              }
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
