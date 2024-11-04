import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function ExpenseInput() {
  const profile = ["BB", "mm", "ss", "BB", "mm", "ss", "BB", "mm", "ss"];
  return (
    <div className="grid w-screen h-screen justify-center content-start gap-4 pt-4">
      <TypographyH3>Add Expense</TypographyH3>

      <div className="grid w-[80vw] gap-4">
        <Label htmlFor="amount">Amount</Label>
        <Input type="number" id="amount" placeholder="amount" />
        <Label htmlFor="message">Purpose</Label>
        <Textarea
          placeholder="Describe what are you spending for"
          id="message"
        />
      </div>
      {/* <div> */}
      <ToggleGroup
        type="multiple"
        className="flex-wrap bg-[hsl(240,4.8%,92%)] w-80 p-4 rounded-md"
      >
        {profile.map((item, key) => {
          return (
            <ToggleGroupItem
              value={item}
              aria-label={item}
              className="bg-[hsl(var(--ring))] h-16 w-16 px-0.5 py-0 rounded-full "
            >
              <Avatar key={key} className="h-14 w-14 rounded-full">
                <AvatarImage src={"/" + item + ".jpg"} alt={item} />
                <AvatarFallback>{item}</AvatarFallback>
              </Avatar>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
      {/* </div> */}

      <Button>Split Expense</Button>
    </div>
  );
}
