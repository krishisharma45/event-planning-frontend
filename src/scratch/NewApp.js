import logo from 'images/logo.svg';
import 'layouts/App.css';

function NewApp() {
  return (
    <div className="NewApp">
      <header className="New-app-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is the start of the wedding website.
        </p>
      </header>
    </div>
  );
}

export default NewApp;
