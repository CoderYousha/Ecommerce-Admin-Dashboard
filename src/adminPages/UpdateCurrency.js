import { ClipLoader } from "react-spinners";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckLogin from "../services/CheckLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import Fetch from "../services/Fetch";

function UpdateCurrency () {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const [wait, setWait] = useState(true);
     const [sendWait, setSendWait] = useState(false);
     const navigate = useNavigate();
     const [currency, setCurrency] = useState('');
     const param = useParams();
     const codeRef = useRef();
     const symbolRef = useRef();
     const rateOfExchangeRef = useRef();

     const checkLogin = async () => {
          let result = await CheckLogin(host);
          if (!result) {
               navigate('/login');
          }else{
               await getCurrency();
               setWait(false);
          }
     }

     const getCurrency = async () => {
          let result = await Fetch(host + `/v1/admin/currencies/${param.id}/show`, "GET", null);
          if(result.status === 200){
               setCurrency(result.data.data);
          }
     }

     const updateCurrency = async () => {
          setSendWait(true);

          const formData = new FormData();
          formData.append('code', codeRef.current.value);
          formData.append('symbol', symbolRef.current.value);
          formData.append('rate_of_exchange', rateOfExchangeRef.current.value);

          let result = await Fetch(host + `/v1/admin/currencies/${param.id}/update`, "POST", formData);

          if(result.status === 200){
               toast.success("Currency updated successfully!");
          }else if(result.status === 422){
               if(result.data.errors.code[0]){
               toast.error(result.data.errors.code[0]);
               }else if(result.data.errors.symbol[0]){
                    toast.error(result.data.errors.symbol[0]);
               }else if(result.data.errors.rate_of_exchange[0]){
                    toast.error(result.data.errors.rate_of_exchange[0]);
               }
          }

          setSendWait(false);
     }

     useEffect(() => {
          checkLogin();
     },[]);

     return (
          <>
               <AdminNavbar />
               <AdminHeader placeholder="Search by name, ..."/>

               {
                    wait ?
                         <div className="h-screen">
                              <div className="w-4/5 h-3/4 float-left relative">
                                   <ClipLoader color="purple" loading={true} size={70} className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2"/>
                              </div>
                         </div>
                         :
                         <div className="w-4/5 float-left">
                              <h1 className="flex font-bold text-3xl ml-5 mt-7">Update Currency</h1>
                              <section className="bg-purple-200 w-11/12 mt-10 rounded-l-lg py-3 float-right">
                                   <div className="w-fit px-10 py-3 float-left text-white text-2xl font-bold">+<FontAwesomeIcon icon={faDollar} /></div>
                                   <div className="w-full h-20"></div>
                                   <div className="flex justify-around">
                                        <div className="w-2/5 flex flex-col">
                                             <div className="font-bold w-fit mb-2">Code</div>
                                             <input ref={codeRef} defaultValue={currency.code} type="text" placeholder="Enter code" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col">
                                             <div className="font-bold w-fit mb-2">Symbol</div>
                                             <input ref={symbolRef} defaultValue={currency.symbol} type="text" placeholder="Enter symbol" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5">
                                        <div className="w-2/5 flex flex-col">
                                             <div className="font-bold w-fit mb-2">Rate of Exchange</div>
                                             <input ref={rateOfExchangeRef} defaultValue={currency.rate_of_exchange} type="text" placeholder="Enter rate of exchange" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <button onClick={updateCurrency} className="my-8 rounded-md bg-white text-purple-500 px-7 py-2 cursor-pointer font-semibold hover:border hover:border-white hover:text-white hover:bg-purple-200 duration-200">
                                        {
                                             !sendWait && "Update"
                                        }
                                        <ClipLoader color="purple" loading={sendWait} size={20} />
                                   </button>
                              </section>
                         </div>
               }
               <Toaster />
          </>
     );
}

export default UpdateCurrency;