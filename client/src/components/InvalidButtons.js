import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { Button} from "react-bootstrap";


function InvalidDetail(props) {

    const incom = (lst) =>{
        var courses = []
        lst.forEach(course => {
            courses.push(course.name)
        });
        var codes = ''
        for (let i=0; i<courses.length; i++){
            if (i===courses.length-1){
            codes+= courses[i]
            } else{
                codes+= courses[i] + ', '
            }
        }
        return codes
    }


    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Error(s)</Popover.Header>
          
          <Popover.Body>
          {props.max &&
            <p>
                <p><strong>Course is full</strong></p>
            </p>
          }


          {props.pre.found &&
          <p>
            <p><strong>Preparatory course:</strong></p>
            <p>{props.pre.course.name}</p>
          </p>
          }


          {props.inc.found &&
          <p>
            <p><strong>Incompatible with: </strong></p>
            <p>{incom(props.inc.courses)}</p>
          </p>
          }


          </Popover.Body>
        </Popover>
      );
      
    return  <>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <h5>
            <Button variant="outline-secondary" active>Detail</Button>
            </h5>
        </OverlayTrigger>
    </>;
}


function InvalidDetailStudyPlan(props) {


    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Error(s)</Popover.Header>
          
          <Popover.Body>



          {props.pre.found &&
          <p>
            <p><strong>Preparatory course for:</strong></p>
            <p>{props.pre.course.name}</p>
          </p>
          }


          </Popover.Body>
        </Popover>
      );
      
    return  <>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <h5>
            <Button variant="outline-secondary" active>Detail</Button>
            </h5>
        </OverlayTrigger>
    </>;
}


export {InvalidDetail, InvalidDetailStudyPlan};