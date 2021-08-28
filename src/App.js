import 'styles/App.css';
import GuestPortal from 'views/layouts/GuestPortal';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  function refreshPage() {
    window.location.reload();
  }

  return (
    <div onClick={refreshPage}>
        <BrowserRouter>
            <Switch>
                <Route path={"/"} component={GuestPortal}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
};

export default App;
