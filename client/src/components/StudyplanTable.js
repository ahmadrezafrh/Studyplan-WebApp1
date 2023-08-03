import { Table } from "react-bootstrap";
import {StudyPlanRow} from "./StudyplanRow";


function StudyPlanTable(props) {


    return <>
        <Table striped={true}>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Credits</th>
                    {props.allDetail.mode == 'edit' && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
            
                {props.allDetail.studylan.map((course) => (<StudyPlanRow course={course} mode={props.allDetail.mode} courses={props.allDetail.courses} studyPlan={props.allDetail.studylan}
                removecourse={props.removecourse}/>))}
            </tbody>
        </Table>

    </>;
}

export {StudyPlanTable}