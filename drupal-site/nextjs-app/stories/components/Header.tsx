import * as React from "react"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"
import { GetStaticPropsResult } from "next" 
import { drupal } from "../../lib/drupal"

import { MenuMain, MenuMainProps } from "../components/Main--menu"

// Interface HeaderProps - associates the Main Menu Links from Main--menu.tsx with Header.tsx.
// This way, the links will show up in the header component.
export interface HeaderProps {
  menus: {
    main: DrupalMenuLinkContent[]
  }
}

//Passed Interface HeaderProps as 
export function Header({ menus }: HeaderProps) {

  return (
    <header className="bg-white">
        <MenuMain items={menus.main} />
    </header>
  )
}

// getStaticProps() function - This is a "support statement" that helps Drupal absolutely KNOW that you are trying to fetch 
// a menu and/or content data to show up for this Next.js page.
// Do NOT remove this function!  You absolutely need this here if you want your menu/content to show up on the webpage.
export async function getStaticProps(
    context: any
  ): Promise<GetStaticPropsResult<HeaderProps>> {
  
    // Fetch menu.
    const mainMenu = await drupal.getMenu("main")
  
    return {
      props: {
        menus: {
          main: mainMenu.tree,
        },
      },
    }
}

