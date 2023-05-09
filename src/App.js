import './App.css';
import classes from './App.module.css'
import { useState, useEffect } from 'react';
import Offers from './components/Offers/Offers';
import CountrySelector from './components/CountrySelector/CountrySelector';
import OfferProvider from './store/OfferProvider';
import DataSelector from './components/DataSelector/DataSelector';
import DurationSelector from './components/DurationSelector/DurationSelector';

const App = () => {

  const [nberOfOffers, setnberOfOffers] = useState([0])
  const getNberOfOffers = (val) => {
    setnberOfOffers(val)
  }

  useEffect(() => {
    let communication = () => {
      let url = window.location != window.parent.location ? document.referrer : document.location.href;

      // console.log('messaging parent window')
      window.parent.postMessage(nberOfOffers, url);
    };
    communication();
  }, [nberOfOffers]);


  return (
    <OfferProvider>
      <div className="App">
        <div className={classes.appContainer}>
          <div className={classes.inputsContainer}>
            <CountrySelector />
            <DataSelector />
            <DurationSelector />
          </div>
          <Offers onSendData={getNberOfOffers} />
        </div>
      </div>
    </OfferProvider>
  );
}

export default App;
