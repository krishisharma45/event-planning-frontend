import 'styles/Invitation.css';
import React, {useEffect, useState } from 'react';
import Rsvp from 'components/Rsvp';


const Invitation = (props) => {
    const [mydata, setMyData] = useState(null);
    const [isAttendingEvent1, setIsAttendingEvent1] = useState(null);
    const [isAttendingEvent2, setIsAttendingEvent2] = useState(null);
    const [isAttendingEvent3, setIsAttendingEvent3] = useState(null);

    const [eventId, setEventID] = useState(0);
    const [rsvpData, setRsvpData] = useState(null);
    const [submittedEvent1, setSubmittedEvent1] = useState(false);
    const [submittedEvent2, setSubmittedEvent2] = useState(false);
    const [submittedEvent3, setSubmittedEvent3] = useState(false);

    const [numberAttendingEvent, setNumberAttendingEvent] = useState(0)

    const [numberAttendingEvent1, setNumberAttendingEvent1] = useState(0)
    const [numberAttendingEvent2, setNumberAttendingEvent2] = useState(0)
    const [numberAttendingEvent3, setNumberAttendingEvent3] = useState(0)

    const env = () => {
        if (process.env.REACT_APP_ENV==="dev") {
          console.log("Development environment running...")
          return "http://localhost:59000"
        }

        else {
          console.log("Production environment running...")
          return "http://luvandkrishi.com"
        }
    }

    const loadEvents = async () => {
      try{
        const response = await fetch(env() + "/v1/family/events/" + props.familyID);
        const data = await response.json();
        setMyData(data);
        if (response.status !== 200 && response.status !== 400) {
          alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!")
        }
        if (data.error === `Invalid family id`) {
          alert("Hi! It seems like you're trying to put in something that doesn't make sense for the family ID. Please email luvandkrishi.com!");

        } else {
          console.log(data)
          return data.message
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


    // submitResponse will submit the number of people attending for that particular eventid. Currently using placeholder. Should happen on submit
    const submitResponseEvent1 = async (e) => {
        e.preventDefault();
        try {
            console.log("Hey this is event 1's handler!");
            console.log(eventId)
            const requestOptions = {
                method: "PUT",
                body: JSON.stringify(),
            }

            const response = await fetch(env() + "/v1/family/events/" + props.familyID + "/" + 1 + "/" + numberAttendingEvent1, requestOptions)
            const rsvpData = await response.json();
            if (response.status!==200 && response.status!==400) {
                alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
            }
            console.log("lol rsvp data")
            console.log(rsvpData);
            setRsvpData(rsvpData);
            setSubmittedEvent1(true)
            return rsvpData.message
        } catch {
        }
    };

    const submitResponseEvent2 = async (e) => {
      e.preventDefault();
      try {
        console.log("Hey this is event 2's handler!");
          const requestOptions = {
              method: "PUT",
              body: JSON.stringify(),
          }

          const response = await fetch(env() + "/v1/family/events/" + props.familyID + "/" + 2 + "/" + numberAttendingEvent2, requestOptions)
          const rsvpData = await response.json();
          if (response.status!==200 && response.status!==400) {
              alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
          }
          console.log(rsvpData);
          setRsvpData(rsvpData);
          setSubmittedEvent2(true)
          return rsvpData.message
      } catch {
      }
   };

    const submitResponseEvent3 = async (e) => {
        e.preventDefault();
        try {
          console.log("Hey this is event 3's handler!");

            const requestOptions = {
                method: "PUT",
                body: JSON.stringify(),
            }

            const response = await fetch(env() + "/v1/family/events/" + props.familyID + "/" + 3 + "/" + numberAttendingEvent3, requestOptions)
            const rsvpData = await response.json();
            if (response.status!==200 && response.status!==400) {
                alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
            }
            console.log(rsvpData);
            setRsvpData(rsvpData);
            setSubmittedEvent3(true)
            return rsvpData.message
        } catch {
        }
    };

    const notAttending = async (e) => {
      e.preventDefault();
      try {
        console.log("User is not attending wedding!");

          const requestOptions = {
              method: "PUT",
              body: JSON.stringify(),
          }

          const response = await fetch(env() + "/v1/family/events/decline/" + props.familyID, requestOptions)
          const rsvpData = await response.json();
          if (response.status!==200 && response.status!==400) {
              alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
          }
          console.log(rsvpData);
          setRsvpData(rsvpData);
          setSubmittedEvent3(true)
          return rsvpData.message
      } catch {
      }
    };

    const attendingEvent1 = () => {
      setIsAttendingEvent1(!isAttendingEvent1)
    };

    const attendingEvent2 = () => {
      setIsAttendingEvent2(!isAttendingEvent2)
    };

    const attendingEvent3 = () => {
      setIsAttendingEvent3(!isAttendingEvent3)
    };

    return (
        <div className="invitation">
        {
         mydata ?
             <>
               <h1 className="invitation-header">invitation details</h1>
               <p className="invitation-info">Dear {mydata.message[0].family_name} family, we humbly request your presence to the following events. Please email us at luvandkrishi@gmail.com with any questions or comments.</p>

               <div>
                  <h2 className="event-header"> {mydata.message[2].event_name}</h2>
                  <p className="event-detail">{mydata.message[2].venue}</p>
                  <div className="event-toggle">
                    <p className="event-toggle-name"> Will you be attending? </p>
                    <label class="switch switch-left-right">
                    <input class="switch-input" type="checkbox" onChange={attendingEvent1} />
                    <span class="switch-label" data-on="Accept" data-off="Decline"></span>
                    <span class="switch-handle"></span>
                    </label>
                  </div>
                </div>

                {isAttendingEvent1 && <Rsvp
                content={<>
                  <p className="Event-count">Number of Attending Guests:</p>
                  <form onSubmit={submitResponseEvent1}>
                      <input type="integer" name="number_attending" defaultValue={0} maxLength="2"  onChange={e => {setNumberAttendingEvent1(e.target.value); setEventID(1)}} />
                    <input className="Submit-button" type="submit" value="Submit" />
                  </form>
                </>}
              
                />
                }

                  <div>
                  <h2 className="event-header"> {mydata.message[1].event_name}</h2>
                  <p className="event-detail">{mydata.message[1].venue}</p>
                  <div className="event-toggle">
                    <p className="event-toggle-name"> Will you be attending? </p>
                    <label class="switch switch-left-right">
                    <input class="switch-input" type="checkbox" onChange={attendingEvent2} />
                    <span class="switch-label" data-on="Accept" data-off="Decline"></span>
                    <span class="switch-handle"></span>
                    </label>
                  </div>
                </div>

                {isAttendingEvent2 && <Rsvp
                content={<>
                  <p className="Event-count">Number of Attending Guests:</p>
                  <form onSubmit={submitResponseEvent2}>
                      <input type="integer" name="number_attending" defaultValue={0} maxLength="2"  onChange={e =>  { setNumberAttendingEvent2(e.target.value); setEventID(2)}} />
                    <input className="Submit-button" type="submit" value="Submit" />
                  </form>
                </>}
              
                />
                }

                <div>
                  <h2 className="event-header"> {mydata.message[0].event_name}</h2>
                  <p className="event-detail">{mydata.message[0].venue}</p>
                  <div className="event-toggle">
                    <p className="event-toggle-name"> Will you be attending? </p>
                    <label class="switch switch-left-right">
                    <input class="switch-input" type="checkbox" onChange={attendingEvent3} />
                    <span class="switch-label" data-on="Accept" data-off="Decline"></span>
                    <span class="switch-handle"></span>
                    </label>
                  </div>
                </div>

                {isAttendingEvent3 && <Rsvp
                content={<>
                  <p className="Event-count">Number of Attending Guests:</p>
                  <form onSubmit={submitResponseEvent3}>
                      <input type="integer" name="number_attending" defaultValue={0} maxLength="2"  onChange={e =>  { setNumberAttendingEvent3(e.target.value); setEventID(3)}} />
                    <input className="Submit-button" type="submit" value="Submit" />
                  </form>
                </>}
              
                />
                }

                {!isAttendingEvent1 && !isAttendingEvent2 && !isAttendingEvent3 && <Rsvp
                content={<>
                  <form onSubmit={notAttending}>
                    <input className="Submit-button" type="submit" value="Decline All Events" />
                  </form>
                </>}
              
                />
                }

             </>
             : <> </>
         }
         </div>
    );
};

export default Invitation;





