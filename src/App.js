import 'styles/App.css';
import GuestPortal from 'views/layouts/GuestPortal';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import refreshPage from 'utils/refreshPage';

function App() {
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
