import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

//Components
import FormLogin from "../stories/components/FormLogin"


export default function Page() {
    const router = useRouter()
    const { data, status } = useSession()
  
    if (status === "authenticated") {
      router.push("/")
      return null
    }
  
    return <FormLogin />
}
