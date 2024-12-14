import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { userAtom } from "@/lib/user";
import { useLogto } from "@logto/react";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { format } from "date-fns";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { ChevronLeft } from "lucide-react";



export default function Expenses() {
  const { isAuthenticated } = useLogto();
  const [debt, setDebt] = useState()
  const [expenses, setExpenses] = useState([{
    "ExpenseId": 1,
    "GroupId": 1,
    "ExpenseTitle": "Loading...",
    "Date": "2000-01-01T18:30:00.000Z",
    "Category": "entertainment",
    "Purpose": "loading...",
    "Amount": 0,
    "DivisionType": "percentage"
  }]);
  const [user] = useAtom(userAtom);
  const [, setLocation] = useLocation();

  const GroupId: string = useParams().id!;

  useEffect(() => {
    fetch(`/api/expenses/${GroupId + "/" + user?.username}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setExpenses(data.expenses);
        setDebt(data.userDebt);
        console.log("[api] expenses:", data);
      })
      .catch(error => {
        console.error('[api] error fetching expenses:', error); // Handle any errors
      });
  }, []);

  if (!isAuthenticated) setLocation("/");

  return (<>
    <div className="flex items-center mt-4 mx-4">
      <span className="inline mt-[.37rem] mr-auto" onClick={() => history.back()}><ChevronLeft /></span>
      <TypographyH3 className="inline -ml-6 mr-auto">
        Expenses
      </TypographyH3>
    </div>
    <div className="w-screen">
      <TypographyH3 className="text-center mt-6 text-red-500">
        {debt}
      </TypographyH3>
      <div className="text-center">total debt</div>
    </div>
    <div className="grid gap-4 my-8 mx-4">
      {expenses.map((e: any, index) => (
        <Card key={index}>
          <CardHeader className="pt-3 pb-3">
            <CardDescription className="flex">
              {e.ExpenseTitle}
              <span className="inline-block ml-auto">
                {format(new Date(e.Date), "do MMM yyyy")}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex">
              <div className="w-3/4">
                {e.Purpose}
              </div>
              <div className="w-1/4 grid place-items-center">
                {e.Amount}
              </div>
            </div>
          </CardContent>
        </Card>))
      }
    </div>
  </>
  )
}
