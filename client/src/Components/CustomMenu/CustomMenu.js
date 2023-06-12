import { Box } from "@mui/material";
import WeekendIcon from "@mui/icons-material/Weekend";
import InventoryIcon from "@mui/icons-material/Inventory";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import PetsIcon from "@mui/icons-material/Pets";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./style.css";
import React from "react";

const customContent = (content) => {
  if (content === "Furniture & General Items") {
    return (
      <>
        <WeekendIcon />
        Furniture & General Items
      </>
    );
  } else if (content === "Boxes") {
    return (
      <>
        <InventoryIcon />
        Boxes
      </>
    );
  } else if (content === "Cars") {
    return (
      <>
        <DirectionsCarIcon />
        Cars
      </>
    );
  } else if (content === "Motorcycles") {
    return (
      <>
        <TwoWheelerIcon />
        Motorcycles
      </>
    );
  } else if (content === "Other Vehicles") {
    return (
      <>
        <DirectionsBusIcon />
        Other Vehicles
      </>
    );
  } else if (content === "Moving Home") {
    return (
      <>
        <HomeIcon />
        Moving Home
      </>
    );
  } else if (content === "Haulage") {
    return (
      <>
        <LocalShippingIcon />
        Haulage
      </>
    );
  } else if (content === "Boats") {
    return (
      <>
        <DirectionsBoatIcon />
        Boats
      </>
    );
  } else if (content === "Vehicle Parts") {
    return (
      <>
        <SettingsSuggestIcon />
        Vehicle Parts
      </>
    );
  } else if (content === "Pianos") {
    return (
      <>
        <MusicNoteIcon />
        Pianos
      </>
    );
  } else if (content === "Pets & Livestock") {
    return (
      <>
        <PetsIcon />
        Pets & Livestock
      </>
    );
  } else if (content === "Other") {
    return (
      <>
        <SettingsIcon />
        Other
      </>
    );
  }
};

export default function CustomMenu({ materialType, setMaterialType }) {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <Box className="custom_dropdown">
      <Box
        onClick={(e) => {
          setIsActive(!isActive);
        }}
        className="custom_dropdown-btn"
      >
        {materialType ? customContent(materialType) : ""}
        <ArrowDropDownIcon sx={{ 'fontSize': '30px' }} />
      </Box>
      <Box
        className="custom_dropdown-content"
        style={{ display: isActive ? "block" : "none" }}
      >
        <Box
          onClick={(e) => {
            setMaterialType(e.target.textContent);
            setIsActive(!isActive);
          }}
          className="custom_item"
        >
          <WeekendIcon sx={{ marginRight: "10px" }} />
          Furniture & General Items
        </Box>
        <Box
          className="custom_item"
          onClick={(e) => {
            setMaterialType(e.target.textContent);
            setIsActive(!isActive);
          }}
        >
          <InventoryIcon sx={{ marginRight: "10px" }} />
          Boxes
        </Box>
        <Box
          className="custom_item"
          onClick={(e) => {
            setMaterialType(e.target.textContent);
            setIsActive(!isActive);
          }}
        >
          <DirectionsCarIcon sx={{ marginRight: "10px" }} />
          Cars
        </Box>
        <Box
          className="custom_item"
          onClick={(e) => {
            setMaterialType(e.target.textContent);
            setIsActive(!isActive);
          }}
        >
          <TwoWheelerIcon sx={{ marginRight: "10px" }} />
          Motorcycles
        </Box>
        <Box
          className="custom_item"
          onClick={(e) => {
            setMaterialType(e.target.textContent);
            setIsActive(!isActive);
          }}
        >
          <DirectionsBusIcon sx={{ marginRight: "10px" }} />
          Other Vehicles
        </Box>
        <Box
          className="custom_item"
          onClick={(e) => {
            setMaterialType(e.target.textContent);
            setIsActive(!isActive);
          }}
        >
          <HomeIcon sx={{ marginRight: "10px" }} />
          Moving Home
        </Box>
        <Box
          className="custom_item"
          onClick={(e) => {
            setMaterialType(e.target.textContent);
            setIsActive(!isActive);
          }}
        >
          <LocalShippingIcon sx={{ marginRight: "10px" }} />
          Haulage
        </Box>
        <Box
          className="custom_item"
          onClick={(e) => {
            setMaterialType(e.target.textContent);
            setIsActive(!isActive);
          }}
        >
          <DirectionsBoatIcon sx={{ marginRight: "10px" }} />
          Boats
        </Box>
        <Box
          className="custom_item"
          onClick={(e) => {
            setMaterialType(e.target.textContent);
            setIsActive(!isActive);
          }}
        >
          <SettingsSuggestIcon sx={{ marginRight: "10px" }} />
          Vehicle Parts
        </Box>
        <Box
          className="custom_item"
          onClick={(e) => {
            setMaterialType(e.target.textContent);
            setIsActive(!isActive);
          }}
        >
          <MusicNoteIcon sx={{ marginRight: "10px" }} />
          Pianos
        </Box>
        <Box
          className="custom_item"
          onClick={(e) => {
            setMaterialType(e.target.textContent);
            setIsActive(!isActive);
          }}
        >
          <PetsIcon sx={{ marginRight: "10px" }} />
          Pets & Livestock
        </Box>
        <Box
          className="custom_item"
          onClick={(e) => {
            setMaterialType(e.target.textContent);
            setIsActive(!isActive);
          }}
        >
          <SettingsIcon sx={{ marginRight: "10px" }} />
          Other
        </Box>
      </Box>
    </Box>
  );
}
