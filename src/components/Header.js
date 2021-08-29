import 'styles/Header.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import refreshPage from 'utils/refreshPage';

function Header() {
    return (
    <div onClick={refreshPage} className="Header">
        <div className="Header-names">
            <Router>
                <Link exact to="/" className="Header-text">luv <span className="Header-and">&</span> krishi</Link>
            </Router>
        </div>
    </div>
    );
}

export default Header;