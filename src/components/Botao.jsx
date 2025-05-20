export default function Botao({ children, onClick }) {
  return (
    <button
      onClick={onClick}
    style={{ backgroundColor: "#5271ff" }}
      className="text-white px-4 py-2 rounded shadow-md mt-6 w-fit mx-auto"
    >
      {children}
    </button>
  );
}
//