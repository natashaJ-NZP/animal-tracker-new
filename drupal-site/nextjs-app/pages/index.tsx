/* HOMEPAGE */

import { GetStaticPropsResult } from "next"
import { drupal } from "../lib/drupal"
import { NodeAnimalsItem } from "../stories/components/node--animals--item"
import { DrupalNode } from "next-drupal"
import { getGlobalElements } from "../lib/get-global-elements"
import { getParams } from "../lib/get-params"


//Components
import { Header, HeaderProps} from "../stories/components/Header"
import { Footer } from "../stories/components/Footer"

// This interface specifically references the TypeScript type of the .map() function's output of the
// Main--menu.tsx file.  Then the name "menus" is passed down as a prop, where it will then be declared inside 
// <Header /> component (See Below).
interface HomePageProps {
  menus: HeaderProps["menus"]
  animals: DrupalNode[]
}

// Homepage() function - Made a reference to the Header, Content, and Footer components to display on the homepage.  
// The Header component has a reference to Drupal's Main Navigation Menu (see: Main--Menu.tsx).
const HomePage = ({ menus, animals }: HomePageProps) => {
  return (
    <div>
      <Header menus={{ main: menus.main }} />
        {animals.map((animal) => (   
            <li><NodeAnimalsItem key={animal.id} node={animal} /></li>
        ))}
      <Footer />
    </div>
  );
}

export default HomePage;

// getStaticProps() function - This is a "support statement" that helps Drupal absolutely KNOW that you are trying to fetch 
// a menu and/or content data to show up for this Next.js page.
// Do NOT remove this function!  You absolutely need this here if you want your menu/content to show up on the webpage.
export async function getStaticProps(
  context:any
): Promise<GetStaticPropsResult<HomePageProps>> {

  // Fetch menus.
  const mainMenu = await drupal.getMenu("main")

  //Fetch animals.
  const animals = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--animal",
    context,
    {
      params: getParams("node--animals", "card")
        .addSort("created", "DESC")
        .getQueryObject(),
    }
  )

  return {
    props: {
      ...(await getGlobalElements(context)),
      menus: {
        main: mainMenu.tree,
      },
    animals  
    },
  }
}
