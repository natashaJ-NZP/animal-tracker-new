import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

//Components
import {FormLogin} from '../stories/components/FormLogin';

const Login = () => {
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