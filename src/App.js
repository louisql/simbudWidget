import './App.css';
import { useEffect } from 'react';
import Offers from './components/Offers/Offers';

const App = () => {
  useEffect(() => {
    let communication = () => {
      console.log("test communication")
      let targetOrigin = 'https://amazing-sundae-746c61.netlify.app/'; // replace with the domain of file2
      window.parent.postMessage('message', targetOrigin);
    };
    

    // let loadReactIframe = () => {
    //   window.parent.postMessage('GET MESSAGE FROM ME', '*');
    // };

    communication();
    loadReactIframe();
  }, []);


  return (
    <div className="App">
      <Offers />
    </div>
  );
}

export default App;
