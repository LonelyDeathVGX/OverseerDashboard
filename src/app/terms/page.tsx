import { NavbarComponent } from "@/components/common/main/navbar/Navbar";
import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription } from "#ui/Alert";

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex items-center justify-center py-12">
        <div className="flex w-full max-w-5xl flex-col gap-6 px-5">
          <h1 className="font-bold text-3xl text-white">Terms of Service</h1>
          <div className="flex flex-col gap-6">
            <Alert variant="amber">
              <CircleAlert className="size-5" />
              <AlertDescription>This page is under construction.</AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </main>
  );
}
