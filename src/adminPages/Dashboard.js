import AdminHeader from "../components/AdminHeader";
import AdminNavbar from "../components/AdminNavbar";

function Dashboard (){
     return (
          <>
               <AdminNavbar />
               <AdminHeader placeholder="Search..."/>
          </>
     );
}

export default Dashboard;