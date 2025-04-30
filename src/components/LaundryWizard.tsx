
import { useLaundry } from "@/context/LaundryContext";
import RoleSelector from "@/components/RoleSelector";
import StudentDashboard from "@/components/StudentDashboard";
import AdminDashboard from "@/components/AdminDashboard";

export const LaundryWizard = () => {
  const { role } = useLaundry();

  if (role === 'admin') {
    return <AdminDashboard />;
  }

  if (role === 'student') {
    return <StudentDashboard />;
  }

  return <RoleSelector />;
};

export default LaundryWizard;
