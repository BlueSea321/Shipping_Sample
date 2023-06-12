import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  ListItemIcon,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addCourier, deleteCourier, editCourier, getAllCouriers } from "../API/courier";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminBody from "../Components/AdminBody";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Admin = () => {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [editData, setEditData] = React.useState({});
  const [currentId, setCurrentId] = React.useState('')
  const [courierData, setCourierData] = React.useState({
    name: "",
    pricekm: "",
    pricekg: "",
  });

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const changeHandler = (e) => {
    setCourierData({
      ...courierData,
      [e.target.name]: e.target.value,
    });
  };

  const editChangeHandler = (e) => {
    setEditData({
        ...editData,
        [e.target.name]: e.target.value
    })
  }

  const openEdit = async (data) => {
    setEditData(data)
    setIsEdit(true);
  };

  const closeEdit = () => {
    setIsEdit(false);
  };

  const openDelete = (id) => {
    setCurrentId(id)
    setIsDelete(true);
  };

  const closeDelete = () => {
    setIsDelete(false);
    setCurrentId('')
  };

  const deleteSubmit = async () => {
    const res = await deleteCourier(currentId)
    setData(res.data)
    closeDelete()
  }

  const editSubmit = async (e) => {
    e.preventDefault();
    if (!editData.name || !editData.pricekg || !editData.pricekm) {
        toast.warning("Please fill all field correctly", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        const res = await editCourier(editData)
        setData(res.data);
        closeEdit()
      }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!courierData.name || !courierData.pricekg || !courierData.pricekm) {
      toast.warning("Please fill all field correctly", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const res = await addCourier(courierData);
      setData(res.data);
      closeHandler();
    }
  };

  React.useEffect(() => {
    async function getData() {
      const res = await getAllCouriers();
      setData(res.data);
    }
    getData();
  }, []);
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
    <AdminBody>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="success"
          sx={{ marginBottom: "10px" }}
          onClick={openHandler}
        >
          Add courier
        </Button>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeHandler}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box component="form" sx={style} onSubmit={submit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  label="Name"
                  value={courierData.name}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="pricekm"
                  type="number"
                  required
                  fullWidth
                  label="Price per kilometer"
                  value={courierData.pricekm}
                  onChange={changeHandler}
                  InputProps={{
                    inputProps: {min: 0}
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="pricekg"
                  type="number"
                  required
                  fullWidth
                  label="Price per kilogram"
                  value={courierData.pricekg}
                  onChange={changeHandler}
                  InputProps={{
                    inputProps: {min: 0}
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              sx={{ marginTop: "20px" }}
              variant="contained"
              color="success"
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isEdit}
        onClose={closeEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isEdit}>
          <Box component="form" sx={style} onSubmit={editSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  label="Name"
                  value={editData.name}
                  onChange={editChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="pricekm"
                  type="number"
                  required
                  fullWidth
                  label="Price per kilometer"
                  value={editData.pricekm}
                  onChange={editChangeHandler}
                  InputProps={{
                    inputProps: {min: 0}
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="pricekg"
                  type="number"
                  required
                  fullWidth
                  label="Price per kilogram"
                  value={editData.pricekg}
                  onChange={editChangeHandler}
                  InputProps={{
                    inputProps: {min: 0}
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              sx={{ marginTop: "20px" }}
              variant="contained"
              color="success"
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isDelete}
        onClose={closeDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isDelete}>
          <Box sx={style}>
            <Typography variant="h6">
                Do you really remove this courier?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="success"
              sx={{
                marginRight: '10px'
              }}
              onClick={deleteSubmit}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={closeDelete}
            >
              Cancel
            </Button>
            </Box>
            
          </Box>
        </Fade>
      </Modal>
      <ToastContainer />

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
              openEdit(row.original)
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            Edit
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => {
              openDelete(row.original._id)
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            Remove
          </MenuItem>,
        ]}
      />
    </AdminBody>
  );
};

export default Admin;
