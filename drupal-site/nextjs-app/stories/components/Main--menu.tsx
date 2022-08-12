/* MAIN MENU */

import { DrupalMenuLinkContent } from "next-drupal"
import Link from "next/link"

// This interface sets "items" with a TypeScript Type "DrupalMenuLinkContent". 
// DrupalMenuLinkContent[] "activates" the call request to Drupal's JSON API to extract the menus.
export interface MenuMainProps {
  items: DrupalMenuLinkContent[]
}

//This .map() function loops through Drupal's JSON to extract the main menu values.
export function MenuMain({ items }: MenuMainProps) {
console.log({items});

  return (
    <nav>
      <ul>
      <>
        {items.map((item) => {
             return <li key={item.id}>
                <Link href={item.url} passHref>
                  <a>{item.title}</a>
                </Link>
             </li>
        })}
     </>
      </ul>
    </nav>
  )
}
