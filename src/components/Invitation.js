import 'styles/Invitation.css';
import React, {useEffect, useState } from 'react';
import Rsvp from 'components/Rsvp';


const Invitation = (props) => {
    const [mydata, setMyData] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [isAttendingReception, setIsAttendingReception] = useState(false);
    const [isAttendingCeremony, setIsAttendingCeremony] = useState(false);
    const [isAttendingSangeet, setIsAttendingSangeet] = useState(false);
    const [numberAttendingReception, setNumberAttendingReception] = useState(0)
    const [numberAttendingCeremony, setNumberAttendingCeremony] = useState(0)
    const [numberAttendingSangeet, setNumberAttendingSangeet] = useState(0)
    const [numberChildrenAttendingReception, setNumberChildrenAttendingReception] = useState(0)
    const [numberChildrenAttendingCeremony, setNumberChildrenAttendingCeremony] = useState(0)
    const [numberChildrenAttendingSangeet, setNumberChildrenAttendingSangeet] = useState(0)


// this will guide our api's to whether we are in development or production
    const env = () => {
        if (process.env.REACT_APP_ENV==="dev") {
          console.log("Development environment running...")
          return "http://localhost:59000"
        }

        else {
          console.log("Production environment running...")
          return "http://www.luvandkrishi.com"
        }
    }

    const loadEvents = async () => {
      try{
        const response = await fetch(env() + "/v1/family/events/" + props.familyID);
        const data = await response.json();
        setMyData(data);
        // hi reader, this is to ensure that the result from last time triggers the appropriate "status" of the user
        if(data.message[0].attending > 0) {
          attendingSangeet()
        }
        if(data.message[1].attending > 0) {
          attendingCeremony()
        }
        if(data.message[2].attending > 0) {
          attendingReception()
        }
        // checkPreviousResponseSangeet(data.message[0])
        // checkPreviousResponseCeremony(data.message[1])
        // checkPreviousResponseReception(data.message[2])
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
      setNumberChildrenAttendingReception(0)
    }
    if (!isAttendingCeremony) {
      setNumberAttendingCeremony(0)
      setNumberChildrenAttendingCeremony(0)
    }
    if (!isAttendingSangeet) {
      setNumberAttendingSangeet(0)
      setNumberChildrenAttendingSangeet(0)
    }
    var userErrorCount = 0
    var httpResponse
    var eventResponse
    var userMessage
      const requestOptions = {
          method: "PUT",
          body: JSON.stringify(),
      }

      // User is not coming to any events :(
      if (!isAttendingSangeet && !isAttendingCeremony && !isAttendingReception) {
        console.log("User is not coming to any event")
        httpResponse = await fetch(env() + "/v1/family/events/decline/" + props.familyID, requestOptions)
        eventResponse = await httpResponse.json();
        if (httpResponse.status!==200 && httpResponse.status!==400) {
          alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
        }
        if (httpResponse.status === 200) {
          alert("Thanks for submitting your response We're sad to see that you won't be coming!")
        }
      }
      
      // Woohoo! User is coming to at least one event, let's submit their response
      else {
      if (isAttendingSangeet && mydata.message[0].attending > 0 && numberAttendingSangeet === 0){
        //Do nothing since this means they were previously attending, and they're not changing it. This is a weird react thing, do not do call
        console.log("buggy")
      } else {
        // Submit sangeet and check if user messed up
          console.log("Submitting response for sangeet with", numberAttendingSangeet);
          httpResponse = await fetch(env() + "/v1/family/events/" + props.familyID + "/" + 1 + "/" + numberAttendingSangeet + "/" + numberChildrenAttendingSangeet, requestOptions)
          eventResponse = await httpResponse.json();
          if (httpResponse.status!==200 && httpResponse.status!==400) {
            alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
          }
          if (httpResponse.status === 400) {
            userErrorCount = userErrorCount + 1
            userMessage = eventResponse.message
          }
          // if (httpResponse.status === 400 && userErrorCount < 3) {
          //   alert(sangeetResponse.message)
          // }
      }

      
      if (isAttendingCeremony && mydata.message[1].attending > 0 && numberAttendingCeremony === 0){
        //Do nothing since this means they were previously attending, and they're not changing it. This is a weird react thing, do not do call
        console.log("buggy ceremony")
      } else {
        // Submit ceremony and check if user messed up
          console.log("Submitting response for ceremony with", numberAttendingCeremony);
          httpResponse = await fetch(env() + "/v1/family/events/" + props.familyID + "/" + 2 + "/" + numberAttendingCeremony + "/" + numberChildrenAttendingCeremony, requestOptions)
          eventResponse = await httpResponse.json();
          if (httpResponse.status!==200 && httpResponse.status!==400) {
              alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
          }
          if (httpResponse.status === 400) {
            userErrorCount = userErrorCount + 1
            userMessage = eventResponse.message
          }
          // if (httpResponse.status === 400 && userErrorCount < 3) {
          //   alert(ceremonyResponse.message)
          // }
      }

      if (isAttendingReception && mydata.message[2].attending > 0 && numberAttendingReception === 0){
        //Do nothing since this means they were previously attending, and they're not changing it. This is a weird react thing, do not do call
        console.log("buggy reception")
      } else {
        // Submit ceremony and check if user messed up
          console.log("Submitting response for reception with", numberAttendingReception);
          httpResponse = await fetch(env() + "/v1/family/events/" + props.familyID + "/" + 3 + "/" + numberAttendingReception + "/" + numberChildrenAttendingReception, requestOptions)
          eventResponse = await httpResponse.json();
          if (httpResponse.status!==200 && httpResponse.status!==400) {
              alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!");
          }
          if (httpResponse.status === 400) {
            userErrorCount = userErrorCount + 1
            userMessage = eventResponse.message
          }
          // if (httpResponse.status === 400 && userErrorCount < 3) {
          //   alert(receptionResponse.message)
          // }
      }

      console.log("Returned was", eventResponse)

      if (userErrorCount >= 1 && userErrorCount < 3) {
        alert(userMessage)
      }

      // User has messed up on all 3 with user errors. Friendly message w/ guide
      if (httpResponse.status === 400 && userErrorCount >= 3) {
        alert("Hi there, this is Luv.\n You may not understand how this RSVP works.\n Allow me to be your vigil through this dark forest\n\n" +  
        "If you'd like to attend an event, press the Yes or No for the corresponding event.\n If you're attending, you should see a prompt asking how many members of your party there will be in total, and how many children.\n" +
        "(Note: if you really are bringing more children than adults to all 3 events and not just testing, you should give us a call ;)).\n" +
        "Please also note that we also have a count of people in each family. If you are bringing someone we are not anticipating, please email us.\n" +
        "When you're done, press submit! We'll save your responses for the next time you come around or change your mind!")
      }



      // We're done!
      if (httpResponse.status === 200 && userErrorCount === 0) {
        console.log("submitted rsvp for all events successfully")
        alert("Thank you for your response! You can now exit this page - Thank you!")
      }
    }

  } catch (error){
    alert("Oops, something weird seems to have happened here. We apologize! Please call us immediately @ 310-415-6274")
    console.log(error)
  }
  // setIsFinished(!isFinished);
};

