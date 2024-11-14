import {
  Activity,
  ChartNoAxesCombined,
  ChevronLeft,
  History,
  NotebookPen,
  PiggyBank,
  Settings,
} from "lucide-react";
import { Link } from "wouter";

export default function GroupDetails() {
  const groupname = "saas";
  const groupmembers = [
    "Sam Prasad Thakur",
    "Sam Prasad",
    "Apu",
    "Sushant",
    "Kylie Quinn",
    "Mia Khalifa",
    "Jimmy",
    "Apu",,
    "Sushant",
    "Kylie Quinn",
    "Mia Khalifa",
    "Jimmy",
    "Apu",,
    "Sushant",
    "Kylie Quinn",
    "Mia Khalifa",
    "Jimmy",
    "Apu",,
    "Sushant",
    "Kylie Quinn",
    "Mia Khalifa",
    "Jimmy",
    "Apu",
    
  ];
  return (
    <>
      <div className="flex flex-col h-lvh w-lvw">
        <div className="h-[25%] p-4 flex items-start justify-between bg-[url('/groupbg3.jpg')] bg-center bg-cover bg-no-repeat">
          <h1 className="text-2xl font-semibold text-black">{groupname}</h1>
          <Link href="/groups">
            <ChevronLeft className="p-2 size-9 cursor-pointer text-black" />
          </Link>
        </div>
        <div className="p-4 ml-auto mr-auto w-full h-[75%] relative flex flex-col gap-4 overflow-scroll">
          <div id="options" className="flex flex-col gap-2">
            <h2 className="text-muted-foreground font-semibold text-base">
              Options
            </h2>
            <div className="p-6 grid grid-cols-3 grid-rows-2 items-center justify-center gap-4">
              <div className="w-full h-16 p-2 flex flex-col gap-1 rounded-lg items-center justify-center bg-secondary">
                <NotebookPen className="text-chart-3" />
                <p className="text-xs text-primary">Notes</p>
              </div>
              <div className="w-full h-16 p-2 flex flex-col gap-1 rounded-lg items-center justify-center bg-secondary">
                <PiggyBank className="text-chart-3" />
                <p className="text-xs text-primary">Expenses</p>
              </div>
              <div className="w-full h-16 p-2 flex flex-col  gap-2 rounded-lg items-center justify-center bg-secondary">
                <Activity className="text-chart-3" />
                <p className="text-xs text-primary">Activity</p>
              </div>
              <div className="w-full h-16 p-2 flex flex-col gap-1 rounded-lg items-center justify-center bg-secondary">
                <ChartNoAxesCombined className="text-chart-3" />
                <p className="text-xs text-primary">Stats</p>
              </div>
              <div className="w-full h-16 p-2 flex flex-col rounded-lg items-center justify-center bg-secondary">
                <Settings className="text-chart-3" />
              </div>
              <div className="w-full h-16 p-2 flex flex-col gap-1 rounded-lg items-center justify-center bg-secondary">
                <History className="text-chart-3" />
                <p className="text-xs text-primary ">History</p>
              </div>
            </div>
          </div>
          <div id="members" className="flex flex-col gap-2 mb-16">
            <h2 className="text-muted-foreground font-semibold text-base">
              Members
            </h2>
            <div className="rounded-lg border border-chart-3 p-6">
              <div className="gap-2 flex flex-wrap items-center justify-center">
                {groupmembers.map((_member: any, index) => {
                  return (
                    <div
                      key={index}
                      className="shadow-sm rounded-lg bg-secondary text-card-foreground text-sm p-2 "
                    >
                      {groupmembers[index]}
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
