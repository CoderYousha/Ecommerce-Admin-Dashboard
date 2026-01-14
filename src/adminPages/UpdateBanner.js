import { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import Fetch from "../services/Fetch";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faScroll } from "@fortawesome/free-solid-svg-icons";
import { AsyncPaginate } from "react-select-async-paginate";
import { useLocation, useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

function UpdateBanner() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const language = localStorage.getItem('language');
     const location = useLocation();
     const { wait } = useContext(AuthContext);
     const [sendWait, setSendWait] = useState(false);
     const [nameEn, setNameEn] = useState(location.state.name_en);
     const [nameAr, setNameAr] = useState(location.state.name_ar);
     const [image, setImage] = useState('');
     const [isActive, setIsActive] = useState(location.state.is_active);
     const [category, setCategory] = useState(location.state.category);
     const [categoryId, setCategoryId] = useState(location.state.category_id);
     const [categoriesType, setCategoriesType] = useState([]);
     const [value, setValue] = useState('');
     const [option, setOption] = useState('');
     const param = useParams();

     function viewImage(event) {
          const previewImage = document.getElementById('image');

          const file = event.target.files[0];
          if (file) {
               const reader = new FileReader();
               reader.addEventListener("load", function () {
                    previewImage.setAttribute("src", this.result);
               });
               reader.readAsDataURL(file);
          }
     }

     const updateBanner = async () => {
          setSendWait(true);

          const formData = new FormData();
          formData.append('name_en', nameEn);
          formData.append('name_ar', nameAr);
          formData.append('category', category);
          formData.append('category_id', categoryId);
          formData.append('is_active', isActive ? 1 : 0);
          if(image){
               formData.append('image', image);
          }

          let result = await Fetch(host + `/v1/admin/banner/${param.id}/update`, 'POST', formData);

          if (result.status === 200) {
               toast.success(<FormattedMessage id='updated' />);
          } else if (result.status === 422) {
               toast.error(result.data.errors[0]);
          }

          setSendWait(false);
     }

     const getCategories = async (type) => {
          var path;
          if (type == 'product') {
               path = host + '/v1/product'
          } else if (type == 'store') {
               path = host + '/v1/store'
          }
          let result = await Fetch(path, 'GET', null);

          if (result.status == 200) {
               setCategoriesType(result);
          }
     }

     const loadOptions = async (search, loadedOptions, { page }) => {
          var path;
          if (category == 'product') {
               path = host + '/v1/product'
          } else if (category == 'store') {
               path = host + '/v1/store'
          }
          let result = await Fetch(path, 'GET', null);

          if (result.status == 200) {
               setCategoriesType(result.data.data.data);
          }
          return {
               options: categoriesType.map(
                    item => ({ value: item.id, label: language == 'en' ? item.name_en : item.name_ar, })), hasMore: categoriesType.hasNextPage, additional: { page: page + 1, },
          };
     }

     useEffect(() => {
          getCategories(category);
          
     }, [category]);

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
                              <h1 className="flex font-bold text-3xl ml-5 mt-7"><FormattedMessage id='updateBanner' /></h1>
                              <section className="bg-purple-200 w-11/12 mt-10 rounded-l-lg py-3 float-right relative">
                                   <div className="absolute top-1 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border border-pink-200">
                                        <img id="image" src={location.state.image} className="w-full h-full rounded-full" />
                                   </div>
                                   <div className="w-fit px-10 py-3 float-left text-white text-2xl font-bold">+<FontAwesomeIcon icon={faScroll} /></div>
                                   <div className="w-full h-20"></div>
                                   <div className="flex justify-around max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='enName' /></div>
                                             <input defaultValue={location.state.name_en} onChange={(e) => setNameEn(e.target.value)} type="text" placeholder="Enter english name" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='arName' /></div>
                                             <input defaultValue={location.state.name_ar} onChange={(e) => setNameAr(e.target.value)} type="text" placeholder="Enter arabic name" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5 max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex">
                                             <div className="font-bold w-2/3 mb-2"><FormattedMessage id='isActive' /></div>
                                             <input
                                                  type="checkbox"
                                                  checked={isActive}
                                                  onChange={e => setIsActive(e.target.checked)}
                                                  className="w-5 h-5 indent-2 rounded-md outline-none"
                                             />
                                        </div>
                                        <div className="w-2/5 flex flex-col relative bg-white rounded-lg max-sm:w-4/5">
                                             <FontAwesomeIcon icon={faCamera} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-600 w-10" />
                                             <input id="file" accept="image/*" onChange={(e) => {setImage(e.target.files[0]); viewImage(e)}} type="file" placeholder="Enter english description" className="w-full h-10 indent-2 rounded-md outline-none opacity-0 cursor-pointer" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='category' /></div>
                                             <select onChange={(e) => setCategory(e.target.value)} className="w-full h-10 indent-2 rounded-md outline-none">
                                                  <option disabled value=''>Select Category</option>
                                                  <option selected={location.state.category == "product"} value="product"><FormattedMessage id='product' /></option>
                                                  <option selected={location.state.category == "store"} value="store"><FormattedMessage id='store' /></option>
                                             </select>
                                        </div>
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-7 max-sm:max-sm:my-2"></div>
                                             <AsyncPaginate
                                                  value={option}
                                                  key={category}
                                                  loadOptions={loadOptions}
                                                  onChange={option => {
                                                       setOption(option);
                                                       setCategoryId(option.value);
                                                  }}
                                                  additional={{ page: 1 }}
                                             />
                                        </div>
                                   </div>
                                   <button onClick={updateBanner} className="my-8 rounded-md bg-white text-purple-500 px-7 py-2 cursor-pointer font-semibold hover:border hover:border-white hover:text-white hover:bg-purple-200 duration-200">
                                        {
                                             !sendWait && <FormattedMessage id='update' />
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

export default UpdateBanner;