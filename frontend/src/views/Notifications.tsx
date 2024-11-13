import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { ChevronLeft } from "lucide-react";

export default function Notifications() {
    return (
        <>
            <div className="flex selection:items-center mt-4 mx-4">
                <span className="inline mt-[.37rem] mr-auto"><ChevronLeft /></span>
                <TypographyH3 className="inline -ml-6 mr-auto">
                    Notifications
                </TypographyH3>
            </div>
        </>
    )
}
