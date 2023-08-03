function ExpandPreparatory(props) {
    return  <>

        <p><strong>Preparatory courses:</strong> </p> <p>{props.course.precourses}</p>
    </>;
}



function ExpandIncompatible(props) {
    const incom = (code) =>{
        const len = code.length
        const num = len/7
        var incs = ''
        for (let i=0; i<num; i++){
            if (i===num-1){
                incs += code.slice(i*7, i*7 + 7)
            } else{
                incs += code.slice(i*7, i*7 + 7)+ ', '
            }
        }
        return incs
    }
    return  <>
        <p><strong>Incompatible courses:</strong></p> <p>{incom(props.course.incourses)}</p>
    </>;
}

function MaxStudent(props) {
    return  <>
        <p><strong>Max number of students:</strong> {props.course.maxstudents}</p>
    </>;
}


export {ExpandPreparatory, MaxStudent, ExpandIncompatible}