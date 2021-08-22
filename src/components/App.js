import logo from 'images/logo.svg';
import 'layouts/App.css';
import Header from 'components/Header';
import Venue from 'components/Venue';
import Navigation from 'components/Navigation';
import Content from 'components/Content';
import Footer from 'components/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Venue />
        <Navigation />
        <Content />
        <Footer />
      </header>
    </div>
  );
}

export default App;
