import AddBanner from "../adminPages/AddBanner";
import AddCategory from "../adminPages/AddCategory";
import AddCurrerncy from "../adminPages/AddCurrency";
import AddStore from "../adminPages/AddStore";
import AddStoreAdmin from "../adminPages/AddStoreAdmin";
import AddUser from "../adminPages/AddUser";
import AdminsStore from "../adminPages/AdminsStore";
import Banner from "../adminPages/Banner";
import Categories from "../adminPages/Categories";
import Currency from "../adminPages/Currency";
import Dashboard from "../adminPages/Dashboard";
import Settings from "../adminPages/Settings";
import Stores from "../adminPages/Stores";
import UpdateCategory from "../adminPages/UpdateCategory";
import UpdateCurrency from "../adminPages/UpdateCurrency";
import UpdateStore from "../adminPages/UpdateStore";
import Users from "../adminPages/Users";

function AdminRoutes() {
     return [
          // {
          //      'path': '/dashboard',
          //      'element': <Dashboard />
          // },
          {
               'path': '/users',
               'element': <Users />
          },
          {
               'path': '/add-user',
               'element': <AddUser />
          },
          {
               'path': '/settings',
               'element': <Settings />
          },
          {
               'path': '/categories',
               'element': <Categories />
          },
          {
               'path': '/add-category',
               'element': <AddCategory />
          },
          {
               'path': '/update-category/:id',
               'element': <UpdateCategory />
          },
          {
               'path': '/currency',
               'element': <Currency />
          },
          {
               'path': '/add-currency',
               'element': <AddCurrerncy />
          },
          {
               'path': '/update-currency/:id',
               'element': <UpdateCurrency />
          },
          {
               'path': '/stores',
               'element': <Stores />
          },
          {
               'path': '/add-store',
               'element': <AddStore />
          },
          {
               'path': '/update-store/:id',
               'element': <UpdateStore />
          },
          {
               'path': '/admins-store/:id',
               'element': <AdminsStore />
          },
          {
               'path': '/add-store-admin/:id',
               'element': <AddStoreAdmin />
          },
          {
               'path': '/banner',
               'element': <Banner />
          },
          {
               'path': '/add-banner',
               'element': <AddBanner />
          },
     ];
}

export default AdminRoutes;