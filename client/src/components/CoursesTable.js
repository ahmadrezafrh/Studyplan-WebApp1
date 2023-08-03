import { Table } from "react-bootstrap";
import {CoursesRow} from "./CoursesRow";


function CoursesTable(props) {



    return <>
        <Table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Credits</th>
                    <th>Description</th>
                    {props.allDetail.mode == 'edit' && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
            
                {props.allDetail.courses.map((course) => (<CoursesRow course={course} mode={props.allDetail.mode} courses={props.allDetail.courses} studyPlan={props.allDetail.studylan}
                addcourse={props.addcourse}/>))}
            </tbody>
        </Table>
    </>;
}


export {CoursesTable}