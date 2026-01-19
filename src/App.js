import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './styles/colors.css';
import AdminRoutes from './routes/AdminRoutes';
import Login from './authPages/Login';
import AuthProvider from './providers/AuthProvider';
import { IntlProvider } from 'react-intl';

function App() {
  const messages = {
    en: {
      navbarTitle: "Admin Panel",
      categories: "Categories",
      users: "Users",
      currency: "Currency",
      stores: "Stores",
      banner: "Banner",
      settings: "Settings",
      logout: "Logout",
      catsManagement: "Categories Management",
      category: "Category",
      description: "Description",
      actions: "Actions",
      next: "Next",
      prev: "Previous",
      cancel: "Cancel",
      delete: "Delete",
      sure: "Are you sure؟",
      addNewCategory: "Add New Category",
      enName: "English Name",
      arName: "Arabic Name",
      enDescription: "English Description",
      arDescription: "Arabic Description",
      updateCategory: "Update Category",
      usersManagement: "Users Management",
      allUsers: "All Users",
      customers: "Customers",
      sellers: "Sellers",
      user: "User",
      role: "Role",
      status: "Status",
      active: "Active",
      inactive: "In Active",
      admin: "Admin",
      client: "Client",
      store_admin: "Store Admin",
      addNewUser: "Add New User",
      name: "Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      phone: "Phone",
      currencyManagement: "Currency Management",
      code: "Code",
      symbol: "Symbol",
      rate: "Rate of Exchange",
      create: "Create",
      update: "Update",
      addNewCurrency: "Add New Currency",
      updateCurrency: "Update Currency",
      storesManagement: "Stores Management",
      image: "Image",
      addNewStore: "Add New Store",
      isActive: "Is Active?",
      updateStore: "Update Store",
      adminsStoreManage: "Admins Store Management",
      addNewStoreAdmin: "Add New Store Admin",
      bannersManagement: "Banners Management",
      store: "Store",
      product: "Product",
      addBanner: "Add New Banner",
      updateBanner: "Update Banner",
      updateProfile: "Update your profile",
      language: "Language",
      arabic: "Arabic",
      english: "English",
      currencyManage: "Currency Management",
      updatePassword: "Update your password",
      oldPassword: "Old Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      created: "Created Successfully",
      updated: "Updated Successfully",
      deleted: "Deletes successfully",
    },
    ar: {
      navbarTitle: "لوحة التحكم",
      categories: "الأصناف",
      users: "المستخدمين",
      currency: "العملات",
      stores: "المتاجر",
      banner: "الإعلانات",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      catsManagement: "إدارة الأصناف",
      category: "الصنف",
      description: "الوصف",
      actions: "إدارة",
      next: "التالي",
      prev: "السابق",
      cancel: "إلغاء",
      delete: "حذف",
      sure: "هل أنت متأكد؟",
      addNewCategory: "إضافة صنف جديد",
      enName: "الاسم بالإنكليزي",
      arName: "الاسم بالعربي",
      enDescription: "الوصف بالإنكليزي",
      arDescription: "الوصف بالعربي",
      updateCategory: "تحديث الصنف",
      usersManagement: "إدارة المستخدمين",
      allUsers: "كل المستخدمين",
      customers: "العملاء",
      sellers: "البائعين",
      user: "المستخدم",
      role: "الصلاحيات",
      status: "الحالة",
      active: "مفعل",
      inactive: "معطل",
      admin: "مدير",
      client: "زبون",
      store_admin: "بائع",
      name: "الاسم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكديد كلمة المرور",
      phone: "رقم الهاتف",
      addNewUser: "إضافة مستخدم جديد",
      code: "الرمز",
      symbol: "الواحدة",
      rate: "قيمة العملة",
      create: "إنشاء",
      update: "تحديث",
      addNewCurrency: "إضافة عمولة جديدة",
      updateCurrency: "تحديث العمولة",
      storesManagement: "إدارة المتاجر",
      image: "صورة",
      addNewStore: "إضافة متجر جديد",
      isActive: "هل مفعل",
      updateStore: "تحديث المتجر",
      adminsStoreManage: "إدارة البائعين",
      addNewStoreAdmin: "إضافة بائع جديد",
      bannersManagement: "إدارة الإعلانات",
      store: "متجر",
      product: "منتج",
      addBanner: "إضافة إعلان جديد",
      updateBanner: "تحديث إعلان",
      updateProfile: "تحديث الملف الشخصي",
      language: "اللغة",
      arabic: "اللغة العربية",
      english: "اللغة الإنكليزية",
      currencyManage: "إدارة العملات",
      updatePassword: "تعديل كلمة المرور",
      oldPassword: "كلمة المرور القديمة",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      created: "تمت الإضافة بنجاح",
      updated: "تم التعديل بنجاح",
      deleted: "تم الحذف بنجاح",
    }
  };
  const currentLang = localStorage.getItem('language');

  return (
    <div className="App">
      <BrowserRouter>
          <IntlProvider locale={currentLang} messages={messages[currentLang]}>
            <Routes>
              <Route path='/' element={<Navigate to='/login' />} />
              <Route path='/login' element={<Login />} />
              {
                AdminRoutes().map((route, index) => (
                  <Route path={route.path} element={<AuthProvider role="admin">{route.element}</AuthProvider>} key={index}></Route>
                ))
              }
            </Routes>
          </IntlProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
