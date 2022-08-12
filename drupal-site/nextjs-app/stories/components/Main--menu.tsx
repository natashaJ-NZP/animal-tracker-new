import { DrupalMenuLinkContent } from "next-drupal"
import Link from "next/link"
import { useRouter } from "next/router"

export interface MenuMainProps {
  menus: {
    main: DrupalMenuLinkContent[]
  }
}

export function MenuMain({menus}: MenuMainProps) {
  const router = useRouter()

  return (
    <nav>
      <ul> 
        <>
          {menus.main.map((item) => {
            <Link key={item.id} href={item.url} passHref>
              <a>{item.title}</a>
            </Link>
          })}
        </>
      </ul>
    </nav>
  )
}
