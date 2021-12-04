import 'styles/App.css';
import Header from 'components/Header';
import Venue from 'components/Venue';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import GuestPortalRoutes from 'views/routes/GuestPortalRoutes';
import { Component } from 'react';

class GuestPortal extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <Venue />
          <Navigation />
          <GuestPortalRoutes />
          <Footer />
      </div>
    );
  }
};

export default GuestPortal;
