import { useRef, useState, useEffect, useContext } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import Fetch from "../services/Fetch";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

function Settings() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const [sendWait, setSendWait] = useState(false);
     const [user, setUser] = useState('');
     const nameRef = useRef();
     const phoneRef = useRef();
     const emailRef = useRef();
     const languageRef = useRef();
     const { wait } = useContext(AuthContext);
     const [waitGet, setWaitGet] = useState(true);
     const navigate = useNavigate();
     
     const getProfile = async () => {
          let result = await Fetch(host + '/account/get-profile', "GET", null);

          if (result.status === 200) {
               setUser(result.data.data);
               setWaitGet(false);
          }
     }

     const updateProfile = async () => {
          var loading = false;
          setSendWait(true);
          if (localStorage.getItem("language") != languageRef.current.value){
               loading =  true;
          }

          const formData = new FormData();
          formData.append('name', nameRef.current.value);
          formData.append('phone_code', '+963');
          formData.append('phone', phoneRef.current.value);
          formData.append('language', languageRef.current.value);

          let result = await Fetch(host + '/account/update-profile', "POST", formData);

          console.log(result);

          if (result.status == 200) {
               localStorage.setItem('language', languageRef.current.value);
               toast.success(<FormattedMessage id='updated' />);
               if (loading) {
                    window.location.reload();
               }
          } else if (result.status == 422) {
               toast.error(result.data.errors[0]);
          }

          setSendWait(false);
     }

     useEffect(() => {
          getProfile();
     }, []);

     return (
          <>
               <AdminNavbar />
               <AdminHeader placeholder="Search by name, email..." />
               {
                    wait || waitGet ?
                         <div className="h-screen">
                              <div className="w-4/5 h-3/4 float-left relative">
                                   <ClipLoader color="purple" loading={true} size={70} className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2" />
                              </div>
                         </div>
                         :
                         <div className="w-4/5 float-left">
                              <h1 className="flex font-bold text-3xl ml-5 mt-7 max-sm:text-xl"><FormattedMessage id='settings' /></h1>
                              <section className="bg-purple-200 w-11/12 mt-10 rounded-l-lg py-3 float-right">
                                   <div className="w-fit px-10 py-3 float-left text-white text-2xl font-bold max-sm:px-5 max-sm:text-lg"><FormattedMessage id='updateProfile' /></div>
                                   <div className="w-full h-20"></div>
                                   <div className="flex justify-around max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='name' /></div>
                                             <input ref={nameRef} defaultValue={user.name} type="text" placeholder="Enter your name" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:my-2"><FormattedMessage id='email' /></div>
                                             <input ref={emailRef} defaultValue={user.email} type="text" placeholder="example@gmail.com" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5 max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:my-2"><FormattedMessage id='phone' /></div>
                                             <input ref={phoneRef} defaultValue={user.phone} type="number" placeholder="Enter your phone number" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2"><FormattedMessage id='language' /></div>
                                             <select ref={languageRef} className="w-full h-10 rounded-md outline-none">
                                                  <option disabled>Select Language</option>
                                                  <option value="en" selected={user.language === "en"} className=""><FormattedMessage id='english' /></option>
                                                  <option value="ar" selected={user.language === "ar"} className=""><FormattedMessage id='arabic' /></option>
                                             </select>
                                        </div>
                                   </div>
                                   <button onClick={updateProfile} className="my-8 rounded-md bg-white text-purple-500 px-7 py-2 cursor-pointer font-semibold hover:border hover:border-white hover:text-white hover:bg-purple-200 duration-200">
                                        {
                                             !sendWait && <FormattedMessage id='update' />
                                        }
                                        <ClipLoader color="purple" loading={sendWait} size={20} />
                                   </button>
                              </section>
                              <br />
                              <div className="text-purple-500 float-right w-full cursor-pointer mt-5" onClick={() => navigate('/update-password')}>Update your password</div>
                         </div>
               }
               <Toaster />
          </>
     );
}

export default Settings;