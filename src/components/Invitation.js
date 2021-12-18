import 'styles/Invitation.css';
import React, {useEffect, useState } from 'react';


const Invitation = (props) => {
  const [mydata, setMyData] = useState(null);
  const [bgColor1, setbgColor1] = useState('#030E2A');
  const [bgColor2, setbgColor2] = useState('#030E2A');
  const [bgColor3, setbgColor3] = useState('#030E2A');
  const [bgColor4, setbgColor4] = useState('#030E2A');
  const [bgColor5, setbgColor5] = useState('#030E2A');
  const [bgColor6, setbgColor6] = useState('#030E2A');

  const loadEvents = async () => {
    try{
      const response = await fetch("http://localhost:59000/v1/family/events/" + props.familyID);
      const data = await response.json();
      setMyData(data);
      if (response.status !== 200 && response.status !== 400) {
        alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!")
      }
      if (data.error === `Invalid family id`) {
        alert("Hi! It seems like you're trying to put in something that doesn't make sense for the family ID. Please email luvandkrishi.com!");

      } else {
        console.log(data)
        console.log(data.message)
        return data.message
        // save state to data.familyID
        // return validated ===
          // handleJWTChange(Object.values(data)[0]);
          // window.localStorage.setItem("jwt", JSON.stringify(Object.values(data)[0]));
        // history.push("/invitation");
      }
    } catch (error){
      console.log(error);
    }
  }

  useEffect(() => {
    if (!mydata && props.familyID) {
      loadEvents()
    }
  }, [mydata, props.familyID]);

  const accept1 = () => {
    bgColor2 != '#030E2A' ? setbgColor2('#030E2A') : setbgColor1("green");
    bgColor1 == '#030E2A' ? setbgColor1("green") : setbgColor1("#030E2A");

  }

  const decline1 = () => {
    bgColor1 != '#030E2A' ? setbgColor1('#030E2A') : setbgColor2("red");
    bgColor2 == '#030E2A' ? setbgColor2("red") : setbgColor2("#030E2A");
  }

  const accept2 = () => {
    bgColor4 != '#030E2A' ? setbgColor4('#030E2A') : setbgColor3("green");
    bgColor3 == '#030E2A' ? setbgColor3("green") : setbgColor3("#030E2A");
  }

  const decline2 = () => {
    bgColor3 != '#030E2A' ? setbgColor3('#030E2A') : setbgColor4("red");
    bgColor4 == '#030E2A' ? setbgColor4("red") : setbgColor4("#030E2A");
  }

  const accept3 = () => {
    bgColor6 != '#030E2A' ? setbgColor6('#030E2A') : setbgColor5("green");
    bgColor5 == '#030E2A' ? setbgColor5("green") : setbgColor5("#030E2A");
  }

  const decline3 = () => {
    bgColor5 != '#030E2A' ? setbgColor5('#030E2A') : setbgColor6("red");
    bgColor6 == '#030E2A' ? setbgColor6("red"): setbgColor6("#030E2A");
  }

  const guestCount = () => {
      // send the following PUT request json payload to the API:
      // {family_id: str,
      //  event_id: str,
      //  attending: int}
  }

      const popupSubmit = (e) => {
          e.preventDefault();
          // on submit, render a simple message to the user saying
          // "Thank you for your response, {family_name}! We look forward to seeing you" if the family accepts any event
          // and render
          // "Thank you for your response, {family_name}! We'll miss you" if the family declines all events
          // then, re-render the login page of RSVP once they click out of the popup
      }

  const events = [];

//  const renderEvents = (mydata) => {
//    for (var i = 0; i <= Object.keys(mydata).length; i++) {
//       events.push(<div><div><h2 className="event-header">{mydata.message[i].event_name}</h2></div>
//          <div className="event-response">
//             <input style={{backgroundColor:bgColor}} className="event-accept" type="button" name="accept" value="Accept" id={i + 'accept'} onClick={accept}/>
//             <input style={{backgroundColor:bgColor}} className="event-decline" type="button" name="decline" value="Decline" id={i + 'decline'} onClick={decline}/>
//          </div>
//          <div className="event-count">
//             <div className="guest-text">Number of Attending Guests:</div>
//             <input className="guest-count" type="number" name="guestCount" defaultValue="0" onClick={guestCount}/>
//          </div>
//          </div>
//       );
//     }
//    console.log("my data array has been looped through!");
//    return events;
//  }

  return (
    <div className="invitation">
    {
     mydata ?
         <>
           <h1 className="invitation-header">invitation details</h1>

           <p className="invitation-info">Dear {mydata.message[0].family_name} family, We humbly request your presence to the following events. Please email us at luvandkrishi@gmail.com with any questions or comments.</p>
           <form onSubmit={popupSubmit}>
           {/*  {renderEvents(mydata)}  */}
           {/* element 0 */}
           <div>
                <div><h2 className="event-header">{mydata.message[0].event_name}</h2></div>
                <div className="event-response">
                    <input style={{backgroundColor:bgColor1}} className="event-accept" type="button" name="accept" value="Accept" id="Accept" onClick={accept1}/>
                    <input style={{backgroundColor:bgColor2}} className="event-decline" type="button" name="decline" value="Decline" id="Decline" onClick={decline1}/>
                </div>
                <div className="event-count">
                    <div className="guest-text">Number of Attending Guests:</div>
                    <input className="guest-count" type="number" name="guestCount" defaultValue="0" onClick={guestCount}/>
                </div>
           </div>

           {/* element 1 */}
            <div>
                <div><h2 className="event-header">{mydata.message[1].event_name}</h2></div>
                <div className="event-response">
                    <input style={{backgroundColor:bgColor3}} className="event-accept" type="button" name="accept" value="Accept" id="Accept" onClick={accept2}/>
                    <input style={{backgroundColor:bgColor4}} className="event-decline" type="button" name="decline" value="Decline" id="Decline" onClick={decline2}/>
                </div>
                <div className="event-count">
                    <div className="guest-text">Number of Attending Guests:</div>
                    <input className="guest-count" type="number" name="guestCount" defaultValue="0" onClick={guestCount}/>
                </div>
            </div>

            {/* element 2 */}
             <div>
                <div><h2 className="event-header">{mydata.message[2].event_name}</h2></div>
                <div className="event-response">
                    <input style={{backgroundColor:bgColor5}} className="event-accept" type="button" name="accept" value="Accept" id="Accept" onClick={accept3}/>
                    <input style={{backgroundColor:bgColor6}} className="event-decline" type="button" name="decline" value="Decline" id="Decline" onClick={decline3}/>
                </div>
                <div className="event-count">
                    <div className="guest-text">Number of Attending Guests:</div>
                    <input className="guest-count" type="number" name="guestCount" defaultValue="0" onClick={guestCount}/>
                </div>
             </div>


           <input className="invitation-submit" type="submit" value="submit rsvp" />
           </form>
         </>
      : <> </>
    }
    </div>
  );
};

export default Invitation;