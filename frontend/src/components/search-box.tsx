import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  handleChange: (value: string) => void;
  handleAddMember: Function;
  setOpen: Function;
  setInputValue: Function;
  setFilteredUser: Function;
  inputValue: string;
  filteredUser: string[];
}

export function SearchBox({ onAddMember }: any) {
  const [inputValue, setInputValue] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  const [open, setOpen] = useState(false);

  function fetchData(value: string) {
    fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
      response.json().then((data) => {
        const result = data.filter((user: any) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setFilteredUser(result);
      })
    );
  }
  function handleChange(value: string) {
    setInputValue(value);
    fetchData(value);
  }
  function handleCloseAndClear() {
    setOpen(false);
    setInputValue("");
    setFilteredUser([]);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader className="text-left">
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>Search by username</DialogDescription>
        </DialogHeader>
        <SearchBar
          handleChange={handleChange}
          handleAddMember={onAddMember}
          inputValue={inputValue}
          filteredUser={filteredUser}
          setInputValue={setInputValue}
          setOpen={setOpen}
          setFilteredUser={setFilteredUser}
        />
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCloseAndClear}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SearchBar({
  handleChange,
  inputValue,
  filteredUser,
  handleAddMember,
  setInputValue,
  setOpen,
  setFilteredUser,
}: SearchBarProps) {
  const emoji = [
    "😍",
    "😊",
    "🤺",
    "👾",
    "🤖",
    "👩",
    "😒",
    "😎",
    "🫡",
    "🥸",
    "🤡",
    "💀",
    "👽",
    "👻",
  ];

  function handleClose(name: string) {
    setOpen(false);
    setInputValue("");
    setFilteredUser([]);
    handleAddMember(name);
  }
  return (
    <>
      <div className="rounded-lg border shadow-md max-w-[450px]">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="search here"
            className="border-none focus:border-none outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          {filteredUser &&
            filteredUser.map((user: any, id) => (
              <div
                key={id}
                onClick={() => handleClose(user.name)}
                className="flex items-center gap-3 cursor-pointer rounded-sm px-4 py-2 text-sm"
              >
                <div className="w-8 h-8 rounded-full bg-secondary"></div>
                <div>
                  {user.name}
                  <p className="text-xs text-muted-foreground">
                    Add me {emoji[Math.floor(Math.random() * emoji.length)]}{" "}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
