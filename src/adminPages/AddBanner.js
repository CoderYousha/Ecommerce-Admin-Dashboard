import { useContext, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import AuthContext from "../context/AuthContext";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faScroll } from "@fortawesome/free-solid-svg-icons";
import Fetch from "../services/Fetch";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function AddBanner() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const { wait } = useContext(AuthContext);
     const [sendWait, setSendWait] = useState(false);
     const [nameEn, setNameEn] = useState('');
     const [nameAr, setNameAr] = useState('');
     const [image, setImage] = useState('');
     const [isActive, setIsActive] = useState(false);
     const [category, setCategory] = useState('');
     const [categoryId, setCategoryId] = useState('');
     const navigate = useNavigate();

     const createBanner = async() => {
          sendWait(true);

          const formData = new FormData();
          formData.append('name_en', nameEn);
          formData.append('name_ar', nameAr);
          formData.append('image', image);
          formData.append('is_active', isActive? 1 : 0);

          let result = await Fetch(host + '/v1/admin/banner/store', 'POST', formData);

          if (result.status === 200) {
               navigate('/banner');
          } else if (result.status === 422) {
               toast.error(result.data.errors[0]);
          }

          sendWait(false);
     }

     return (
          <>
               <AdminNavbar />
               <AdminHeader placeholder="Search by name, ..." />
               {
                    wait ?
                         <div className="h-screen">
                              <div className="w-4/5 h-3/4 float-left relative">
                                   <ClipLoader color="purple" loading={true} size={70} className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2" />
                              </div>
                         </div>
                         :
                         <div className="w-4/5 float-left">
                              <h1 className="flex font-bold text-3xl ml-5 mt-7">Add New Banner</h1>
                              <section className="bg-purple-200 w-11/12 mt-10 rounded-l-lg py-3 float-right">
                                   <div className="w-fit px-10 py-3 float-left text-white text-2xl font-bold">+<FontAwesomeIcon icon={faScroll} /></div>
                                   <div className="w-full h-20"></div>
                                   <div className="flex justify-around max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2">English Name</div>
                                             <input onChange={(e) => setNameEn(e.target.value)} type="text" placeholder="Enter english name" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2">Arabic Name</div>
                                             <input onChange={(e) => setNameAr(e.target.value)} type="text" placeholder="Enter arabic name" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5 max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex">
                                             <div className="font-bold w-2/3 mb-2">Is Active?</div>
                                             <input
                                                  type="checkbox"
                                                  onChange={e => setIsActive(e.target.checked)}
                                                  className="w-5 h-5 indent-2 rounded-md outline-none"
                                             />
                                        </div>
                                        <div className="w-2/5 flex flex-col relative bg-white rounded-lg max-sm:w-4/5">
                                             <FontAwesomeIcon icon={faCamera} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-600 w-10" />
                                             <input accept="image/*" onChange={(e) => setImage(e.target.files[0])} type="file" placeholder="Enter english description" className="w-full h-10 indent-2 rounded-md outline-none opacity-0 cursor-pointer" />
                                        </div>
                                   </div>
                                   <button onClick={createBanner} className="my-8 rounded-md bg-white text-purple-500 px-7 py-2 cursor-pointer font-semibold hover:border hover:border-white hover:text-white hover:bg-purple-200 duration-200">
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

export default AddBanner;