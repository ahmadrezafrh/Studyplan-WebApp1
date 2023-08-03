import { Button, Badge} from "react-bootstrap";
import {InvalidDetailStudyPlan} from './InvalidButtons'


function StudyPlanRow(props) {
    return <tr>
        <StudyPlanData course={props.course}/>
        {props.mode == 'edit' && <StudyPlanActions courses={props.courses} studyPlan={props.studyPlan} course={props.course} removecourse={props.removecourse} />}
    </tr>;
}

function StudyPlanData(props) {
    return <>
        <td>{props.course.code}</td>
        <td>{props.course.name}</td>
        <td>{props.course.credits}</td>
    </>;
}

function StudyPlanActions(props) {

    const checkPreparatory = (code) =>{

        const course = findCourseCourses(code)
            if (course){
            const courseStudyPlan = findCourseStudyPlan(course.code)
            if (courseStudyPlan){
                return {course:courseStudyPlan, found:true}

            } else {
                return {course:courseStudyPlan, found:false}
            }
        } else {
            return {course:course, found:false}
        }
    }

    const findCourseCourses = (code) =>{
        const course =  props.courses.find( cs => cs.precourses === code );
        return course
    }

    const findCourseStudyPlan = (code) =>{
        const course =  props.studyPlan.find( cs => cs.code === code );
        return course
    }

    


    return <td>
            {
  
            !checkPreparatory(props.course.code).found && 
                <Button variant='outline-danger' onClick={()=>{props.removecourse(props.course.code)}}>Remove</Button>
            }


            {checkPreparatory(props.course.code).found &&
            <h5>
            <Badge bg="danger" active>Unremovable</Badge>
            </h5>
            }

            {checkPreparatory(props.course.code).found &&
            <p>
                <h5>
            <InvalidDetailStudyPlan pre={checkPreparatory(props.course.code)}/>
                </h5>
            </p>
            }
    </td> ;
}







export {StudyPlanRow};