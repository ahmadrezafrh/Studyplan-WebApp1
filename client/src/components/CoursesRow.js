import { Button, Badge} from "react-bootstrap";
import ExpandControl from "./ExpandControl";
import { InvalidDetail } from './InvalidButtons'
import { useState } from 'react';
import {ExpandPreparatory, MaxStudent, ExpandIncompatible} from './ExpandCourses'



function CoursesRow(props) {
    return <tr>

        <CoursesData course={props.course}/>
        {props.mode == 'edit' && <CoursesActions courses={props.courses} studyPlan={props.studyPlan} course={props.course} addcourse={props.addcourse}/>}
        
    </tr>;
}

function CoursesData(props) {
    
    const [expandable, SetExpand] = useState(false);

    return <>
        <td>{props.course.code}</td>
        <td>{props.course.name}</td>
        <td>{props.course.credits}</td>
        <td>
        <p>{props.course.maxstudents && <MaxStudent course={props.course}/>}</p>
        <p><strong>Total enrolled:</strong> {props.course.enrolled}</p>
        {props.course.incourses && expandable && <ExpandIncompatible course={props.course}/>}
        {props.course.precourses && expandable && <ExpandPreparatory course={props.course}/>}
        <p>{(props.course.incourses || props.course.precourses) && <ExpandControl expand={SetExpand} expandable={expandable}/>}</p>
        </td>
        
    </>;
}


function CoursesActions(props) {


    const codeExists = (code) => {
        return props.studyPlan.some(function(course) {
          return course.code === code;
        }); 
    }
    const findCourseCourses = (code) =>{
        const course =  props.courses.find( cs => cs.code === code );
        return course
    }
    const findCourseStudyPlan = (code) =>{
        const course =  props.studyPlan.find( cs => cs.code === code );
        return course
    }

    const incom = (code) =>{
        const len = code.length
        const num = len/7
        var incs = []
        for (let i=0; i<num; i++){
            incs.push(code.slice(i*7, i*7 + 7))
        }
        return incs
    }


    const checkIncompatible = (code) =>{
        if (code){
            const new_code = incom(code)
            var courses = []
            new_code.forEach(c => {
                if(findCourseStudyPlan(c)){
                    courses.push(findCourseStudyPlan(c))
                }
            });
            if (courses.length >= 1){
                return {courses: courses, found: true}
            } else{
                return {courses: undefined, found: false}
            }
        }else{
            return {courses: undefined, found: false}
        }
    }

    const checkPreparatory = (code) =>{
        const courseCourses = findCourseCourses(code)
        const courseStudyPlan = findCourseStudyPlan(code)
        if (courseCourses && !courseStudyPlan){
            return {course:courseCourses, found:true}

        } else if (courseStudyPlan){
            return {course:courseStudyPlan, found:false}

        } else {
            return {course:courseCourses, found:false}
        }

    }



    const checkMaximum = (code) =>{
        const course = findCourseCourses(code)
        if (course.enrolled===course.maxstudents){
            return true
        } else{
            return false
        }
    }

    return <td>
    {
    !codeExists(props.course.code) && 
    !checkPreparatory(props.course.precourses).found && 
    !checkIncompatible(props.course.incourses).found &&
    !checkMaximum(props.course.code) &&
    <Button variant='outline-success'  onClick={()=>{props.addcourse(props.course.code)}}>Add</Button>
    }

    
    {!codeExists(props.course.code) && (checkPreparatory(props.course.precourses).found || checkIncompatible(props.course.incourses).found || checkMaximum(props.course.code)) &&
    <h5>
     <Badge bg="danger" active>Invalid</Badge>
    </h5>
    }


    {!codeExists(props.course.code) && (checkPreparatory(props.course.precourses).found || checkIncompatible(props.course.incourses).found || checkMaximum(props.course.code)) &&
        <p>
            <h5>
        <InvalidDetail max={checkMaximum(props.course.code)}inc={checkIncompatible(props.course.incourses)} pre={checkPreparatory(props.course.precourses)} course={props.course}/>
            </h5>
        </p>
    }
   
    

    { codeExists(props.course.code) &&
    <h5>
    <Badge bg="success">Added</Badge>
    </h5>
    }
    </td> ;

}


export {CoursesRow}