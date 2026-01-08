import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminHeader({placeholder}) {
     return (
          <header className="right-0 float-left flex justify-around items-center w-4/5 border-b py-4">
               <div className="w-2/5 relative">
                    <FontAwesomeIcon icon={faSearch} className="text-gray-300 absolute top-1/2 left-7 -translate-y-1/2 text-xl" />
                    <input type="text" className="w-full h-12 border rounded-lg indent-16 outline-none" placeholder={placeholder} />
               </div>
               <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex justify-center items-center bg-light-blue">
                         <FontAwesomeIcon icon={faUser} className="text-blue-700" />
                    </div>
                    <div className="dir-ltr ml-2">
                         <div className="w-fit">Admin User</div>
                         <div className="w-fit text-gray-400">admin@store.com</div>
                    </div>
               </div>
          </header>
     );
}

export default AdminHeader;