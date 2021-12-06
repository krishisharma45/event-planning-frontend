import {Route, Switch} from 'react-router-dom';
import LandingPage from 'views/pages/LandingPage';
import EventPage from 'views/pages/EventPage';
import StoryPage from 'views/pages/StoryPage';
import FaqPage from 'views/pages/FaqPage';
import TravelPage from 'views/pages/TravelPage';
import RsvpPage from 'views/pages/RsvpPage';
import InvitationPage from 'views/pages/InvitationPage';

function GuestPortalRoutes() {
    return (
        <Switch>
            <Route exact path={'/'} component={LandingPage} />
            <Route path={'/events'} component={EventPage} />
            <Route path={'/story'} component={StoryPage} />
            <Route path={'/faq'} component={FaqPage} />
            <Route path={'/travel'} component={TravelPage} />
            <Route path={'/rsvp'} component={RsvpPage} />
            {/* <Route path={'/invitation'} component={InvitationPage} /> */}
        </Switch>
    )
};

export default GuestPortalRoutes;