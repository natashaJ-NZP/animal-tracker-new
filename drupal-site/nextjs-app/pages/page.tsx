import { useSession } from "next-auth/react"

//Components
import FormLogin from "../stories/components/FormLogin"


export default function Page() {
    const { data, status } = useSession()
  
    if (status === "authenticated") {
      return <p>You are signed in.</p>
    }
  
    return <FormLogin />
}
