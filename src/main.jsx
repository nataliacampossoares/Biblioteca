import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Login from "./pages/Login.jsx";
import Welcome from "./pages/Welcome.jsx";
import CadastrarBibliotecario from "./pages/CadastrarBibliotecario.jsx";
import Default from "./pages/Default.jsx";
import Emprestimos from "./pages/Emprestimos.jsx";
import Livro from "./pages/Livro.jsx";
import Clientes from "./pages/Clientes.jsx";
import CadastrarCliente from "./pages/CadastrarCliente.jsx";
import Cliente from "./pages/Cliente.jsx";
import Historico from "./pages/Historico.jsx";
import LivrosBibliotecario from "./pages/LivrosBibliotecario.jsx";
import PaginaClientes from "./pages/PaginaClientes.jsx";
import CadastrarLivro from "./pages/CadastrarLivro.jsx";
import DevolucaoLivro from "./pages/DevolucaoLivro.jsx";
import LivrossemMenu from "./pages/LivroCliente.jsx";

import App from "./App.jsx";

const rotas = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route path="livrosbibliotecario" element={<LivrosBibliotecario/>} />
      <Route path="cadastrarbibliotecario" element={<CadastrarBibliotecario />} />
      <Route path="default" element={<Default />} />
      <Route path="emprestimos" element={<Emprestimos />} />
      <Route path="clientes" element={<Clientes />} />
      <Route path="livro/:id" element={<Livro />} />
      <Route path="livroCliente/:id" element={<LivrossemMenu />} />
      <Route path="cadastrarcliente" element={<CadastrarCliente />} />
      <Route path="cliente" element={<Cliente />} />
      <Route path="historico" element={<Historico />} />
      <Route path="paginaclientes" element={<PaginaClientes />} />
      <Route path="app" element={<App />} />
      <Route path="cadastrarLivro" element={<CadastrarLivro/>} />
      <Route path="devolucaolivro" element={<DevolucaoLivro/>} />
      <Route path="/cliente/:id" element={<Cliente />} />
      <Route path="/editarcliente/:id" element={<CadastrarCliente/>} />
      {/* <Route path="/livros/:id" element={<Livro} */}
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterProvider router={rotas} />
  </StrictMode>
);
