export default function Logo(){
    return(
      <div className="w-full flex items-start relative p-6 h-130">
        <p className="text-white text-4xl font-nunito ml-10 mt-5">BibliON</p>
        <img
          src="/src/img/logo.png"
          alt="Logo"
          className="w-32 mt-17 ml-[10px] absolute"
        />
      </div>
    )
}