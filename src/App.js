import './App.css';
import { useState, useEffect } from 'react';
import Offers from './components/Offers/Offers';
import CountrySelector from './components/CountrySelector/CountrySelector';

const App = () => {
  const [nberOfOffers, setnberOfOffers] = useState([0])

  const getNberOfOffers = (val) => {
    setnberOfOffers(val)
  }

  useEffect(() => {
    let communication = () => {
      let url = window.location != window.parent.location ? document.referrer : document.location.href;

      window.parent.postMessage(nberOfOffers, url);
    };

    communication();
  }, [nberOfOffers]);


  return (
    <div className="App">
      <CountrySelector />      
      <Offers onSendData={getNberOfOffers} />
    </div>
  );
}

export default App;
