import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Banana, Clapperboard, HeartPulse, House } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function ExpenseInput() {
  const profile = ["BB", "mm", "ss"];
  
  return (
    <div className="grid w-screen h-screen justify-center content-start gap-4 pt-4">
      <TypographyH3>Add Expense</TypographyH3>

      <div className="grid w-[80vw] gap-4">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="Type a suitable title" />
        <Label htmlFor="date">Date</Label>
        <DatePicker></DatePicker>
        <Label htmlFor="category">Category</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entertainment">
              <span className="flex flex-row items-center font-normal">
                <Clapperboard size={16} className="mr-2 " />
                Entertainment
              </span>
            </SelectItem>
            <SelectItem value="food">
              <span className="flex flex-row items-center font-normal">
                <Banana size={16} className="mr-2 " />
                Food
              </span>
            </SelectItem>
            <SelectItem value="medical">
              <span className="flex flex-row items-center font-normal">
                <HeartPulse size={16} className="mr-2 " />
                Medical
              </span>
            </SelectItem>
            <SelectItem value="utility">
              <span className="flex flex-row items-center font-normal">
                <House size={16} className="mr-2 " />
                Utility
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          id="amount"
          placeholder="Amount"
          className="no-spinner"
        />
        <Label htmlFor="message">Purpose</Label>
        <Textarea
          placeholder="Describe what are you spending for"
          id="message"
        />
      </div>

      <ToggleGroup
        type="multiple"
        className="flex-col gap-2 bg-[hsl(240,4.8%,92%)] w-80 p-4 rounded-md"
      >
        <div className="flex justify-between items-center w-full mb-4">
          <span>Select all</span>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Split Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="percentage">By percentage</SelectItem>
              <SelectItem value="fraction">By fraction</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {profile.map((item, key) => {
          return (
            <div className="flex items-center justify-start w-full">
              <ToggleGroupItem
                key={key}
                value={item}
                aria-label={item}
                className="bg-[hsl(var(--ring))] h-14 w-14 px-0.5 py-0 rounded-full mr-4"
              >
                <Avatar key={key} className="h-12 w-12 rounded-full">
                  <AvatarImage src={"/" + item + ".jpg"} alt={item} />
                  <AvatarFallback>{item}</AvatarFallback>
                </Avatar>
              </ToggleGroupItem>
              <Label htmlFor="name" className="text-base mr-10">
                Surajit Maity
              </Label>
              <Input
                type="number"
                id="name"
                className="w-16 no-spinner ml-auto"
                placeholder=""
              />
            </div>
          );
        })}
      </ToggleGroup>
      <Button>Split Expense</Button>
      <ModeToggle />
    </div>
  );
}
