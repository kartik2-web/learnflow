import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

function Notes() {

  const [notes, setNotes] =
    useState([]);

  const [editingId,
    setEditingId] =
    useState(null);

  const [formData,
    setFormData] =
    useState({
      title: "",
      content: "",
    });


  // =========================
  // FETCH NOTES
  // =========================

  const fetchNotes = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const { data } =
        await API.get(
          "/notes",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setNotes(data);

    } catch (error) {

      toast.error(
        "Failed to fetch notes"
      );
    }
  };


  // =========================
  // LOAD NOTES
  // =========================

  useEffect(() => {

    fetchNotes();

  }, []);


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange =
    (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };


  // =========================
  // CREATE / UPDATE NOTE
  // =========================

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      // UPDATE
      if (
        editingId
      ) {

        await API.put(

          `/notes/${editingId}`,

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Note Updated"
        );

      }

      // CREATE
      else {

        await API.post(

          "/notes",

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Note Created"
        );
      }

      setFormData({
        title: "",
        content: "",
      });

      setEditingId(
        null
      );

      fetchNotes();

    } catch (error) {

      toast.error(
        "Operation Failed"
      );
    }
  };


  // =========================
  // EDIT NOTE
  // =========================

  const editNote =
    (note) => {

    setEditingId(
      note._id
    );

    setFormData({
      title: note.title,
      content:
        note.content,
    });
  };


  // =========================
  // DELETE NOTE
  // =========================

  const deleteNote =
    async (id) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await API.delete(

        `/notes/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Note Deleted"
      );

      fetchNotes();

    } catch (error) {

      toast.error(
        "Delete Failed"
      );
    }
  };


  return (

    <DashboardLayout>

      <h1
        className="
        text-5xl font-bold
        text-gray-800 mb-10
        "
      >

        Notes

      </h1>


      {/* FORM */}
      <form
        onSubmit={
          handleSubmit
        }

        className="
        bg-white p-8
        rounded-3xl shadow-xl
        mb-10
        "
      >

        <div
          className="
          flex flex-col
          gap-5
          "
        >

          <input
            type="text"

            name="title"

            placeholder="Enter note title"

            value={
              formData.title
            }

            onChange={
              handleChange
            }

            className="
            border border-gray-300
            rounded-2xl p-4
            "
          />


          <textarea
            name="content"

            placeholder="Write your note..."

            value={
              formData.content
            }

            onChange={
              handleChange
            }

            rows="6"

            className="
            border border-gray-300
            rounded-2xl p-4
            "
          />


          <button
            className="
            bg-blue-600 hover:bg-blue-700
            text-white px-8 py-4
            rounded-2xl font-semibold
            transition-all duration-300
            "
          >

            {
              editingId

                ? "Update Note"

                : "Create Note"
            }

          </button>

        </div>

      </form>


      {/* NOTES LIST */}
      <div
        className="
        grid grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-8
        "
      >

        {notes.map(
          (note) => (

          <div
            key={note._id}

            className="
            bg-white p-6
            rounded-3xl
            shadow-xl
            hover:shadow-2xl
            transition-all duration-300
            "
          >

            <h2
              className="
              text-2xl font-bold
              text-gray-800 mb-4
              "
            >

              {note.title}

            </h2>


            <p
              className="
              text-gray-600
              mb-6
              whitespace-pre-wrap
              "
            >

              {note.content}

            </p>


            <div
              className="
              flex gap-4
              "
            >

              <button
                onClick={() =>
                  editNote(note)
                }

                className="
                bg-yellow-500
                hover:bg-yellow-600
                text-white
                px-5 py-3
                rounded-2xl
                font-semibold
                "
              >

                Edit

              </button>


              <button
                onClick={() =>
                  deleteNote(
                    note._id
                  )
                }

                className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-5 py-3
                rounded-2xl
                font-semibold
                "
              >

                Delete

              </button>

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default Notes;