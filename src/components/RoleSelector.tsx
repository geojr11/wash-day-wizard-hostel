
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Role } from "@/types";
import { useLaundry } from "@/context/LaundryContext";
import { WashingMachine, Users } from "lucide-react";

export const RoleSelector = () => {
  const { setRole } = useLaundry();

  const handleRoleSelect = (role: Role) => {
    setRole(role);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-laundry-navy mb-2">
          Hostel Laundry Wizard
        </h1>
        <p className="text-lg text-gray-600">
          Select your role to continue
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card className="border-2 hover:border-laundry-teal transition-all duration-300 cursor-pointer" onClick={() => handleRoleSelect('student')}>
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-laundry-lightBlue p-4 rounded-full mb-2">
              <Users className="h-10 w-10 text-laundry-navy" />
            </div>
            <CardTitle className="text-xl">Student</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CardDescription className="text-sm mb-4">
              Book laundry slots and manage your bookings
            </CardDescription>
            <Button 
              variant="outline" 
              className="border-laundry-teal text-laundry-teal hover:bg-laundry-teal hover:text-white"
              onClick={() => handleRoleSelect('student')}
            >
              Continue as Student
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-laundry-navy transition-all duration-300 cursor-pointer" onClick={() => handleRoleSelect('admin')}>
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-laundry-lightBlue p-4 rounded-full mb-2">
              <WashingMachine className="h-10 w-10 text-laundry-navy" />
            </div>
            <CardTitle className="text-xl">Admin</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CardDescription className="text-sm mb-4">
              Manage all bookings and view system statistics
            </CardDescription>
            <Button 
              variant="outline"
              className="border-laundry-navy text-laundry-navy hover:bg-laundry-navy hover:text-white"
              onClick={() => handleRoleSelect('admin')}
            >
              Continue as Admin
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleSelector;
