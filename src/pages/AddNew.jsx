import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDebounce } from '../pages/useDebounce';

const AddFavouritePackage = () => {
  const [searchText, setSearchText] = useState('');
  const debounceSearchText = useDebounce(searchText, 1000);
  const [searchedData, setSearchedData] = useState([]);
  const [package_name, setPackageName] = useState('');
  const [desc, setDesc] = useState('');
  const navigation = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.npms.io/v2/search?q=${debounceSearchText}`)
      .then((res) => setSearchedData(res.data.results))
      .catch((err) => '');
  }, [debounceSearchText]);

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setPackageName(value);
  };

  const handleSubmit = () => {
    if (!package_name || !desc) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please choose any package and add your favorite part.',
        footer: '<a href="#">Something went wrong!</a>',
      });
      return;
    }

    const newPackage = { package_name, desc };

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Package added to favorite',
      showConfirmButton: false,
      timer: 1500,
    });

    const storedData = localStorage.getItem('favouritePackage');
    const LSFavouriteData = storedData ? JSON.parse(storedData) : [];
    LSFavouriteData.push(newPackage);
    localStorage.setItem('favouritePackage', JSON.stringify(LSFavouriteData));

    setSearchText('');
    setDesc('');
    setSearchedData([]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ width: '90%', margin: 'auto', marginTop: '5px' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4B5563' }}>
          Search for NPM Packages.
        </p>
        <TextField
          placeholder="Search here...."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          fullWidth
          variant="outlined"
          style={{ marginBottom: '16px' }}
        />
      </div>

      <div style={{ marginLeft: '5%', marginTop: '30px' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4B5563' }}>Results</p>
        <div style={{ width: '50%', padding: '20px', margin: '15px', height: '280px', overflowY: 'scroll' }}>
          {searchedData.length === 0 ? (
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4B5563' }}>
              No search results...
            </p>
          ) : (
            <RadioGroup>
              {searchedData?.map((el, ind) => (
                <FormControlLabel
                  key={ind}
                  value={el.package.name}
                  control={<Radio color="primary" />}
                  label={<span style={{ fontSize: '1rem' }}>{el.package.name}</span>}
                  onChange={handleRadioChange}
                />
              ))}
            </RadioGroup>
          )}
        </div>
      </div>

      <div style={{ width: '90%', margin: 'auto', marginTop: '50px' }}>
        <TextareaAutosize
          placeholder="Write your thoughts here..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rowsMin={5}
          style={{ width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #CBD5E0' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', marginLeft: '0' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: '#1D4ED8',
              width: '8.5rem',
              height: '3.5rem',
            }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigation('/')}
            style={{
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: '#1D4ED8',
              width: '8.5rem',
              height: '3.5rem',
            }}
          >
            Favourites
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFavouritePackage;
