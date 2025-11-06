import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../../../contexts/UserContext";

type RequireRoleProps = {
  children: React.ReactNode;
  allow: string[];
};

export function RequireRole({ children, allow }: RequireRoleProps) {
  const { user, loading, hasAnyRole } = useUser();

  useEffect(() => {
    if (!loading && user && !hasAnyRole(...allow)) {
      toast.error("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
    }
  }, [loading, user, allow, hasAnyRole]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-500">กำลังโหลด...</span>
      </div>
    );

  if (!user || !hasAnyRole(...allow)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}
