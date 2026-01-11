import { useEffect, useState } from "react";
import CheckLogin from "../services/CheckLogin";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function AuthProvider({ children, role=null }) {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const [wait, setWait] = useState(true);
     const navigate = useNavigate();

     const checkLogin = async () => {
          let result = await CheckLogin(host);
          if (!result) {
               navigate('/login');
          } else {
               if(role && result.data.account_role != role){
                    navigate(-1);
               }
               setWait(false);
          }
     }

     useEffect(() => {
          checkLogin();
     }, []);

     return (
          <AuthContext.Provider value={{ wait, setWait }}>
               {children}
          </AuthContext.Provider>
     );

}

export default AuthProvider;