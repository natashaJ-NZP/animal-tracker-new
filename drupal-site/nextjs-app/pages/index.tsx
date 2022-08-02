import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from "next-auth/react"

const NextPage = () => {
  const { data, status } = useSession()

  if (status === "authenticated") {
    return <p>Signed in as {data?.user?.email}</p>
  }

  return <div>You are not signed in. <a href="/api/auth/signin">Click here.</a></div>
}

export default NextPage;
