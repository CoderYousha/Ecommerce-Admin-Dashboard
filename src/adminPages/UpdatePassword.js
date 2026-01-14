import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import AdminNavbar from "../components/AdminNavbar";
import { ClipLoader } from "react-spinners";
import AdminHeader from "../components/AdminHeader";
import { FormattedMessage } from "react-intl";
import toast, { Toaster } from "react-hot-toast";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fetch from "../services/Fetch";

function UpdatePassword() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const [sendWait, setSendWait] = useState(false);
     const [oldPassword, setOldPassword] = useState('');
     const [newPassword, setNewPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');
     const { wait } = useContext(AuthContext);
     const navigate = useNavigate();

     const updatePassword = async () => {
          setSendWait(true);

          const formData = new FormData();
          formData.append('old_password', oldPassword);
          formData.append('new_password', newPassword);
          formData.append('new_password_confirmation', confirmPassword);

          let result = await Fetch(host + '/v1/account/update-password', "POST", formData);

          if(result.status == 200){
               navigate('/settings');
          }else if(result.status == 422){
               toast.error(result.data.errors[0]);
          }else if(result.status == 400){
               toast.error(result.data.errors[0]);
          }

          setSendWait(false);
     }

     return (
          <>
               <AdminNavbar />
               <AdminHeader />
               {
                    wait ?
                         <div className="h-screen">
                              <div className="w-4/5 h-3/4 float-left relative">
                                   <ClipLoader color="purple" loading={true} size={70} className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2" />
                              </div>
                         </div>
                         :
                         <div className="w-4/5 float-left">
                              <h1 className="flex font-bold text-3xl ml-5 mt-7 max-sm:text-xl"><FormattedMessage id='updatePassword' /></h1>
                              <section className="bg-purple-200 w-11/12 mt-10 rounded-l-lg py-3 float-right">
                                   <div className="w-fit px-10 py-3 float-left text-white text-2xl font-bold max-sm:px-5 max-sm:text-lg"><FontAwesomeIcon icon={faLock} /></div>
                                   <div className="w-full h-20"></div>
                                   <div className="flex justify-around max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='oldPassword' /></div>
                                             <input onChange={(e) => setOldPassword(e.target.value)} type="password" placeholder="Enter your old password" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:my-2"><FormattedMessage id='newPassword' /></div>
                                             <input onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="Enter your new password" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5 max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:my-2"><FormattedMessage id='confirmPassword' /></div>
                                             <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm your password" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <button onClick={updatePassword} className="my-8 rounded-md bg-white text-purple-500 px-7 py-2 cursor-pointer font-semibold hover:border hover:border-white hover:text-white hover:bg-purple-200 duration-200">
                                        {
                                             !sendWait && <FormattedMessage id='update' />
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

export default UpdatePassword;