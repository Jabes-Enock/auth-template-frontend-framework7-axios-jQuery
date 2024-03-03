
/*
*
*
* @params string email | string password
*
*
*/
var verifyFormData = (data) => {
  const { email, password } = data

  if ( email == null || email == "" ) {

    app.dialog.alert('O campo e-mail é obrigatório.', 
    'E-mail', 
    () => {
      $('#login_email_field').focus()
    })

    return false
  }

  if ( password == null || password == "" ) {

    app.dialog.alert('O campo Senha é obrigatório.', 
    'Senha', 
    () => {
      $('#login_password_field').focus()
    })

    return false
  }

  return true
}

/*
*
*
* @params string email | string password
*
*
*/
var login = async (data) => {
    try {

      const response = await axiosInstance.post('/auth/login', {
        email: data.email,
        password: data.password,
      })

      if ( response.data.message == 'user not found') {
        app.dialog.alert('Usuário não encontrado, por favor tente novamente.', 
          'Usuário inválido',
          () => {
            app.views.main.router.navigate( app.views.main.router.currentRoute.url, {
              reloadCurrent: true,
              ignoreCache: true,
            })
        })

        return
      }

      const token = response.data.token

      if ( token != null || token != '' ) {
        app.views.main.router.navigate({
          name: 'home',
          params: { token: token },
        })
      }

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

$('#login_btn_form').on('click', (e) => {
  e.preventDefault()

  const formData = app.form.convertToData('#login_form')

  if ( ! verifyFormData(formData) ) {
    return
  }

  $('.before-click').hide()
  $('.after-click').removeClass('display-none')
  
  login(formData) 
})

