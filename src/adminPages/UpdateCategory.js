import { useEffect, useRef, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import CheckLogin from "../services/CheckLogin";
import { useNavigate, useParams } from "react-router-dom";
import Fetch from "../services/Fetch";

function UpdateCategory () {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const [wait, setWait] = useState(true);
     const nameEnRef = useRef();
     const nameArRef = useRef();
     const descriptionEnRef = useRef();
     const descriptionArRef = useRef();
     const [image, setImage] = useState(null);
     const [sendWait, setSendWait] = useState(false);
     const navigate = useNavigate();
     const param = useParams();
     const [category, setCategory] = useState('');

     const checkLogin = async () => {
          let result = await CheckLogin(host);
          if (!result) {
               navigate('/login');
          }else{
               await getCategory();
               setWait(false);
          }
     }

     const getCategory = async () => {
          let result = await Fetch(host + `/v1/admin/categories/${param.id}/show`, "GET", null);

          setCategory(result.data.data);
     }

     const updateCategory = async () => {
          setSendWait(true);

          const formData = new FormData();
          formData.append('name_en', nameEnRef.current.value);
          formData.append('name_ar', nameArRef.current.value);
          formData.append('description_en', descriptionEnRef.current.value);
          formData.append('description_ar', descriptionArRef.current.value);
          formData.append('image', image);

          let result = await Fetch(host + `/v1/admin/categories/${param.id}/update`, "POST", formData);

          if(result.status === 200){
               toast.success("Category updated successfully!");
          }else if(result.status === 422){
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
                              <h1 className="flex font-bold text-3xl ml-5 mt-7">Update Category</h1>
                              <section className="bg-purple-200 w-11/12 mt-10 rounded-l-lg py-3 float-right">
                                   <div className="w-fit px-10 py-3 float-left text-white text-2xl font-bold">+<FontAwesomeIcon icon={faLayerGroup} /></div>
                                   <div className="w-full h-20"></div>
                                   <div className="flex justify-around">
                                        <div className="w-2/5 flex flex-col">
                                             <div className="font-bold w-fit mb-2">English Name</div>
                                             <input ref={nameEnRef} defaultValue={category.name_en} type="text" placeholder="Enter english name" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col">
                                             <div className="font-bold w-fit mb-2">Arabic Name</div>
                                             <input ref={nameArRef} defaultValue={category.name_ar} type="text" placeholder="Enter arabic name" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5">
                                        <div className="w-2/5 flex flex-col">
                                             <div className="font-bold w-fit mb-2">English Description</div>
                                             <input ref={descriptionEnRef} defaultValue={category.description_en} type="text" placeholder="Enter english description" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col">
                                             <div className="font-bold w-fit mb-2">Arabic Description</div>
                                             <input ref={descriptionArRef} defaultValue={category.description_ar} type="text" placeholder="Enter arabic description" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5">
                                        <div className="w-2/5 flex flex-col relative bg-white rounded-lg">
                                             <FontAwesomeIcon icon={faCamera} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-600 w-10"/>
                                             <input accept="image/*" onChange={(e) => setImage(e.target.files[0])} type="file" placeholder="Enter english description" className="w-full h-10 indent-2 rounded-md outline-none opacity-0 cursor-pointer" />
                                        </div>
                                   </div>
                                   <button onClick={updateCategory} className="my-8 rounded-md bg-white text-purple-500 px-7 py-2 cursor-pointer font-semibold hover:border hover:border-white hover:text-white hover:bg-purple-200 duration-200">
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

export default UpdateCategory;