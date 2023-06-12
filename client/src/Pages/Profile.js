import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { getCourierById } from "../API/courier";
import { getOffersById } from "../API/offer";
import MainBody from "../Components/MainBody";
import MaterialReactTable from "material-react-table";

export default function Profile() {
  const courierId = useParams().courierId;
  const [courierInfo, setCourierInfo] = React.useState({});
  const [offerData, setOfferData] = React.useState([]);
  const [normalOffers, setNormalOffers] = React.useState([])
  const [expressOffers, setExpressOffers] = React.useState([])

  React.useEffect(() => {
    async function getData() {
      const res = await getCourierById(courierId);
      setCourierInfo(res.data);
      const offers = await getOffersById(courierId);
      setOfferData(offers.data);
      setNormalOffers(offers.normal);
      setExpressOffers(offers.express)
    }
    getData();
  });

  const columns = React.useMemo(
    () => [
      {
        id: "offer",
        header: "Offers",
        columns: [
          {
            accessorKey: "materialType",
            enableClickToCopy: true,
            header: "Item",
            maxSize: 300,
            minSize: 50,
          },
          {
            accessorKey: "collectionAddress",
            enableClickToCopy: true,
            header: "Collection",
            maxSize: 300,
            minSize: 50,
          },
          {
            accessorKey: "deliveryAddress",
            enableClickToCopy: true,
            header: "Delivery",
            maxSize: 300,
            minSize: 50,
          },
          {
            accessorKey: "distance",
            enableClickToCopy: true,
            header: "Distance(km)",
            maxSize: 300,
            minSize: 50,
          },
        ],
      },
    ],
    []
  );

  return (
    <MainBody>
      <Grid container my={4} rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              width: "100%",
              borderRadius: "10px",
              border: "1px solid #e7e6e6",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                padding: "15px",
                background: "#5fcc5f",
              }}
            >
              <Typography
                sx={{ color: "white", fontWeight: "bold", fontSize: "18px" }}
              >
                Courier Information
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
              }}
            >
              <Typography>Name:</Typography>
              <Typography>{courierInfo.name}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
              }}
            >
              <Typography>
                Price(<small>USD/km</small>):
              </Typography>
              <Typography>${courierInfo.pricekm}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
              }}
            >
              <Typography>
                Price(<small>USD/kg</small>):
              </Typography>
              <Typography>${courierInfo.pricekg}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              width: "100%",
              borderRadius: "10px",
              border: "1px solid #e7e6e6",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                padding: "15px",
                background: "#f98a11",
              }}
            >
              <Typography
                sx={{ color: "white", fontWeight: "bold", fontSize: "18px" }}
              >
                Courier Detail
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
              }}
            >
              <Typography>Offers:</Typography>
              <Typography>{offerData.length}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
              }}
            >
              <Typography>
                Express:
              </Typography>
              <Typography>{expressOffers.length}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
              }}
            >
              <Typography>
                Normal:
              </Typography>
              <Typography>{normalOffers.length}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <MaterialReactTable
        columns={columns}
        data={offerData}
        enableColumnFilterModes
        initialState={{ showColumnFilters: false }}
        positionToolbarAlertBanner="bottom"
        renderDetailPanel={({ row }) => (
          <Grid container rowSpacing={4} columnSpacing={{ xs: 2 }}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: '14px' }}><strong>Username:</strong></Typography>
                <Typography sx={{ fontSize: '14px' }}>{row.original.username}</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: '14px' }}><strong>Material Type:</strong></Typography>
                <Typography sx={{ fontSize: '14px' }}>{row.original.materialType}</Typography>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: '14px' }}><strong>Delivery Type:</strong></Typography>
                <Typography sx={{ fontSize: '14px' }}>{row.original.deliveryType}</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: '14px' }}><strong>Distance:</strong></Typography>
                <Typography sx={{ fontSize: '14px' }}>{row.original.distance}km</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: '14px' }}><strong>Weight:</strong></Typography>
                <Typography sx={{ fontSize: '14px' }}>{row.original.weight}kg</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: '14px' }}><strong>Total Price:</strong></Typography>
                <Typography sx={{ fontSize: '14px' }}>{row.original.totalPrice}USD</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{ width: "100%", display: "flex", flexDirection: "column" }}
              >
                <Typography sx={{ fontSize: '14px' }}><strong>Collection:</strong></Typography>
                <Typography sx={{ fontSize: '14px', marginLeft: '5px' }}>{row.original.collectionAddress}</Typography>
              </Box>
              <Box
                sx={{ width: "100%", display: "flex", flexDirection: "column" }}
              >
                <Typography sx={{ fontSize: '14px' }}><strong>Delivery:</strong></Typography>
                <Typography sx={{ fontSize: '14px', marginLeft: '5px' }}>{row.original.deliveryAddress}</Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      />
    </MainBody>
  );
}
