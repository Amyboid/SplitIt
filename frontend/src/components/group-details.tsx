import {
  ChevronLeft,
  PackagePlus,
  PiggyBank,
  Settings,
} from "lucide-react";
import { Link, useLocation, useParams } from "wouter";
import { TypographyH3 } from "./ui/typography-h3";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Group, newGroupArrayAtom } from "@/lib/states";

export default function GroupDetails() {
  const [group,setGroup] = useState<Group>()
  const [, setLocation] = useLocation();
  const [newGroupArray] = useAtom(newGroupArrayAtom);


  const GroupId: string = useParams().id!;
  useEffect(() => {
    const data = (newGroupArray.filter(e => e.GroupId.toString() === GroupId))[0]
    if (data) {
      const members = data.GroupMembers;
      console.log(members);
      setGroup(data)
      // setgroupMembers(members)
    }
    else {
      setLocation("/groups")
    }
  }, [])


  return (
    <>
      <div className="flex flex-col h-lvh w-lvw relative">
        <div className="h-[30%] mt-4 mx-4 flex items-start justify-between z-10 ">
          <span className=" mt-[.37rem] mr-auto"><Link to="/groups"><ChevronLeft /></Link></span>
          <TypographyH3 className="-ml-6 mr-auto">
            {group?.GroupName}
          </TypographyH3>
        </div>
        <div className="bg-[url('/groupbg3.jpg')] w-full h-[30%] -z-10 absolute left-0 top-0 bg-cover bg-no-repeat">
          <div className="w-full h-full absolute bg-gradient-to-b from-transparent via-transparent to-primary-foreground"></div>
          {/* <div className="w-full h-full absolute -left-4 bg-gradient-to-l from-transparent via-transparent to-[#ffffff6a]"></div>
            <div className="w-full h-full absolute -left-4 bg-gradient-to-r from-transparent via-transparent to-[#ffffff6a]"></div> */}
        </div>
        {/* <div className="h-[25%] p-4 flex items-start justify-between bg-[url('/groupbg3.jpg')] bg-center bg-cover bg-no-repeat">
          <h1 className="text-2xl font-semibold text-black">{groupname}</h1>
          <Link to="/groups">
            <ChevronLeft className="p-2 size-9 cursor-pointer text-black" />
          </Link>
        </div> */}
        <div className="p-4 ml-auto mr-auto w-full h-[70%] relative flex flex-col gap-4 overflow-scroll">
          <div id="options" className="flex flex-col gap-2">
            <h2 className="text-muted-foreground font-semibold text-base">
              Options
            </h2>
            <div className="p-6 grid grid-cols-2 grid-rows-2 items-center justify-center gap-4">
              <Link className="group-option-icons col-span-1" to={`/group/${GroupId}/add/expenses`}>
                <PackagePlus className="text-chart-3" />
              </Link>
              <Link className="group-option-icons col-span-1" to={`/group/${GroupId}/settings`}>
                <Settings className="text-chart-3" />
              </Link>
              <Link className="group-option-icons col-span-2 gap-4" to={`/group/${GroupId}/expenses`}>
                <PiggyBank className="text-chart-3" />
                <p className="text-xs text-primary">View Expenses</p>
              </Link>
            </div>
          </div>
          <div id="members" className="flex flex-col gap-2 mb-16">
            <h2 className="text-muted-foreground font-semibold text-base">
              Members
            </h2>
            <div className="rounded-lg border border-chart-3 p-6">
              <div className="gap-2 flex flex-col items-center justify-center">
                {group?.GroupMembers && group.GroupMembers.map((name: string, index) => {
                  return (
                    <div
                      key={index}
                      className="shadow-sm w-full text-center rounded-lg bg-secondary text-card-foreground text-sm p-2 "
                    >
                      {name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
