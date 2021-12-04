import 'styles/Rsvp.css';
import 'styles/Popup.css';
import React, { Component, useState } from 'react';
import Popup from 'components/Popup';
import InvitationPage from 'views/pages/InvitationPage';
import { useHistory } from "react-router-dom";


function RsvpPage() {
    //const {familyName, secretCode} = this.state
    // if(!isValidated) {
    //   //load up invitationpage
    // } else {

    // }
    const [familyName, setFamilyName] = useState("")
    const [secretCode, setSecretCode] = useState(0)
    const [validated, setValidated] = useState(false)
    const [errors, setErrors] = useState([])

    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const popupSubmit = (e) => {
        e.preventDefault();
        alert('it works!');
        alert(familyName)
        alert(secretCode)
        if (familyName === "") {
          errors.push("family_name");
        }

        if (secretCode === "") {
          errors.push("secret_code");
        }

        setErrors(errors)

        if (errors.length > 0) {
          return false;
        }

        // const data = new FormData(e.target);
        // const payload = Object.fromEntries(data.entries());
    
        // const requestOptions = {
        //     method: "POST",
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(payload),
        // }
        //alert(requestOptions)
        fetch("http://localhost:59000/v1/validate/" + secretCode + "/" + familyName)
        .then((response) => {
          if (response.status !== 200) {}
          alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!")
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            alert("login failed");
            alert("error", data.error);
              //setAlert({type: "alert-danger", message: "Invalid login" });
          } else {
            alert("Logging in");
              // handleJWTChange(Object.values(data)[0]);
              // window.localStorage.setItem("jwt", JSON.stringify(Object.values(data)[0]));
            history.push("/invitation");
          }
      })
      .catch(error => alert('Error! ' + error.message))

        //history.push("/invitation");
        //fetch api_url/5432
        //if the last name + guest code are in the database, then
        //use react router to go to new component
        //else, return alert saying "last name + guest code not found"
    }

    return (
      <div>
          <div className="Rsvp-page">
          <p className="Rsvp-intro">Welcome to the <span className="Rsvp-word">RSVP</span> portal!</p>
          <p className="Rsvp-info">Use your last name + code from the invitation to get to the RSVP form. Should your plans change, you can update your RSVP using the same code + form.</p>
          <input
            className="Rsvp-button"
            type="button"
            value="enter portal"
            onClick={togglePopup}
          />
          </div>
          <div>
          {isOpen && <Popup
            content={<>
              <p className="Popup-title">guest check in</p>
              <form onSubmit={popupSubmit}>
                <label>last name
                  <input type="text" name="last name" defaultValue="" value={familyName} onChange={e => setFamilyName(e.target.value)} />
                </label>
                <label>guest code
                  <input type="integer" name="guest code" defaultValue="" maxLength="4" value={secretCode} onChange={e => setSecretCode(e.target.value)} />
                </label>
                <input className="Popup-button" type="submit" value="check in" />
              </form>
            </>}
            handleClose={togglePopup}
          />}
          </div>
      </div>
      );
  };

export default RsvpPage;
