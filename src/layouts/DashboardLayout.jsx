import TopNav from "../components/navigation/TopNav";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-app flex flex-col">
      <TopNav />
      <main className="flex-1">
        <div className="max-w-[1300px] mx-auto px-6 sm:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
