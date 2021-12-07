import 'styles/Navigation.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import refreshPage from 'utils/refreshPage';
import React from 'react'

// export default class Navigation extends Component {
   
//     render() {
        
//     }
// }

function Navigation(){
    // const [validated, setValidated] = useState(false)
    return (
            <div onClick={refreshPage} className="Navigation">
                <Router>
                    <Link to="/events" className="Nav-events">events</Link>
                    <Link to="/story" className="Nav-story">story</Link>
                    <Link to="/faq" className="Nav-faq">faq</Link>
                    <Link to="/travel" className="Nav-faq">travel</Link>
                    <Link to="/rsvp" className="Nav-travel">rsvp</Link>
                    {/* <Route path="/rsvp" component={{(props) => <RsvpPage validationStatus={true} {...props}/> }/> */}
                </Router>
            </div>
        );
}

export default Navigation