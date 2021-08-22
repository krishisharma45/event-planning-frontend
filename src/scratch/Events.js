import logo from 'images/logo.svg';
import 'layouts/App.css';
import Header from 'components/Header';
import Venue from 'components/Venue';
import Navigation from 'components/Navigation';
import Content from 'components/Content';
import Footer from 'components/Footer';
import EventTimeline from 'components/EventTimeline';

function Events() {
  return (
    <div className="Events">
        <EventTimeline />
    </div>
  );
}

export default Events;