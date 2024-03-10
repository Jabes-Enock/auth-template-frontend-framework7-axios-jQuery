
/*
*
*
* @params string email | string confirm_email
*
*
*/
var verifyFormData = (data) => {
  const { email, confirm_email } = data

  if ( email == null || email == "" ) {

    app.dialog.alert('O campo e-mail é obrigatório.', 
    'E-mail', 
    () => {
      $('#set_email_field').focus()
    })

    return false
  }

  if ( confirm_email == null || confirm_email == "" ) {

    app.dialog.alert('O campo Confirmar novo email é obrigatório.', 
    'Confirmar email', 
    () => {
      $('#set_confirm_email_field').focus()
    })

    return false
  }

  return true
}
/*
*
*
* @params string email
*
*
*/
var checkNewAndOldEmail = (data) => {
  const { email:newEmail } = data
  const  { email } = app.views.main.router.currentRoute.params 

  if ( ! email ) {
    clearAndRedirectToLogin()
  }

  if ( newEmail == email ) {

    app.dialog.alert('Você deve inserir um email diferente do atual.', 
    'E-mail invalido', 
    () => {
      $('#set_email_field').focus()
    })

    return false
  }


  return true
}
/*
*
*
* @params string email
*
*
*/
var checkEmailAndConfirmEmail = (data) => {
  const { email, confirm_email } = data


  if ( email != confirm_email ) {

    app.dialog.alert('Os email digitados devem conter os mesmos valores.</br></br>Por favor tente novamente.', 
    'E-mail\'s inválidos', 
    () => {
      $('#set_email_field').val('')
      $('#set_confirm_email_field').val('')
    })

    return false
  }


  return true
}

/*
*
*
* @params string email | string confirm_email
*
*
*/
var setEmail = async (data) => {
    const  { id } = app.views.main.router.currentRoute.params 
    try {
      const token = verifyToken()

      if ( ! token ) return

      const response = await axiosInstance.post(`/auth/set-email/${id}`, 
        {
          email: data.email,
          confirm_email: data.confirm_email,
        },
        {
          headers: {
            'Authorization' : `Bearer ${token}`
          },
        }
      )

      const message = setEmailMessagesHandler(response.data)

      if ( message != 'ok' ) {
        app.dialog.alert(message.issue, message.label, 
          () => {
          app.views.main.router.navigate( app.views.main.router.currentRoute.url, {
            reloadCurrent: true,
            ignoreCache: true,
          }) 
        })
        return
      }

      if ( response.status == 201) {
        app.dialog.alert('Email atualizado com sucesso.', 
          'Email atualizado',
          () => {
            app.views.main.router.navigate('/account/', {
              reloadCurrent: true,
              ignoreCache: true
            })
        })

        return
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

$('#set_email_btn_form').on('click', (e) => {
  e.preventDefault()

  const formData = app.form.convertToData('#set_email_form')

  if ( ! verifyFormData(formData) ) {
    return
  }

  if ( ! checkNewAndOldEmail(formData) ) {
    return
  }

  if ( ! checkEmailAndConfirmEmail(formData) ) {
    return
  }



  $('.before-click-set-email').hide()
  $('.after-click-set-email').removeClass('display-none')
  
  setEmail(formData) 
})

