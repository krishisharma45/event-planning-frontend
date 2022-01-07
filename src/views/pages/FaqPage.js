import 'styles/Faq.css';

function FaqPage() {
    return (
        <div className="wrapper">
        <div className="Faq">
            <p className="Faq-title">faq sections</p>
            <a href="#rsvp"><li className="Faq-table-of-contents">rsvp</li></a>
            <a href="#coronavirus"><li className="Faq-table-of-contents">coronavirus</li></a>
            <a href="#travel"><li className="Faq-table-of-contents">travel & lodging</li></a>
            <a href="#guests"><li className="Faq-table-of-contents">guests</li></a>
            <a href="#gifts"><li className="Faq-table-of-contents">gifts</li></a>
            <div className="Faq-text">
                <a id="reply"><h1> rsvp </h1></a>
                <h3 className="Faq-question"> how can we rsvp? </h3>
                <p className="Faq-answer"> Please navigate to the <a href="http://www.luvandkrishi.com/rsvp">rsvp page</a> and follow the instructions in your invitation. If you are having issues with the rsvp page, please email us with your response at luvandkrishi@gmail.com </p>

                <h3 className="Faq-question"> when is the last date we can rsvp? </h3>
                <p className="Faq-answer"> The last date to rsvp is February 15, 2022. The sooner you can let us know, however, the better. </p>

                <h3 className="Faq-question"> what should we do if we can’t come? </h3>
                <p className="Faq-answer"> Let us know! It’ll be sad that you won’t be able to make it, but please submit your response using the rsvp page so we can plan accordingly. </p>
                <br></br>

                <a id="coronavirus"><h1> coronavirus </h1></a>
                <h3 className="Faq-question"> what coronavirus precautions are in place? </h3>
                <p className="Faq-answer"> We will follow the COVID protocols that are recommended by the CDC at the time of the event. </p>

                <h3 className="Faq-question"> how will changes to the schedule be communicated before the ceremony? </h3>
                <p className="Faq-answer"> We plan to communicate any changes to the schedule through this website and via email. </p>

                <h3 className="Faq-question"> are we required to have partial or full coronavirus vaccination? </h3>
                <p className="Faq-answer"> For the safety and comfort of all our guests, we respectfully request guests who are eligible for coronavirus vaccinations to get fully vaccinated and boosted. </p>
                <br></br>

                <a id="travel"><h1> travel & lodging </h1></a>
                <h3 className="Faq-question"> have you reserved a hotel room block for guests? </h3>
                <p className="Faq-answer"> Yes, we have blocked rooms for Friday, April 22 and Saturday, April 23 at our venue, the Hyatt Regency Chesapeake Bay Golf Resort, and the Holiday Inn Express, Cambridge.  </p>

                <h3 className="Faq-question"> when does the hotel block close? </h3>
                <p className="Faq-answer"> The last day to book a room in our hotel block is March 9, 2022. Reservations can be made using the hotel website.</p>

                <h3 className="Faq-question"> are there other hotels nearby to choose from? </h3>
                <p className="Faq-answer"> There is a Holiday Inn Express, Cambridge that is a 20 minute walk, 5 min drive from our venue. </p>

                <h3 className="Faq-question"> what are the nearby attractions for out of town visitors? </h3>
                <p className="Faq-answer"> Washington, DC is approximately a two-hour drive from our venue and Annapolis, MD, a historical city, is approximately an hour drive.</p>
                <br></br>

                <a id="guests"><h1> guests </h1></a>
                <h3 className="Faq-question"> what should I wear? </h3>
                <p className="Faq-answer"> As these will be Hindu/Jain functions, we recommend wearing traditional Indian attire. However, we want you to be comfortable, so feel free to wear what makes you happy. </p>

                <h3 className="Faq-question"> will live streaming options be available for those who can’t attend? </h3>
                <p className="Faq-answer"> We are looking into it. Stay tuned! </p>
                <br></br>

                <a id="gifts"><h1> gifts </h1></a>
                <h3 className="Faq-question"> will you be accepting gifts? </h3>
                <p className="Faq-answer"> No boxed gifts, please. We will have a box to collect small envelopes.</p>
                <br></br>
            </div>
        </div>
        </div>
    )
};

export default FaqPage;