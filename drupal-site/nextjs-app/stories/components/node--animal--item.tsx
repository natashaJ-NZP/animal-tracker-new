//This component inputs the style for exactly 1 animal entry in the animal list.

import Link from "next/link"
import { DrupalNode } from "next-drupal"

interface NodeAnimalItemProps {
    node: DrupalNode
}

export function NodeAnimalItem({ node }: NodeAnimalItemProps) {
    return(
        <>
            <div>
                <Link href={node.path.alias} passHref></Link>
            </div>
        </>
    );
}

