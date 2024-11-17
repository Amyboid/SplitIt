import { ArrowRight, ChevronLeft, Plus, Trash2, Users } from "lucide-react";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { isGroupExistAtom, newGroupArrayAtom } from "@/lib/states";
import { Link } from "wouter";
import { TypographyH3 } from "@/components/ui/typography-h3";

export default function Groups() {
  const [newGroupArray, setNewGroupArray] = useAtom(newGroupArrayAtom);
  const [isGroupExist, setIsGroupExist] = useAtom(isGroupExistAtom);
  useEffect(() => {
    if (newGroupArray.length == 0) {
      setIsGroupExist(false);
    }
  }, [newGroupArray]);
  useEffect(() => {
    const data: any = Object.values(JSON.parse(localStorage.getItem("group")!))
    
    if (data) {
      setIsGroupExist(true)
      setNewGroupArray([...data])
    }
  }, [])
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
  return (
    <>
      <div className="w-full relative h-24 rounded-xl bg-secondary text-div-foreground flex flex-col justify-between p-3 pb-2">
        <h1 className="text-lg font-medium leading-none tracking-tight">
          {group.groupname}
        </h1>
        <div className="flex  justify-between">
          <div className="flex">
            <Users className="mr-1 w-4 cursor-pointer" />
            {group.groupmembers.length}
          </div>
          <Link to={`/group/${group.groupname}/details`}>
            <div className="flex items-start justify-center gap-1 mt-2">
              <p className="text-xs font-semibold block leading-3">view</p>
              <ArrowRight className="size-3 leading-3 font-bold text-chart-4" />
            </div>
          </Link>
        </div>
        {/* <Trash2
            className="absolute right-3 top-3 w-5 text-destructive cursor-pointer"
            onClick={() => deleteGroup(deleteIndex)}
            /> */}
      </div>
    </>
  );
}
