import Sidebar from "../components/navigation/Sidebar";
import RightPanel from "../components/navigation/RightPanel";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-app p-4 sm:p-6 overflow-hidden" >
      <div className="h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] 
                w-full rounded-2xl 
                border-2 border-gray-300
                bg-white
                flex overflow-hidden">

        <Sidebar />
        <main className="flex-1 border-l border-indigo-100/80 overflow-y-auto bg-gradient-to-b from-white/50 to-indigo-50/30">
          {children}
        </main>
        <RightPanel />
      </div>
    </div>
  );
};

export default DashboardLayout;
