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
import Cadastro from "./pages/Cadastro.jsx";
import Default from "./pages/Default.jsx";
import Emprestimos from "./pages/Emprestimos.jsx";
import Livros from "./pages/Livros.jsx";
import Clientes from "./pages/Clientes.jsx";
import CadastrarCliente from "./pages/CadastrarCliente.jsx";
import Cliente from "./pages/Cliente.jsx";

import App from "./App.jsx";

const rotas = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route path="cadastro" element={<Cadastro />} />
      <Route path="default" element={<Default />} />
      <Route path="emprestimos" element={<Emprestimos />} />
      <Route path="clientes" element={<Clientes />} />
      <Route path="livros" element={<Livros />} />
      <Route path="cadastrarcliente" element={<CadastrarCliente />} />
      <Route path="cliente" element={<Cliente />} />
      <Route path="app" element={<App />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterProvider router={rotas} />
  </StrictMode>
);
