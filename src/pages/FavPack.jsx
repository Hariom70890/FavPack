import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FavouritePackage = () => {
   // State for storing and managing favorite package data
   const [storedData, setStoredData] = useState(localStorage.getItem('favouritePackage'));
   const LSFavouriteData = storedData ? JSON.parse(storedData) : [];
   const navigation = useNavigate();

   // Handle deletion of a package
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

   // Handle editing of package description
   const handleEdit = async (desc, name) => {
      const { value } = await Swal.fire({
         title: 'Edit Description',
         input: 'text',
         inputValue: desc,
      });
      if (value) {
         Swal.fire(`Edited: ${value}`);
         let editDatedData = LSFavouriteData.map((el) => (name === el.package_name ? { ...el, desc: value } : el));
         localStorage.setItem('favouritePackage', JSON.stringify(editDatedData));
         setStoredData(JSON.stringify(editDatedData));
      }
   };

   return (
      <Box>
         {/* Header Section */}
         <Box className="headerContainer" w="80%" m="auto" mt="5" display="flex" alignItems="center" justifyContent="space-between">
            <Box fontSize="xl" fontFamily="sans-serif" mt="5" p="4">
               Welcome to Favourite NPM Packages
            </Box>
            {LSFavouriteData.length > 0 && (
               <Button colorScheme="teal" onClick={() => navigation('/add-favourite')}>
                  Add Fav
               </Button>
            )}
         </Box>

         {/* Display Favourite Data Section */}
         {LSFavouriteData.length > 0 ? (
            <Box className="favouriteDataContainer">
               <Table border="2px" borderColor="black" w="80%" m="auto">
                  <Thead>
                     <Tr>
                        <Th m="2" p="3" borderColor="black">
                           Package Name
                        </Th>
                        <Th m="2" p="3" borderColor="black">
                           Actions
                        </Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {LSFavouriteData.map((el, ind) => (
                        <Tr key={ind} border="2px" borderColor="black">
                           <Td border="2px" fontFamily="mono" fontSize="lg" textAlign="center" borderColor="black">
                              {el.package_name}
                           </Td>
                           <Td display="flex" justify="space-around" m="2" p="2">
                              <IconButton icon={<ViewIcon />} onClick={() => Swal.fire(el.desc)} />
                              <IconButton icon={<EditIcon />} onClick={() => handleEdit(el.desc, el.package_name)} />
                              <IconButton icon={<DeleteIcon />} onClick={() => handleDataDelete(el.package_name)} />
                           </Td>
                        </Tr>
                     ))}
                  </Tbody>
               </Table>
            </Box>
         ) : (
            /* Display Empty Container if there are no favorite packages */
            <Box className="emptyContainer" border="2px" borderColor="black" w="80%" m="auto" h="400px" justify="center" items="center" mt="80px" display="flex" flexDir="column">
               <Box m="4" p="2" fontSize="lg" color="gray.400">
                  You don't have any favs yet. Please add!
               </Box>
               <Button colorScheme="teal" onClick={() => navigation('/add-favourite')}>
                  Add Fav
               </Button>
            </Box>
         )}
      </Box>
   );
};

export default FavouritePackage;
