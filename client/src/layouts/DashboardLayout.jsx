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

          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white"

          : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900"
      }
      `}
    >

      {/* SIDEBAR */}
      <Sidebar />


      {/* MAIN CONTENT */}
      <main
        className="

        md:ml-[280px]

        min-h-screen

        px-4 sm:px-6 md:px-10

        pt-24 md:pt-10

        pb-14

        transition-all duration-300
        "
      >

        <div
          className="

          max-w-7xl mx-auto

          w-full
          "
        >

          {/* CONTENT WRAPPER */}
          <div
            className={`

            rounded-[32px]

            transition-all duration-300

            ${
              darkMode

                ? "bg-white/[0.03] border border-white/5"

                : "bg-white/70 backdrop-blur-sm border border-gray-200"
            }
            `}
          >

            <div className="p-2 md:p-4">

              {children}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default DashboardLayout;