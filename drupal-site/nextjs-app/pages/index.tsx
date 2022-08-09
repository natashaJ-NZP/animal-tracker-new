import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import {
  DrupalBlock,
  DrupalMenuLinkContent,
  DrupalTaxonomyTerm,
} from "next-drupal"

//components
import { Header } from "../stories/components/Main--header"
import { Footer } from "../stories/components/Footer"

export interface HeaderProps {
  menus: {
    header: DrupalMenuLinkContent[]
  }
  blocks: {
    recipeCollections: DrupalTaxonomyTerm[]
    footerPromo: DrupalBlock
    disclaimer: DrupalBlock
  }
}

const NextPage = ({menus, blocks}: HeaderProps) => {
  return (
    <div>
      {menus?.header?.length ? (
        <Header items={menus.header}/>
      ) : null}
      <div>You are now on the homepage.</div>
      <Footer />
    </div>
  );
}

export default NextPage;
