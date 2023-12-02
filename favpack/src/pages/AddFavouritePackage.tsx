import React, { useState, useEffect } from "react";
import { ReuseInput } from "@locoworks/reusejs-react-input";
import { Button } from "../components/Button";
import { useDebounce } from "../hooks/useDebounce";
import Swal from "sweetalert2";
import axios from "axios";
import { TextArea } from "../components/TextArea";
import { useNavigate } from "react-router-dom";

//localStorage
let storedData = localStorage.getItem("favouritePackage");
let LSFavouriteData = storedData ? JSON.parse(storedData) : [];

//typechecking for data
interface Package {
   package_name: string;
   desc: string;
}

export const AddFavouritePackage = () => {
   const [searchText, setSearchText] = useState("");
   const debounceSearchText = useDebounce(searchText, 1000);
   const [searchedData, setSearchedData] = useState([]);
   const [package_name, setPackageName] = useState("");
   const [desc, setDesc] = useState("");
   const navigation = useNavigate();

   //api call handling
   useEffect(() => {
      axios
         .get(`https://api.npms.io/v2/search?q=${debounceSearchText}`)
         .then((res) => setSearchedData(res.data.results))
         .catch((err) => "");
   }, [debounceSearchText]);

   //handlingRadioEvent
   const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPackageName(value);
   };

   //submit button handling
   const handleSubmit = () => {
      if (!package_name) {
         alert(`Please choose any package.`);
         return;
      }

      if (!desc) {
         alert(`Please add your favourite part.`);
         return;
      }

      storedData = localStorage.getItem("favouritePackage");
      LSFavouriteData = storedData ? JSON.parse(storedData) : [];
      const newPackage: Package = { package_name, desc };

      Swal.fire({
         position: "center",
         icon: "success",
         title: "Package added to favourite",
         showConfirmButton: false,
         timer: 1500,
      });

      LSFavouriteData.push(newPackage);
      localStorage.setItem("favouritePackage", JSON.stringify(LSFavouriteData));

      setSearchText("");
      setDesc("");
      setSearchedData([]);
   };

   return (
      <div>
         <div className="searchContainer w-[90%] m-[auto] mt-5">
            <p className="text-lg font-bold text-blue-600">
               Search for NPM Packages.
            </p>
            <ReuseInput
               placeholder="Search here...."
               value={searchText}
               onChange={(e) => setSearchText(e.target.value)}
               className="w-[100%] h-[50px] p-4  font-mono text-lg font-black rounded-md"
            />
         </div>

         <div className="resultArea ml-[5%] mt-[30px] ">
            <p className="text-lg font-bold text-blue-600">Searches</p>
            <div className="resultContainer  w-[50%] p-5 m-3 mt-0 ml-0 pl-0 h-[280px] overflow-y-scroll">
               {searchedData.length === 0 ? (
                  <p className="text-lg font-semibold text-blue-900 ">
                     No search results...
                  </p>
               ) : (
                  searchedData?.map((el: any, ind: number): any => {
                     return (
                        <div key={ind} className=" p-1 text-lg font-serif border gap-1 m-1 rounded-lg text-clip">
                           <input
                              type="radio"
                              name="favourite"
                              value={el.package.name}
                              onChange={handleRadioChange}
                              className="text-lg text-ellipsis"
                           />{" "}
                           <span>{el.package.name}</span>
                        </div>
                     );
                  })
               )}
            </div>
         </div>
         <div className="commentFavContainer w-[90%] m-[auto] mt-[50px]">
            <TextArea
               text="Why is this your fav?"
               value={desc}
               className="block p-2.5 w-full text-smrounded-lg border bg-slate-200"
               placeholder="Write your thoughts here..."
               rows={5}
               onChange={(e) => setDesc(e.target.value)}
            />
            <div className="buttonContainer flex justify-between mt-3 ml-0">
               <Button
                  text="Submit"
                  className="text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:bg-gradient-to-tr focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-100 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 w-[8.5rem] h-[3.5rem]"
                  onClick={handleSubmit}
               />

               <Button
                  text="Favourites"
                  className="text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:bg-gradient-to-tr focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-100 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 w-[8.5rem] h-[3.5rem]"
                     onClick={() => navigation("/")}
               />
            </div>
         </div>
      </div>
   );
};
