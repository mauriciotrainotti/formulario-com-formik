import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './App.css';



const FormularioCadastro = () => {
  // Esquema de validação com Yup
  const esquemaValidacao = Yup.object({
    nome: Yup.string()
      .min(3, "O nome deve ter pelo menos 3 caracteres")
      .required("O nome é obrigatório"),
    email: Yup.string()
      .email("E-mail inválido")
      .required("O e-mail é obrigatório"),
    senha: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("A senha é obrigatória"),
    cep: Yup.string()
      .length(8, "O CEP deve ter 8 caracteres")
      .required("O CEP é obrigatório"),
    rua: Yup.string().required("A rua é obrigatória"),
    bairro: Yup.string().required("O bairro é obrigatório"),
    cidade: Yup.string().required("A cidade é obrigatória"),
    estado: Yup.string().required("O estado é obrigatório"),
    numero: Yup.string().required("O número é obrigatório"),
  });

  // Função para buscar dados do CEP
  const buscarCep = async (cep, setFieldValue) => {
    if (!cep || cep.length !== 8) {
      alert("Por favor, insira um CEP válido.");
      return;
    }

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();

      if (dados.erro) {
        alert("CEP não encontrado.");
      } else {
        setFieldValue("rua", dados.logradouro || "");
        setFieldValue("bairro", dados.bairro || "");
        setFieldValue("cidade", dados.localidade || "");
        setFieldValue("estado", dados.uf || "");
      }
    } catch (erro) {
      console.error("Erro ao buscar o CEP:", erro);
      alert("Erro ao buscar o CEP. Verifique sua conexão.");
    }
  };

  return (
    <Formik
      initialValues={{
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        numero: "",
      }}
      validationSchema={esquemaValidacao}
      onSubmit={(valores) => {
        console.log("Dados do formulário:", valores);
        alert("Cadastro realizado com sucesso!");
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          {/* Campo Nome */}
          <div>
            <label htmlFor="nome">Nome</label>
            <Field type="text" id="nome" name="nome" />
            <ErrorMessage name="nome" component="div" className="erro" />
          </div>

          {/* Campo Email */}
          <div>
            <label htmlFor="email">E-mail</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="erro" />
          </div>

          {/* Campo Senha */}
          <div>
            <label htmlFor="senha">Senha</label>
            <Field type="password" id="senha" name="senha" />
            <ErrorMessage name="senha" component="div" className="erro" />
          </div>

          {/* Campo CEP */}
          <div>
            <label htmlFor="cep">CEP</label>
            <Field
              type="text"
              id="cep"
              name="cep"
              onBlur={(e) => buscarCep(e.target.value, setFieldValue)}
            />
            <ErrorMessage name="cep" component="div" className="erro" />
          </div>

          {/* Campo Rua */}
          <div>
            <label htmlFor="rua">Rua</label>
            <Field type="text" id="rua" name="rua" />
            <ErrorMessage name="rua" component="div" className="erro" />
          </div>

          {/* Campo Bairro */}
          <div>
            <label htmlFor="bairro">Bairro</label>
            <Field type="text" id="bairro" name="bairro" />
            <ErrorMessage name="bairro" component="div" className="erro" />
          </div>

          {/* Campo Cidade */}
          <div>
            <label htmlFor="cidade">Cidade</label>
            <Field type="text" id="cidade" name="cidade" />
            <ErrorMessage name="cidade" component="div" className="erro" />
          </div>

          {/* Campo Estado */}
          <div>
            <label htmlFor="estado">Estado</label>
            <Field type="text" id="estado" name="estado" />
            <ErrorMessage name="estado" component="div" className="erro" />
          </div>

          {/* Campo Número */}
          <div>
            <label htmlFor="numero">Número</label>
            <Field type="text" id="numero" name="numero" />
            <ErrorMessage name="numero" component="div" className="erro" />
          </div>

          {/* Botão de Enviar */}
          <button type="submit">Cadastrar</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioCadastro;
