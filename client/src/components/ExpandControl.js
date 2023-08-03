import { Button } from "react-bootstrap";


function ExpandControl(props) {

    return <p align='left'>
        {!props.expandable ?
            <Button variant="light" onClick={() => { props.expand(true) }} active><strong>More</strong></Button> :
            <Button variant="light" onClick={() => { props.expand(false) }} active><strong>Less</strong></Button>}
    </p>;

}

export default ExpandControl;