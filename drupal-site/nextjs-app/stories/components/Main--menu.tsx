import { DrupalMenuLinkContent } from "next-drupal"
import Link from "next/link"
import { useRouter } from "next/router"

export interface MenuMainProps {
  items: DrupalMenuLinkContent[]
}

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
