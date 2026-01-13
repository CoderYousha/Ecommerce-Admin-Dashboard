import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Fetch from "../services/Fetch";
import AuthContext from "../context/AuthContext";

function Currency() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const navigate = useNavigate();
     const [currencies, setCurrencies] = useState([]);
     const [deletetingCurrrencyId, setDeletingCurrencyId] = useState(null);
     const { wait } = useContext(AuthContext);
     const [waitGet, setWaitGet] = useState(true);

     const openWindow = () => {
          var window = document.getElementById("delete-window");
          window.style.display = 'block';
     }

     const closeWindow = () => {
          var window = document.getElementById("delete-window");
          window.style.display = 'none';
     }

     const getCurrencies = async () => {
          let result = await Fetch(host + `/v1`, "GET", null);
          setCurrencies(result.data.data);
          setWaitGet(false);
     }

     const deleteCurrency = async () => {

          let result = await Fetch(host + `/v1/admin/currencies/${deletetingCurrrencyId}/delete`, "DELETE", null);

          if (result.status === 200) {
               closeWindow();
               await getCurrencies();
               toast.success("Currency deleted successfully!");
          }

          setDeletingCurrencyId(null);
     }

     useEffect(() => {
          getCurrencies();
     }, []);

     return (
          <>
               <AdminNavbar />
               <AdminHeader placeholder="Search by name, ..." />

               {
                    wait || waitGet ?
                         <div className="h-screen">
                              <div className="w-4/5 h-3/4 float-left relative">
                                   <ClipLoader color="purple" loading={true} size={70} className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2" />
                              </div>
                         </div>
                         :
                         <div className="float-left w-4/5">
                              <h1 className="w-fit ml-5 mt-5 text-2xl font-bold">Currency Management</h1>
                              <div className="w-full">
                                   <div className="w-full overflow-x-auto">
                                        <div className="min-w-[900px]">
                                             <div className="grid grid-cols-4 font-bold text-gray-500 mt-5 gap-1 min-w-5 ml-7">
                                                  <div className="flex">Code</div>
                                                  <div className="flex">Symbol</div>
                                                  <div className="flex">Rate of Exchange</div>
                                                  <div className="flex">Actions</div>
                                             </div>
                                             <hr className="my-5" />
                                             <div className="grid grid-cols-4 mt-5 gap-1 min-w-5 ml-7 gap-y-5">
                                                  {
                                                       currencies.map((currency, index) =>
                                                            <>
                                                                 <div className="flex w-fit px-4 py-1 rounded-lg bg-purple-200">{currency.code}</div>
                                                                 <div className="flex ">{currency.symbol}</div>
                                                                 <div className="flex w-4 h-4 rounded-lg">{currency.rate_of_exchange}</div>
                                                                 <div className="flex">
                                                                      <FontAwesomeIcon className="mr-3 text-green-500 cursor-pointer" icon={faEdit} onClick={() => navigate(`/update-currency/${currency.id}`)} />
                                                                      {/* {
                                                                           deletetingCurrrencyId === currency.id
                                                                                ? <ClipLoader color="red" loading={true} size={15} />
                                                                           } */}
                                                                           <FontAwesomeIcon onClick={() => {setDeletingCurrencyId(currency.id); openWindow();}} className="text-red-500 cursor-pointer" icon={faTrash} />
                                                                 </div>
                                                            </>
                                                       )
                                                  }

                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <button onClick={() => navigate('/add-currency')} className="fixed bottom-10 right-10 w-12 h-12 rounded-full bg-purple-light-color flex justify-center items-center text-white text-2xl shadow-lg hover:bg-purple-500 duration-200 cursor-pointer">
                                   +
                                   <FontAwesomeIcon icon={faDollar} className="" />
                              </button>

                              <div id="delete-window" className="hidden w-full h-full bg-opacity-25 bg-gray-300 absolute top-0 right-0">
                                   <div className="rounded-lg px-5 py-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-1/3">
                                        <div className="text-xl">Are you sure?</div>
                                        <div className="text-white font-bold mt-10 flex justify-between mx-auto">
                                             <button onClick={deleteCurrency} className="bg-red-500 px-10 py-2 rounded-lg">Delete</button>
                                             <button onClick={() => closeWindow()} className="bg-gray-200 px-10 py-2 rounded-lg">Cancel</button>
                                        </div>
                                   </div>
                              </div>
                         </div>
               }
               <Toaster />
          </>
     );
}

export default Currency;