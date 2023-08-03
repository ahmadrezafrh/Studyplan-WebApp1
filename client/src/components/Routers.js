import { Row, Col } from 'react-bootstrap';

import {StudyPlanTable} from './StudyplanTable';
import {CoursesTable} from './CoursesTable';
import {LoginForm} from './AuthComponents';


function HomeRoute(props) {
  return(
    <>
      <Row>
        <Col>
          <h2>Courses</h2>
        </Col> {props.allDetail.mode == 'exist'&&
        <Col>
          <h2>Study Plan</h2>
        </Col>}
        {props.allDetail.mode == 'edit' &&
        <Col>
          <h2>Study Plan</h2>
        </Col>}
      </Row>
      <Row>
        <Col>
          <CoursesTable allDetail={props.allDetail} addcourse={props.addcourse} />
        </Col> 
        {props.allDetail.mode == 'exist'&&
        <Col>
          <StudyPlanTable allDetail={props.allDetail} removecourse={props.removecourse} />
          <div>Total number of credits: {props.ncredits}</div>
        </Col>}
        {props.allDetail.mode == 'edit' &&
        <Col>
          <StudyPlanTable allDetail={props.allDetail} removecourse={props.removecourse} />
          <div>
          <p><strong>Total number of credits:</strong>&nbsp;     {props.ncredits}</p>
          <p><strong>Minimum number of credits:</strong>&nbsp;   {props.min}</p>
          <p><strong>Maximum number of credits:</strong>&nbsp;   {props.max}</p>
          </div>
        </Col>}
      </Row>
    </>
  );
}


function LoginRoute(props) {
  return(
    <>
      <Row>
        <Col>
          <h1>Login</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <LoginForm login={props.login} />
        </Col>
      </Row>
    </>
  );
}






export { HomeRoute, LoginRoute };