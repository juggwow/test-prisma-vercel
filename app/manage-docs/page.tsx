import { authOptions } from "@/auth-options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import ManageDocs from "./manage-docs"

export default async function Page() {
  const session = await getServerSession(authOptions)
    if(!session || !session.pea){
        redirect("/api/auth/signin")
    }
    if(!["admin","checker"].includes(session.pea.role)){
        redirect("/")
    }
    return(
        <div className="p-3 flex flex-col gap-3">
            <p>จัดการเอกสาร</p>
            <ManageDocs/>
        </div>
    )
    
}