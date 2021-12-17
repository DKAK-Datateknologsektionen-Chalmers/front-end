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
      name={props.nameID}
      autoComplete="on"
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
        key="fname" 
        nameID="fname"
        type="text"
        displayValidation = {props.displayValidation} 
        validation={firstName != null} 
        default="First Name" 
        data={props.firstName} 
        f={props.setFirstName}/>,
      <FormEntry 
        key="lname"
        nameID="lname"
        displayValidation = {props.displayValidation} 
        validation={lastName != null} 
        default="Last Name" 
        data={props.lastName} 
        f={props.setLastName}/>,
      <FormEntry 
        key="email"
        nameID="email"
        displayValidation = {props.displayValidation} 
        validation={email != null} 
        default="Email Address" 
        data={props.email} 
        f={props.setEmail}/>,
      <FormEntry 
        key="yoa"
        displayValidation = {props.displayValidation} 
        validation={admittanceYear != null} 
        default="Year of Admittance" 
        data={props.admittanceYear} 
        f={props.setAdmittanceYear}/>,
      <FormEntry 
        key="yog"
        displayValidation = {props.displayValidation} 
        validation={graduationYear != null} 
        default="Year of Graduation" 
        data={props.graduationYear} 
        f={props.setGraduationYear}/>,
      <button
        key="c"
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
        <div className="pt-10">
          <span className="text-3xl">Many thanks for subscribing. Let’s meet soon 👋🏽</span>
        </div>
        <div className="m-12">
          <span>Oh hey. So we don't really have a privacy policy just yet. 
          However, you can unsubscribe at any time from one of our emails and all of your data 
          on our service will be instantly removed.</span>
        </div>
      </div>
    )
  } else return "something went wrong. ERROR CODE 4"
}



function App() {

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

  //post data handler
  function sendData(){

    let data_payload = {
      "firstName" : firstName,
      "lastName" : lastName,
      "email" : email,
      "admittanceYear" : admittanceYear,
      "graduationYear" : graduationYear,
      "preference" : preference
    }

    const send = async () => {
      try {
        const response = await toast.promise(
          fetch("http://192.168.1.40:6001/api/subscribers", {
            "method": "POST",
            "headers": {
              "Content-Type": "application/json"
            },
              "body": JSON.stringify(data_payload)
          }),
          {
            pending: 'Your data is traveling the world 🌍',
            success: 'We got it 👌',
            error: 'Oh no 🥺 Internal Server Error'
          }
        );
        console.log(response)
      } catch{}
    }
    send()
  }

function FormHeaderNavigator() {
  if (formPage === 0) return (<span className="text-2xl sm:text-3xl">Let’s get you going with our newsletter🚀</span>)
  else if (formPage === 1) return (<span className="text-2xl sm:text-3xl">Let’s get your preferences right 📌</span>)
  else if (formPage === 2) return (<span className="text-2xl sm:text-3xl">You’re done ✨</span>)
  else return "something went wrong. ERROR CODE 5"
}

  return (
    <div className="w-full h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="bg-white sm:bg-primary w-full h-full overflow-hidden relative">
        <img 
          alt="dkak logo large white in background" 
          className="hidden sm:block select-none	absolute -left-96 -top-48 opacity-10 max-w-max" 
          src={logo_white_large}/>
      </div>
      <div className="bg-white absolute top-0 w-full 
        sm:h-auto sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:top-1/2 sm:left-1/2 sm:w-4/6 sm:rounded-perf
        xl:top-10 xl:left-60pct xl:right-0 xl:transform-none xl:w-2/6 ">
        <div className="w-full">
        <img alt="logo" src={logo} className="select-none	mx-auto my-12"/>
        </div>
        <div className="w-full text-center px-10 -my-6">
          <FormHeaderNavigator/>
        </div>
        <form autoComplete="on" className="w-full text-center px-10 py-12 h-inherit">
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
        </form>
      </div>
    </div>
  );
}

export default App;
