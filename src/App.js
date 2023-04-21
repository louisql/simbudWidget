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
      // console.log("test communication")
      let targetOrigin = 'http://127.0.0.1:5500/'; // replace with the domain of file2
      window.parent.postMessage(nberOfOffers, targetOrigin);
    };
    

    // let loadReactIframe = () => {
    //   window.parent.postMessage('GET MESSAGE FROM ME', '*');
    // };

    communication();


  }, [nberOfOffers]);


  return (
    <div className="App">
      <Offers onSendData={getNberOfOffers}/>
    </div>
  );
}

export default App;
