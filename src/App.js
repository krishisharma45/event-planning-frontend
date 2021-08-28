import 'styles/App.css';
import GuestPortal from 'views/layouts/GuestPortal';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path={"/"} component={GuestPortal}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
};

export default App;
