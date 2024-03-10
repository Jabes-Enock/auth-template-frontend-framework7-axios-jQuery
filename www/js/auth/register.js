
/* 
  @params string username | string email | string password 
*/
var verifyFormData = (data) => {
  const { username, email, password } = data

  if ( username == null || username == "" ) {

    app.dialog.alert('O campo nome é obrigatório.', 
    'Nome', 
    () => {
      $('#register_username_field').focus()
    })

    return false
  }

  if ( email == null || email == "" ) {

    app.dialog.alert('O campo e-mail é obrigatório.', 
    'E-mail', 
    () => {
      $('#register_email_field').focus()
    })

    return false
  }

  if ( password == null || password == "" ) {

    app.dialog.alert('O campo Senha é obrigatório.', 
    'Senha', 
    () => {
      $('#register_password_field').focus()
    })

    return false
  }

  if ( password.length < 5) {

    app.dialog.alert('A senha deve conter no minimo 5 caracter.', 
    'Senha | Tamanho', 
    () => {
      $('#register_password_field').focus()
    })

    return false
  }

  if ( password.length > 15) {

    app.dialog.alert('A senha deve conter no máximo 15 caracter.', 
    'Senha | Tamanho', 
    () => {
      $('#register_password_field').focus()
    })

    return false
  }

  return true
}

/* 
  @params string username | string email | string password 
*/
var register = async (data) => {
    try {

      const response = await axiosInstance.post('/auth/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      })

      const message = registerMessagesHandler(response.data)

      if ( message != 'ok' ) {
        app.dialog.alert(message.issue, message.label + ' Inválido', 
          () => {
          app.views.main.router.navigate( app.views.main.router.currentRoute.url, {
            reloadCurrent: true,
            ignoreCache: true,
          }) 
        })
        return
      }

      app.dialog.alert('Parabens, você foi cadastrado com sucesso.<br><br> Clique em "OK" para fazer seu primeiro login.', 'Bem-vindo',
          () => {
          app.views.main.router.navigate('/login/') 
      })
    } catch (error) {
      app.dialog.alert('Houve um erro, por favor tente novamente.', 'Ops..',
      () => {
        app.views.main.router.navigate( app.views.main.router.currentRoute.url, {
          reloadCurrent: true,
          ignoreCache: true,
        })
      })
    }
  

}

 $('#register_btn_form').on('click', (e) => {
  e.preventDefault()
  
  const formData = app.form.convertToData('#register_form')

  if ( ! verifyFormData(formData) ) {
    return
  }

  $('.before-click-register').hide()
  $('.after-click-register').removeClass('display-none')

  register(formData) 
  return
})


/* input change event */
$('#register_password_field').on('input', () => {
  const passwordSize = $('#register_password_field').val().length

  if ( passwordSize < 5) {
    $('.password-alert-field').html('A senha deve conter no minimo 5 caracteres.')
    return
  }

  if ( passwordSize > 15) {
    $('.password-alert-field').html('A senha deve conter no máximo 15 caracteres.')
    return
  }
  $('.password-alert-field').html('')
})

