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
        "Could not load notes"
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
          "Note updated successfully"
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
          "Note created successfully"
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
        "Could not save note"
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

    toast.success(
      "Editing note"
    );
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
        "Note deleted successfully"
      );

      fetchNotes();

    } catch (error) {

      toast.error(
        "Could not delete note"
      );
    }
  };


  return (

    <DashboardLayout>

      <div className="px-2 md:px-0 pb-20">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">

            My Notes 📝

          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400">

            Organize your learning notes and study smarter.

          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={
            handleSubmit
          }

          className="

          bg-white dark:bg-gray-900

          p-8 md:p-10

          rounded-[32px]

          shadow-2xl

          mb-12

          transition-all duration-300
          "
        >

          <div
            className="
            flex flex-col
            gap-6
            "
          >

            {/* TITLE */}
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

              border border-gray-300 dark:border-gray-700

              bg-white dark:bg-gray-800

              text-gray-900 dark:text-white

              placeholder-gray-500 dark:placeholder-gray-400

              rounded-2xl

              p-5

              outline-none

              focus:ring-2 focus:ring-blue-500

              transition-all duration-300
              "
            />


            {/* CONTENT */}
            <textarea
              name="content"

              placeholder="Write your study notes here..."

              value={
                formData.content
              }

              onChange={
                handleChange
              }

              rows="7"

              className="

              border border-gray-300 dark:border-gray-700

              bg-white dark:bg-gray-800

              text-gray-900 dark:text-white

              placeholder-gray-500 dark:placeholder-gray-400

              rounded-2xl

              p-5

              outline-none

              focus:ring-2 focus:ring-blue-500

              transition-all duration-300
              "
            />


            {/* BUTTON */}
            <button
              className="

              bg-gradient-to-r

              from-blue-600 to-indigo-600

              hover:from-blue-700 hover:to-indigo-700

              text-white

              px-8 py-4

              rounded-2xl

              font-bold

              shadow-xl

              hover:-translate-y-1

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


        {/* EMPTY STATE */}
        {
          notes.length === 0 ? (

          <div
            className="

            bg-white dark:bg-gray-900

            rounded-[32px]

            shadow-2xl

            p-16

            text-center
            "
          >

            <div className="text-7xl mb-6">

              📝

            </div>

            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">

              No Notes Yet

            </h2>

            <p className="text-lg text-gray-500 dark:text-gray-400">

              Create your first study note to begin learning smarter.

            </p>

          </div>

        ) : (

          /* NOTES GRID */
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

                bg-white dark:bg-gray-900

                p-7

                rounded-[32px]

                shadow-2xl

                hover:-translate-y-1

                transition-all duration-300
                "
              >

                <h2
                  className="
                  text-2xl font-bold
                  text-gray-800 dark:text-white
                  mb-4
                  "
                >

                  {note.title}

                </h2>


                <p
                  className="
                  text-gray-700 dark:text-gray-300
                  mb-8
                  whitespace-pre-wrap
                  leading-relaxed
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

                    shadow-lg

                    transition-all duration-300
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

                    shadow-lg

                    transition-all duration-300
                    "
                  >

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default Notes;