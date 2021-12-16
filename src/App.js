import './App.css';
import logo from './dkak_logo.svg'
import logo_white_large from './dkak_white_large.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';

//Form entry component for input
function FormEntry(props){
  function validationStyle(){
    if (props.validation) {
      return{}
    } else if (props.displayValidation) return {"background-color": "#F2A1A1"}
  }
  return (
    <input 
    type="text"
    value={props.data == null ? props.default : props.data}  
    className="hover:bg-grey-dark items-center flex h-12 w-full rounded-perf bg-grey my-4
      text-center pl-0
      xl:text-left xl:pl-10"
    style={validationStyle()}
    onFocus={e => e.target.value === props.default ? props.f("") : null}
    onBlur={e => e.target.value === "" ? props.f(null): null}
    onChange={e => props.f(e.target.value)}
    />
  )
}

//Preference button and sendout
function PreferenceButton(props){
  return (
    <button 
    className="hover:bg-grey-dark items-center justify-start h-20 w-full rounded-perf bg-grey my-4"
    onClick={() => {
      props.f.updatePage(2)
      props.f.updatePreference(props.type)
      props.f.sendData()
    }}
    >
      <div>
      <b>{props.text}</b>
      </div>
      <div>
        {props.textContent}
      </div>
    </button>
  )
}

function FormNavigator(props){

  //should extend this desctruction and use it consistently
  const {firstName, lastName, email, admittanceYear, graduationYear} = props

  function clickAction(){
    let formFilled = ![firstName, lastName, email, admittanceYear, graduationYear].includes(null)
    if(formFilled){
      props.setFormPage(1)
    } else {
      props.setDisplayValidation(true)
    }
  }  

  if (props.formPage === 0){
    //Could probably use map to generate here
    return [
      <FormEntry 
        displayValidation = {props.displayValidation} 
        validation={firstName != null} 
        default="First Name" 
        data={props.firstName} 
        f={props.setFirstName}/>,
      <FormEntry 
        displayValidation = {props.displayValidation} 
        validation={lastName != null} 
        default="Last Name" 
        data={props.lastName} 
        f={props.setLastName}/>,
      <FormEntry 
        displayValidation = {props.displayValidation} 
        validation={email != null} 
        default="Email Address" 
        data={props.email} 
        f={props.setEmail}/>,
      <FormEntry 
        displayValidation = {props.displayValidation} 
        validation={admittanceYear != null} 
        default="Year of Admittance" 
        data={props.admittanceYear} 
        f={props.setAdmittanceYear}/>,
      <FormEntry 
        displayValidation = {props.displayValidation} 
        validation={graduationYear != null} 
        default="Year of Graduation" 
        data={props.graduationYear} 
        f={props.setGraduationYear}/>,
      <button 
        className="font-semibold hover:bg-sucess-dark items-center justify-center flex h-12 w-full rounded-perf bg-success my-8"
        onClick={() => clickAction()}>
        Continue
      </button>
    ]
  } else if (props.formPage === 1){
    return [
      <PreferenceButton
        key="pref_1"
        f={{"updatePage": props.setFormPage, "updatePreference": props.setPreference, "sendData": props.sendData}}
        text="Celebrator: Only Large Events" 
        textContent="(Once or Twice every year)"
        type="celeberator"/>,
      <PreferenceButton 
        key="pref_2"
        f={{"updatePage": props.setFormPage, "updatePreference": props.setPreference, "sendData": props.sendData}}
        text="Occasional: Meetups and Large Events" 
        textContent="(1 Event per quarter)"
        type="celeberator"/>,
      <PreferenceButton 
        key="pref_3"
        f={{"updatePage": props.setFormPage, "updatePreference": props.setPreference, "sendData": props.sendData}}
        text="Ambitious: All of the above + Hang Arounds" 
        textContent="(1 Event every month)"
        type="celeberator"/>
     ]
  } 
  else if (props.formPage === 2){
    return (
      <div>
        <div key="end_msg" className="pt-10">
          <span className="text-3xl">Many thanks for subscribing. Let’s meet soon 👋🏽</span>
        </div>,
        <div key="end_msg_pvc" className="m-12">
          <span>Oh hey. So we don't really have a privacy policy just yet. 
          However, you can unsubscribe at any time and all of your data 
          on our service will be instantly removed.</span>
        </div>
      </div>
    )
  } else return "something went wrong. ERROR CODE 4"
}



function App() {

  function sendData(){
    toast.success('🦄 Wow so easy!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

    let data_payload = {
      "firstName" : firstName,
      "lastName" : lastName,
      "email" : email,
      "admittanceYear" : admittanceYear,
      "graduationYear" : graduationYear,
      "preference" : preference
    }
    console.log(data_payload)
    
     (async () => {
       const rawResponse = await fetch("http://192.168.1.40:6001/api/subscribers", {
         "method": "POST",
         "headers": {
           "Content-Type": "application/json"
         },
           "body": JSON.stringify(data_payload)
     })
     const content = await rawResponse.json();
     })
  }

  const [formPage, setFormPage] = useState(0);

  //Page 0
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [admittanceYear, setAdmittanceYear] = useState(null);
  const [graduationYear, setGraduationYear] = useState(null);
  const [displayValidation, setDisplayValidation] = useState(false);

  //Page 1
  const [preference, setPreference] = useState(null);

function FormHeaderNavigator() {
  if (formPage === 0) return (<span className="text-3xl">Let’s get you going with our newsletter🚀</span>)
  else if (formPage === 1) return (<span className="text-3xl">Let’s get your preferences right 📌</span>)
  else if (formPage === 2) return (<span className="text-3xl">You’re done ✨</span>)
  else return "something went wrong. ERROR CODE 5"
}

  return (
    <div className="bg-primary w-screen h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full h-full overflow-hidden relative">
        <img 
          alt="dkak logo large white in background" 
          className="select-none	absolute -left-96 -top-48 opacity-10 max-w-max" 
          src={logo_white_large}/>
      </div>
      <div className="bg-white h-5/6 absolute rounded-perf
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/6 
        xl:top-10 xl:left-60pct xl:right-0 xl:transform-none xl:w-2/6 ">
        <div className="w-full">
        <img alt="logo" src={logo} className="select-none	mx-auto my-12"/>
        </div>
        <div className="w-full text-center px-10 -my-6">
          <FormHeaderNavigator/>
        </div>
        <div className="w-full text-center px-10 py-12 h-inherit">
          <FormNavigator
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            admittanceYear={admittanceYear}
            setAdmittanceYear={setAdmittanceYear}
            graduationYear={graduationYear}
            setGraduationYear={setGraduationYear}
            formPage={formPage}
            setFormPage={setFormPage}
            setPreference={setPreference}
            displayValidation={displayValidation}
            setDisplayValidation={setDisplayValidation}
            sendData={sendData}/>
        </div>
      </div>
    </div>
  );
}

export default App;
