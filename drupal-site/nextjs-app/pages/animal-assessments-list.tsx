/* This will display all the assessments for the selected animal here. */

import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalView } from "next-drupal";

import { drupal } from "../lib/drupal"
import { getGlobalElements } from "../lib/get-global-elements"
import { getParams } from "../lib/get-params"

export interface AnimalsPageProps {
    animals: DrupalNode[]
}

