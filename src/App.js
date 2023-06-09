import './App.css';
import classes from './App.module.css'
import { useState, useEffect, useRef, useContext } from 'react';
import Offers from './components/Offers/Offers';
import CountrySelector from './components/CountrySelector/CountrySelector';
import OfferProvider from './store/OfferProvider';
import CurrencyProvider from './store/CurrencyProvider';
import DataSelector from './components/DataSelector/DataSelector';
import DurationSelector from './components/DurationSelector/DurationSelector';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import CurrencyContext from './store/CurrencyContext';


import common_en from "./translations/en/common.json";
import common_fr from "./translations/fr/common.json";


const App = () => {
  const appRef = useRef()
  const [appHeight, setAppHeight] = useState(0)
  const currencyCtx = useContext(CurrencyContext)
  const languageParentWindow = currencyCtx.languageParentWindow
  
  i18next.init({
    interpolation: { escapeValue: false },
    lng: languageParentWindow,                              
    resources: {
      en: {
        common: common_en
      },
      fr: {
        common: common_fr
      },
    },
  });

  const [nberOfOffers, setnberOfOffers] = useState([0])
  const getNberOfOffers = (val) => {
    setnberOfOffers(val)
  }

  useEffect(() => {
    setAppHeight(appRef.current.offsetHeight)


    let communication = () => {
      let url = window.location != window.parent.location ? document.referrer : document.location.href;

      // console.log('messaging parent window')
      window.parent.postMessage(appHeight, url);
    };
    communication();
  }, [nberOfOffers, appHeight]);

  return (
    <I18nextProvider i18n={i18next}>
      <CurrencyProvider>
        <OfferProvider>
          <div className="App" ref={appRef}>
            <div className={classes.appContainer}>
              <div className={classes.inputsContainer}>
                <CountrySelector  />
                <DataSelector />
                <DurationSelector />
              </div>
              <Offers onSendData={getNberOfOffers}  />
            </div>
          </div>
        </OfferProvider>
      </CurrencyProvider>
    </I18nextProvider>
  );
}

export default App;
