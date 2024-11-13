import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { ChevronLeft } from "lucide-react";

export default function Notifications() {
    // mock data
    const nots = [
        {
            "type": "Request",
            "content": "You have received a money request of $50 from John Doe."
        },
        {
            "type": "Account",
            "content": "Your password has been successfully changed."
        },
        {
            "type": "System",
            "content": "The Terms of Service have been updated. Please review the changes."
        },
        {
            "type": "Account",
            "content": "A new login was detected from a different device. If this wasn't you, please secure your account."
        },
        {
            "type": "Request",
            "content": "Alice has requested $20 for dinner. Please approve or decline."
        },
        {
            "type": "Account",
            "content": "Your email address has been successfully updated."
        },
        {
            "type": "System",
            "content": "Scheduled maintenance will occur on Saturday from 2 AM to 4 AM."
        },
        {
            "type": "Account",
            "content": "Your account settings have been successfully saved."
        }
    ]

    return (
        <>
            <div className="flex selection:items-center mt-4 mx-4">
                <span className="inline mt-[.37rem] mr-auto"><ChevronLeft /></span>
                <TypographyH3 className="inline -ml-6 mr-auto">
                    Notifications
                </TypographyH3>
            </div>
            <div className="grid gap-4 my-8 mx-4">
                {nots.map((n) => (
                    <Card>
                        <CardHeader className="pt-3 pb-3">
                            <CardDescription>{n.type}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {n.content}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}
