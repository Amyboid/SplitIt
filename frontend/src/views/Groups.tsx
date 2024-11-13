import { ArrowRight, Minimize2, Plus, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { isGroupExistAtom, newGroupArrayAtom } from "@/states";
import { Link } from "wouter";

export default function Groups() {
  const [newGroupArray, _] = useAtom(newGroupArrayAtom);
  const [isGroupExist, setIsGroupExist] = useAtom(isGroupExistAtom);
  useEffect(() => {
    if (newGroupArray.length == 0) {
      setIsGroupExist(false);
    }
  }, [newGroupArray]);

  return (
    <>
      <div className="flex flex-col  h-lvh w-lvw bg-secondary border border-black">
        <div className="h-[10%] bg-secondary p-4 flex items-start justify-between">
          <h1 className="text-2xl font-semibold ">Groups</h1>
          <Link href="/add/group">
            <Plus className="border border-input bg-background hover:bg-accent hover:text-accent-foreground p-2 size-8 rounded-lg cursor-pointer" />
          </Link>
        </div>
        <div className="p-4 rounded-t-3xl ml-auto mr-auto w-full h-[90%] bg-background relative">
          {!isGroupExist && (
            <h1 className="text-muted-foreground font-semibold text-base absolute top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-[10%]">
              No Groups Available
            </h1>
          )}
          {isGroupExist && <GroupList />}
        </div>
      </div>
    </>
  );
}


function GroupList() {
  const [newGroupArray, setNewGroupArray] = useAtom(newGroupArrayAtom);
  function handleDeleteGroup(index: number) {
    const newReducedGroup = newGroupArray.filter((_, itemindex) => {
      return itemindex !== index;
    });
    setNewGroupArray(newReducedGroup);
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-muted-foreground font-semibold text-base">
        Hot Groups
      </h2>
      <div className="p-0 grid grid-cols-2 gap-4  pt-4">
        {newGroupArray.map((group, index) => (
          <GroupCard
          group={group}
          deleteIndex={index}
          deleteGroup={handleDeleteGroup}
          />
        ))}
      </div>
    </div>
  );
}

//this is group card component it has delete,expand feature
interface GroupCardProps {
  group: {
    groupname: string;
    groupmembers: string[];
    groupdescription: string;
  };
  deleteIndex: number;
  deleteGroup: (index: number) => void;
}
function GroupCard({ group, deleteGroup, deleteIndex }: GroupCardProps) {
  const [isFullView, setIsFullView] = useState(false);
  function handleFullView() {
    setIsFullView((prev) => !prev);
  }
  function GroupCardFullview() {
    return (
      <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 p-4 py-6 my-4 h-max">
        <div className="z-50 w-72 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none  ml-auto mr-auto relative">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="text-2xl font-semibold leading-none tracking-tight">
              {group.groupname}
            </div>
            <div className="text-sm text-muted-foreground">
              {group.groupdescription.length > 0
                ? group.groupdescription
                : "no description"}
            </div>
          </div>
          <div className="p-4 pt-0 gap-2 flex flex-wrap items-center">
            {group.groupmembers.map((member: any, index) => {
              return (
                <div
                  key={index}
                  className="shadow-sm rounded-lg bg-secondary text-card-foreground text-sm p-2 "
                >
                  {member.name}
                </div>
              );
            })}
          </div>
          <Minimize2
            onClick={() => handleFullView()}
            className="w-5 cursor-pointer absolute right-2 top-2"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {isFullView && <GroupCardFullview />}
      <div className="w-full relative h-24 rounded-xl border bg-secondary text-div-foreground shadow-sm flex flex-col justify-between p-3 pb-2">
        <h1 className="text-lg font-medium leading-none tracking-tight">
          {group.groupname}
        </h1>
        <div className="flex  justify-between">
          <div className="flex">
            <Users className="mr-1 w-4 cursor-pointer" />
            {group.groupmembers.length}
          </div>
          <div
            onClick={() => handleFullView()}
            className="flex items-start justify-center gap-1 mt-2"
          >
            <p className="text-xs font-semibold block leading-3">view</p>
            <ArrowRight className="size-3 leading-3 font-bold text-chart-4" />
          </div>
        </div>
        {/* <Trash2
            className="absolute right-3 top-3 w-5 text-destructive cursor-pointer"
            onClick={() => deleteGroup(deleteIndex)}
          /> */}
      </div>
    </>
  );
}
