import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { ChevronLeft, Pencil, Trash, Users } from "lucide-react";
import { Link, useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Input } from "@/components/ui/input";


export default function GroupSettings() {
  const [inputValue, setInputValue] = useState('');
  const groupname: string = useParams().name!;
  const [_, setLocation] = useLocation();
  const data = JSON.parse(localStorage.getItem("group")!)[groupname];
  console.log(data.groupmembers.length);

  if (data === undefined) {
    setLocation("/dashboard")
  }

  function handleDeleteGroup() {
    const data: any = JSON.parse(localStorage.getItem("group")!)
    console.log("db", data);
    delete data[groupname]
    localStorage.setItem("group", JSON.stringify({ ...data }))
    setLocation("/groups")
  }

  return (
    <>
      <div className="flex items-center mt-4 mx-4">
        <span className="mt-[.37rem] mr-auto"><Link to={`/group/${groupname}/details`}><ChevronLeft /></Link></span>
        <TypographyH3 className="-ml-6 mr-auto">
          Settings
        </TypographyH3>
      </div>
      <div className="grid gap-4 mt-8 mx-4">
        <Card>
          <CardHeader className="p-4 flex flex-row items-center">
            <Pencil size={20} className="mt-1 mr-4" /> <CardTitle className=" text-lg">Edit</CardTitle>
          </CardHeader>
        </Card>

        <Dialog>
          <DialogTrigger asChild>
            <Card>
              <CardHeader className="p-4 flex flex-row items-center">
                <Trash size={20} className="mt-1 mr-4 text-destructive" /> <CardTitle className=" text-lg text-destructive">Delete Group</CardTitle>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent className="w-[90vw] sm:max-w-md rounded-xl">
            <div className="text-sm font-semibold pb-2 border-b-2 border-secondary">
              Delete {groupname}
            </div>
            <DialogHeader>
              <DialogTitle>
                <div className="flex flex-col items-center gap-3">
                  {groupname}
                  <div className="flex items-center">
                    <Users className="mr-1 w-4 cursor-pointer" />
                    {data.groupmembers.length}
                  </div>
                </div>
              </DialogTitle>
              <DialogDescription>
                This will permanently delete "{groupname}" and all it's existing expenses.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 pt-3 border-t-2 border-secondary">
              <span className="text-sm">To confirm, type "{groupname}" in the box below</span>
              <Input type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="h-7"
              />

              <Button variant="destructive" disabled={inputValue !== groupname} className="border-b-2" onClick={handleDeleteGroup}>
                I want to delete this group
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </>
  )
}

