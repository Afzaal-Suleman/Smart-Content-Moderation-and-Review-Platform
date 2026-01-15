"use client";

import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/store/authStore";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated, role } = useSelector((state: any) => state.auth);
  console.log(isAuthenticated, role);
  
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || (role !== "admin" && role !== "moderator")) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [isAuthenticated, role, router]);

  if (!authorized) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
