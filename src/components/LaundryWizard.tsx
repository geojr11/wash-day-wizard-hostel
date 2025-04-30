
import { useLaundry } from "@/context/LaundryContext";
import { LoginPage } from "@/components/LoginPage";
import StudentDashboard from "@/components/StudentDashboard";
import AdminDashboard from "@/components/AdminDashboard";

export const LaundryWizard = () => {
  const { role, isAuthenticated } = useLaundry();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  if (role === 'admin') {
    return <AdminDashboard />;
  }

  if (role === 'student') {
    return <StudentDashboard />;
  }

  return <LoginPage />;
};

export default LaundryWizard;