// check all 3 attending variables, render if all 3 are false -> send in -1 for all events
// if at least 1 attending is true, render I'm ready!

    //attendingEventX should essentially be a toggle if user is attending (flipped toggle to accept) for any such event.
    const attendingReception = () => {
      setIsAttendingReception(!isAttendingReception)
    };



    const attendingCeremony = () => {
      setIsAttendingCeremony(!isAttendingCeremony)
    };


    const attendingSangeet = () => {
      setIsAttendingSangeet(!isAttendingSangeet)
    };


   
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
                  <p className="event-date">FRIDAY, APRIL 22</p>
                  <h2 className="event-header"> {mydata.message[0].event_name}</h2>
                  <p className="event-detail">{mydata.message[0].venue}</p>
                  <div className="event-toggle">
                    <p className="event-toggle-name"> Will you be attending? </p>
                    <label class="switch switch-left-right">
                    <input className="switch-input" type="checkbox" checked={isAttendingSangeet} onChange={attendingSangeet} />
                    <span class="switch-label" data-on="Yes" data-off="No"></span>
                    <span class="switch-handle"></span>
                    </label>
                  </div>
                </div>

                {isAttendingSangeet && <Rsvp
                content={<>
                  <p className="Event-count">Number of Total Attending Guests:</p>
                  <input type="number" name="number_attending_sangeet" defaultValue={mydata.message[0].attending} maxLength="2"  onChange={e =>  { setNumberAttendingSangeet(e.target.value)}} />
                  <p className="Event-count">Number of Attending Children (Under 12):</p>
                  <input type="number" name="children_attending_sangeet" defaultValue={mydata.message[0].attending_children} maxLength="2"  onChange={e => {setNumberChildrenAttendingSangeet(e.target.value)}} />
                </>}
              
                />
                }
                
                
                <div>
                  <p className="event-date">SATURDAY, APRIL 23</p>
                  <h2 className="event-header"> {mydata.message[1].event_name}</h2>
                  <p className="event-detail">{mydata.message[1].venue}</p>
                  <div className="event-toggle">
                    <p className="event-toggle-name"> Will you be attending? </p>
                    <label class="switch switch-left-right">
                    <input className="switch-input" type="checkbox" checked={isAttendingCeremony} onChange={attendingCeremony} />
                    <span class="switch-label" data-on="Yes" data-off="No"></span>
                    <span class="switch-handle"></span>
                    </label>
                  </div>
                </div>


                {isAttendingCeremony && <Rsvp
                content={<>
                  <p className="Event-count">Number of Total Attending Guests:</p>
                  <input type="number" name="number_attending_ceremony" defaultValue={mydata.message[1].attending} maxLength="2"  onChange={e =>  { setNumberAttendingCeremony(e.target.value)}} />
                  <p className="Event-count">Number of Attending Children (Under 12):</p>
                  <input className="ceremony-count" type="number" name="children_attending_ceremony" defaultValue={mydata.message[1].attending_children} maxLength="2"  onChange={e => {setNumberChildrenAttendingCeremony(e.target.value)}} />
                </>}
              
                />
                }



               <div>
                  <h2 className="event-header"> {mydata.message[2].event_name}</h2>
                  <p className="event-detail">{mydata.message[2].venue}</p>
                  <div className="event-toggle">
                    <p className="event-toggle-name"> Will you be attending? </p>
                    <label class="switch switch-left-right">
                    <input className="switch-input" type="checkbox" checked={isAttendingReception} onChange={attendingReception} />
                    <span class="switch-label" data-on="Yes" data-off="No"></span>
                    <span class="switch-handle"></span>
                    </label>
                  </div>
                </div>

                {isAttendingReception && <Rsvp
                content={<>
                  <p className="Event-count">Number of Total Attending Guests:</p>
                  <input type="number" name="number_attending_reception" defaultValue={mydata.message[2].attending} maxLength="2"  onChange={e => {setNumberAttendingReception(e.target.value)}} />
                  <p className="Event-count">Number of Attending Children (Under 12):</p>
                  <input className="ceremony-count" type="number" name="children_attending_reception" defaultValue={mydata.message[2].attending_children} maxLength="2"  onChange={e => {setNumberChildrenAttendingReception(e.target.value)}} />
                </>}
              
                />
                }

                
                {/* I want to have a submit button ideally that submits the input for all 3. The reason I broke it up was because it seemed the caveman/easier style to have individual handlers and submit for each but user experience is weird */}


                {<Rsvp
                content={<>
                  <form onSubmit={finishedSubmit}>
                  <input className="Submit-button" type="submit" value="Submit RSVP" />
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





