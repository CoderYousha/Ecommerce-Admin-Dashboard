import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CheckLogin from "../services/CheckLogin";
import Fetch from "../services/Fetch";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

function AdminsStore() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const [wait, setWait] = useState(true);
     const navigate = useNavigate();
     const [users, setUsers] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [pagination, setPagination] = useState('');
     const [selectedUser, setSelectedUser] = useState('');
     const [searchWait, setSearchWait] = useState(false);
     const [deletingUserId, setDeletingUserId] = useState(null);
     const locatoin = useLocation();
     const [admins, setAdmins] = useState(locatoin.state.admins || []);
     const param = useParams();

     const checkLogin = async () => {
          let result = await CheckLogin(host);
          if (!result) {
               navigate('/login');
          } else {
               setWait(false);
          }
     }

     const deleteAdminStore = async (userId) => {
          setDeletingUserId(userId);

          let result = await Fetch(host + `/v1/admin/user/${userId}/delete`, "DELETE", null);

          if (result.status === 200) {
               setAdmins(prev => prev.filter(user => user.id !== userId));
               toast.success("User deleted successfully!");
          }

          setDeletingUserId(null);
     }

     useEffect(() => {
          checkLogin();
     }, []);

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
                         <div className="float-left w-4/5">
                              <h1 className="w-fit ml-5 mt-5 text-2xl font-bold max-sm:text-lg">Admins Store Management</h1>
                              <div className="w-full">
                                   <div className="w-full overflow-x-auto">
                                        <div className="min-w-[900px]">
                                             <div className="grid grid-cols-5 font-bold text-gray-500 mt-5 gap-1 min-w-5 ml-7">
                                                  <div className="flex">User</div>
                                                  <div className="flex justify-center">Role</div>
                                                  <div className="flex justify-center">Status</div>
                                                  <div className="flex justify-end">Actions</div>
                                             </div>
                                             <hr className="my-5" />
                                             {
                                                  !searchWait &&
                                                  <div className="grid grid-cols-4 mt-5 gap-1 min-w-5 ml-7">
                                                       {
                                                            !searchWait &&
                                                            admins.map((user, index) =>
                                                                 <React.Fragment key={user.id}>
                                                                      <div className="flex py-2">
                                                                           <div className="flex">
                                                                                <div className="w-10 h-10 rounded-full bg-light-blue flex justify-center items-center mr-1">
                                                                                     <FontAwesomeIcon icon={faUser} className="text-blue-300" />
                                                                                </div>
                                                                                <div className="">
                                                                                     <div className="flex">{user.name}</div>
                                                                                     <div className="">{user.email}</div>
                                                                                </div>
                                                                           </div>
                                                                      </div>
                                                                      <div className="flex bg-light-blue w-fit h-fit px-1 py-1 rounded-xl font-semibold ml-5">{user.account_role}</div>
                                                                      <div style={{ backgroundColor: user.is_active ? '#dcfce7' : '#dcfce7', color: user.is_active ? 'green' : 'red' }} className="flex w-fit h-fit px-1 py-1 rounded-xl font-semibold">{user.is_active ? "Active" : "Inactive"}</div>
                                                                      <div className="flex">
                                                                           {/* <FontAwesomeIcon className="mr-3 text-green-500 cursor-pointer" icon={faEdit} /> */}
                                                                           {
                                                                                deletingUserId === user.id
                                                                                     ? <ClipLoader color="red" loading={true} size={15} />
                                                                                     : <FontAwesomeIcon
                                                                                          onClick={() => deleteAdminStore(user.id)} 
                                                                                          className="text-red-500 cursor-pointer" icon={faTrash} />
                                                                           }
                                                                      </div>
                                                                 </React.Fragment>
                                                            )
                                                       }

                                                  </div>
                                             }

                                        </div>
                                   </div>
                              </div>
                              <button onClick={() => navigate(`/add-store-admin/${param.id}`)} className="fixed bottom-10 right-10 w-12 h-12 rounded-full bg-purple-light-color flex justify-center items-center text-white text-2xl shadow-lg hover:bg-purple-500 duration-200 cursor-pointer">
                                   +
                                   <FontAwesomeIcon icon={faUser} className="" />
                              </button>
                         </div>
               }

               <Toaster />
          </>
     );
}

export default AdminsStore;