import { createContext, useContext, useState } from "react";
import { adminLogin, adminLogout } from "../api/gameApi";

const AdminAuthContext = createContext(null);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  // 로그인 성공 시에만 isAuthenticated를 true로 설정하고,
  // 로그아웃 시 false로 설정
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (tokenValue) => {
    try {
      await adminLogin(tokenValue);
      // 로그인 성공 시 백엔드가 쿠키를 설정했으므로 인증 상태를 true로 설정
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("로그인 실패:", error);
      setIsAuthenticated(false);
      return { 
        success: false, 
        error: error.response?.data?.message || "로그인에 실패했습니다." 
      };
    }
  };

  const logout = async () => {
    try {
      await adminLogout();
      // 로그아웃 성공 시 백엔드가 쿠키를 삭제했으므로 인증 상태를 false로 설정
      setIsAuthenticated(false);
    } catch (error) {
      console.error("로그아웃 실패:", error);
      // 에러가 발생해도 로컬 상태는 false로 설정
      setIsAuthenticated(false);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading: false, // 쿠키 기반이므로 초기 로딩 불필요
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

