import 'styles/Navigation.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import refreshPage from 'utils/refreshPage';

function Navigation() {
    return (
        <div onClick={refreshPage} className="Navigation">
            <Router>
                <Link to="/events" className="Nav-events">events</Link>
                <Link to="/story" className="Nav-story">story</Link>
                <Link to="/faq" className="Nav-faq">faq</Link>
                <Link to="/travel" className="Nav-travel">travel</Link>
            </Router>
        </div>
    );
}

export default Navigation;