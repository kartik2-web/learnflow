import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import Loader from "../components/Loader";

import PageWrapper from "../components/PageWrapper";

import { useTheme } from "../context/ThemeContext";

function Summaries() {

  const { darkMode } = useTheme();

  const [pdfs, setPdfs] =
    useState([]);

  const [selectedPdf,
    setSelectedPdf] =
    useState("");

  const [summary, setSummary] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // FETCH PDFS
  const fetchPdfs = async () => {

    try {

      const { data } =
        await API.get("/pdfs");

      setPdfs(data);

    } catch (error) {

      toast.error(
        "Failed to load PDFs"
      );
    }
  };


  useEffect(() => {

    fetchPdfs();

  }, []);


  // GENERATE SUMMARY
  const generateSummary =
    async () => {

    if (!selectedPdf) {

      return toast.error(
        "Select a PDF"
      );
    }

    try {

      setLoading(true);

      setSummary("");

      const { data } =
        await API.post(

          "/pdfs/summary",

          {
            pdfId:
              selectedPdf,
          }
        );

      setSummary(data.summary);

      toast.success(
        "Summary generated"
      );

    } catch (error) {

      toast.error(

        error.response?.data
          ?.message ||

        "Failed to generate summary"
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <DashboardLayout>

      <PageWrapper>

        {
          loading && (

          <Loader text="Generating AI Summary..." />

        )}

        <div className="max-w-6xl mx-auto px-4 md:px-0 pb-20">

          {/* HEADER */}
          <div className="mb-12">

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">

              AI Summaries 🧠

            </h1>

            <p
              className={`

              text-lg

              ${
                darkMode

                  ? "text-gray-400"

                  : "text-gray-500"
              }
              `}
            >

              Generate concise revision notes from PDFs instantly.

            </p>

          </div>


          {/* CONTROLS */}
          <div
            className={`

            rounded-3xl p-8 mb-10

            shadow-2xl

            ${
              darkMode

                ? "bg-gray-900"

                : "bg-white"
            }
            `}
          >

            <div className="flex flex-col md:flex-row gap-5">

              <select
                value={selectedPdf}

                onChange={(e) =>
                  setSelectedPdf(
                    e.target.value
                  )
                }

                className="

                flex-1 p-5 rounded-2xl

                border border-gray-300

                dark:border-gray-700

                dark:bg-gray-800 dark:text-white
                "
              >

                <option value="">
                  Select PDF
                </option>

                {
                  pdfs.map((pdf) => (

                  <option
                    key={pdf._id}
                    value={pdf._id}
                  >
                    {pdf.title}
                  </option>

                ))}
              </select>


              <button
                onClick={
                  generateSummary
                }

                disabled={loading}

                className={`

                px-8 py-5 rounded-2xl

                font-bold text-white

                transition-all duration-300

                ${
                  loading

                    ? "bg-gray-400 cursor-not-allowed"

                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                }
                `}
              >

                Generate Summary

              </button>

            </div>

          </div>


          {/* EMPTY */}
          {
            !summary &&
            !loading && (

            <div
              className={`

              rounded-3xl p-16

              text-center shadow-2xl

              ${
                darkMode

                  ? "bg-gray-900"

                  : "bg-white"
              }
              `}
            >

              <h2 className="text-3xl font-bold mb-4">

                No Summary Generated

              </h2>

              <p className="text-lg text-gray-500">

                Select a PDF and generate AI notes.

              </p>

            </div>

          )}


          {/* SUMMARY */}
          {
            summary && (

            <div
              className={`

              rounded-3xl p-10

              shadow-2xl whitespace-pre-wrap

              leading-relaxed text-lg

              ${
                darkMode

                  ? "bg-gray-900 text-white"

                  : "bg-white text-gray-800"
              }
              `}
            >

              {summary}

            </div>

          )}

        </div>

      </PageWrapper>

    </DashboardLayout>
  );
}

export default Summaries;