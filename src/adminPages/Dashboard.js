import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";
import Logo from '../images/logo.png'

function Dashboard (){
     return (
          <>
               <AdminNavbar />
               <AdminHeader placeholder="Search..."/>

               <h1 className="float-left ml-20 mt-5 font-bold text-3xl">Welcome Admin</h1>
               <img src={Logo} className="w-1/3 float-right" />

          </>
     );
}

export default Dashboard;