import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Test () {
     const {wait} = useContext(AuthContext);

     return (
          <>
               {
                    wait ? "Loading" : "Welcome"
               }
          </>
     );
}

export default Test;