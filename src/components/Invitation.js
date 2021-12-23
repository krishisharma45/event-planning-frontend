import 'styles/Invitation.css';
import React, {useEffect, useState } from 'react';
import RSVP from 'components/RSVP';


// Hi hani, I want the flow to be -> once auth'd in, load up the events for that family (loadEvents)
// Load the X number of events and for each of them, gather a response if they'll be attending or not.
// If attending an event, gather number of people attending that particular event id
// On submit of that form, send a put request for that particular event id with those particular number of people attending

const Invitation = (props) => {
    const [mydata, setMyData] = useState(null);
    const [isAttending, setIsAttending] = useState(false);
    const [eventId, setEventID] = useState(0);
    const [rsvpData, setRsvpData] = useState(null);
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [numberAttendingEvent1, setNumberAttendingEvent1] = useState(0)


    // loadEvents will load up the events for that family
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
    const submitResponse = async (e) => {
        e.preventDefault();
        try {
            console.log("HELLO!");
            console.log(props)
            console.log(props.eventId)
            console.log(checked)


            const requestOptions = {
                method: "PUT",
                body: JSON.stringify(),
            }

            const response = await fetch("http://localhost:59000/v1/family/events/" + props.familyID + "/" + props.eventId + "/" + numberAttendingEvent1, requestOptions)
            const rsvpData = await response.json();
            if (response.status!==200 && response.status!==400) {
                alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
            }
            console.log(rsvpData);
            setRsvpData(rsvpData);
            return rsvpData.message
        } catch {
        }
    };

    //showGuestCount should essentially be a simple number input for each event that only shows up underneath the event if user is attending, once users submit this, I want to take the number of people they have attending for each particular event and pass it to `SubmitResponse`
    const showGuestCount = () => {
      return (
        
      )

    };


    const renderEvents = (attending, event_id, ) => {
      // Hi hani, here what I'm trying to do is load up all the different events. We could do this with hardcoded as we know the number of events (but would rather make it dynamic)
      // We want to load the events and have a switch toggle with each of them. If the toggle is on, then we want to call `showGuestCount` and load that RSVP form right underneath - I'm having difficulty passing any data or action to that as it results
      // `Error: Too many re-renders. React limits the number of renders to prevent an infinite loop. on line 15:         setMyData(data);. I'm guessing because we're changing the state here, it's continoussly changing state and freaking out.
      setIsAttending(attending)
        
      console.log("Event id is %d", event_id)
      console.log("Data is: %d", mydata.message)


        // for (var i = 0; i <= Object.keys(mydata.message).length; i++) {
        //    events.push(<div>
        //                   <h2 className="event-header">{mydata.message[i].event_name}</h2>
        //                   <p className="event-detail">{mydata.message[i].venue}</p>
        //                   <div className="event-toggle">
        //                       <p className="event-toggle-name"> Accept </p>
        //                       <label class="switch switch-left-right">
        //                       	<input class="switch-input" type="checkbox"/>
        //                       	<span class="switch-label" data-on="Accept" data-off="Decline"></span>
        //                       	<span class="switch-handle"></span>
        //                       </label>
        //                   </div>
        //                   {showGuestCount(mydata)}
        //                </div>);
        //  }
        // console.log("my data array has been looped through!");
        // return events;
    };



    return (
        <div className="invitation">
        {
         mydata ?
             <>
               <h1 className="invitation-header">invitation details</h1>
               <p className="invitation-info">Dear {mydata.message[0].family_name} family, we humbly request your presence to the following events. Please email us at luvandkrishi@gmail.com with any questions or comments.</p>

               <div>
                  <h2 className="event-header"> {mydata.message[0].event_name}</h2>
                  <p className="event-detail">{mydata.message[0].venue}</p>
                  <div className="event-toggle">
                    <p className="event-toggle-name"> Will you be attending? </p>
                    <label class="switch switch-left-right">
                    <input class="switch-input" type="checkbox" onChange={showGuestCount} />
                    <span class="switch-label" data-on="Accept" data-off="Decline"></span>
                    <span class="switch-handle"></span>
                    </label>
                  </div>
                </div>

                
                <div>
                  <h2 className="event-header"> {mydata.message[1].event_name}</h2>
                  <p className="event-detail">{mydata.message[1].venue}</p>
                  <div className="event-toggle">
                    <p className="event-toggle-name"> Will you be attending? </p>
                    <label class="switch switch-left-right">
                    <input class="switch-input" type="checkbox" onChange={setChecked2} />
                    <span class="switch-label" data-on="Accept" data-off="Decline"></span>
                    <span class="switch-handle"></span>
                    </label>
                  </div>
                </div>
                            
               {/* {mydata.message.map((familyEvent) => (
                    <div>
                      <h2 className="event-header"> {familyEvent.event_name}</h2>
                      <p className="event-detail">{familyEvent.venue}</p>
                      <div className="event-toggle">
                        <p className="event-toggle-name"> Will you be coming? </p>
                        <label class="switch switch-left-right">
                        <input class="switch-input" type="checkbox" checked={checked} onChange={setChecked} />
                        <span class="switch-label" data-on="Accept" data-off="Decline"></span>
                        <span class="switch-handle"></span>
                        </label>
                      </div>
                    </div>

                ))} */}



             </>
             : <> </>
         }
         </div>
    );
};

export default Invitation;





