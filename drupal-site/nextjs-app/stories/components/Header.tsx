import * as React from "react"
import { DrupalMenuLinkContent, DrupalNode } from "next-drupal"
import { GetStaticPropsResult } from "next" 
import { drupal } from "../../lib/drupal"

import siteConfig from "/home/natashashanae94/drupal/sites/animal-tracker-project/drupal-site/nextjs-app/site.config"
import { MenuMain, MenuMainProps } from "../components/Main--menu"

export interface HeaderProps {
    menus: MenuMainProps["menus"]
}

export function Header({ menus }: HeaderProps) {

  return (
    <header className="bg-white">
        <MenuMain menus={menus} />
    </header>
  )
}

export async function getStaticProps(
    context: any
  ): Promise<GetStaticPropsResult<HeaderProps>> {
    const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--article",
      context,
      {
        params: {
          "filter[status]": 1,
          "fields[node--article]": "title,path,field_media_image,uid,created",
          include: "field_media_image.field_media_image,uid",
          sort: "-created",
        },
      }
    )
  
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

