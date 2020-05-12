import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('É obrigatório informar o nome'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('É obrigatório informar o e-mail'),
  password: Yup.string()
    .min(6, 'A senha deve conter no mínimo 6 caracters')
    .required('É obrigatório informar a senha'),
});

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar conta</button>
        <Link to="/">Já possuo cadastro</Link>
      </Form>
    </>
  );
}
