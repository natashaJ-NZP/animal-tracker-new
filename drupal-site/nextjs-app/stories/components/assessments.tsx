import Link from "next/link"
import { DrupalNode } from "next-drupal"

//COMPONENTS
import { NodeAssessmentsItem } from "./node--assessments"

/*JSON - http://drupal-site.ddev.site:8080/jsonapi/node/assessment*/

export interface AssessmentsProps {
    assessments: DrupalNode;
}

export function Assessments({assessments}: AssessmentsProps) {
    return (
        <>
            <ul>
                {assessments.map((assessment: any) => {  
                    return <li><NodeAssessmentsItem key={assessment.id} node={assessment} /></li>
                })}
            </ul>   
        </>
    );
}