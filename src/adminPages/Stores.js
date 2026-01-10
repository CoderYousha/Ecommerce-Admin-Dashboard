import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import { faEdit, faStore, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CheckLogin from "../services/CheckLogin";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Fetch from "../services/Fetch";
import toast, { Toaster } from "react-hot-toast";

function Stores() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const language = localStorage.getItem('language');
     const navigate = useNavigate();
     const [wait, setWait] = useState(true);
     const [stores, setStores] = useState([]);
     const [deletingStoreId, setDeletingStoreId] = useState(null);
     const [currentPage, setCurrentPage] = useState(1);
     const [pagination, setPagination] = useState({});
     const [searchWait, setSearchWait] = useState(false);

     const checkLogin = async () => {
          let result = await CheckLogin(host);
          if (!result) {
               navigate('/login');
          } else {
               await getStores();
               setWait(false);
          }
     }

     const getStores = async () => {
          setSearchWait(true);
          let result = await Fetch(host + `/v1/store?page=${currentPage}`, "GET", null);
          if (result.status == 200) {
               setStores(result.data.data.data);
               setPagination(result.data.data);
          }
          setSearchWait(false);
     }

     const deleteStore = async (id) => {
          setDeletingStoreId(id);

          let result = await Fetch(host + `/v1/admin/stores/${id}/delete`, "DELETE", null);

          if (result.status === 200) {
               await getStores();
               toast.success("Store deleted successfully!");
          }

          setDeletingStoreId(null);
     }

     useEffect(() => {
          checkLogin();
     }, []);

     useEffect(() => {
          getStores();
     }, [currentPage]);

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
                         <div className="float-left w-4/5">
                              <h1 className="w-fit ml-5 mt-5 text-2xl font-bold max-sm:text-lg">Stores Management</h1>
                              <div className="w-full">
                                   <div className="w-full overflow-x-auto">
                                        <div className="min-w-[900px]">

                                             <div className="grid grid-cols-4 font-bold text-gray-500 mt-5 gap-1 min-w-5 ml-7">
                                                  <div className="flex">Image</div>
                                                  <div className="flex">Name</div>
                                                  <div className="flex">Status</div>
                                                  <div className="flex">Actions</div>
                                             </div>
                                             <hr className="my-5" />
                                             <div className="grid grid-cols-4 mt-5 gap-1 gap-y-5 min-w-5 ml-7">
                                                  {
                                                       !searchWait &&
                                                       stores.map((store, index) =>
                                                            <>
                                                                 <div className="flex">
                                                                      <div className="w-10 h-10 rounded-full bg-light-blue flex justify-center items-center mr-1">
                                                                           <img className="w-full h-full rounded-full" src={store.image} />
                                                                      </div>
                                                                 </div>
                                                                 <div className="flex bg-light-blue w-fit h-fit px-1 py-1 rounded-xl font-semibold ml-5 max-sm:text-sm">{language == 'en' ? store.name_en : store.name_ar}</div>
                                                                 <div className="flex ml-5 max-sm:text-sm">
                                                                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: store.is_active ? "green" : "red" }}></div>
                                                                 </div>
                                                                 <div className="flex">
                                                                      <FontAwesomeIcon onClick={() => navigate(`/update-store/${store.id}`, { state: { name_en: store.name_en, name_ar: store.name_ar, is_active: store.is_active } })} className="text-green-500 cursor-pointer" icon={faEdit} />
                                                                      {
                                                                           deletingStoreId === store.id
                                                                                ? <ClipLoader color="red" loading={true} size={15} />
                                                                                : <FontAwesomeIcon onClick={() => deleteStore(store.id)} className="text-red-500 cursor-pointer mx-1" icon={faTrash} />
                                                                      }
                                                                      <FontAwesomeIcon onClick={() => navigate(`/admins-store/${store.id}`, {state: {admins: store.admins}})} className="mr-3 text-purple-500 cursor-pointer" icon={faUsers} />
                                                                 </div>
                                                            </>
                                                       )
                                                  }
                                             </div>
                                        </div>
                                   </div>
                                   <div className="w-1/6 flex justify-between mx-auto">
                                        <button disabled={!pagination.prev_page_url} onClick={() => setCurrentPage(currentPage - 1)} className="cursor-pointer px-5 py-1 rounded-md bg-gray-200">Previous</button>
                                        <button disabled={!pagination.next_page_url} onClick={() => setCurrentPage(currentPage + 1)} className="cursor-pointer px-5 py-1 rounded-md bg-gray-200">Next</button>
                                   </div>
                              </div>

                              <button onClick={() => navigate('/add-store')} className="fixed bottom-10 right-10 w-12 h-12 rounded-full bg-purple-light-color flex justify-center items-center text-white text-2xl shadow-lg hover:bg-purple-500 duration-200 cursor-pointer">
                                   +
                                   <FontAwesomeIcon icon={faStore} className="" />
                              </button>
                         </div>
               }
               <Toaster />
          </>
     );
}

export default Stores;