import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const [autores, setAutores] = useState([]);
  const navigate = useNavigate();

  const handleButtonClickBibliotecario = () => {
    navigate('/Login'); 
  };

  const handleButtonClickCliente = () => {
    navigate('/paginaclientes'); 
  };

  async function carregarAutores() {
    const response = await fetch("http://localhost:3000/listarAutores")
    const data = await response.json();
    console.log(data);
    setAutores(data);
  }

  function displayAutores(){
    if(!autores){
      return;
    }
    return (autores.map((autorObj, indice) => (<div key={indice}> {autorObj.nome_autor} </div>)));
  }

  useEffect(() => {    
    carregarAutores()
  }, [])

  return (
    <div className="bg-[url('/src/img/fundoWelcome.jpg')] bg-cover bg-center h-screen w-screen flex items-center justify-center">
      <div className="p-10 flex flex-col items-center gap-8 w-[90%] max-w-3xl">
        <div className="relative w-full flex flex-col items-center">
          <h1 className="text-white text-6xl font-bold mt-20 mb-4">BibliON</h1>
          <img
            src="/src/img/logo.png"
            alt="Logo"
            className="w-28 absolute top-[-80px]"
          />
          <p className="text-white text-2xl text-center">
            Bem-vindo(a) à Biblioteca Online!
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full justify-center mt-8">
          <button onClick={handleButtonClickCliente} className="bg-white flex items-center justify-center gap-x-0.5 text-[#737373] font-semibold rounded-2xl w-full md:w-1/2  hover:bg-gray-200">
            <img src="/src/img/student.png" className="h-36 w-32" />
            Sou Professor/Aluno
          </button>
          <button onClick={handleButtonClickBibliotecario} className="bg-white flex items-center justify-center gap-x-0.5 text-[#737373] font-semibold rounded-2xl w-full md:w-1/2 hover:bg-gray-200 hover:border-[#737373]">
            <img src="/src/img/books.png" className="h-44 w-36" alt="" />
            Sou Bibliotecário
          </button>          
          {
            displayAutores()
          }
        </div>
      </div>
    </div>
  );
}


