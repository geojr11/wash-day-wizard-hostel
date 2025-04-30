
import { useState } from "react";
import { useLaundry } from "@/context/LaundryContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WashingMachine, Users } from "lucide-react";

export const LoginPage = () => {
  const { setRole, login } = useLaundry();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      login(username);
      setRole("admin");
    } else {
      setError("Invalid admin credentials");
    }
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      login(username);
      setRole("student");
    } else {
      setError("Please enter both username and password");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-laundry-navy mb-2">
          Hostel Laundry Wizard
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Login to access the laundry management system
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card className="border-2 hover:border-laundry-navy transition-all duration-300">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-laundry-lightBlue p-4 rounded-full mb-2">
              <WashingMachine className="h-10 w-10 text-laundry-navy" />
            </div>
            <CardTitle className="text-xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-username">Username</Label>
                <Input 
                  id="admin-username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="admin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input 
                  id="admin-password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full border-laundry-navy bg-laundry-navy hover:bg-laundry-navy/90"
              >
                Login as Admin
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-laundry-teal transition-all duration-300">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-laundry-lightBlue p-4 rounded-full mb-2">
              <Users className="h-10 w-10 text-laundry-navy" />
            </div>
            <CardTitle className="text-xl">Student Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-username">Student ID</Label>
                <Input 
                  id="student-username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="Your student ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-password">Password</Label>
                <Input 
                  id="student-password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full border-laundry-teal bg-laundry-teal hover:bg-laundry-teal/90"
              >
                Login as Student
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      {error && (
        <p className="text-red-500 text-center mt-4">
          {error}
        </p>
      )}
    </div>
  );
};

export default LoginPage;
