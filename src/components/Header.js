import 'styles/Header.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';

function Header() {
    return (
    <div className="Header">
        <div className="Header-names">
            <Router>
                <Link to="/" className="Nav-events">luv & krishi</Link>
            </Router>
        </div>
    </div>
    );
}

export default Header;