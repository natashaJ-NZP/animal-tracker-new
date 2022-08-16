//This index.tsx file of the assessments folder will render the list of all the assessments for
// a specific animal (the entity reference in Animal content type) in drupal. For example,
// if the user selects Poppy, American Beaver, she will see all the assessments that have
//been performed for that specific animal.

import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "../../lib/drupal"
import { getGlobalElements } from "../../lib/get-global-elements"
import { getParams } from "../../lib/get-params"

//Components

