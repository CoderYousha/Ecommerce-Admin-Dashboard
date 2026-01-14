import { useContext, useEffect, useRef, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Fetch from "../services/Fetch";
import AuthContext from "../context/AuthContext";
import { FormattedMessage } from "react-intl";

function UpdateCategory() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const nameEnRef = useRef();
     const nameArRef = useRef();
     const descriptionEnRef = useRef();
     const descriptionArRef = useRef();
     const [image, setImage] = useState(null);
     const [sendWait, setSendWait] = useState(false);
     const param = useParams();
     const [category, setCategory] = useState('');
     const { wait } = useContext(AuthContext);
     const [waitGet, setWaitGet] = useState(true);

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

     const getCategory = async () => {
          let result = await Fetch(host + `/v1/admin/categories/${param.id}/show`, "GET", null);

          setCategory(result.data.data);
          setWaitGet(false);
     }

     const updateCategory = async () => {
          setSendWait(true);

          const formData = new FormData();
          formData.append('name_en', nameEnRef.current.value);
          formData.append('name_ar', nameArRef.current.value);
          formData.append('description_en', descriptionEnRef.current.value);
          formData.append('description_ar', descriptionArRef.current.value);
          if (image) {
               formData.append('image', image);
          }

          let result = await Fetch(host + `/v1/admin/categories/${param.id}/update`, "POST", formData);

          if (result.status === 200) {
               toast.success(<FormattedMessage id='updated' />);
          } else if (result.status === 422) {
               toast.error(result.data.errors[0]);
          }

          setSendWait(false);
     }

     useEffect(() => {
          getCategory();
     }, []);


     return (
          <>
               <AdminNavbar />
               <AdminHeader placeholder="Search by name, email..." />
               {
                    wait || waitGet ?
                         <div className="h-screen">
                              <div className="w-4/5 h-3/4 float-left relative">
                                   <ClipLoader color="purple" loading={true} size={70} className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2" />
                              </div>
                         </div>
                         :
                         <div className="w-4/5 float-left">
                              <h1 className="flex font-bold text-3xl ml-5 mt-7"><FormattedMessage id='updateCategory' /></h1>
                              <section className="bg-purple-200 w-11/12 mt-10 rounded-l-lg py-3 float-right relative">
                                   <div className="absolute top-1 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border border-pink-200">
                                        <img id="image" src={category.image} className="w-full h-full rounded-full" />
                                   </div>
                                   <div className="w-fit px-10 py-3 float-left text-white text-2xl font-bold">+<FontAwesomeIcon icon={faLayerGroup} /></div>
                                   <div className="w-full h-20"></div>
                                   <div className="flex justify-around max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='enName' /></div>
                                             <input ref={nameEnRef} defaultValue={category.name_en} type="text" placeholder="Enter english name" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='arName' /></div>
                                             <input ref={nameArRef} defaultValue={category.name_ar} type="text" placeholder="Enter arabic name" className="w-full h-10 indent-2 rounded-md outline-none" />
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5 max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='enDescription' /></div>
                                             <textarea ref={descriptionEnRef} defaultValue={category.description_en} type="text" placeholder="Enter english description" className="w-full indent-2 rounded-md outline-none" rows={5}></textarea>
                                        </div>
                                        <div className="w-2/5 flex flex-col max-sm:w-4/5">
                                             <div className="font-bold w-fit mb-2 max-sm:max-sm:my-2"><FormattedMessage id='arDescription' /></div>
                                             <textarea ref={descriptionArRef} defaultValue={category.description_ar} type="text" placeholder="Enter arabic description" className="w-full indent-2 rounded-md outline-none" rows={5}></textarea>
                                        </div>
                                   </div>
                                   <div className="flex justify-around mt-5 max-sm:block max-sm:ml-3 max-sm:text-sm">
                                        <div className="w-2/5 flex flex-col relative bg-white rounded-lg max-sm:w-4/5">
                                             <FontAwesomeIcon icon={faCamera} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-600 w-10" />
                                             <input accept="image/*" onChange={(e) => { setImage(e.target.files[0]); viewImage(e); }} type="file" placeholder="Enter english description" className="w-full h-10 indent-2 rounded-md outline-none opacity-0 cursor-pointer" />
                                        </div>
                                   </div>
                                   <button onClick={updateCategory} className="my-8 rounded-md bg-white text-purple-500 px-7 py-2 cursor-pointer font-semibold hover:border hover:border-white hover:text-white hover:bg-purple-200 duration-200">
                                        {
                                             !sendWait && <FormattedMessage id='updates' />
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