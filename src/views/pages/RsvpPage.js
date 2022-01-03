import 'styles/Rsvp.css';
import 'styles/Popup.css';
import React, {useState } from 'react';
import Popup from 'components/Popup';
//import InvitationPage from 'views/pages/InvitationPage';
import Invitation from 'components/Invitation';


function RsvpPage(props) {
  console.log(props);
  //const {familyName, secretCode} = this.state
    // if(!isValidated) {
    //   //load up invitationpage
    // } else {

    // }
    const [familyName, setFamilyName] = useState("")
    const [familyID, setFamilyIDN] = useState(0)
    const [secretCode, setSecretCode] = useState(0)
    const [errors, setErrors] = useState([])
    const [validated, setValidated] = useState(false)
    // const history = useHistory()
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const popupSubmit = (e) => {
        e.preventDefault();
        if (familyName === "") {
          errors.push("Hi! Seems you haven't entered in a family name, please check your instructions for this information & try again");
        }

        if (secretCode === "") {
          errors.push("Hi! Seems you haven't entered in a secret code, please check your instructions for this information & try again");
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
          if (response.status !== 200 && response.status !== 400) {
            alert("Hi! Something seems to be off on our end, please email luvandkrishi@gmail.com!")
          }
          return response.json();
        })
        .then((data) => {
          if (data.error === `Invalid Inputs - Secret Code for Validation`) {
            alert("Hi! It seems like you're trying to put in something that doesn't make sense for the secret code. Please check your instructions for this information & try again ");

          } else if (data.error === `Invalid Inputs - Family Name for Validation`) {
            alert("Hi! It seems like you're trying to put in something that doesn't make sense for the secret code. Please check your instructions for this information & try again ");

          } else if (data.valid === false) {
            alert("Oops, your code and family name don't seem to match up. Please check your instructions for this information & try again");
              //setAlert({type: "alert-danger", message: "Invalid login" });
          } else {
            alert("Success! Logging in");

            setValidated(true)
            console.log(data.familyID)
            setFamilyIDN(data.familyID)
            togglePopup()
            // save state to data.familyID
            // return validated ===
              // handleJWTChange(Object.values(data)[0]);
              // window.localStorage.setItem("jwt", JSON.stringify(Object.values(data)[0]));
            // history.push("/invitation");
          }
      })
      .catch(error => 
        alert('Error! ' + error)
        )
    }

    return (
      <div>
          
          <div className="invitation-container">
            {
            validated && familyID ?
            <Invitation familyID={familyID}/> :
            <>
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
          </>
            }
          </div>
      </div>
      );
  };

export default RsvpPage;
