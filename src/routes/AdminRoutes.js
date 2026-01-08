import AddCategory from "../adminPages/AddCategory";
import AddCurrerncy from "../adminPages/AddCurrency";
import AddUser from "../adminPages/AddUser";
import Categories from "../adminPages/Categories";
import Currency from "../adminPages/Currency";
import Dashboard from "../adminPages/Dashboard";
import Settings from "../adminPages/Settings";
import UpdateCategory from "../adminPages/UpdateCategory";
import UpdateCurrency from "../adminPages/UpdateCurrency";
import Users from "../adminPages/Users";

function AdminRoutes() {
     return [
          {
               'path': '/dashboard',
               'element': <Dashboard />
          },
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
     ];
}

export default AdminRoutes;