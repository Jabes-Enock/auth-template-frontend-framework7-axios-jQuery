/* 
Get Token
*/

var verifyToken = () => {
  const token = localStorage.getItem('token') || false

  if ( ! token ) {
    clearAndRedirectToLogin()
  }

  return token
}


/* Clear token and isLoggedIn in localStorage */
var clearAndRedirectToLogin = () => {

  app.views.main.router.navigate(
    {
      name: 'login'
    },
  )

  localStorage.clear()

  return
} 



/* register handler */
var registerMessagesHandler = (message) => {

  if ( message.username == 'The username field must contain a unique value.') {
    const text = {
      label: 'Nome',
      issue: 'Nome de usuário inválido, por favor tente outro nome.'
    }
    return text
  }

  if ( message.email == 'The email field must contain a unique value.') {
    const text = {
      label: 'E-mail',
      issue: 'E-mail de usuário inválido, por favor tente outro Email.'
    }
    return text
  }

  if ( message.email == 'The email field must contain a valid email address.') {
    const text = {
      label: 'E-mail',
      issue: 'E-mail de usuário inválido, por favor tente outro Email.'
    }
    return text
  }

  if ( message.password == 'The password field must be at least 5 characters in length.') {
    const text = {
      label: 'Senha',
      issue: 'A senha deve conter no minimo 5 caracteres, por favor tente novamente.'
    }
    return text
  }

  if ( message.password == 'The password field cannot exceed 15 characters in length.') {
    const text = {
      label: 'Senha',
      issue: 'A senha deve conter no máximo 15 caracteres, por favor tente novamente.'
    }
    return text
  }

  return 'ok'
}


/* setEmail handler */
var setEmailMessagesHandler = (message) => {

  if ( message.email == 'The email field is required.') {
    const text = {
      label: 'Novo E-mail',
      issue: 'O campo novo e-mail é obrigatorio.</br></br> Por favor tente novamente.'
    }
    return text
  }

  if ( message.email == 'The email field must contain a valid email address.') {
    const text = {
      label: 'Novo e-mail',
      issue: 'O "novo email" digitado não é um email válido.</br></br>Por favor tente novamente.'
    }
    return text
  }

  if ( message.confirm_email == 'The confirm_email field is required.') {
    const text = {
      label: 'Confirmar e-mail',
      issue: 'O campo "confirmar novo e-mail" é obrigatorio.</br></br> Por favor tente novamente.'
    }
    return text
  }

  return 'ok'
}
