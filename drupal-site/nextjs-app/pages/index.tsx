import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"
import { drupal } from "../lib/drupal"

//components
import { Header, HeaderProps} from "../stories/components/Header"
import { Footer } from "../stories/components/Footer"

interface HomePageProps {
  menus: HeaderProps["menus"]
}

const HomePage = ({ menus }: HomePageProps) => {
  return (
    <div>
      <Header menus={menus}/>
      <div>This is the homepage.</div>
      <Footer />
    </div>
  );
}

export default HomePage;


export async function getStaticProps(
  context:any
): Promise<GetStaticPropsResult<HomePageProps>> {

  // Fetch menus.
  const mainMenu = await drupal.getMenu("main")

  return {
    props: {
      menus: {
        main: mainMenu.tree,
      },
    },
  }
}