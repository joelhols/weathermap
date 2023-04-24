import { useState } from "react";
import "./Input.css";

const Input = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleDayChange = (e) => {
    props.foreCastDays(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateState(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    props.updateState(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputwrapper">
        <label className="label" htmlFor="myInput"></label>
        <input
          className="input"
          type="text"
          id="myInput"
          placeholder="Search location"
          value={inputValue}
          onChange={handleChange}
        />
        <button className="button" onClick={handleClick}>
          Search
        </button>
        <select
          className="select"
          value={props.forecast}
          onChange={handleDayChange}
        >
          <option value="1">1 day forecast</option>
          <option value="2">2 day forecast</option>
          <option value="3">3 day forecast</option>
        </select>
      </div>
    </form>
  );
};

export default Input;
