import { NavbarComponent } from "#components/navbar/Navbar";

export default function Page() {
  return (
    <main>
      <NavbarComponent isDashboard={false} />
      <div className="flex items-center justify-center py-8">
        <div className="flex w-full max-w-5xl flex-col gap-6 px-8">
          <div className="flex flex-col gap-6" />
        </div>
      </div>
    </main>
  );
}
