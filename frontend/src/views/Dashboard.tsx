import { TypographyH3 } from "@/components/ui/typography-h3";
import { Bell, Bolt } from "lucide-react";
import WavingHandSvg from "@/assets/waving_hand_color_default.svg"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
    const user = "surajit" // example user
    return (
        <>
            <div className="flex mt-4 mx-4">
                <TypographyH3 className="inline">
                    Hi, <span className="capitalize mr-2 gradiented-greet-text">{user.toLowerCase()}</span>
                    <img src={WavingHandSvg} alt="waving hand emoji" className="inline w-8 ml-2 mb-1" />
                </TypographyH3>
                <Bell size={20} className="inline ml-auto mr-4 self-center" />
                <Bolt size={20} className="inline self-center" />
            </div>
            <Card className="mt-10 mx-auto w-[90%] overflow-hidden">
                <div className="notification-card-background">
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Notification</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-5 pl-3">
                Automate your savings! Set aside a small percentage of your income each month.
                </CardContent>
                </div>
            </Card>
        </>
    )
}
