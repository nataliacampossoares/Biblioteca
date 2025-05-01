import { Menu } from "../components/Menu";

  export default function Default() {
    
    return (
      <div className="flex h-screen w-screen bg-[linear-gradient(to_bottom,_#485977_70%,_#5271ff_30%)]">
        <Menu/>
        <div className="flex flex-col justify-between items-center bg-white rounded-r-xl mt-6 mb-6 mr-24 p-6 w-full max-h-[calc(100vh-3rem)] overflow-hidden">
        <img src="/src/img/defaultbg.png" className="h-screen" />
        </div>
      </div>
    );
  }