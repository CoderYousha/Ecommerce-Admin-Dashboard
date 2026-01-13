import { useEffect, useState } from 'react';
import LoginImage from '../images/login.jpg';
import Fetch from '../services/Fetch';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import CheckLogin from '../services/CheckLogin';
import { ClipLoader } from 'react-spinners';

function Login() {
     const host = `${process.env.REACT_APP_LOCAL_HOST}`;
     const [wait, setWait] = useState(true);
     const [sendWait, setSendWait] = useState(false);
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();

     const checkLogin = async () => {
          let result = await CheckLogin(host);
          if (result) {
               navigate('/settings');
          } else {
               setWait(false);
          }
     }

     const loging = async () => {
          setSendWait(true);

          const formData = new FormData();
          formData.append('email', email);
          formData.append('password', password);

          let result = await Fetch(host + '/login', "POST", formData);

          if (result.status == 200) {
               localStorage.setItem('token', result.data.data.token);
               localStorage.setItem('language', result.data.data.user.language);
               if (result.data.data.user.account_role == 'admin') {
                    navigate('/settings');
               }
          } else if (result.status == 400) {
               toast.error("incorrect email or password");
          } else if (result.status == 422) {
               toast.error(result.data.errors[0]);
          }
          setSendWait(false);
     }

     useEffect(() => {
          checkLogin();
     }, []);

     return (
          <>
               {
                    wait ?
                         <div className="h-screen w-screens">
                              <div className="w-full h-full float-left relative">
                                   <ClipLoader color="purple" loading={true} size={70} className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2" />
                              </div>
                         </div>
                         :
                         <div className="h-screen overflow-hidden">
                              <img src={LoginImage} className='w-1/3 h-4/5 absolute right-0 top-0 max-sm:hidden' />
                              <section className="w-1/3 ml-40 mt-20 shadow-lg rounded-md max-sm:w-2/3 max-sm:mx-auto">
                                   <h1 className="w-fit purple-light-color font-bold text-lg mx-10 my-5 pt-10">Ecommerce</h1>
                                   <div className='w-fit text-gray-400 mx-10'>Welcome back!!!</div>
                                   <h1 className='w-fit text-3xl font-bold mx-10 my-5'>Sign in</h1>
                                   <div className='w-fit ml-14 my-2'>Eamil</div>
                                   <input onChange={(e) => setEmail(e.target.value)} type='text' className='w-3/4 h-10 rounded-lg outline-none indent-2 bg-purple-100' placeholder='example@gmail.com' />
                                   <div className='w-fit ml-14 my-2'>Password</div>
                                   <input type='password' onChange={(e) => setPassword(e.target.value)} className='w-3/4 h-10 rounded-lg outline-none indent-2 bg-purple-100' placeholder='Enter your password' />
                                   <br />
                                   <button onClick={loging} disabled={sendWait} className='my-10 bg-purple-light-color px-10 py-1 text-white rounded-full cursor-pointer hover:bg-white hover:text-purple-500 hover:border-purple-200 hover:border duration-100'>

                                        {sendWait ?
                                             "LOGING..."
                                             :
                                             "SIGN IN"
                                        }
                                   </button>
                              </section>

                              <Toaster />
                         </div>
               }

          </>
     );
}
export default Login;