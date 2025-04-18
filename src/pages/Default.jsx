import { Menu } from "../components/Menu";

  export default function Default() {
    
    return (
      <div className="flex flex-row gap-64">
        <Menu/>
        <img src="/src/img/defaultbg.png" className="h-screen" />
      </div>
    );
  }