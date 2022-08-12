/* SIGNIN (LOGIN) PAGE */

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

//Components
import {FormLogin} from '../stories/components/FormLogin';

// This login checks to see if the user is authenticated.  
// If the user is authenticated, she will be redirected to the homepage. 
// If not, a signin form (<FormLogin />) will appear, prompting users to sign in.
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