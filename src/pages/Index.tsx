
import { LaundryProvider } from "@/context/LaundryContext";
import { LaundryWizard } from "@/components/LaundryWizard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-laundry-lightBlue">
      <LaundryProvider>
        <LaundryWizard />
      </LaundryProvider>
    </div>
  );
};

export default Index;
