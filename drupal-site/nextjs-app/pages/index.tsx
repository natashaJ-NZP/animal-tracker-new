import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

const NextPage = () => {
  return <div>You are now on the homepage.</div>
}

export default NextPage;
