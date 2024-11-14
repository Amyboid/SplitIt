import { TypographyH3 } from "@/components/ui/typography-h3";
import { Bell, Bolt } from "lucide-react";
import WavingHandSvg from "@/assets/waving_hand_color_default.svg"
import { useEffect, useState } from "react";
import { type IdTokenClaims, useLogto } from "@logto/react";


export default function Dashboard() {
    const { isAuthenticated, getIdTokenClaims } = useLogto();
    const [user,setUser]  = useState<IdTokenClaims>()
    useEffect(() => {
        (async () => {
          if (isAuthenticated) {
            const claims = await getIdTokenClaims();
            setUser(claims);
            console.log(claims);
            
          }
        })();
      }, [getIdTokenClaims, isAuthenticated]);

    //const user = "surajit" // example user
    return (
        <>
            <div className="flex mt-4 mx-4">
                <TypographyH3 className="inline">
                    Hi, <span className="capitalize mr-2 gradiented-greet-text">{user?.username?.toLowerCase()}</span>
                    <img src={WavingHandSvg} alt="waving hand emoji" className="inline w-8 ml-2 mb-1" />
                </TypographyH3>
                <Bell size={20} className="inline ml-auto mr-4 self-center" />
                <Bolt size={20} className="inline self-center" />
            </div>
        </>
    )
}
