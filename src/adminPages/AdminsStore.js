import React, { useContext, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Fetch from "../services/Fetch";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthContext";
import { FormattedMessage } from "react-intl";

function AdminsStore() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const navigate = useNavigate();
     const [searchWait, setSearchWait] = useState(false);
     const [deletingUserId, setDeletingUserId] = useState(null);
     const locatoin = useLocation();
     const [admins, setAdmins] = useState(locatoin.state.admins || []);
     const param = useParams();
     const { wait } = useContext(AuthContext);

     const openWindow = () => {
          var window = document.getElementById("delete-window");
          window.style.display = 'block';
     }

     const closeWindow = () => {
          var window = document.getElementById("delete-window");
          window.style.display = 'none';
     }

     const deleteAdminStore = async () => {

          let result = await Fetch(host + `/v1/admin/user/${deletingUserId}/delete`, "DELETE", null);

          if (result.status === 200) {
               closeWindow();
               setAdmins(prev => prev.filter(user => user.id !== deletingUserId));
               toast.success(<FormattedMessage id='deleted' />);
          }

          setDeletingUserId(null);
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
                         <div className="float-left w-4/5">
                              <h1 className="w-fit ml-5 mt-5 text-2xl font-bold max-sm:text-lg"><FormattedMessage id='adminsStoreManage' /></h1>
                              <div className="w-full">
                                   <div className="w-full overflow-x-auto">
                                        <div className="min-w-[900px]">
                                             <div className="grid grid-cols-5 font-bold text-gray-500 mt-5 gap-1 min-w-5 ml-7">
                                                  <div className="flex"><FormattedMessage id='user' /></div>
                                                  <div className="flex justify-center"><FormattedMessage id='role' /></div>
                                                  <div className="flex justify-center"><FormattedMessage id='status' /></div>
                                                  <div className="flex justify-end"><FormattedMessage id='actions' /></div>
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
                                                                      <div className="flex bg-light-blue w-fit h-fit px-1 py-1 rounded-xl font-semibold ml-5"><FormattedMessage id={user.account_role} /></div>
                                                                      <div style={{ backgroundColor: user.is_active ? '#dcfce7' : '#dcfce7', color: user.is_active ? 'green' : 'red' }} className="flex w-fit h-fit px-1 py-1 rounded-xl font-semibold">{user.is_active ? <FormattedMessage id='active' /> : <FormattedMessage id='inactive' />}</div>
                                                                      <div className="flex">
                                                                           <FontAwesomeIcon
                                                                                onClick={() => { setDeletingUserId(user.id); openWindow(); }}
                                                                                className="text-red-500 cursor-pointer" icon={faTrash} />
                                                                      </div>
                                                                 </React.Fragment>
                                                            )
                                                       }

                                                       <div id="delete-window" className="hidden w-full h-full bg-opacity-25 bg-gray-300 absolute top-0 right-0">
                                                            <div className="rounded-lg px-5 py-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-1/3">
                                                                 <div className="text-xl">Are you sure?</div>
                                                                 <div className="text-white font-bold mt-10 flex justify-between mx-auto">
                                                                      <button onClick={deleteAdminStore} className="bg-red-500 px-10 py-2 rounded-lg">Delete</button>
                                                                      <button onClick={() => closeWindow()} className="bg-gray-200 px-10 py-2 rounded-lg">Cancel</button>
                                                                 </div>
                                                            </div>
                                                       </div>

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