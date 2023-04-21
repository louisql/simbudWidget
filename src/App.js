import './App.css';
import Offers from './components/Offers/Offers';

function App() {

  let communication = () => {
    let url = 
    window.location != window.parent.location
      ? document.referrer
      : document.location.href;
    window.parent.postMessage("communication", url);
  };

  return (
    <div className="App">
      <Offers />
    </div>
  );
}

export default App;
