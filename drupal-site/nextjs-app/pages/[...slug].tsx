//This page is responsible for rendering dynamic pages in Headless Drupal.
//Basically, this file manages the fetching of JSON data that contains the type of
//node you want to fetch content from.  

import * as React from "react"
import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import { DrupalNode } from "next-drupal"
import { drupal } from "../lib/drupal"
import { MenuMain, MenuMainProps } from "../stories/components/Main--menu"
import { Header, HeaderProps} from "../stories/components/Header"


const RESOURCE_TYPES = [
  "node--page", 
  "node--article", 
  "node--animal",
  "node--assessement",
  "taxonomy_term--species",
  "taxonomy_term--team",
  "taxonomy_term--location",
  "taxonomy_term--tags"
]

interface NodePageProps extends HeaderProps {
  resource: DrupalNode
}

export default function NodePage({ resource, menus }: NodePageProps) {
  if (!resource) return null

  return (
    <MenuMain items={menus.main}  />
  );
}

export async function getStaticPaths(context: any): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext(RESOURCE_TYPES, context),
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context:any
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context)

  if (!path) {
    return {
      notFound: true,
    }
  }

  const type = path?.jsonapi?.resourceName

  let params = {}
  if (type === "node--article") {
    params = {
      include: "field_media_image.field_media_image,uid",
    }
  }

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params,
    }
  )

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path?.jsonapi?.individual}`)
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    }
  }

  // Fetch menus.
  const mainMenu = await drupal.getMenu("main")

  return {
    props: {
      resource,
      menus: {
        main: mainMenu.tree
      },
    },
  }
}