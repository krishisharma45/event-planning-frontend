import 'styles/Invitation.css';
import React, {useEffect, useState } from 'react';
import Rsvp from 'components/Rsvp';


const Invitation = (props) => {
    const [mydata, setMyData] = useState(null);
    const [isAttendingReception, setIsAttendingReception] = useState(false);
    const [isAttendingCeremony, setIsAttendingCeremony] = useState(false);
    const [isAttendingSangeet, setisAttendingSangeet] = useState(false);

    const [eventId, setEventID] = useState(0);
    const [submittedEvent1, setSubmittedEvent1] = useState(false);
    const [submittedEvent2, setSubmittedEvent2] = useState(false);
    const [submittedEvent3, setSubmittedEvent3] = useState(false);


    const [numberAttendingReception, setNumberAttendingReception] = useState(0)
    const [numberAttendingCeremony, setNumberAttendingCeremony] = useState(0)
    const [numberAttendingSangeet, setNumberAttendingSangeet] = useState(0)
    const [numberChildrenAttendingReception, setNumberChildrenAttendingReception] = useState(0)
    const [numberChildrenAttendingCeremony, setNumberChildrenAttendingCeremony] = useState(0)
    const [numberChildrenAttendingSangeet, setNumberChildrenAttendingSangeet] = useState(0)

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
    
const finishedSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!isAttendingReception) {
      setNumberAttendingReception(0)
    }
    if (!isAttendingCeremony) {
      setNumberAttendingCeremony(0)
    }
    if (!isAttendingSangeet) {
      setNumberAttendingSangeet(0)
    }
      const requestOptions = {
          method: "PUT",
          body: JSON.stringify(),
      }

      console.log("Submitting response for reception with", numberAttendingReception);
      var response = await fetch("http://luvandkrishi.com/v1/family/events/" + props.familyID + "/" + 3 + "/" + numberAttendingReception + "/" + numberChildrenAttendingReception, requestOptions)
      var rsvpData = await response.json();
      if (response.status!==200 && response.status!==400) {
          alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
      }

      console.log("Submitting response for ceremony with", numberAttendingCeremony);
      response = await fetch("http://luvandkrishi.com/v1/family/events/" + props.familyID + "/" + 2 + "/" + numberAttendingCeremony + "/" + numberChildrenAttendingCeremony, requestOptions)
      rsvpData = await response.json();
      if (response.status!==200 && response.status!==400) {
          alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
      }

      console.log("Submitting response for sangeet with", numberAttendingSangeet);
      response = await fetch("http://luvandkrishi.com/v1/family/events/" + props.familyID + "/" + 1 + "/" + numberAttendingSangeet + "/" + numberChildrenAttendingSangeet, requestOptions)
      rsvpData = await response.json();
      if (response.status!==200 && response.status!==400) {
          alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
      }

      console.log("submitted rsvp for all events")
      setSubmittedEvent1(true)
      setSubmittedEvent2(true)
      setSubmittedEvent3(true)
      alert("Thank you for your response You can now exit this page - Thank you!")
      return rsvpData.message
  } catch {
  }
};

