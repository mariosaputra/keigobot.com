export default function Header() {
  return (
    <>
      <div className="flex flex-col fixed z-50">
        <div className="flex bg-gray-900 px-10 py-5 w-screen items-center justify-between">
          <h1 className="text-white text-4xl font-bold tracking-tight">
            <span>Keigo</span>
            <span className="text-red-300 mr-1">Bot</span>
            <span className="text-sm">.com</span>
          </h1>
        </div>
      </div>
    </>
  );
}
