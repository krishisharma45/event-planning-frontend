import 'layouts/Navigation.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Link, Route, Switch} from 'react-router-dom';
import App from 'components/App';


function Navigation() {
    return (
        <div className="Navigation">
            <Router>
                <Link to="/events" className="Nav-events">events</Link>
                <Link to="/story" className="Nav-story">story</Link>
                <Link to="/faq" className="Nav-faq">faq</Link>
                <Link to="/travel" className="Nav-travel">travel</Link>
                <Route exact path="/" exact Component={App}/>
                <Route exact path="/events" exact Component={App} />
                <Route exact path="/story" Component={App} />
                <Route exact path="/faq" Component={App} />
                <Route exact path="/travel" Component={App} />
            </Router>
        </div>
    );
}

export default Navigation;