// check all 3 attending variables, render if all 3 are false -> send in -1 for all events
// if at least 1 attending is true, render I'm ready!

    //attendingEventX should essentially be a toggle if user is attending (flipped toggle to accept) for any such event.
    const attendingReception = () => {
      setIsAttendingReception(!isAttendingReception)
    };

    const previouslyAttendingReception = () => {
      console.log("Number attending for reception is", mydata.message[2].attending)
      if(mydata.message[2].attending > 0) {
       setIsAttendingReception(!isAttendingReception)
       return true
      }
   }


    const attendingCeremony = () => {
      setIsAttendingCeremony(!isAttendingCeremony)
    };

    const previouslyAttendingCeremony = () => {
      console.log("Number attending for ceremony is", mydata.message[1].attending)
      if(mydata.message[1].attending > 0) {
       setIsAttendingCeremony(!isAttendingCeremony)
       return true
      }
   }

    const attendingSangeet = () => {
      setisAttendingSangeet(!isAttendingSangeet)
    };

    const previouslyAttendingSangeet = () => {
      console.log("Number attending for sangeet is", mydata.message[0].attending)
       if(mydata.message[0].attending > 1) {
        setisAttendingSangeet(!isAttendingSangeet)
        return true
       }
    }
    

   
   // load up all the different events. We could do this with hardcoded as we know the number of events (but would rather make it dynamic)
      // We want to load the events and have a switch toggle with each of them. If the toggle is on, then we want to call `showGuestCount` and load that RSVP form right underneath
      // `Error: Too many re-renders. React limits the number of renders to prevent an infinite loop. I'm guessing because we're changing the state here, it's continously changing state and freaking out.
    return (
        <div className="invitation">
        {
         mydata ?
             <>
               <h1 className="invitation-header">invitation details</h1>
               <p className="invitation-info">Dear {mydata.message[0].family_name} family, we humbly request your presence at the following events. Please email us at luvandkrishi@gmail.com with any questions or comments.</p>

               <div>
                  <h2 className="event-header"> {mydata.message[0].event_name}</h2>
                  <p className="event-detail">{mydata.message[0].venue}</p>
                  <div className="event-toggle">
                    <p className="event-toggle-name"> Will you be attending? </p>
                    <label class="switch switch-left-right">
                    <input class="switch-input" type="checkbox" defaultChecked={previouslyAttendingSangeet} onChange={attendingSangeet} />
                    <span class="switch-label" data-on="Yes" data-off="No"></span>
                    <span class="switch-handle"></span>
                    </label>
                  </div>
                </div>

                {isAttendingSangeet && <Rsvp
                content={<>
                  <p className="Event-count">Number of Total Attending Guests:</p>
                  <input type="integer" name="number_attending_sangeet" defaultValue={mydata.message[0].attending} maxLength="2"  onChange={e =>  { setNumberAttendingSangeet(e.target.value); setEventID(3)}} />
                  <p className="Event-count">Number of Attending Children (Under 12):</p>
                  <input type="integer" name="children_attending_sangeet" defaultValue={mydata.message[0].attending_children} maxLength="2"  onChange={e => {setNumberChildrenAttendingSangeet(e.target.value)}} />
                </>}
              
                />
                }
                
                
                <div>
                  <h2 className="event-header"> {mydata.message[1].event_name}</h2>
                  <p className="event-detail">{mydata.message[1].venue}</p>
                  <div className="event-toggle">
                    <p className="event-toggle-name"> Will you be attending? </p>
                    <label class="switch switch-left-right">
                    <input class="switch-input" type="checkbox" defaultChecked={previouslyAttendingCeremony} onChange={attendingCeremony} />
                    <span class="switch-label" data-on="Yes" data-off="No"></span>
                    <span class="switch-handle"></span>
                    </label>
                  </div>
                </div>


                {isAttendingCeremony && <Rsvp
                content={<>
                  <p className="Event-count">Number of Total Attending Guests:</p>
                  <input type="integer" name="number_attending_ceremony" defaultValue={mydata.message[1].attending} maxLength="2"  onChange={e =>  { setNumberAttendingCeremony(e.target.value); setEventID(2)}} />
                  <p className="Event-count">Number of Attending Children (Under 12):</p>
                  <input type="integer" name="children_attending_ceremony" defaultValue={mydata.message[1].attending_children} maxLength="2"  onChange={e => {setNumberChildrenAttendingCeremony(e.target.value)}} />
                </>}
              
                />
                }



               <div>
                  <h2 className="event-header"> {mydata.message[2].event_name}</h2>
                  <p className="event-detail">{mydata.message[2].venue}</p>
                  <div className="event-toggle">
                    <p className="event-toggle-name"> Will you be attending? </p>
                    <label class="switch switch-left-right">
                    <input class="switch-input" type="checkbox" defaultChecked={previouslyAttendingReception} onChange={attendingReception} />
                    <span class="switch-label" data-on="Yes" data-off="No"></span>
                    <span class="switch-handle"></span>
                    </label>
                  </div>
                </div>

                {isAttendingReception && <Rsvp
                content={<>
                  <p className="Event-count">Number of Total Attending Guests:</p>
                  <input type="integer" name="number_attending_reception" defaultValue={mydata.message[2].attending} maxLength="2"  onChange={e => {setNumberAttendingReception(e.target.value); setEventID(1)}} />
                  <p className="Event-count">Number of Attending Children (Under 12):</p>
                  <input type="integer" name="children_attending_reception" defaultValue={mydata.message[2].attending_children} maxLength="2"  onChange={e => {setNumberChildrenAttendingReception(e.target.value)}} />
                </>}
              
                />
                }

                
                {/* I want to have a submit button ideally that submits the input for all 3. The reason I broke it up was because it seemed the caveman/easier style to have individual handlers and submit for each but user experience is weird */}


                {<Rsvp
                content={<>
                  <form onSubmit={finishedSubmit}>
                  <input className="Submit-button" type="submit" value="Submit Response" />
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





