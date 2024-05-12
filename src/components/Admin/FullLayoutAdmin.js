/* eslint-disable flowtype/require-valid-file-annotation */
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Loader } from "../Loader/loader";
import axios from "axios";
import { serverUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { Addorder } from "../../StoreRedux/orderSlice";
import {
  Adduser, selectUsers
} from "../../StoreRedux/UserSlice";

import { toast } from "react-toastify";
import { Sidebar } from "../Sidebar Pages/SideBar";

import { Addfood } from "../../StoreRedux/foodSlice";
export const AdminLayout = () => {
  const [loader, setloader] = useState(true);
  const dispatch = useDispatch();
  const storeAllUsers = useSelector(selectUsers);
  //////////////////////////////fetch total users/////////////////////////////////////////////

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const response = await axios.get(
          `${serverUrl}/api/users/get_all_users`
        );
        if (response && response.status === 200) {
          setloader(false);
          // console.log(response.data.users);
          dispatch(Adduser(response.data.users));

          toast.success("Users Fetch Successfully");
        }
      } catch (error) {
        setloader(false);
        console.log(error);
        if (error.response) {
          toast.error("Failed to Fetch Users");
        } else {
          toast.error("Failed to Fetch Users");
          console.log("Failed to fetch Users")
        }
      }
    };

    if (storeAllUsers.length === 0) {
      fetchUsers();
    }
  }, [dispatch, storeAllUsers]);
   ///////////////////////////////fetch total foods////////////////////////////////////////////
    useEffect(() => {
      const fetchbooks = async () => {
  
        try {
          const response = await axios.get(
            `${serverUrl}/api/food/getallitems`
          );
          if (response && response.status === 200) {
            setloader(false);
            console.log(response.data.data);
            dispatch(Addfood(response.data.data));
            toast.success("Food items fetch successfully");
          }
        } catch (error) {
          setloader(false);
          console.log(error);
          if (error.response) {
            toast.error("Failed to Fetch foods");
          } else {
            toast.error("Failed to Fetch foods");
            console.log("Failed to fetch foods")
          }
        }
      };
  
      fetchbooks();
      // eslint-disable-next-line
    }, []);
  


  ///////////////////////////////fetch total orders////////////////////////////////////////////
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/order/getallorder`);
        if (response && response.status === 200) {
          setloader(false);
          dispatch(Addorder(response.data.data));
          // toast.success("Orders fetched successfully");
        }
      } catch (error) {
        setloader(false);
        console.log(error);
        if (error.response) {
          // toast.error("Failed to fetch orders");
        } else {
          // toast.error("Failed to fetch orders");
          console.log("Failed to fetch orders");
        }
      }
    };

    fetchOrders(); // Call fetchOrders initially

    // Set interval to call fetchOrders every 2 minutes (120000 milliseconds)
    const intervalId = setInterval(fetchOrders, 120000);

    // Clean up function to clear interval on component unmount
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [serverUrl, dispatch]);
 
  return (
    <>
      <div className="antialiased bg-gray-100 dark:bg-white-600">
        <Sidebar />
        <main className="p-4 md:ml-64 h-auto pt-20">
          <Outlet />
        </main>
        <Loader loading={loader}></Loader>
      </div>
    </>
  );
};


