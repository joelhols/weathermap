import "./Display.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";

const Display = (props) => {
  const mapRef = useRef(null);
  const { data, forecast } = props;
  useEffect(() => {
    if (data) {
      if (!mapRef.current) {
        const map = L.map("map").setView(
          [data.location.lat, data.location.lon],
          13
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);
        mapRef.current = map;
      } else {
        mapRef.current.setView([data.location.lat, data.location.lon], 10);
      }
    }
  }, [data]);

  return (
    <>
      <div className="displaycontainer">
        {props.location && (
          <div className="displayWeatherwrapper">
            Location: {props.location}
          </div>
        )}
        {props.current && (
          <div className="displayWeatherwrapper">Current: {props.current}</div>
        )}
        {props.temp && (
          <div className="displayWeatherwrapper">
            Temp: {props.temp} <img src={props.img} alt="" />
          </div>
        )}
        {forecast && (
          <div className="forecast">
            {forecast.map((day) => (
              <div key={day.date}>
                <div className="daysafter">
                  {new Date(day.date).toLocaleDateString()} {":"}{" "}
                  {day.day.avgtemp_c}
                  &deg;C <img src={day.day.condition.icon} alt="" />{" "}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* <div className="leaflet-container"></div> */}
        <div id="map"></div>
      </div>
    </>
  );
};

export default Display;
