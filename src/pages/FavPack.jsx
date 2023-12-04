import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
   Box,
   Table,
   Thead,
   Tbody,
   Tr,
   Th,
   Td,
   IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonBase } from "@mui/material";

const FavouritePackage = () => {
   // State for storing and managing favorite package data
   const [storedData, setStoredData] = useState(
      localStorage.getItem("favouritePackage")
   );
   const LSFavouriteData = storedData ? JSON.parse(storedData) : [];
   const navigation = useNavigate();

   // Handle deletion of a package
   const handleDataDelete = (name) => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#73a0ca",
         cancelButtonColor: "#a45151",
         confirmButtonText: "Yes, delete it!",
      }).then((result) => {
         if (result.isConfirmed) {
            const deletedData = LSFavouriteData.filter(
               (el) => el.package_name !== name
            );
            localStorage.setItem(
               "favouritePackage",
               JSON.stringify(deletedData)
            );
            setStoredData(JSON.stringify(deletedData));
            Swal.fire({
               title: "Deleted!",
               text: "Your Package has been deleted.",
               icon: "success",
            });
         }
      });
   };

   // Handle editing of package description
   const handleEdit = async (desc, name) => {
      const { value } = await Swal.fire({
         title: "Edit Description",
         input: "text",
         inputValue: desc,
      });
      if (value) {
         Swal.fire(`Edited: ${value}`);
         let editDatedData = LSFavouriteData.map((el) =>
            name === el.package_name ? { ...el, desc: value } : el
         );
         localStorage.setItem(
            "favouritePackage",
            JSON.stringify(editDatedData)
         );
         setStoredData(JSON.stringify(editDatedData));
      }
   };

   return (
      <Box>
         {/* Header Section */}
         <Box
            className="headerContainer"
            w="80%"
            m="auto"
            mt="5"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
         >
            <Box
               fontSize="xl"
               fontFamily="sans-serif"
               fontWeight="bold"
               textAlign="center"
               mt="5"
               p="4"
            >
               Welcome to Favourite NPM Packages
            </Box>
            {LSFavouriteData.length > 0 && (
               <Button
                  variant="contained"
                  colorScheme="teal"
                  style={{
                     borderRadius: "8px",
                     fontSize: "1rem",
                     backgroundColor: "#303F9F",
                     width: "8.5rem",
                     height: "3.5rem",
                  }}
                  onClick={() => navigation("/add-favourite")}
               >
                  Add Fav
               </Button>
            )}
         </Box>

         {LSFavouriteData.length > 0 ? (
            <Box className="favouriteDataContainer">
               <Table border="5px" borderColor="black" w="80%" m="auto">
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
                           <Td
                              border="2px"
                              fontFamily="mono"
                              fontSize="lg"
                              textAlign="center"
                              borderColor="black"
                           >
                              {el.package_name}
                           </Td>
                           <Td
                              display="flex"
                              justify="space-around"
                              m="2"
                              p="2"
                           >
                              <IconButton
                                 icon={<ViewIcon />}
                                 onClick={() => Swal.fire(el.desc)}
                              />
                              <IconButton
                                 icon={<EditIcon />}
                                 onClick={() =>
                                    handleEdit(el.desc, el.package_name)
                                 }
                              />
                              <IconButton
                                 icon={<DeleteIcon />}
                                 onClick={() =>
                                    handleDataDelete(el.package_name)
                                 }
                              />
                           </Td>
                        </Tr>
                     ))}
                  </Tbody>
               </Table>
            </Box>
         ) : (
            <Box
               border="2px solid black"
               borderColor="black"
               w="80%"
               m="auto"
               h="400px"
               justify="center"
               items="center"
               mt="80px"
               display="flex"
               flexDir="column"
            >
               <Box
                  bgSize="90%"
                  m="140"
                  p="2"
                  fontSize="lg"
                  fontWeight="bold"
                  color="gray.400"
                  textAlign="center" // Center-align text for better presentation
               >
                  You don't have any favs yet. Please add!
               </Box>

               {/* Use margin on the Button directly for spacing */}
               <Button
                  colorScheme="teal"
                  variant="outlined"
                  style={{
                  color:"white",
                     borderRadius: "18px",
                     fontSize: "1rem",
                     backgroundColor: "#3949AB",
                     width: "11rem",
                     height: "3.5rem",
                     textAlign:"center"
                  }}
                  onClick={() => navigation("/add-favourite")}
               >
                  Add Packages
               </Button>
            </Box>
         )}
      </Box>
   );
};

export default FavouritePackage;
