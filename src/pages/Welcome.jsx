export default function Welcome() {
  return (
    <>
      <div className="bg-[url('/src/img/fundoWelcome.jpg')] bg-cover bg-center relative h-screen w-screen">
        {/* Texto sobre o fundo */}
        <p className="text-white text-4xl p-4 z-10">BibliON</p>
        <img
          src="/src/img/testanto.png"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xs z-20"
        />
        <p>Bem-vindo(a) à Biblioteca Online!</p>
        <button>Sou aluno/professor</button>
        <button>Sou bibliotecário</button>
      </div>
    </>
  );
}
