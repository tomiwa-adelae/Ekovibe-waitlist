import { ComingSoon } from "@/components/ComingSoon";
import { Services } from "@/components/Services";
import { Showcase } from "@/components/Showcase";
import { WaitlistForm } from "@/components/WaitlistForm";

const page = () => {
  return (
    <div>
      <Showcase />
      <ComingSoon />
      <Services />
      <WaitlistForm />
    </div>
  );
};

export default page;
