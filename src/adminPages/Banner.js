import { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import AuthContext from "../context/AuthContext";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faScroll, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Fetch from "../services/Fetch";
import toast from "react-hot-toast";
import { FormattedMessage } from "react-intl";

function Banner() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const language = localStorage.getItem('language');
     const { wait } = useContext(AuthContext);
     const [waitGet, setWaitGet] = useState(true);
     const [searchWait, setSearchWait] = useState(false);
     const [banners, setBanners] = useState([]);
     const navigate = useNavigate();
     const [deletingBannerId, setDeletingBannerId] = useState('');
     const [currentPage, setCurrentPage] = useState(1);
     const [pagination, setPagination] = useState({});

     const openWindow = () => {
          var window = document.getElementById("delete-window");
          window.style.display = 'block';
     }

     const closeWindow = () => {
          var window = document.getElementById("delete-window");
          window.style.display = 'none';
     }

     const getBanners = async () => {
          let result = await Fetch(host + '/v1/banner');
          if(result.status == 200){
               setBanners(result.data.data.data);
               setWaitGet(false);
          }
     }

     const deleteBanner = async () => {
          let result = await Fetch(host + `/v1/admin/banner/${deletingBannerId}/delete`, "DELETE", null);

          if (result.status === 200) {
               closeWindow();
               await getBanners();
               toast.success(<FormattedMessage id='deleted' />);
          }

          setDeletingBannerId(null);
     }

     useEffect(() => {
          getBanners();
     });

     return (
          <>
               <AdminNavbar />
               <AdminHeader placeholder="Search by name, ..." />
               {
                    wait || waitGet ?
                         <div className="h-screen">
                              <div className="w-4/5 h-3/4 float-left relative">
                                   <ClipLoader color="purple" loading={true} size={70} className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2" />
                              </div>
                         </div>
                         :
                         <div className="float-left w-4/5">
                              <h1 className="w-fit ml-5 mt-5 text-2xl font-bold max-sm:text-lg"><FormattedMessage id='bannersManagement' /></h1>
                              <div className="w-full">
                                   <div className="w-full overflow-x-auto">
                                        <div className="min-w-[900px]">

                                             <div className="grid grid-cols-4 font-bold text-gray-500 mt-5 gap-1 min-w-5 ml-7">
                                                  <div className="flex"><FormattedMessage id='image' /></div>
                                                  <div className="flex"><FormattedMessage id='name' /></div>
                                                  <div className="flex"><FormattedMessage id='category' /></div>
                                                  <div className="flex"><FormattedMessage id='actions' /></div>
                                             </div>
                                             <hr className="my-5" />
                                             <div className="grid grid-cols-4 mt-5 gap-1 gap-y-5 min-w-5 ml-7">
                                                  {
                                                       !searchWait &&
                                                       banners.map((banner, index) =>
                                                            <>
                                                                 <div className="flex">
                                                                      <div className="w-10 h-10 rounded-full bg-light-blue flex justify-center items-center mr-1">
                                                                           <img className="w-full h-full rounded-full" src={banner.image} />
                                                                      </div>
                                                                 </div>
                                                                 <div className="flex bg-light-blue w-fit h-fit px-1 py-1 rounded-xl font-semibold ml-5 max-sm:text-sm">{language == 'en' ? banner.name_en : banner.name_ar}</div>
                                                                 <div className="flex w-fit h-fit px-1 py-1 rounded-xl font-semibold ml-5 max-sm:text-sm"><FormattedMessage id={banner.category} /></div>
                                                                 <div className="flex">
                                                                      <FontAwesomeIcon onClick={() => navigate(`/update-banner/${banner.id}`, { state: { name_en: banner.name_en, name_ar: banner.name_ar, is_active: banner.is_active, category: banner.category, category_id: banner.category_id, image: banner.image } })} className="text-green-500 cursor-pointer" icon={faEdit} />
                                                                      <FontAwesomeIcon onClick={() => { setDeletingBannerId(banner.id); openWindow(); }} className="text-red-500 cursor-pointer mx-1" icon={faTrash} />
                                                                 </div>
                                                            </>
                                                       )
                                                  }
                                             </div>
                                        </div>
                                   </div>
                                   <div className="w-1/6 flex justify-between mx-auto">
                                        <button disabled={!pagination.prev_page_url} onClick={() => setCurrentPage(currentPage - 1)} className="cursor-pointer px-5 py-1 rounded-md bg-gray-200"><FormattedMessage id='prev' /></button>
                                        <button disabled={!pagination.next_page_url} onClick={() => setCurrentPage(currentPage + 1)} className="cursor-pointer px-5 py-1 rounded-md bg-gray-200"><FormattedMessage id='next' /></button>
                                   </div>
                              </div>

                              <button onClick={() => navigate('/add-banner')} className="fixed bottom-10 right-10 w-12 h-12 rounded-full bg-purple-light-color flex justify-center items-center text-white text-2xl shadow-lg hover:bg-purple-500 duration-200 cursor-pointer">
                                   +
                                   <FontAwesomeIcon icon={faScroll} className="" />
                              </button>

                              <div id="delete-window" className="hidden w-full h-full bg-opacity-25 bg-gray-300 absolute top-0 right-0">
                                   <div className="rounded-lg px-5 py-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-1/3">
                                        <div className="text-xl"><FormattedMessage id='sure' /></div>
                                        <div className="text-white font-bold mt-10 flex justify-between mx-auto">
                                             <button onClick={deleteBanner} className="bg-red-500 px-10 py-2 rounded-lg"><FormattedMessage id='delete' /></button>
                                             <button onClick={() => closeWindow()} className="bg-gray-200 px-10 py-2 rounded-lg"><FormattedMessage id='cancel' /></button>
                                        </div>
                                   </div>
                              </div>
                         </div>
               }
          </>
     );
}

export default Banner;