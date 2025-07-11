import { useState, useEffect } from "react";
import { IconChevronRight, IconChevronDown } from "@tabler/icons-react";
import Layout from "../components/Layout";
import Botao from "../components/Botao";
import { useParams, useNavigate } from "react-router-dom";

export default function CadastrarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [cursos, setCursos] = useState([]);
  const [novoCurso, setNovoCurso] = useState(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cargo, setCargo] = useState("");
  const [ra, setRa] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/listarCursos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar cursos");
        }
        return response.json();
      })
      .then((data) => {
        setCursos(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar cursos:", error);
      });
  }, []);

  useEffect(() => {
    if (id && cursos.length > 0) {
      async function buscarLocatario() {
        try {
          const resp = await fetch(`http://localhost:3000/locatario/${id}`);
          if (!resp.ok) throw new Error("Erro ao buscar locatário");
          const data = await resp.json();
          console.log("Dados recebidos do backend:", data);
          console.log("RA");
          console.log(data.nome);
          setNome(data.nome || "");
          setEmail(data.email || "");
          setTelefone(data.telefone || "");
          setDataNascimento(data.data_de_nascimento || "");
          setCargo(data.cargo?.toLowerCase() || "");
          setRa(data.ra || "");
          setNovoCurso(null);
          if (data.id_curso) {
            const cursoEncontrado = cursos.find((c) => c.id === data.id_curso);
            setSelectedCourse(cursoEncontrado || null);
          } else {
            setSelectedCourse(null);
          }
        } catch (err) {
          console.error("Erro ao buscar locatário:", err);
        }
      }
      buscarLocatario();
    }
  }, [id, cursos]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleRadioChange = (curso) => {
    setSelectedCourse(curso);
    setIsOpen(false);
    setNovoCurso(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensagem("");

    if (!nome.trim()) {
      setMensagem("Por favor, preencha o nome completo.");
      return;
    }

    if (!ra.trim()) {
      setMensagem("Por favor, informe o Registro Acadêmico.");
      return;
    }

    if (!email.trim()) {
      setMensagem("Por favor, informe um email.");
      return;
    }

    if (!dataNascimento) {
      setMensagem("Por favor, selecione a data de nascimento.");
      return;
    }

    if (!telefone.trim()) {
      setMensagem("Por favor, informe um telefone.");
      return;
    }

    if (!selectedCourse && !novoCurso) {
      setMensagem("Por favor, selecione ou cadastre um curso.");
      return;
    }

    if (!cargo) {
      setMensagem("Por favor, selecione o cargo (Professor ou Aluno).");
      return;
    }

    const dadosCliente = {
      nome: nome,
      email: email,
      telefone: telefone,
      id_curso: novoCurso ? null : selectedCourse?.id,
      data_de_nascimento: dataNascimento,
      tipo: cargo,
      ra: ra,
      novo_curso: novoCurso ? novoCurso.nome_curso : null,
    };
    console.log("Dados que serão enviados:", dadosCliente);

    try {
      let url = "http://localhost:3000/cadastrarLocatario";
      let method = "POST";

      if (id) {
        url = `http://localhost:3000/alterarLocatario/${id}`;
        method = "POST";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosCliente),
      });

      if (!response.ok) throw new Error("Erro ao salvar locatário");

      alert(
        id
          ? "Locatário atualizado com sucesso!"
          : "Cadastro realizado com sucesso!"
      );
      navigate("/clientes");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar locatário");
    }
  };
  
  return (
    <Layout className="loverflow-y-auto overflow-x-hidden">
      <h2 className="text-3xl text-center text-[#485977] mt-5 font-bold">
        {id ? "Editar Cliente" : "Cadastro Cliente"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center mt-6 mb-6 mr-2 p-6 w-full gap-3 rounded-xl bg-[#efefef]"
      >
        <label className="flex flex-col text-gray-700 font-semibold">
          Nome
          <input
            name="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
            placeholder="Digite o nome completo"
          />
        </label>

        <label className="flex flex-col text-gray-700 font-semibold">
          Registro Acadêmico
          <input
            name="ra"
            value={ra}
            type="text"
            maxLength={8}   
            onChange={(e) => setRa(e.target.value)}
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
            placeholder="Digite o RA"
          />
        </label>

        <div className="flex flex-row gap-2">
          <div className="flex items-center gap-2 relative">
            <button
              name="curso"
              type="button"
              onClick={toggleDropdown}
              className="border px-4 py-2 rounded bg-white shadow-sm flex items-center"
            >
              <p className="text-gray-700 font-semibold">
                {"Curso: " +
                  (selectedCourse?.nome_curso || "Selecione um curso")}
              </p>
              {isOpen ? (
                <IconChevronDown className="text-gray-700 ml-2" />
              ) : (
                <IconChevronRight className="text-gray-700 ml-2" />
              )}
            </button>
          </div>
          <NovoCurso
            onNovoCurso={(nome) => {
              const cursoTemporario = { id: -1, nome_curso: nome };

              setSelectedCourse(cursoTemporario); 
              setNovoCurso(cursoTemporario); 
              setIsOpen(false);
            }}
          />
  
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded shadow-lg max-h-48 overflow-auto">
              {cursos.length === 0 && (
                <p className="p-2 text-gray-500">Nenhum curso cadastrado</p>
              )}

              {cursos.map((curso) => (
                <label
                  key={curso.id}
                  className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="radio"
                    name="curso"
                    value={curso.nome_curso}
                    checked={selectedCourse?.id === curso.id}
                    onChange={() => handleRadioChange(curso)}
                    className="cursor-pointer"
                  />
                  <span className="text-black">{curso.nome_curso}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <label className="flex flex-col text-gray-700 font-semibold">
          E-mail
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
            placeholder="Digite o e-mail"
          />
        </label>

        <label className="flex flex-col text-gray-700 font-semibold">
          Telefone
          <input
            type="tel"
            name="telefone"
            maxlength={11}
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
            placeholder="(00) 00000-0000"
          />
        </label>

        <label className="flex flex-col text-gray-700 font-semibold">
          Data de nascimento
          <input
            name="dataNascimento"
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="mt-1 p-4 border border-gray-300 bg-gray-300 rounded-md"
            placeholder="Digite a data de nascimento"
          />
        </label>

        <div className="flex gap-10">
          <div className="flex gap-2">
            <input
              type="radio"
              name="cargo"
              value="professor"
              checked={cargo === "professor"}
              onChange={(e) => setCargo(e.target.value)}
            />
            <p className="text-gray-700 font-semibold">Professor</p>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              name="cargo"
              value="aluno"
              checked={cargo === "aluno"}
              onChange={(e) => setCargo(e.target.value)}
            />
            <p className="text-gray-700 font-semibold">Aluno</p>
          </div>
        </div>
        {mensagem && (
          <p className="text-center mt-2 text-sm text-red-600">{mensagem}</p>
        )}
        <Botao type="submit">Cadastrar</Botao>
      </form>
    </Layout>
  );
}

function NovoCurso({ onNovoCurso }) {
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [nomeCurso, setNomeCurso] = useState("");

  const toggleCadastro = () => {
    setMostrarCadastro(!mostrarCadastro);
  };

  const handleCadastro = () => {
    if (!nomeCurso.trim()) return;
    onNovoCurso(nomeCurso.trim());
    setNomeCurso("");
    setMostrarCadastro(false);
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={toggleCadastro}
        className="text-red-500 border border-red-500 bg-white px-2 py-1 rounded text-sm hover:bg-red-50"
      >
        Cadastrar novo curso
      </button>

      {mostrarCadastro && (
        <div className="mt-2 p-3 border rounded bg-gray-100 shadow flex flex-col gap-2">
          <label className="text-gray-700 font-semibold text-sm">
            Nome do novo curso
            <input
              type="text"
              value={nomeCurso}
              onChange={(e) => setNomeCurso(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Digite o nome do curso"
              required
            />
          </label>
          <button
            type="button"
            onClick={handleCadastro}
            className="bg-red-500 text-white rounded px-3 py-1 text-sm hover:bg-red-600"
          >
            Salvar
          </button>
        </div>
      )}
    </div>
  );
}
