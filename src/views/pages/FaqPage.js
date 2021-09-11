import 'styles/Faq.css';

function FaqPage() {
    return (
        <div className="Faq">
            <p className="Faq-title">faq sections</p>
            <a href="#reply"><li className="Faq-table-of-contents">reply</li></a>
            <a href="#coronavirus"><li className="Faq-table-of-contents">coronavirus</li></a>
            <a href="#travel"><li className="Faq-table-of-contents">travel & lodging</li></a>
            <a href="#guests"><li className="Faq-table-of-contents">guests</li></a>
            <a href="#gifts"><li className="Faq-table-of-contents">gifts</li></a>
            <div className="Faq-text">
                <a id="reply"><h1> reply </h1></a>
                <h3 className="Faq-question"> how can we rsvp? </h3>
                <p className="Faq-answer"> When we send invitations, we plan to provide a way to reply by mail or digitally. </p>

                <h3 className="Faq-question"> when is the last date we can rsvp? </h3>
                <p className="Faq-answer"> The cutoff date is April 8, 2022. The sooner you can let us know, however, the better. </p>

                <h3 className="Faq-question"> what should we do if we can’t come? </h3>
                <p className="Faq-answer"> Let us know! It’ll be sad that you won’t be able to make it, but please do let us know. </p>
                <br></br>

                <a id="coronavirus"><h1> coronavirus </h1></a>
                <h3 className="Faq-question"> what coronavirus precautions are in place? </h3>
                <p className="Faq-answer"> We will have hand sanitizer stations near all events, and will work with vendors to ensure they follow the COVID protocols that are recommended by the CDC at the time of the event. </p>

                <h3 className="Faq-question"> how will changes to the schedule be communicated before the ceremony? </h3>
                <p className="Faq-answer"> Should the pandemic take a turn for the worse, we plan to communicate any changes to the schedule through this website and email. </p>

                <h3 className="Faq-question"> are we required to wear masks during the ceremony and reception? </h3>
                <p className="Faq-answer"> As of right now, we are not planning on requiring masks. This may change as we get closer to the event date, so please keep in mind that this answer may change. </p>

                <h3 className="Faq-question"> are we required to have a negative test result for coronavirus to attend? </h3>
                <p className="Faq-answer"> We do not plan to require testing from our guests, however we do recommend getting tested if you are experiencing symptoms the week of the event date. </p>

                <h3 className="Faq-question"> are we required to have partial or full coronavirus vaccination? </h3>
                <p className="Faq-answer"> For the safety and comfort of all our guests, we respectfully request guests who are eligible for coronavirus vaccinations to get fully vaccinated. However, we will not require proof of vaccination for attendance.  </p>
                <br></br>

                <a id="travel"><h1> travel & lodging </h1></a>
                <h3 className="Faq-question"> have you reserved a hotel room block for guests? </h3>
                <p className="Faq-answer"> Yes, we have blocked rooms for Friday, April 22 and Saturday, April 23 at our venue, the Hyatt Regency Chesapeake Bay Golf Resort, Spa & Marina.  </p>

                <h3 className="Faq-question"> when does the hotel block close? </h3>
                <p className="Faq-answer"> The last day to book a room in our hotel block is March 9, 2022. Reservations can be made using the hotel website.</p>

                <h3 className="Faq-question"> are there other hotels nearby to choose from? </h3>
                <p className="Faq-answer"> There is a Holiday Inn Express, Cambridge that is a 20 minute walk, 5 min drive from our venue. </p>

                <h3 className="Faq-question"> what are the nearby attractions for out of town visitors? </h3>
                <p className="Faq-answer"> Washington, DC is a two-hour drive from our venue! If you want something a little closer, there is the Choptank River Lighthouse ten minutes away (driving).</p>
                <br></br>

                <a id="guests"><h1> guests </h1></a>
                <h3 className="Faq-question"> are children allowed? </h3>
                <p className="Faq-answer"> Everyone addressed on the envelope for the save the date is welcome to join! </p>

                <h3 className="Faq-question"> what should I wear? </h3>
                <p className="Faq-answer"> As this will be an Hindu/Jain ceremony, we recommend wearing Indian suits to the ceremony and reception! However, we want you to be comfortable, so feel free to wear what makes you happy. </p>

                <h3 className="Faq-question"> will live streaming options be available for those who can’t come? </h3>
                <p className="Faq-answer"> We are looking into how to make this possible - please let us know if you have recommendations. </p>
                <br></br>

                <a id="gifts"><h1> gifts </h1></a>
                <h3 className="Faq-question"> will you be accepting gifts? </h3>
                <p className="Faq-answer"> Your presence is enough of a present. If you wish to bring a gift, please note that cash is preferred. </p>

                <h3 className="Faq-question"> should I bring my gift to the wedding? </h3>
                <p className="Faq-answer"> Yes, we will have a small table at the venue to collect envelopes and any small items. </p>
                <br></br>
            </div>
        </div>
    )
};

export default FaqPage;