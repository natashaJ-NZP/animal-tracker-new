import * as React from "react"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"
import { GetStaticPropsResult } from "next" 
import { drupal } from "../../lib/drupal"

import siteConfig from "/home/natashashanae94/drupal/sites/animal-tracker-project/drupal-site/nextjs-app/site.config"
import { MenuMain, MenuMainProps } from "../components/Main--menu"

export interface HeaderProps {
  menus: {
    main: DrupalMenuLinkContent[]
  }
}

export function Header({ menus }: HeaderProps) {

  return (
    <header className="bg-white">
        <MenuMain items={menus.main} />
    </header>
  )
}

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

