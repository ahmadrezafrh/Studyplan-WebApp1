import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Container, Row, Alert } from 'react-bootstrap';
import { HomeRoute, LoginRoute } from './components/Routers';
import { LoginButton, LogoutButton } from './components/AuthComponents';

import {TypeButton, CreateButton, EditButton, SaveButtons} from  './components/ControlButtons'
import API from './API';


function App() {
  const [courses, setListCourses] = useState([]);
  const [studyPlan, setListStudyPlan] = useState([]);
  const [primaryStudyPlan, setPrimaryStudyPlan] = useState([]);
  const [user, setUser] = useState({});
  const [type, setType] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [studyplanExist, setStudyPlan] = useState(false);
  const [minCredits, setMin] = useState(0);
  const [maxCredits, setMax] = useState(0);
  const [asklogin, setAskLogin] = useState(false);
  const [mode, setMode] = useState('normal'); //'exist', 'edit', 'normal', 'type'

  const getCourses = async() => {
    const allCourses = await API.getCourses();
    setListCourses(allCourses);
  };



  useEffect(() => {
    const checkAuth = async () => {
      await API.getUserInfo();
      setLoggedIn(true);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    getCourses();
  }, []);




  /*** Applying Local Storage***/
  useEffect(() => {
    const data = window.localStorage.getItem('MODE');
    if (data != null) setMode(JSON.parse(data))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.localStorage.setItem('MODE', JSON.stringify(mode))
    }, 100)
    
  }, [mode])

  

  useEffect(() => {
    const data = window.localStorage.getItem('STUDY_PLAN');
    if (data != null) setListStudyPlan(JSON.parse(data))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.localStorage.setItem('STUDY_PLAN', JSON.stringify(studyPlan))
    }, 100)
  }, [studyPlan])



  useEffect(() => {
    const data = window.localStorage.getItem('PRIMARY_STUDY_PLAN');
    if (data != null) setPrimaryStudyPlan(JSON.parse(data))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.localStorage.setItem('PRIMARY_STUDY_PLAN', JSON.stringify(primaryStudyPlan))
    }, 100)
    
  }, [primaryStudyPlan])


  useEffect(() => {
    const data = window.localStorage.getItem('USER');
    if (data != null) setUser(JSON.parse(data))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.localStorage.setItem('USER', JSON.stringify(user))
    }, 100)
    
  }, [user])


  useEffect(() => {
    const data = window.localStorage.getItem('STUDY_PLAN_EXIST');
    if (data != null) setStudyPlan(JSON.parse(data))
  }, [])

  useEffect(() => {
    
    setTimeout(() => {
      window.localStorage.setItem('STUDY_PLAN_EXIST', JSON.stringify(studyplanExist))
    }, 100)
  }, [studyplanExist])


  useEffect(() => {
    const data = window.localStorage.getItem('MIN_CREDITS');
    if (data != null) setMin(JSON.parse(data))
  }, [])

  useEffect(() => {
    
    setTimeout(() => {
      window.localStorage.setItem('MIN_CREDITS', JSON.stringify(minCredits))
    }, 100)
  }, [minCredits])


  useEffect(() => {
    const data = window.localStorage.getItem('MAX_CREDITS');
    if (data != null) setMax(JSON.parse(data))
  }, [])

  useEffect(() => {
    
    setTimeout(() => {
      window.localStorage.setItem('MAX_CREDITS', JSON.stringify(maxCredits))
    }, 100)
  }, [maxCredits])


  useEffect(() => {
    const data = window.localStorage.getItem('ASK_LOGIN');
    if (data != null) setAskLogin(JSON.parse(data))
  }, [])

  useEffect(() => {
    
    setTimeout(() => {
      window.localStorage.setItem('ASK_LOGIN', JSON.stringify(asklogin))
    }, 100)
  }, [asklogin])


  useEffect(() => {
    const data = window.localStorage.getItem('TYPE_STUDY_PLAN');
    if (data != null) setType(data)
  }, [])

  useEffect(() => {
    
    setTimeout(() => {
      window.localStorage.setItem('TYPE_STUDY_PLAN', JSON.stringify(type))
    }, 100)
  }, [type])
  /*** End of Local Storage***/



  const SortArray = (x, y) => {
    if (x.name < y.name) {return -1;}
    if (x.name > y.name) {return 1;}
    return 0;
  }

  const codeExists = (code) => {
    return studyPlan.some(function(course) {
      return course.code === code;
    }); 
  }

  const handleLogin = async (credentials) => {
    try {
      await API.logIn(credentials)
        .then(
          function(value) {
            setUser(value)
            setType(value.type)
            API.getStudyPlan(value.id)
            .then(
              function(value) {
                if (value.length){
                  setMode('exist')
                  setStudyPlan(true)
                  setMessage({msg: `Personal study plan exists`, type: 'success'});
                  setListStudyPlan(value)
                  setPrimaryStudyPlan(value)
                } else{
                  setListStudyPlan([])
                  setPrimaryStudyPlan([])
                  setMessage({msg: `Personal study plan does not exists`, type: 'danger'})
                }
              }
            )
            setAskLogin(false);
            setLoggedIn(true);
            setMessage({msg: `Welcome, ${value.name}!`, type: 'success'});
          }
        )
    }catch(err) {
      console.log(err);
      setMessage({msg: err, type: 'danger'});
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setAskLogin(false);
    setMode('normal')
    setMessage('');
  };


  const handleCreate = async () => {
    setMode('type')
  };

  const handleType = async (type) => {
    setType(type)
    setMode('edit')
    if (type === 'full-time'){
      setMin(60)
      setMax(80)
    }

    if (type === 'part-time'){
      setMin(20)
      setMax(40)
    }

    setMessage({msg: `Study plan initialized.`, type: 'success'});
  };



  const handleSave = async () => {
    
    try {

      const getcodes = () => {
        return ({codes: studyPlan.map(c => c.code)})
      }
      const getexistcodes = () => {
        return ({codes: primaryStudyPlan.map(c => c.code)})
      }

      const codes = await getcodes()


      if (studyPlan.reduce((s,e)=>(s+e.credits),0)> maxCredits){
        setMessage({msg: `You have slected ${type} studyplan, you cannot select more than ${maxCredits} credits`, type: 'danger'});
        return
      }
      else if(studyPlan.reduce((s,e)=>(s+e.credits),0)<minCredits){
        setMessage({msg: `You have slected ${type} studyplan, you cannot select lower than ${minCredits} credits`, type: 'danger'});
        return
      }

      if (primaryStudyPlan.length!==0) {
        const exist_codes = await getexistcodes()
        await API.removeEnrolled(exist_codes)
      }

      setStudyPlan(true)
      setPrimaryStudyPlan(studyPlan)
      setMode('exist')
      if (user.id!==undefined){
        await API.deleteStudyPlan(user.id)
        await API.updateStudyPlan(codes, user.id);
        await API.updateType({type: type}, user.id)
        await API.addEnrolled(codes)
        await getCourses()
      }
      setMessage({msg: `Courses have been saved.`, type: 'success'});
    }catch(err) {
      console.log(err);
      setMessage({msg: err, type: 'danger'});
    }
  };

  const handleEdit = async () => {
    setMode('edit')
  };

  const handleCancel = async () => {
    setListStudyPlan(primaryStudyPlan)
    if (studyplanExist){
      setMode('exist')
    } else {
      setMode('normal')
    }
    setMessage('');
  };

  const handleAskLogin = async () => {
    setAskLogin(true)
  };

  const handleDelete = async () => {

    const getcodes = () => {
      return ({codes: primaryStudyPlan.map(c => c.code)})
    }
    const codes = await getcodes()
    await API.removeEnrolled(codes)
    await API.deleteStudyPlan(user.id)
    await API.updateType({type: null}, user.id)
    setMode('normal')
    setListStudyPlan([])
    setPrimaryStudyPlan([])
    setStudyPlan(false)
    getCourses()
    setMessage({msg: `There is no course awailable in your study plan`, type: 'success'});
  };


  const addCourse = (code) => {
    if (!codeExists(code)){
      var course = courses.find(cs => cs.code === code)
      setListStudyPlan((OldCourses)=>[...OldCourses, course]);
    } else{
      setMessage({msg: `Course with code ${code} already exists in the studyplan.`, type: 'danger'});
    }

  }
  const removeCourse = (code) => {
    setListStudyPlan((OldCourses)=>(OldCourses.filter((obj)=>(obj.code!==code))))
  }

  const allDetail = {
    courses : courses.sort(SortArray),
    studylan : studyPlan.sort(SortArray),
    mode : mode
  }

  return (
    <Container className='App'>
      {loggedIn && <LogoutButton logout={handleLogout}/>}
      {!loggedIn && !asklogin && <LoginButton login={handleAskLogin}/>}
      {loggedIn && mode == 'normal' && <CreateButton createStudyPlan={handleCreate} />}
      {loggedIn && mode == 'type' && <TypeButton setmode={setMode} settype={handleType}/>}
      {loggedIn && mode == 'edit' && <SaveButtons deleteStudyPlan={handleDelete} cancelStudyPlan={handleCancel} saveStudyPlan={handleSave} />}
      {loggedIn && mode == 'exist' && <EditButton editStudyPlan={handleEdit} /> }

      {message && <Row>
        <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
      </Row> }
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={
            loggedIn ? <Navigate replace to='/' /> : <LoginRoute login={handleLogin} />
          } />
          <Route path='/' element={
            !asklogin || loggedIn ?  <HomeRoute min={minCredits} max={maxCredits} allDetail={allDetail} addcourse={addCourse} removecourse={removeCourse} ncredits={studyPlan.reduce((s,e)=>(s+e.credits),0)}/> : <Navigate replace to='/login' />
          } />

        </Routes>
      </BrowserRouter>
    </Container>
    
  );
}

export default App;
