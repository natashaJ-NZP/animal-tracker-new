import { Header, HeaderProps } from "../components/Header"
import { TailwindIndicator } from "../components/tailwind-indicator"

export interface LayoutProps extends HeaderProps{
  menus: HeaderProps["menus"]
  children?: React.ReactNode
}

export function Layout({ menus, children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header menus={{ main: menus.main }} />
        <main className="flex-1 pb-10 bg-body">{children}</main>
      </div>
      <TailwindIndicator />
    </>
  )
}
