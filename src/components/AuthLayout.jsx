const AuthLayout = ({ image, children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-md bg-white shadow-md overflow-hidden">
        <div className="w-full md:w-1/2 bg-indigo-100 flex items-center justify-center p-6">
          {image || <div className="w-48 h-48 md:w-64 md:h-64 bg-gray-300 rounded-lg" />}
        </div>
        <div className="w-full md:w-1/2 p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
