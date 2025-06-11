
export default function Layout({ children, className = "" }) {
  return (
    <div className="h-screen w-screen bg-[linear-gradient(to_bottom,_#485977_70%,_#5271ff_30%)] p-6">
      <div className="flex h-full rounded-xl overflow-auto">
       
        <main className={`flex-1 p-6 min-h-full bg-white ${className}`}>
          {children}
        </main>
      </div>
    </div>
  );
}