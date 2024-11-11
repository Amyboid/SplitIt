import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { CircleUser, Languages, LogOut, Scale } from "lucide-react";

export default function Settings() {
    return (
        <>
            <div className="flex justify-center mt-4 mx-4">
                <TypographyH3 className="inline">
                    Settings
                </TypographyH3>
                <span className="inline"></span>
            </div>
            <div className="grid gap-4 mt-8 mx-4">
                <Card>
                    <CardHeader className="p-4 flex flex-row items-center">
                    <CircleUser size={20} className="mt-1 mr-4" /> <CardTitle className=" text-lg">Account</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="p-4 flex flex-row items-center">
                    <ModeToggle /> <CardTitle className=" text-lg ml-9 z-10">Theme</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="p-4 flex flex-row items-center">
                    <Languages size={20} className="mt-1 mr-4" /> <CardTitle className=" text-lg">Language</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="p-4 flex flex-row items-center">
                    <Scale size={20} className="mt-1 mr-4" /> <CardTitle className=" text-lg">Licences</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </>
    )
}
