import './App.css';
import {Route} from 'react-router-dom';
import AllStates from './components/AllStates/AllStates';
import LandingPage from './components/LandingPage/LandingPage.js';
import SingleState from './components/SingleState/SingleState';
import CountryVaccPie from './components/CountryVaccPie/CountryVaccPie';
import Header from './components/Header/Header';

function App() {
  return (
    <main className='App'>
      <Header/>
      <Route exact path={"/"} component={LandingPage}/>
      <Route exact path={"/covid_project"} component={LandingPage}/>
      <Route path={"/allstates"} component={AllStates} />        <Route path={"/singlestate"} component={SingleState}/>
      <Route path={"/countryvaccinations"} component={CountryVaccPie}/>
    </main>
  );
}

export default App;