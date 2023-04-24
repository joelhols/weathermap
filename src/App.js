import "./App.css";
import Input from "./components/Input";
import Navbar from "./components/Navbar";

import React, { useEffect, useState } from "react";
import Display from "./components/Display";

function App() {
  const [cityName, setCityName] = useState("stockholm");
  const [data, setData] = useState(null);
  const [forecast, setForeCast] = useState(1);
  const [foreCastData, setForeCastData] = useState(null);

  const updateState = (val) => {
    setCityName(val);
  };
  const foreCastDays = (num) => {
    setForeCast(num);
  };

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=${forecast}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setForeCastData(data.forecast.forecastday);
      });
  }, [cityName, forecast]);

  return (
    <>
      <div className="App">
        <header className="App-header"></header>
        <Navbar />
        <Input updateState={updateState} foreCastDays={foreCastDays} />
        {data && (
          <Display
            data={data}
            location={data.location && data.location.country}
            current={data.current && data.current.condition.text}
            temp={data.current && data.current.temp_c}
            img={data.current && data.current.condition.icon}
            forecast={foreCastData}
          />
        )}
      </div>
    </>
  );
}

export default App;
