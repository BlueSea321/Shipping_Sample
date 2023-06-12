import React, { useMemo } from "react";
import MainBody from "../Components/MainBody";
import MaterialReactTable from "material-react-table";
import {
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from "react-router-dom";
import { getAllCouriers } from "../API/courier";

const Home = () => {
  const navigate = useNavigate()
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    async function getData() {
      const res = await getAllCouriers()
      console.log('d', res)
      setData(res.data)
    }
    const timer = setTimeout(getData(), 1000)
    return () => clearTimeout(timer)
  }, [])
  const columns = useMemo(
    () => [
      {
        id: "courier", 
        header: "Couriers",
        columns: [
          {
            accessorKey: "name", 
            enableClickToCopy: true,
            header: "Name",
            maxSize: 300,
            minSize: 50,
          },
          {
            accessorKey: "pricekm", 
            enableClickToCopy: true,
            header: "Price(USD/km)",
            maxSize: 300,
            minSize: 50,
          },
          {
            accessorKey: "pricekg", 
            enableClickToCopy: true,
            header: "Price(USD/kg)",
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
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowActions
        initialState={{ showColumnFilters: false }}
        positionToolbarAlertBanner="bottom"
        renderRowActionMenuItems={({ row }) => [
          <MenuItem
            key={0}
            onClick={() => {
              navigate(`/courier/profile/${row.original._id}`)
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            View Profile
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => {
              navigate(`/${row.original._id}/makeoffers`)
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <BorderColorIcon />
            </ListItemIcon>
            Make offer
          </MenuItem>,
        ]}
      />
    </MainBody>
  );
};

export default Home;
