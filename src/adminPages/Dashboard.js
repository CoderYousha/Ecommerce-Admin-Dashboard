import { useContext } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import Logo from '../images/logo.png'
import AuthContext from "../context/AuthContext";
import { ClipLoader } from "react-spinners";

function Dashboard (){
     const {wait} = useContext(AuthContext);

     return (
          <>
               <AdminNavbar />
               <AdminHeader placeholder="Search..."/>

               {
                    wait ?
                         <div className="h-screen">
                              <div className="w-4/5 h-3/4 float-left relative">
                                   <ClipLoader color="purple" loading={true} size={70} className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2" />
                              </div>
                         </div>
                         :
                         <>
                              <h1 className="float-left ml-20 mt-5 font-bold text-3xl">Welcome Admin</h1>
                              <img src={Logo} className="w-1/3 float-right" />
                         </>
               }


          </>
     );
}

export default Dashboard;