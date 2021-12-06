import 'styles/Invitation.css';

function InvitationPage(props) {
  const accept = () => {
    alert('Accept');
    // if a user accepts, then ask for total guests
  }
  
  async function loadEvents(){
    try{
      await fetch("http://localhost:59000/v1/family/events/" + props.familyID)
        .then((response) => {
          if (response.status !== 200 && response.status !== 400) {
            alert("Hi! Something seems to be off on our end, please email luvandkrishi.com!")
          }
          return response.json();
        })
        .then((data) => {
          if (data.error === `Invalid family id`) {
            alert("Hi! It seems like you're trying to put in something that doesn't make sense for the family ID. Please email luvandkrishi.com! ");

          } else {
            console.log(data)
            console.log(data.message[0].event_name)
            // save state to data.familyID
            // return validated ===
              // handleJWTChange(Object.values(data)[0]);
              // window.localStorage.setItem("jwt", JSON.stringify(Object.values(data)[0]));
            // history.push("/invitation");
          }
      })
    } catch (error){
      console.log(error);
    }
  }
  

  const decline = () => {
    alert('Decline');
  }
  loadEvents()
  return (
    // create page for
    <div className="invitation">
      <h1 className="invitation-header">invitation details</h1>
      <p className="invitation-info">We humbly request your presence to the following events. Please email us at luvandkrishi@gmail.com with any questions or comments.</p>
        <h2 className="event-header">sangeet</h2>
        <div className="event-response">
            <input className="event-accept" type="button" name="accept" value="Accept" id="Accept" onClick={accept}/>
            <input className="event-decline" type="button" name="decline" value="Decline" id="Decline" onClick={decline}/>
        </div>
        <h2 className="event-header">ceremony</h2>
        <div className="event-response">
            <input className="event-accept" type="button" name="accept" value="Accept" id="Accept" onClick={accept}/>
            <input className="event-decline" type="button" name="decline" value="Decline" id="Decline" onClick={decline}/>
        </div>
        <h2 className="event-header">reception</h2>
        <div className="event-response">
            <input className="event-accept" type="button" name="accept" value="Accept" id="Accept" onClick={accept}/>
            <input className="event-decline" type="button" name="decline" value="Decline" id="Decline" onClick={decline}/>
        </div>
        <input className="invitation-submit" type="submit" value="submit rsvp" />
    </div>
  );
};

export default InvitationPage;