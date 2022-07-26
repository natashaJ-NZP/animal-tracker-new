import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"

import { getGlobalElements } from "../lib/get-global-elements"

import { Login } from "../stories/components/FormLogin" 


export default function LoginPage({ menus, blocks }: LoginPageProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const { status } = useSession()

  if (status === "authenticated") {
    router.push("/")
    return null
  }

  return (
    <div>
        <Login />
    </div>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<LoginPageProps>> {
  return {
    props: {
      ...(await getGlobalElements(context)),
    },
  }
}
