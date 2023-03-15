import { useState, useEffect } from "react";
import "./App.css";
import CardClime from "./components/CardClime";
import DarkClime from "./components/DarkClime";


function App() {


  // fin de obtencin ubicacion del dispositivo mist = a neblina current#parameter para ver los parametros
  // climas nombres de los iconos : https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

  // switch dark

  const [isDarck, setIsDarck] = useState(true);
  console.log(isDarck);

  return (
    <div className="App">
      
      
      <div className={isDarck ? "container__tools" : "container__tools-dark"}>
        <h1>Wather app</h1>
        <div className="switch-button">
          <input
            type="checkbox"
            name="switch-button"
            id="switch-label"
            className="switch-button__checkbox"
            onClick={() => setIsDarck(!isDarck)}
          />
          <label
            htmlFor="switch-label"
            className="switch-button__label"
          ></label>
        </div>
      </div>
      {isDarck ? <CardClime /> : <DarkClime />}
    </div>
  );
}

export default App;
