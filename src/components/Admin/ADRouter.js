import { Navigate } from "react-router-dom";
import UserDetails from "../UserDetails";
import Error from "../Error";
import { AdminLayout } from "./FullLayoutAdmin";
import Statistics from "../Sidebar Pages/Statistics";
import Users from "../Sidebar Pages/Users";
import { PrivateRouteAdmin } from "./PrivateRouteAdmin";


import Editbook from "../Sidebar Pages/foods/Editfood";

import Orders from "../Sidebar Pages/orders/Orders"
import Books from "../Sidebar Pages/foods/Foods";
import Addbook from "../Sidebar Pages/foods/Addfood";
import BookDetailPage from "../Sidebar Pages/foods/FoodDetailPage";
import OrderDetailPage from "../Sidebar Pages/orders/OrderDetailPage";


export const ThemeRoutes = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/", element: <Navigate to="starter" /> },

      // { path: "AdminDashboard/starter", exact: true, element: <PrivateRouteAdmin element={<Starter />} /> },
      { path: "starter", exact: true, element: <PrivateRouteAdmin element={<Statistics />} /> },
      { path: "userdetails/:id", exact: true, element: <PrivateRouteAdmin element={<UserDetails />} /> },

    
     
      { path: "foods", exact: true, element: <PrivateRouteAdmin element={<Books/>} /> },
      { path: "addfood", exact: true, element: <PrivateRouteAdmin element={<Addbook />} /> },
      { path: "foods/:foodId", exact: true, element: <PrivateRouteAdmin element={<BookDetailPage />} /> },
      { path: "foods/edit/:foodId", exact: true, element: <PrivateRouteAdmin element={<Editbook />} /> },
      { path: 'orders', exact: true, element: <PrivateRouteAdmin element={<Orders />} /> },
      { path: "orders/:orderId", exact: true, element: <PrivateRouteAdmin element={<OrderDetailPage />} /> },
      { path: 'users', exact: true, element: <PrivateRouteAdmin element={<Users />} /> },
      { path: "*", exact: true, element: <Error /> },
      // { path: "starter", exact: true, element: <Statistics /> },
    ],
  },
];


