import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../components/Loader";

function Upload() {
  const [file, setFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);

  // API BASE URL
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  // FETCH PDFs
  const fetchPdfs = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/pdfs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPdfs(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch PDFs");
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  // UPLOAD PDF
  const uploadPdf = async () => {
    if (!file) {
      return toast.error("Choose PDF");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("pdf", file);

      const token = localStorage.getItem("token");

      await API.post("/pdfs/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("PDF Uploaded");

      setFile(null);

      fetchPdfs();
    } catch (error) {
      console.log(error);
      toast.error("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE PDF
  const deletePdf = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/pdfs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("PDF Deleted");

      fetchPdfs();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  return (
    <DashboardLayout>
      {loading && <Loader text="Uploading PDF..." />}

      <div className="max-w-7xl mx-auto px-4 md:px-0 pb-20">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">
            Upload PDF
          </h1>

          <p className="text-gray-500 text-lg">
            Upload study material and generate AI quizzes.
          </p>
        </div>

        {/* UPLOAD SECTION */}
        <div
          className="
          bg-white rounded-3xl shadow-2xl
          p-6 md:p-10 mb-12
          border-2 border-dashed border-blue-200
          hover:border-blue-400
          transition-all duration-300
          "
        >
          <div className="flex flex-col gap-6">
            {/* ICON */}
            <div className="text-6xl text-center">📄</div>

            {/* TITLE */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Drag & Drop PDF
              </h2>

              <p className="text-gray-500">
                Upload your study notes in PDF format
              </p>
            </div>

            {/* FILE INPUT */}
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="
              border border-gray-300
              rounded-2xl p-4
              w-full bg-gray-50
              "
            />

            {/* FILE NAME */}
            {file && (
              <div
                className="
                bg-blue-50 text-blue-700
                p-4 rounded-2xl
                font-semibold text-center
                "
              >
                Selected: {file.name}
              </div>
            )}

            {/* BUTTON */}
            <button
              onClick={uploadPdf}
              disabled={loading}
              className={`
              py-4 rounded-2xl
              font-bold text-lg text-white
              transition-all duration-300
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-xl"
              }
              `}
            >
              Upload PDF
            </button>
          </div>
        </div>

        {/* PDF LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {pdfs.length === 0 ? (
            <div
              className="
              col-span-full
              bg-white rounded-3xl shadow-xl
              p-16 text-center
              "
            >
              <h2 className="text-3xl font-bold text-gray-700 mb-4">
                No PDFs Uploaded Yet
              </h2>

              <p className="text-gray-500 text-lg">
                Upload your first study PDF to begin.
              </p>
            </div>
          ) : (
            pdfs.map((pdf) => (
              <div
                key={pdf._id}
                className="
                bg-white p-6 rounded-3xl
                shadow-xl hover:shadow-2xl
                transition-all duration-300
                hover:-translate-y-2
                "
              >
                {/* ICON */}
                <div className="text-5xl mb-6">📘</div>

                {/* TITLE */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 break-words">
                  {pdf.title}
                </h2>

                {/* BUTTONS */}
                <div className="flex flex-col md:flex-row gap-4">
                  <a
                    href={`${API_BASE_URL}${pdf.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    flex-1 text-center
                    bg-blue-600 hover:bg-blue-700
                    text-white px-5 py-3
                    rounded-2xl font-semibold
                    transition-all duration-300
                    "
                  >
                    View PDF
                  </a>

                  <button
                    onClick={() => deletePdf(pdf._id)}
                    className="
                    flex-1
                    bg-red-500 hover:bg-red-600
                    text-white px-5 py-3
                    rounded-2xl font-semibold
                    transition-all duration-300
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Upload;