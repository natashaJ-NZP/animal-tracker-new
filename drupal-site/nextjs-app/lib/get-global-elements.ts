import { GetServerSidePropsContext, GetStaticPropsContext } from "next"
import { DrupalBlock, DrupalTaxonomyTerm } from "next-drupal"

import { drupal } from "../lib/drupal"
import { getParams } from "../lib/get-params"
import { HeaderProps } from "../stories/components/Header"

type GlobalElements = HeaderProps

export async function getGlobalElements(
  context: GetStaticPropsContext | GetServerSidePropsContext
): Promise<GlobalElements> {
  const menuOpts = {
    params: getParams("menu_link_content--menu_link_content").getQueryObject(),
    locale: context.locale,
    defaultLocale: context.defaultLocale,
  }

  // Fetch menu items.
  const mainMenu = await drupal.getMenu("main", menuOpts)
 
  return {
    menus: {
      main: mainMenu.items,
    }
  }
}
