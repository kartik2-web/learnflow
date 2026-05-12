import Sidebar from "../components/common/Sidebar";

import { useTheme } from "../context/ThemeContext";

function DashboardLayout({ children }) {

  const { darkMode } = useTheme();

  return (

    <div
      className={`

      min-h-screen

      transition-all duration-300

      ${
        darkMode

          ? "bg-gray-950 text-white"

          : "bg-gray-100 text-gray-900"
      }
      `}
    >

      {/* SIDEBAR */}
      <Sidebar />


      {/* MAIN CONTENT */}
      <div
        className="

        md:ml-[280px]

        min-h-screen

        px-4 md:px-8

        pt-24 md:pt-10

        pb-10

        transition-all duration-300
        "
      >

        <div className="max-w-7xl mx-auto">

          {children}

        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;