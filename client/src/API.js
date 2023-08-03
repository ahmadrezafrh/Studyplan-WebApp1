

const SERVER_URL = 'http://localhost:3001';

const getCourses = async () => {
  const response = await fetch(SERVER_URL + '/api/courses', {
    credentials: 'include',
  });
  var courses = await response.json();
  var new_sp = []
  if(response.ok) {

    let dupps = courses.map(courses => courses.code).filter((item, index) => courses.map(courses => courses.code).indexOf(item) !== index)
    for (let b = 0; b < dupps.length; b++) {
      var dupp_incourses = ''
      var corrected = courses.filter(course => course.code === dupps[b])
      for (let i = 0; i < corrected.length; i++) {
        dupp_incourses+=corrected[i].incourses
        
      }
      corrected[0].incourses = dupp_incourses
    new_sp.push(corrected[0])
    };

    dupps.forEach(dupp => {
      courses = courses.filter((obj)=>(obj.code!==dupp))
    });
    courses = courses.concat(new_sp)
    
    return courses;
  }
  else
    throw courses;
};


const getStudyPlan = async (id) => {
  const response = await fetch(SERVER_URL + '/api/studyplan/' + id, {
    credentials: 'include',
  });

  var studyPlan = await response.json();
  studyPlan = studyPlan.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.code === value.code
  ))
)
  if(response.ok) {
    return studyPlan;
  }
  else
    throw studyPlan;
};


const updateStudyPlan = async (studyPlan, id) => {
  const response = await fetch(SERVER_URL + '/api/studyplans/' + id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(studyPlan),
  });
  if(response.ok) {
    const studyPlanJson = await response.json();
    return studyPlanJson
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const addEnrolled = async (studyPlan) => {
  const response = await fetch(SERVER_URL + '/api/addenrolled', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(studyPlan),
  });
  if(response.ok) {
    const studyPlanJson = await response.json();
    return studyPlanJson
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const removeEnrolled = async (studyPlan) => {
  const response = await fetch(SERVER_URL + '/api/removeenrolled', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(studyPlan),
  });
  if(response.ok) {
    const studyPlanJson = await response.json();
    return studyPlanJson
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};


const updateType = async (type, id) => {
  const response = await fetch(SERVER_URL + '/api/user/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(type),
  });
  if(response.ok) {
    const res = await response.json();
    return res
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;
  }
};


const logOut = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}


const deleteStudyPlan = async(id) => {
  const response = await fetch(SERVER_URL + '/api/studyplan/' + id, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return true;
}



const API = {getCourses, getStudyPlan, updateStudyPlan, logIn, getUserInfo, logOut, deleteStudyPlan, updateType, addEnrolled, removeEnrolled};
export default API;