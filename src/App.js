import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './styles/colors.css';
import AdminRoutes from './routes/AdminRoutes';
import Login from './authPages/Login';
import AuthProvider from './providers/AuthProvider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider role="admin">
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/' element={<Navigate to='/login' />}/>
            {
              AdminRoutes().map((route, index) => (
                <Route path={route.path} element={route.element} key={index}></Route>
              ))
            }
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
