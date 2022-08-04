import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

//Components
import {FormLogin} from '../stories/components/FormLogin';

interface FormLoginProps extends React.HTMLProps<HTMLFormElement> {}

interface FormStatus {
  status: "success" | "error" | "fetching"
  message?: string
}

const Login = ({ className, ...props }: FormLoginProps) => {
  const [formStatus, setFormStatus] = React.useState<FormStatus>(null)
  const router = useRouter()
  const { status } = useSession()

  if (status === "authenticated") {
    router.push("/")
    return null
  }

  return (
    <div>
      {status === "unauthenticated" && (
        <div><FormLogin /></div>
      )}
    </div>
  )
}

export default Login;