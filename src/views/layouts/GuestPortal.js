import 'styles/App.css';
import Header from 'components/Header';
import Venue from 'components/Venue';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import GuestPortalRoutes from 'views/routes/GuestPortalRoutes';

function GuestPortal() {
  return (
    <div className="App">
        <Header />
        <Venue />
        <Navigation />
        <GuestPortalRoutes />
        <Footer />
    </div>
  );
};

export default GuestPortal;
