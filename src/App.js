import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './adminPages/Dashboard';
import './App.css';
import './styles/colors.css';
import AdminRoutes from './routes/AdminRoutes';
import Login from './authPages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          {
            AdminRoutes().map((route, index) => (
              <Route path={route.path} element={route.element} key={index}></Route>
            ))
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
