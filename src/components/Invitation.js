import 'styles/Invitation.css';
import React, {useEffect, useState } from 'react';
import Rsvp from 'components/Rsvp';

// Hi hani, I want the flow to be -> once auth'd in, load up the events for that family (loadEvents)
// Load the X number of events and for each of them, gather a response if they'll be attending or not.
// If attending an event, gather number of people attending that particular event id
// On submit of that form, send a put request for that particular event id with those particular number of people attending

const Invitation = (props) => {
    const [mydata, setMyData] = useState(null);
    const [isAttendingReception, setIsAttendingReception] = useState(false);
    const [isAttendingCeremony, setIsAttendingCeremony] = useState(false);
    const [isAttendingSangeet, setisAttendingSangeet] = useState(false);

    const [eventId, setEventID] = useState(0);
    const [rsvpData, setRsvpData] = useState(null);
    const [submittedEvent1, setSubmittedEvent1] = useState(false);
    const [submittedEvent2, setSubmittedEvent2] = useState(false);
    const [submittedEvent3, setSubmittedEvent3] = useState(false);


    const [numberAttendingReception, setNumberAttendingReception] = useState(0)
    const [numberAttendingCeremony, setNumberAttendingCeremony] = useState(0)
    const [numberAttendingSangeet, setNumberAttendingSangeet] = useState(0)




    // loadEvents will load up the events for that family
    const loadEvents = async () => {
      try{
        const response = await fetch("http://luvandkrishi.com/v1/family/events/" + props.familyID);
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

      console.log("Submitting response for event 1 with", numberAttendingReception);
      var response = await fetch("http://luvandkrishi.com/v1/family/events/" + props.familyID + "/" + 1 + "/" + numberAttendingReception, requestOptions)
      var rsvpData = await response.json();
      if (response.status!==200 && response.status!==400) {
          alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
      }

      console.log("Submitting response for event 2 with", numberAttendingCeremony);
      response = await fetch("http://luvandkrishi.com/v1/family/events/" + props.familyID + "/" + 2 + "/" + numberAttendingCeremony, requestOptions)
      rsvpData = await response.json();
      if (response.status!==200 && response.status!==400) {
          alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
      }

      console.log("Submitting response for event 3 with", numberAttendingSangeet);
      response = await fetch("http://luvandkrishi.com/v1/family/events/" + props.familyID + "/" + 3 + "/" + numberAttendingSangeet, requestOptions)
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
      if(mydata.message[2].attending > 0) {
       setIsAttendingReception(!isAttendingReception)
       return true
      }
   }


    const attendingCeremony = () => {
      setIsAttendingCeremony(!isAttendingCeremony)
    };

    const previouslyAttendingCeremony = () => {
      if(mydata.message[1].attending > 0) {
       setIsAttendingCeremony(!isAttendingCeremony)
       return true
      }
   }

    const attendingSangeet = () => {
      setisAttendingSangeet(!isAttendingSangeet)
    };

    const previouslyAttendingSangeet = () => {
       if(mydata.message[0].attending > 0) {
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
                  <p className="Event-count">Number of Attending Guests:</p>
                  <input type="integer" name="number_attending" defaultValue={mydata.message[0].attending} maxLength="2"  onChange={e =>  { setNumberAttendingSangeet(e.target.value); setEventID(3)}} />
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
                  <p className="Event-count">Number of Attending Guests:</p>
                  <input type="integer" name="number_attending" defaultValue={mydata.message[1].attending} maxLength="2"  onChange={e =>  { setNumberAttendingCeremony(e.target.value); setEventID(2)}} />
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
                  <p className="Event-count">Number of Attending Guests:</p>
                  <input type="integer" name="number_attending" defaultValue={mydata.message[2].attending} maxLength="2"  onChange={e => {setNumberAttendingReception(e.target.value); setEventID(1)}} />
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





