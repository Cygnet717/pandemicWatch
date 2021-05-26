import './App.css';
import {Route, Link} from 'react-router-dom';
import AllStates from './components/AllStates/AllStates';
import LandingPage from './components/LandingPage/LandingPage.js';
import SingleState from './components/SingleState/SingleState';
import CountryVaccPie from './components/CountryVaccPie/CountryVaccPie';

function App() {
  return (
    <main className='App'>
      <div>
        <nav>
          <Link className="headerLink" to="/covid_project">Home</Link>
          <Link className="headerLink" to="/allstates">All States</Link>
          <Link className="headerLink" to="/singlestate">Single State</Link>
          <Link className="headerLink" to="/countryvaccinations">USA Vaccinations</Link>
        </nav>
        <div>
          <Route exact path={"/"} component={LandingPage}/>
          <Route exact path={"/covid_project"} component={LandingPage}/>
          <Route path={"/allstates"} component={AllStates} />
          <Route path={"/singlestate"} component={SingleState}/>
          <Route path={"/countryvaccinations"} component={CountryVaccPie}/>
        </div>
      </div>
    </main>
  );
}

export default App;