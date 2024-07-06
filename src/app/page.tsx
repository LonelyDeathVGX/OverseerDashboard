import { NavbarComponent } from "@/components/common/main/navbar/Navbar";

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="px-12 py-24">
        <div className="flex items-center justify-center">
          <h1 className="font-bold text-xl text-white">Hola</h1>
        </div>
      </div>
    </main>
  );
}
