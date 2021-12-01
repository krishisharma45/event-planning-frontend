import 'styles/Invitation.css';

function InvitationPage() {
  const accept = () => {
    alert('Accept');
    // if a user accepts, then ask for total guests
  }

  const decline = () => {
    alert('Decline');
  }

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