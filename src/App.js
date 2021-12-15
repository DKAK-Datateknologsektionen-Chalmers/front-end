import './App.css';
import logo from './dkak_logo.svg'
import logo_white_large from './dkak_white_large.svg'

import React, { useState } from 'react';

//Form entry component for input
function FormEntry(props){
  return (
    <input 
    type="text"
    value={props.data}  
    className="hover:bg-grey-dark items-center justify-start flex h-12 w-full rounded-perf bg-grey pl-10 my-4"
    onFocus={e => e.target.value === props.default ? props.f("") : null}
    onBlur={e => e.target.value === "" ? props.f(props.default): null}
    onChange={e => props.f(e.target.value)}
    />
  )
}

//Very specific button that doesnt need to be a component
function GreenButton(props){
  return (
    <button 
      className="font-semibold hover:bg-sucess-dark items-center justify-center flex h-12 w-full rounded-perf bg-success my-8"
      onClick={() => props.f(1)}>
      {props.text}
    </button>
  )
}

//Form entry component for input
function PreferenceButton(props){
  return (
    <button 
    className="hover:bg-grey-dark items-center justify-start h-20 w-full rounded-perf bg-grey my-4"
    onClick={() => {
      props.f.updatePage(2)
      props.f.updatePreference(props.type)
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

function App() {

  const [formPage, setFormPage] = useState(0);

  //Page 0
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");
  const [email, setEmail] = useState("Email Address");
  const [admittanceYear, setAdmittanceYear] = useState("Year of Admittance");
  const [graduationYear, setGraduationYear] = useState("Year of Graduation");

  //Page 1
  const [preference, setPreference] = useState(null);

  function FormNavigator(){
    if (formPage === 0){
      return [
        <FormEntry default="First Name" data={firstName} f={setFirstName}/>,
        <FormEntry default="Last Name" data={lastName} f={setLastName}/>,
        <FormEntry default="Email Address" data={email} f={setEmail}/>,
        <FormEntry default="Year of Admittance" data={admittanceYear} f={setAdmittanceYear}/>,
        <FormEntry default="Year of Graduation" data={graduationYear} f={setGraduationYear}/>,
        <GreenButton f={setFormPage} text="Continue"/>,
      ]
    } else if (formPage === 1){
      return [
        <PreferenceButton
          f={{"updatePage": setFormPage, "updatePreference": setPreference}}
          text="Celebrator: Only Large Events" 
          textContent="(Once or Twice every year)"
          type="celeberator"/>,
        <PreferenceButton 
        f={{"updatePage": setFormPage, "updatePreference": setPreference}}
        text="Occasional: Meetups and Large Events" 
        textContent="(1 Event per quarter)"
        type="celeberator"/>,
        <PreferenceButton 
        f={{"updatePage": setFormPage, "updatePreference": setPreference}}
        text="Ambitious: All of the above + Hang Arounds" 
        textContent="(1 Event every month)"
        type="celeberator"/>
       ]
    } else if (formPage === 2){
      return [
        <div className="pt-10">
          <span className="text-3xl">Many thanks for subscribing. Let’s meet soon 👋🏽</span>
        </div>,
        <div className="m-12">
          <span>Oh hey. So we wont really have a privacy policy just yet. 
            However, you can unsubscribe at any time and all of your data 
            on our service will be instantly removed.</span>
        </div>
      ]
    } else return "something went wrong. ERROR CODE 4"
  }

function FormHeaderNavigator() {
  if (formPage === 0) return (<span className="text-3xl">Let’s get you going with our newsletter🚀</span>)
  else if (formPage === 1) return (<span className="text-3xl">Let’s get your preferences right 📌</span>)
  else if (formPage === 2) return (<span className="text-3xl">You’re done ✨</span>)
  else return "something went wrong. ERROR CODE 5"
}

  return (
    <div className="bg-primary w-screen h-screen">
      <div className="w-full h-full overflow-hidden">
        <img className="absolute -left-96 -top-48 opacity-10" src={logo_white_large}/>
      </div>
      <div className="bg-white w-2/6 h-5/6 fixed top-10 right-28 rounded-perf">
        <div className="w-full">
        <img alt="logo" src={logo} className="mx-auto my-12"/>
        </div>
        <div className="w-full text-center px-10 -my-6">
          <FormHeaderNavigator/>
        </div>
        <div className="w-full text-center px-10 py-12 h-inherit">
          <FormNavigator/>
        </div>
      </div>
    </div>
  );
}

export default App;
