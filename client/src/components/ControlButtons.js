import { Button } from "react-bootstrap";

function CreateButton(props) {

    return <p align='right'>
        {
            <h1>
            <Button variant="primary" size="lg" onClick={props.createStudyPlan} active>Create Studyplan</Button>
            </h1>
        }
    </p>;

}


function EditButton(props) {

    return <p align='right'>
            <Button variant="secondary" size="lg" onClick={props.editStudyPlan} active>Edit Study Plan</Button>

    </p>;

}


function SaveButtons(props) {

    return <p align='right'>
            {
            <Button variant="primary" size="lg"  onClick={props.saveStudyPlan} active>Save</Button> 
            }
            &nbsp;
            {
            <Button variant="danger" size="lg" onClick={props.deleteStudyPlan} active>Delete</Button>
            }
            &nbsp;
            {
            <Button variant="secondary" size="lg" onClick={props.cancelStudyPlan} active>Cancel</Button>
            }
    </p>;

}




function TypeButton(props) {

    return <p align='right'>

            {
            <Button variant="primary" size="lg"onClick={()=>{props.settype('part-time')}} active>part time</Button>}
            &nbsp;
            {
            <Button variant="primary" size="lg" onClick={()=>{props.settype('full-time')}} active>full time</Button>
            }
            &nbsp;
            {
            <Button variant="secondary" size="lg"onClick={()=>{props.setmode('normal')}} active>cancel</Button>
            }
    </p>;

}

export {TypeButton, CreateButton, EditButton, SaveButtons};