import { useContext, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import AuthContext from "../context/AuthContext";
import { ClipLoader } from "react-spinners";

function Banner () {
     const { wait } = useContext(AuthContext);
     const [waitGet, setWaitGet] = useState(false);

     

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
                         <div className="">

                         </div>
               }
          </>
     );
}

export default Banner;