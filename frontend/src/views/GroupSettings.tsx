import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { ChevronLeft, LogOut, Pencil, Trash, Users } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { currentGroupAtom } from "@/lib/states";
import { useAtom } from "jotai";
import GroupEditForm from "@/components/group-edit-form";
import { userAtom } from "@/lib/user";


export default function GroupSettings() {
  const [admin, setAdmin] = useState(false);
  const [currentGroup,] = useAtom(currentGroupAtom);
  const [inputValue, setInputValue] = useState('');
  const GroupId: string = useParams().id!;
  const groupname = currentGroup?.GroupName;
  const [_, setLocation] = useLocation();
  const [user] = useAtom(userAtom);
  useEffect(() => {
    if (currentGroup) {
      currentGroup.CreatorName === user?.username ? setAdmin(true) : setAdmin(false)
    }
  }, [])

  function handleDeleteGroup() {
    fetch(`/api/delete/group/${GroupId}`)
      .then(res => { return res.body })
      .then(data => console.log("deleted group", data)
      )
    setLocation("/groups")

  }
  function handleExit() {
    fetch(`/api/exit/group/${GroupId}/${user?.username}`).then(res => { return res.json() }).then(data => console.log(data))
  }

  return (
    currentGroup && <>
      <div className="flex items-center mt-4 mx-4">
        <span className="mt-[.37rem] mr-auto" onClick={() => history.back()}><ChevronLeft /></span>
        <TypographyH3 className="-ml-6 mr-auto">
          Settings
        </TypographyH3>
      </div>
      {admin && <div className="grid gap-4 mt-8 mx-4">
        <Dialog>
          <DialogTrigger asChild>
            <Card>
              <CardHeader className="p-4 flex flex-row items-center">
                <Pencil size={20} className="mt-1 mr-4" /><CardTitle className=" text-lg">Edit</CardTitle>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent className="w-[90vw] sm:max-w-md rounded-xl">
            <DialogTitle>
              Edit Form
            </DialogTitle>
            <GroupEditForm />
          </DialogContent>
        </Dialog>
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
                    {/* {data.groupmembers.length} */}
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

      </div>}
      {!admin && <div className="grid gap-4 mt-8 mx-4">
        <Card onClick={handleExit}>
          <CardHeader className="p-4 flex flex-row items-center">
            <LogOut size={20} className="mt-1 mr-4 text-destructive" /><CardTitle className=" text-lg text-destructive">Exit Group</CardTitle>
          </CardHeader>
        </Card>
      </div>}
    </>
  )
}

