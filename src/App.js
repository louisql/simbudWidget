import './App.css';
import { useState, useEffect } from 'react';
import Offers from './components/Offers/Offers';

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
      <Offers onSendData={getNberOfOffers} />
    </div>
  );
}

export default App;
