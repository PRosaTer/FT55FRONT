"use client";
import { useEffect, useState } from "react";
import Navbar from "./nav";
import AdminNavbar from "./adminNavbar";
import { useAuthStore } from "@/store/authStore";
import { usePathname } from "next/navigation";

const RoleNavbar: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [userData, setUserData] = useState(user);
  const pathname = usePathname();
  const isAdmin = userData?.role === "admin";

  useEffect(() => {
    const dataUser = localStorage.getItem("user");
    setUserData(JSON.parse(dataUser!));
  }, [pathname]);
  //console.log("este es el userdata:", userData);

  if (isAdmin) {
    return <AdminNavbar />;
  }

  return <Navbar />;
};

export default RoleNavbar;
