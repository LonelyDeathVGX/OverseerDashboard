import { NavbarComponent } from "@/components/common/main/navbar/Navbar";

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="px-12 py-24">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-7xl text-white text-center">404</h1>
          <p className="font-medium text-sm text-foreground-500 text-center">
            If you think this is an error
            <br />
            please contact us at our support server
          </p>
        </div>
      </div>
    </main>
  );
}
