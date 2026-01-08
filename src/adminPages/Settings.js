import { useRef, useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import CheckLogin from "../services/CheckLogin";
import { useNavigate } from "react-router-dom";
import Fetch from "../services/Fetch";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

function Settings() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const [wait, setWait] = useState(true);
     const [sendWait, setSendWait] = useState(false);
     const [user, setUser] = useState('');
     const navigate = useNavigate();
     const nameRef = useRef();
     const codeRef = useRef();
     const phoneRef = useRef();
     const emailRef = useRef();
     const languageRef = useRef();

     const checkLogin = async () => {
          let result = await CheckLogin(host);
          if (!result) {
               navigate('/login');
          }else{
               await getProfile();
               setWait(false);
          }
     }

     const getProfile = async () => {
          let result = await Fetch(host + '/account/get-profile', "GET", null);
          
          if(result.status === 200){
               setUser(result.data.data);
          }
     }
     
     const updateProfile = async () => {
          setSendWait(true);

          const formData = new FormData();
          formData.append('name', nameRef.current.value);
          formData.append('phone_code', codeRef.current.value);
          formData.append('phone', phoneRef.current.value);
          formData.append('language', languageRef.current.value);

          let result = await Fetch(host + '/account/update-profile', "POST", formData);

           console.log(result);
          
          if(result.status == 200){
               localStorage.setItem('language', languageRef.current.value);
               toast.success("Profile updated successfully!");
          }else if(result.status == 422){
               toast.error(result.data.errors[0]);
          }

          setSendWait(false);
     }

     useEffect(() => {
          checkLogin();
     },[]);

     return (
          <>
               <AdminNavbar />
               <AdminHeader placeholder="Search by name, email..."/>
               {
                    wait ?
                         <div className="h-screen">
                              <div className="w-4/5 h-3/4 float-left relative">
                                   <ClipLoader color="purple" loading={true} size={70} className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2"/>
                              </div>
                         </div>
                         :
                         <div className="w-4/5 float-left">
                              <h1 className="flex font-bold text-3xl ml-5 mt-7">Settings</h1>
                              <section className="bg-purple-200 w-11/12 mt-10 rounded-l-lg py-3 float-right">
                                   <div className="w-fit px-10 py-3 float-left text-white text-2xl font-bold">Update your profile</div>
                                   <div className="w-full h-20"></div>
                                   <div className="flex justify-around">
                                        <div className="w-2/5 flex flex-col">
                                             <div className="font-bold w-fit mb-2">Name</div>
                                             <input ref={nameRef} defaultValue={user.name} type="text" placeholder="Enter your name" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col">
                                             <div className="font-bold w-fit mb-2">Email</div>
                                             <input ref={emailRef} defaultValue={user.email} type="text" placeholder="example@gmail.com" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5">
                                        <div className="w-2/5 flex flex-col">
                                             <div className="font-bold w-fit mb-2">Phone Code</div>
                                             <input ref={codeRef} defaultValue={user.phone_code} type="text" placeholder="Enter your phone code" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col">
                                             <div className="font-bold w-fit mb-2">Phone</div>
                                             <input ref={phoneRef} defaultValue={user.phone} type="number" placeholder="Enter your phone number" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5">
                                        <div className="w-2/5 flex flex-col">
                                             <div className="font-bold w-fit mb-2">Language</div>
                                             <select ref={languageRef} className="w-full h-10 rounded-md outline-none">
                                                  <option disabled>Select Language</option>
                                                  <option value="en" selected={user.language === "en"} className="">English</option>
                                                  <option value="ar" selected={user.language === "ar"} className="">Arabic</option>
                                             </select>
                                        </div>
                                   </div>
                                   <button onClick={updateProfile} className="my-8 rounded-md bg-white text-purple-500 px-7 py-2 cursor-pointer font-semibold hover:border hover:border-white hover:text-white hover:bg-purple-200 duration-200">
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

export default Settings;