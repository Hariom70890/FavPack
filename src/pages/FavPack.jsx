import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Paper,
  Typography,
} from '@mui/material';
// import { Delete, Edit, Visibility } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FavouritePackage = () => {
  const [storedData, setStoredData] = useState(localStorage.getItem('favouritePackage'));
  const LSFavouriteData = storedData ? JSON.parse(storedData) : [];
  const navigation = useNavigate();

  const handleDataDelete = (name) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#73a0ca',
      cancelButtonColor: '#a45151',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const deletedData = LSFavouriteData.filter((el) => el.package_name !== name);
        localStorage.setItem('favouritePackage', JSON.stringify(deletedData));
        setStoredData(JSON.stringify(deletedData));
        Swal.fire({
          title: 'Deleted!',
          text: 'Your Package has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  const handleEdit = async (desc, name) => {
    const { value } = await Swal.fire({
      title: 'Edit Description',
      input: 'text',
      inputValue: desc,
    });
    if (value) {
      Swal.fire(`Edited: ${value}`);
      let editDatedData = LSFavouriteData.map((el) =>
        name === el.package_name ? { ...el, desc: value } : el
      );
      localStorage.setItem('favouritePackage', JSON.stringify(editDatedData));
      setStoredData(JSON.stringify(editDatedData));
    }
  };

  return (
    <Box style={{marginTop:"50px"}}>
      <Box
        style={{
          width: '80%',
          margin: 'auto',
          marginTop: '50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h5"
          component="div"
          style={{
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '5',
            padding: '4',
          }}
        >
          Welcome to Favourite NPM Packages
        </Typography>
        {LSFavouriteData.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            style={{
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: '#303F9F',
              width: '8.5rem',
              height: '3.5rem',
            }}
            onClick={() => navigation('/add-favourite')}
          >
            Add Fav
          </Button>
        )}
      </Box>

      {LSFavouriteData.length > 0 ? (
        <Box className="favouriteDataContainer">
          <TableContainer component={Paper} style={{ width: '80%', margin: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ borderColor: 'black', padding: '20px 100px', fontWeight:"bold" }}>Package Name</TableCell>
                  <TableCell style={{ borderColor: 'black', padding: '20px 18rem', fontWeight:"bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {LSFavouriteData.map((el, ind) => (
                  <TableRow key={ind} style={{ borderColor: 'black' }}>
                    <TableCell style={{ borderColor: 'black', fontFamily: 'mono', fontSize: 'lg', textAlign: 'center', padding: '16px' }}>
                      {el.package_name}
                    </TableCell>
                    <TableCell style={{ display: 'flex', justifyContent: 'space-around', padding: '16px' }}>
                    <IconButton style={{ background: 'light-green' }} onClick={() => Swal.fire(el.desc)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton style={{ background: 'yellow' }} onClick={() => handleEdit(el.desc, el.package_name)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton style={{ background: 'red' }} onClick={() => handleDataDelete(el.package_name)}>
                        <DeleteIcon />
                      </IconButton> </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box
          style={{
            border: '2px solid black',
            borderColor: 'black',
            width: '80%',
            margin: 'auto',
            height: '400px',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h5"
            style={{
              backgroundSize: '90%',
              margin: '140',
              padding: '2',
              fontSize: 'lg',
              fontWeight: 'bold',
              color: 'gray.400',
              textAlign: 'center',
            }}
          >
            You don't have any favs yet. Please add!
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            style={{
              borderRadius: '18px',
              fontSize: '1rem',
              backgroundColor: '#3949AB',
              width: '11rem',
              height: '3.5rem',
              textAlign: 'center',
            }}
            onClick={() => navigation('/add-favourite')}
          >
            Add Packages
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FavouritePackage;
