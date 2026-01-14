import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Fetch from "../services/Fetch";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminNavbar from "../components/AdminNavbar";
import AdminHeader from "../components/AdminHeader";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthContext";
import { FormattedMessage } from "react-intl";

function AddStoreAdmin() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const [sendWait, setSendWait] = useState(false);
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [phoneCode, setPhoneCode] = useState('+963');
     const [phone, setPhone] = useState('');
     const [password, setPassword] = useState('');
     const [passwordConfirmation, setPasswordConfirmation] = useState('');
     const param = useParams();
     const { wait } = useContext(AuthContext);

     const navigate = useNavigate();

     const createUser = async () => {
          setSendWait(true);

          const formData = new FormData();
          formData.append('name', name);
          formData.append('email', email);
          formData.append('phone_code', phoneCode);
          formData.append('phone', phone);
          formData.append('account_role', 'store_admin');
          formData.append('password', password);
          formData.append('password_confirmation', passwordConfirmation);
          formData.append('store_id', param.id);

          let result = await Fetch(host + '/v1/admin/user/store', "POST", formData);

          if (result.status == 200) {
               navigate('/users');
          } else if (result.status == 422) {
               toast.error(result.data.errors[0]);
          }

          setSendWait(false);
     }

     return (
          <>
               <AdminNavbar />
               <AdminHeader placeholder="Search by name, email..." />
               {
                    wait ?
                         <div className="h-screen">
                              <div className="w-4/5 h-3/4 float-left relative">
                                   <ClipLoader color="purple" loading={true} size={70} className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2" />
                              </div>
                         </div>
                         :
                         <div className="w-4/5 float-left">
                              <h1 className="flex font-bold text-3xl ml-5 mt-7"><FormattedMessage id='addNewStoreAdmin' /></h1>
                              <section className="bg-purple-200 w-11/12 mt-10 rounded-l-lg py-3 float-right">
                                   <div className="w-fit px-10 py-3 float-left text-white text-2xl font-bold">+<FontAwesomeIcon icon={faUser} /></div>
                                   <div className="w-full h-20"></div>
                                   <div className="flex justify-around max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='name' /></div>
                                             <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter seller name" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='email' /></div>
                                             <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="example@gmail.com" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5 max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='password' /></div>
                                             <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='confirmPassword' /></div>
                                             <input onChange={(e) => setPasswordConfirmation(e.target.value)} type="password" placeholder="Confirm password" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5 max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='phone' /></div>
                                             <input onChange={(e) => setPhone(e.target.value)} type="number" placeholder="Enter phone number" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <button onClick={createUser} className="my-8 rounded-md bg-white text-purple-500 px-7 py-2 cursor-pointer font-semibold hover:border hover:border-white hover:text-white hover:bg-purple-200 duration-200">
                                        {
                                             !sendWait && <FormattedMessage id='create' />
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

export default AddStoreAdmin;