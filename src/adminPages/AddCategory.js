import { useContext, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Fetch from "../services/Fetch";
import AuthContext from "../context/AuthContext";

function AddCategory () {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const [nameEn, setNameEn] = useState('');
     const [nameAr, setNameAr] = useState('');
     const [descriptionEn, setDescriptionEn] = useState('');
     const [descriptionAr, setDescriptionAr] = useState('');
     const [image, setImage] = useState(null);
     const [sendWait, setSendWait] = useState(false);
     const navigate = useNavigate();
     const {wait} = useContext(AuthContext);

     const createCategory = async () => {
          setSendWait(true);

          const formData = new FormData();
          formData.append('name_en', nameEn);
          formData.append('name_ar', nameAr);
          formData.append('description_en', descriptionEn);
          formData.append('description_ar', descriptionAr);
          formData.append('image', image);

          let result = await Fetch(host + '/v1/admin/categories/store', "POST", formData);

          if(result.status === 200){
               navigate('/categories');
          }else if(result.status === 422){
               toast.error(result.data.errors[0]);
          }

          setSendWait(false);
     }

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
                              <h1 className="flex font-bold text-3xl ml-5 mt-7">Add New Category</h1>
                              <section className="bg-purple-200 w-11/12 mt-10 rounded-l-lg py-3 float-right">
                                   <div className="w-fit px-10 py-3 float-left text-white text-2xl font-bold">+<FontAwesomeIcon icon={faLayerGroup} /></div>
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
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2">English Description</div>
                                             <input onChange={(e) => setDescriptionEn(e.target.value)} type="text" placeholder="Enter english description" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2">Arabic Description</div>
                                             <input onChange={(e) => setDescriptionAr(e.target.value)} type="text" placeholder="Enter arabic description" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5 max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col relative bg-white rounded-lg max-sm:w-4/5">
                                             <FontAwesomeIcon icon={faCamera} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-600 w-10"/>
                                             <input accept="image/*" onChange={(e) => setImage(e.target.files[0])} type="file" placeholder="Enter english description" className="w-full h-10 indent-2 rounded-md outline-none opacity-0 cursor-pointer" />
                                        </div>
                                   </div>
                                   <button onClick={createCategory} className="my-8 rounded-md bg-white text-purple-500 px-7 py-2 cursor-pointer font-semibold hover:border hover:border-white hover:text-white hover:bg-purple-200 duration-200">
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

export default AddCategory;