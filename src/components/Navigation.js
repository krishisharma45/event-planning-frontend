import '../styles/Navigation.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';

function Navigation() {
    return (
        <div className="Navigation">
            <Router>
                <Link to="/events" className="Nav-events">events</Link>
                <Link to="/story" className="Nav-events">story</Link>
                <Link to="/faq" className="Nav-events">faq</Link>
                <Link to="/travel" className="Nav-events">travel</Link>
            </Router>
        </div>
    );
}

export default Navigation;