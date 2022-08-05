import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

//components
import { Header } from "../stories/components/Main--header"
import { Footer } from "../stories/components/Footer"

const NextPage = () => {
  return (
    <div>
      <Header />
      <div>You are now on the homepage.</div>
      <Footer />
    </div>
  );
}

export default NextPage;
