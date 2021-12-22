import 'styles/Invitation.css';
import React, {useEffect, useState } from 'react';
import Rsvp from 'components/Rsvp';

const Invitation = (props) => {
    const [mydata, setMyData] = useState(null);
    const [isAttending, setIsAttending] = useState(false);
    const [numberAttending, setNumberAttending] = useState(0);
    const [rsvpData, setRsvpData] = useState(null);

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


    const submitResponse = async (e) => {
        e.preventDefault();
        try {
            console.log("HELLO!");
            const requestOptions = {
                method: "PUT",
                body: JSON.stringify(),
            }

            const response = await fetch("http://localhost:59000/v1/family/events/" + props.familyID + "/" + mydata.message[1].event_id + "/" + numberAttending, requestOptions)
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

    const showGuestCount = (mydata) => {
        isAttending && <Rsvp content = {
        <>
            <form onSubmit={submitResponse}>
                <label>Number of Attending Guests
                    <input type="integer" name="attendingCount" defaultValue={mydata.message[0].members} maxLength="2" values={numberAttending} onChange={e => setNumberAttending(e.target.value)} />
                </label>
                <input className="submit-button" type="submit" value="submit response for event" />
            </form>
        </>
        }
        />
    };

    const renderEvents = (mydata) => {
        const events = [];
        for (var i = 0; i <= Object.keys(mydata).length; i++) {
           events.push(<div>
                          <h2 className="event-header">{mydata.message[i].event_name}</h2>
                          <p className="event-detail">{mydata.message[i].venue}</p>
                          <div className="event-toggle">
                              <p className="event-toggle-name"> Accept </p>
                              <label class="switch switch-left-right">
                              	<input class="switch-input" type="checkbox"/>
                              	<span class="switch-label" data-on="Accept" data-off="Decline"></span>
                              	<span class="switch-handle"></span>
                              </label>
                          </div>
                          {showGuestCount(mydata)}
                       </div>);
         }
        console.log("my data array has been looped through!");
        return events;
    }

    return (
        <div className="invitation">
        {
         mydata ?
             <>
               <h1 className="invitation-header">invitation details</h1>

               <p className="invitation-info">Dear {mydata.message[0].family_name} family, we humbly request your presence to the following events. Please email us at luvandkrishi@gmail.com with any questions or comments.</p>
               {renderEvents(mydata)}
             </>
             : <> </>
         }
         </div>
    );
};

export default Invitation;





