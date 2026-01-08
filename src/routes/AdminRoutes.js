import AddCategory from "../adminPages/AddCategory";
import AddUser from "../adminPages/AddUser";
import Categories from "../adminPages/Categories";
import Dashboard from "../adminPages/Dashboard";
import Settings from "../adminPages/Settings";
import UpdateCategory from "../adminPages/UpdateCategory";
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
     ];
}

export default AdminRoutes;