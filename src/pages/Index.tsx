
import { LaundryProvider } from "@/context/LaundryContext";
import { LoginPage } from "@/components/LoginPage";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-laundry-lightBlue">
      <LaundryProvider>
        <LoginPage />
      </LaundryProvider>
    </div>
  );
};

export default Index;
