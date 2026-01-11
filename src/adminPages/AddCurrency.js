import { ClipLoader } from "react-spinners";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fetch from "../services/Fetch";
import AuthContext from "../context/AuthContext";

function AddCurrerncy() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const [code, setCode] = useState('');
     const [symbol, setSymbol] = useState('');
     const [rateOfExchange, setRateOfExchange] = useState('');
     const [sendWait, setSendWait] = useState(false);
     const navigate = useNavigate();
     const {wait} = useContext(AuthContext);

     const createCurrency = async () => {
          setSendWait(true);

          const formData = new FormData();
          formData.append('code', code);
          formData.append('symbol', symbol);
          formData.append('rate_of_exchange', rateOfExchange);

          let result = await Fetch(host + '/v1/admin/currencies/store', "POST", formData);

          if(result.status === 200){
               navigate('/currency');
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
                              <h1 className="flex font-bold text-3xl ml-5 mt-7">Add New Currency</h1>
                              <section className="bg-purple-200 w-11/12 mt-10 rounded-l-lg py-3 float-right">
                                   <div className="w-fit px-10 py-3 float-left text-white text-2xl font-bold">+<FontAwesomeIcon icon={faDollar} /></div>
                                   <div className="w-full h-20"></div>
                                   <div className="flex justify-around max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2">Code</div>
                                             <input onChange={(e) => setCode(e.target.value)} type="text" placeholder="Enter code" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2">Symbol</div>
                                             <input onChange={(e) => setSymbol(e.target.value)} type="text" placeholder="Enter symbol" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5 max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2">Rate of Exchange</div>
                                             <input onChange={(e) => setRateOfExchange(e.target.value)} type="text" placeholder="Enter rate of exchange" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <button onClick={createCurrency} className="my-8 rounded-md bg-white text-purple-500 px-7 py-2 cursor-pointer font-semibold hover:border hover:border-white hover:text-white hover:bg-purple-200 duration-200">
                                        {
                                             !sendWait && "Create"
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

export default AddCurrerncy;