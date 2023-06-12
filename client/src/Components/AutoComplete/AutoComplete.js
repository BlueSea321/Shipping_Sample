import React, { useEffect, useState } from "react";
import { FormControl, TextField, InputAdornment } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const AutoComplete = ({ placesKey, inputId, setAddress, type, setGeo, required }) => {
  //input state
  const [input, setInput] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");

  //functionally clear all state
  const clear = (e) => {
    if (e) e.preventDefault();
    setInput("");
    setFormattedAddress("");
  };

  //on mount, load google auto complete
  useEffect(() => {
    const renderGoogle = () => {
      window[inputId] = new window.google.maps.places.Autocomplete(
        document.getElementById(inputId),
        {}
      );
      const handlePlaceSelect = () => {
        const place = window[inputId].getPlace();
        setGeo({
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
        })
        clear();
        setFormattedAddress(place.formatted_address);
        setInput(place.formatted_address);
      };

      //listen for place change in input field
      window[inputId].addListener("place_changed", handlePlaceSelect);
    };

    //if places script is already found then listen for load and then renderGoogle
    let found = document.getElementById("placesScript") ? true : false;
    if (!found) {
      const script = document.createElement("script");
      script.id = "placesScript";
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        placesKey +
        "&libraries=places";
      // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD5-mJU8x096rUj4O9xWNv8MLXTJEHiOWc&libraries=places";
      script.async = true;
      script.onload = () => renderGoogle();
      document.body.appendChild(script);
    }
    if (found) {
      document
        .getElementById("placesScript")
        .addEventListener("load", renderGoogle);
    }
  }, [inputId, placesKey, setGeo]);

  //return address object to parent for your use case
  useEffect(() => {
    setAddress(formattedAddress);
  }, [formattedAddress, setAddress]);

  return (
    <>
      <FormControl
        sx={{
            width: '100%',
        }}
      >
        <TextField
          id={inputId}
          type="text"
          variant="outlined"
          placeholder={ type === 'collection'? 'Collection Location' : 'Delivery Location' }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon sx={type === 'collection' ? { fontSize: '30px', color: '#5cb85c'} : { fontSize: '30px', color: '#d9534f' } } />
              </InputAdornment>
            ),
          }}
          required
        />
      </FormControl>
    </>
  );
};

export default AutoComplete;
