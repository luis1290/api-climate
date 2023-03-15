import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

//  j style={{backgroundColor: '#56a5f1'}}
const CardClime = () => {
  const [clime, setClime] = useState({});
  const [city, setCit] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log(latitude);

    //geolocalizacion
    navigator.geolocation.getCurrentPosition((position) => {
      //AQUI YA TENGO LAS COORDENADAS
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=1daae56ba23a0b3e1d8fbde9d0c1fc3a&lang=sp`
        )
        .then((resp) => {
          // console.log(resp.data);
          setClime(resp.data);
        })
        .catch((error) => console.error(error));
        setIsLoading(false);
        
    });
   
    //fin geolocalizacion
  }, []);

  const [isFarengen, setIsFarengei] = useState(true);

  // console.log(clime.weather?.[0].description);
  const searchContry = () => {
    console.log(city);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1daae56ba23a0b3e1d8fbde9d0c1fc3a&lang=sp`
      )
      .then((resp) => {
        console.log(resp.data);
        setClime(resp.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      {
        isLoading && <Loader />
      }
      <div className="searchCit">
        <input
          placeholder="Escriba tu ciudad"
          className="inputSearch"
          type="text"
          value={city}
          onChange={(e) => setCit(e.target.value)}
        />
        <button className="btnChange" onClick={searchContry}>
          Buscar
        </button>
      </div>
      <div className="container__card">
        <div className="container__card-info">
          <span className="temperature">
            {isFarengen
              ? `${Math.floor(clime.main?.temp - 273.15)} °C`
              : `${
                  Math.floor(Math.floor(clime.main?.temp - 273.15) * 1.8) + 32
                } °F`}
          </span>
          <span className="speed">viento:{clime.wind?.speed} m/s</span>
          <span className="pressure">Presión:{clime.main?.pressure}</span>
        </div>
        <img
          className="imgClime"
          src={`/iconos/${clime.weather?.[0].main}.svg`}
          alt=""
        />
        <div className="container__card-description">
          <span className="description">{clime.weather?.[0].description}</span>
          <span className="description">
            sensacion termica:{" "}
            {`${Math.floor(clime.main?.feels_like - 273.15)} °C`}{" "}
          </span>
          <span className="location">
            {clime.sys?.country} / {clime.name}
          </span>
        </div>
      </div>
      <div>
        <button
          onClick={() => setIsFarengei(!isFarengen)}
          className="btnChange"
        >
          Cambiar a F
        </button>
      </div>
    </div>
  );
};

export default CardClime;
