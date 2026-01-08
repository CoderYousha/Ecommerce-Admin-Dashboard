import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import CheckLogin from "../services/CheckLogin";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Fetch from "../services/Fetch";
import { faEdit, faLayerGroup, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from "react-hot-toast";

function Categories () {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const language = localStorage.getItem('language') || 'en';
     const [wait, setWait] = useState(true);
     const [categories, setCategories] = useState([]);
     const [deletingCategoryId, setDeletingCategoryId] = useState(null);
     const navigate = useNavigate();
     const [currentPage, setCurrentPage] = useState(1);
     const [pagination, setPagination] = useState('');

     const checkLogin = async () => {
          let result = await CheckLogin(host);
          if (!result) {
               navigate('/login');
          }else{
               await getCategories();
               setWait(false);
          }
     }

     const getCategories = async () => {
          let result = await Fetch(host + `/v1/admin/categories`, "GET", null);
          setCategories(result.data.data.data);
     }

     const deleteCategory = async (id) => {
          setDeletingCategoryId(id);

          let result = await Fetch(host + `/v1/admin/categories/${id}/delete`, "DELETE", null);

          if(result.status === 200){
               await getCategories();
               toast.success("Category deleted successfully!");
          }

          setDeletingCategoryId(null);
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
                          <div className="float-left w-4/5">
                              <h1 className="w-fit ml-5 mt-5 text-2xl font-bold max-sm:text-lg">Categories Management</h1>
                              <div className="w-full">
                                   <div className="grid grid-cols-3 font-bold text-gray-500 mt-5 gap-1 min-w-5 ml-7">
                                        <div className="flex">Category</div>
                                        <div className="flex">Description</div>
                                        <div className="flex">Actions</div>
                                   </div>
                                   <hr className="my-5"/>         
                                        <div className="grid grid-cols-3 mt-5 gap-1 min-w-5 ml-7">
                                             {
                                                  categories.map((category, index) => 
                                                  <>
                                                       <div key={index} className="flex py-2">
                                                            <div className="flex">
                                                                 <div className="w-10 h-10 rounded-full bg-light-blue flex justify-center items-center mr-1">
                                                                      <img className="w-full h-full rounded-full" src={category.image} />
                                                                 </div>
                                                                 <div className="">
                                                                      <div className="flex bg-light-blue w-fit h-fit px-1 py-1 rounded-xl font-semibold ml-5 max-sm:text-sm">{language == 'en' ? category.name_en : category.name_ar}</div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div className="flex max-sm:text-sm">{language == 'en' ? category.description_en : category.description_ar}</div> 
                                                       <div className="flex">
                                                            <FontAwesomeIcon className="mr-3 text-green-500 cursor-pointer" icon={faEdit} onClick={() => navigate(`/update-category/${category.id}`)} />
                                                            {
                                                                 deletingCategoryId === category.id
                                                                      ? <ClipLoader color="red" loading={true} size={15} />
                                                                      : <FontAwesomeIcon onClick={() => deleteCategory(category.id)} className="text-red-500 cursor-pointer" icon={faTrash} />
                                                            }
                                                       </div>
                                                  </>
                                                  )
                                             }
                                             
                                        </div>
                                   
                                   <div className="w-1/6 flex justify-between mx-auto">
                                        <button disabled={!pagination.prev_page_url} onClick={() => setCurrentPage(currentPage-1)} className="cursor-pointer px-5 py-1 rounded-md bg-gray-200">Previous</button>
                                        <button disabled={!pagination.next_page_url} onClick={() => setCurrentPage(currentPage+1)} className="cursor-pointer px-5 py-1 rounded-md bg-gray-200">Next</button>
                                   </div>
                              </div>
                              <button onClick={() => navigate('/add-category')} className="fixed bottom-10 right-10 w-12 h-12 rounded-full bg-purple-light-color flex justify-center items-center text-white text-2xl shadow-lg hover:bg-purple-500 duration-200 cursor-pointer">
                                   +
                                   <FontAwesomeIcon icon={faLayerGroup} className="" />
                              </button>
                         </div>
               }
               <Toaster />
          </>
     );
}

export default Categories;