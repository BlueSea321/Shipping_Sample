import {
  Box,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import CustomMenu from "../Components/CustomMenu/CustomMenu";
import MainBody from "../Components/MainBody";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CreditCardInput from "react-credit-card-input";
import AutoComplete from "../Components/AutoComplete/AutoComplete";
import { getDistance } from "geolib";
import { useNavigate, useParams } from "react-router-dom";
import { getCourierById } from "../API/courier";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOffer } from "../API/offer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#658995",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const CalcButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "16px 22px",
  borderRadius: "8px",
  backgroundColor: "#5cb85c",
  "&:hover": {
    backgroundColor: "#5fcc5f",
  },
}));

const OfferButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "16px 22px",
  borderRadius: "8px",
  backgroundColor: "#f47920",
  "&:hover": {
    backgroundColor: "#f98b1b",
  },
}));

export default function MakeOffers() {
  const navigate = useNavigate();
  const courierId = useParams().courierId;
  const [open, setOpen] = React.useState(false);
  const [isPayBox, setIsPayBox] = React.useState(false);
  const [collectionAddress, setCollectionAddress] = React.useState("");
  const [collectionGeo, setCollectionGeo] = React.useState({
    latitude: "",
    longitude: "",
  });
  const [deliveryGeo, setDeliveryGeo] = React.useState({
    latitude: "",
    longitude: "",
  });
  const [deliveryType, setDeliveryType] = React.useState("normal");
  const [deliveryAddress, setDeliveryAddress] = React.useState("");
  const [materialType, setMaterialType] = React.useState(
    "Furniture & General Items"
  );
  const [weight, setWeight] = React.useState("");
  const [courierInfo, setCourierInfo] = React.useState({});
  const [price, setPrice] = React.useState("");
  const [creditCardInfo, setCreditCardInfo] = React.useState({
    cvc: '',
    expiry: '',
    number: ''
  })

  React.useEffect(() => {
    async function getData() {
      const res = await getCourierById(courierId);
      setCourierInfo(res.data);
    }
    getData();
  }, [courierId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openPayBox = () => {
    if (!collectionAddress) {
      toast.warning("Please enter collection location!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!deliveryAddress) {
      toast.warning("Please enter delivery location!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!weight) {
      toast.warning("Please enter weight!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const distance = Math.ceil(
        getDistance(collectionGeo, deliveryGeo) / 1000
      );
      const totalPrice = calculate(
        distance,
        weight,
        deliveryType,
        courierInfo.pricekm,
        courierInfo.pricekg
      );
      setPrice(totalPrice);
      setIsPayBox(true);
    }
  };

  const closePayBox = () => {
    setIsPayBox(false);
  };

  const calculate = (distance, weight, deliveryType, pricekm, pricekg) => {
    if (weight < 0) {
      toast.error("Please enter positive weight!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return 0;
    } else {
      let totalPrice;
      if (deliveryType === "express") {
        totalPrice = (distance * pricekm + weight * pricekg) * 1.5;
      } else {
        totalPrice = distance * pricekm + weight * pricekg;
      }
      return totalPrice;
    }
  };

  const calcPrice = () => {
    if (!collectionAddress) {
      toast.warning("Please enter collection location!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!deliveryAddress) {
      toast.warning("Please enter delivery location!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!weight) {
      toast.warning("Please enter weight!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const distance = Math.ceil(
        getDistance(collectionGeo, deliveryGeo) / 1000
      );
      const totalPrice = calculate(
        distance,
        weight,
        deliveryType,
        courierInfo.pricekm,
        courierInfo.pricekg
      );
      setPrice(totalPrice);
      handleOpen();
    }
  };

  const makeOffer = async () => {
    if (!collectionAddress) {
      toast.warning("Please enter collection location!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!deliveryAddress) {
      toast.warning("Please enter delivery location!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!weight) {
      toast.warning("Please enter weight!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!creditCardInfo.cvc) {
      toast.warning("Please enter credit card info correctly", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!creditCardInfo.expiry) {
      toast.warning("Please enter credit card info correctly", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!creditCardInfo.number) {
      toast.warning("Please enter credit card info correctly", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const distance = Math.ceil(
        getDistance(collectionGeo, deliveryGeo) / 1000
      );
      const name = localStorage.getItem("transport_user_name");
      const totalPrice = calculate(
        distance,
        weight,
        deliveryType,
        courierInfo.pricekm,
        courierInfo.pricekg
      );
      const data = {
        couriername: courierInfo.name,
        username: name,
        courierId: courierInfo._id,
        materialType: materialType,
        collectionAddress: collectionAddress,
        deliveryAddress: deliveryAddress,
        deliveryType: deliveryType,
        distance: distance,
        weight: weight,
        totalPrice: totalPrice,
        cvc: creditCardInfo.cvc,
        expiry: creditCardInfo.expiry,
        number: creditCardInfo.number
      };
      const res = await createOffer(data);
      if (res.status === "success") {
        navigate("/offers");
      }
    }
  };

  return (
    <MainBody>
      <Box
        component="form"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "30px 40px",
          paddingTop: "50px",
          marginTop: "40px",
          border: "1px solid #f5bf80",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-25px",
            left: "30px",
            background: "white",
            padding: "10px",
          }}
        >
          <Typography
            sx={{ fontSize: "20px", color: "#e28f3d", fontWeight: "bold" }}
          >
            Make an offer
          </Typography>
        </Box>
        <CustomMenu
          materialType={materialType}
          setMaterialType={setMaterialType}
        />
        <Grid
          container
          sx={{ marginTop: "0px" }}
          rowSpacing={4}
          columnSpacing={{ xs: 2 }}
        >
          <Grid item xs={12} sm={6}>
            <AutoComplete
              placesKey="AIzaSyD5-mJU8x096rUj4O9xWNv8MLXTJEHiOWc"
              inputId="collectionAddress"
              setAddress={setCollectionAddress}
              type="collection"
              setGeo={setCollectionGeo}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AutoComplete
              placesKey="AIzaSyD5-mJU8x096rUj4O9xWNv8MLXTJEHiOWc"
              inputId="deliveryAddress"
              setAddress={setDeliveryAddress}
              type="delivery"
              setGeo={setDeliveryGeo}
              required={true}
            />
          </Grid>
        </Grid>
        <FormControl sx={{ marginTop: "28px" }}>
          <Select
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
            displayEmpty
            sx={{ borderRadius: "8px" }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="express">Express</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{ width: "100%", marginTop: "28px" }}
          variant="outlined"
        >
          <OutlinedInput
            id="outlined-adornment-weight"
            type="number"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            sx={{ borderRadius: "8px" }}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
              min: 0,
            }}
          />
        </FormControl>
        <Grid
          container
          sx={{ marginTop: "0px" }}
          rowSpacing={4}
          columnSpacing={{ xs: 2 }}
        >
          <Grid item xs={12} sm={6}>
            <CalcButton variant="contained" size="large" onClick={calcPrice}>
              CALCULATE PRICE
            </CalcButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <OfferButton variant="contained" size="large" onClick={openPayBox}>
              RECEIVE QUOTES IN MINUTES
            </OfferButton>
          </Grid>
        </Grid>
        <ToastContainer />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              sx={{ fontWeight: "bold", color: "#e49e39" }}
            >
              Total Price
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#92d643",
                mt: 2,
              }}
            >
              {price} USD
            </Typography>
            <Button
              variant="contained"
              sx={{ marginTop: "50px", width: "100px" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={isPayBox}
        onClose={closePayBox}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='creditCardInput'>
          <Typography
            sx={{ marginBottom: "10px", color: "#ee8109", fontSize: "20px" }}
          >
            Please enter your credit card info
          </Typography>
          <CreditCardInput
            cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
              <input
                {...props}
                onChange={handleCardCVCChange((e) =>
                  console.log("cvc change", setCreditCardInfo({ ...creditCardInfo, cvc: e.target.value}) )
                )}
              />
            )}
            cardExpiryInputRenderer={({ handleCardExpiryChange, props }) => (
              <input
                {...props}
                onChange={handleCardExpiryChange((e) =>
                  console.log("expiry change", setCreditCardInfo({ ...creditCardInfo, expiry: e.target.value}))
                )}
              />
            )}
            cardNumberInputRenderer={({ handleCardNumberChange, props }) => (
              <input
                {...props}
                onChange={handleCardNumberChange((e) =>
                  console.log("number change", setCreditCardInfo({ ...creditCardInfo, number: e.target.value}))
                )}
              />
            )}
          />
          <Typography
            sx={{
              marginBottom: "10px",
              marginTop: "10px",
              color: "#ee8109",
              fontSize: "20px",
            }}
          >
            Amount
          </Typography>
          <OutlinedInput
            id="outlined-adornment-weight"
            type="number"
            placeholder="Amount"
            value={Math.ceil(price)}
            sx={{ width: "100%", background: "white" }}
            endAdornment={<InputAdornment position="end">USD</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
              min: 0,
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "45%" }}
              onClick={makeOffer}
              color='success'
            >
              Pay
            </Button>
            <Button
              variant="outlined"
              sx={{ width: "45%" }}
              onClick={closePayBox}
              color='secondary'
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </MainBody>
  );
}
