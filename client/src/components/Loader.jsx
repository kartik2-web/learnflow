function Loader({ text = "Loading..." }) {

  return (

    <div className="

    fixed inset-0 z-50

    bg-black/40 backdrop-blur-sm

    flex items-center justify-center
    ">

      <div className="

      bg-white rounded-3xl

      px-10 py-8 shadow-2xl

      flex flex-col items-center
      ">

        {/* SPINNER */}
        <div className="

        w-16 h-16

        border-4 border-blue-500

        border-t-transparent

        rounded-full animate-spin

        mb-6
        "></div>

        {/* TEXT */}
        <h2 className="text-2xl font-bold text-gray-800">

          {text}

        </h2>

      </div>

    </div>
  );
}

export default Loader;