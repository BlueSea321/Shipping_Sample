import React from "react";
import { getAllOffers } from "../API/offer";
import MaterialReactTable from "material-react-table";
import MainBody from "../Components/MainBody";
import { Box, Typography, Grid } from "@mui/material";

export default function Offers() {
  const [offerData, setOfferData] = React.useState([]);

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

  React.useEffect(() => {
    async function getData() {
      const res = await getAllOffers();
      console.log(res);
      setOfferData(res.data);
    }
    getData();
  }, []);
  return (
    <MainBody>
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
                <Typography sx={{ fontSize: '14px' }}><strong>Offer ID:</strong></Typography>
                <Typography sx={{ fontSize: '14px' }}>{row.original.offerId}</Typography>
              </Box>
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
                <Typography sx={{ fontSize: '14px' }}><strong>Transport Provider:</strong></Typography>
                <a href={`/courier/profile/${row.original.courierId}`}>
                  <Typography sx={{ fontSize: '14px' }}>{row.original.couriername}</Typography>
                </a>
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
                <Typography sx={{ fontSize: '14px' }}><strong>Credit Card:</strong></Typography>
                <Typography sx={{ fontSize: '14px' }}>{row.original.number}</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: '14px' }}><strong>CVC:</strong></Typography>
                <Typography sx={{ fontSize: '14px' }}>{row.original.cvc}</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: '14px' }}><strong>Expiry:</strong></Typography>
                <Typography sx={{ fontSize: '14px' }}>{row.original.expiry}</Typography>
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
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: '14px' }}><strong>Created Date:</strong></Typography>
                <Typography sx={{ fontSize: '14px' }}>{row.original.createdDate}</Typography>
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
