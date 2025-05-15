import Menu from "./Menu";

export default function Layout({ children, className = "" }) {
  return (
    <div className="flex h-screen w-screen bg-[linear-gradient(to_bottom,_#485977_70%,_#5271ff_30%)]">
      <Menu />
      <div className={`flex flex-col justify-between items-center bg-white rounded mt-6 mb-6 ml-10 p-6 w-300 max-h-[calc(100vh-3rem)] ${className}`}>
        {children}
      </div>
    </div>
  );
}
