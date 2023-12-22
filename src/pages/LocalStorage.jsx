import React from "react";
import { useState, useEffect } from "react";

const LocalStorage = () => {
    const [localStorageData, setLocalStorageData] = useState(localStorage.getItem('myKey') || '');

  const handleLocalStorageChange = () => {
    // Update component state with the new data from local storage
    setLocalStorageData(localStorage.getItem('myKey') || '');
  };

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener('storage', handleLocalStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, []); // Empty dependency array means this effect will run once when the component mounts

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    // Update local storage when the input value changes
    localStorage.setItem('myKey', newValue);

    // Update component state
    setLocalStorageData(newValue);
  };

  return (
    <div>
      <input type="text" value={localStorageData} onChange={handleInputChange} />
      <p>Data from local storage: {localStorageData}</p>
    </div>
  );
};


export default LocalStorage 