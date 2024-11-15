import {
  Activity,
  ChartNoAxesCombined,
  ChevronLeft,
  History,
  NotebookPen,
  PackagePlus,
  PiggyBank,
  Settings,
} from "lucide-react";
import { Link } from "wouter";

export default function GroupDetails() {
  const groupname = "saas";
  const groupmembers = [
    "Sam Prasad Thakur",
    "Sam Prasad"
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
            <div className="p-6 grid grid-cols-2 grid-rows-2 items-center justify-center gap-4">
              <Link className="group-option-icons col-span-1" to="/add/expenses">
                  <PackagePlus  className="text-chart-3" />
              </Link>
              <Link className="group-option-icons col-span-1" to="/group/settings">
                  <Settings className="text-chart-3" />
              </Link>
              <Link className="group-option-icons col-span-2 gap-4" to="/group/expenses">
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
                {groupmembers.map((_member: any, index) => {
                  return (
                    <div
                      key={index}
                      className="shadow-sm w-full text-center rounded-lg bg-secondary text-card-foreground text-sm p-2 "
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
