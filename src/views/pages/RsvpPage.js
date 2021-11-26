import 'styles/Rsvp.css';
import 'styles/Popup.css';
import React, { useState } from 'react';
import Popup from 'components/Popup';
import InvitationPage from 'views/pages/InvitationPage';
import { useHistory } from "react-router-dom";


function RsvpPage() {
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const popupSubmit = (e) => {
        e.preventDefault();
        alert('it works!');
        history.push("/invitation");
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
                <input type="text" name="last name" defaultValue="" />
              </label>
              <label>guest code
                <input type="integer" name="guest code" defaultValue="" />
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

