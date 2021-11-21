import 'styles/Rsvp.css';
import 'styles/Popup.css';
import React, { useState } from 'react';
import Popup from 'components/Popup';

function RsvpPage() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
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
            <form>
              <label>last name
                <input type="text" name="last name" defaultValue="" />
              </label>
              <label>guest code
                <input type="integer" name="guest code" defaultValue="" />
              </label>
            </form>
            <button className="Popup-button">check in</button>
          </>}
          handleClose={togglePopup}
        />}
        </div>
    </div>
    );
};

export default RsvpPage;

