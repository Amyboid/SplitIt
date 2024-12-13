import { ArrowRight, ChevronLeft, Plus, Users } from "lucide-react";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { Group, isGroupExistAtom, newGroupArrayAtom } from "@/lib/states";
import { Link } from "wouter";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { userAtom } from "@/lib/user";

export default function Groups() {
  const [newGroupArray, setNewGroupArray] = useAtom(newGroupArrayAtom);
  const [user] = useAtom(userAtom);
  const [isGroupExist, setIsGroupExist] = useAtom(isGroupExistAtom);

  useEffect(() => {
    if (newGroupArray.length == 0) {
      setIsGroupExist(false);
    }
  }, [newGroupArray]);

  useEffect(() => {
    (async () => {
      console.log("i was ran")
      const data = await (await fetch("/api/groups/" + user?.username)).json()
      console.log("cvbn: ", data);
      if (data) {
        setIsGroupExist(true)
        setNewGroupArray([...data])
      }
    })()
  }, [])

  useEffect(() => {
    console.log("njk: ", newGroupArray);
  }, [newGroupArray])

  return (
    <>
      <div className="flex items-center justify-between mt-4 mx-4 z-10 relative">
        <span className=""><Link to="/dashboard"><ChevronLeft /></Link></span>
        <TypographyH3 className="">
          Groups
        </TypographyH3>
        <Link to="/add/group">
          <Plus className="p-2 size-9 cursor-pointer text-black" />
        </Link>
      </div>
      <div className="bg-[url('/groupbg6.jpg')] w-full h-[30%] absolute top-0 bg-cover bg-no-repeat">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-transparent to-primary-foreground"></div>
      </div>
      <div className="p-4 mt-[250px] ml-auto mr-auto w-full h-[75%] bg-background relative">
        {!isGroupExist && (
          <h1 className="text-muted-foreground font-semibold text-base absolute top-[5%] left-1/2 transform -translate-x-1/2 -translate-y-[10%]">
            No Groups Available
          </h1>
        )}
        {isGroupExist && <GroupList />}
      </div>
    </>
  );
}

function GroupList() {
  const [newGroupArray, _setNewGroupArray] = useAtom(newGroupArrayAtom);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-muted-foreground font-semibold text-base">
        Hot Groups
      </h2>
      <div className="p-0 grid grid-cols-2 gap-4 pt-4">
        {newGroupArray.map((group) => (
          <GroupCard
            group={group}
          />
        ))}
      </div>
    </div>
  );
}


function GroupCard({ group }: { group: Group }) {
  return (
    <>
      <div className="w-full relative h-24 rounded-xl bg-secondary text-div-foreground flex flex-col justify-between p-3 pb-2">
        <h1 className="text-lg font-medium leading-none tracking-tight">
          {group.GroupName}
        </h1>
        <div className="flex  justify-between">
          <div className="flex">
            <Users className="mr-1 w-4 cursor-pointer" />
            {group.GroupMembers.length}
          </div>
          <Link to={`/group/${group.GroupId}/details`}>
            <div className="flex items-start justify-center gap-1 mt-2">
              <p className="text-xs font-semibold block leading-3">view</p>
              <ArrowRight className="size-3 leading-3 font-bold text-chart-4" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
