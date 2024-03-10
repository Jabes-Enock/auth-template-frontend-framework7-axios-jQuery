
/*
*
* @params string username | string confirm_username
*
*/
var verifyFormData = (data) => {
  const { username, confirm_username } = data

  if ( username == null || username == "" ) {

    app.dialog.alert('O campo novo nome é obrigatório.', 
    'Novo Nome', 
    () => {
      $('#set_username_field').focus()
    })

    return false
  }

  if ( confirm_username == null || confirm_username == "" ) {

    app.dialog.alert('O campo confirmar novo nome é obrigatório.', 
    'Confirmar nome', 
    () => {
      $('#set_confirm_username_field').focus()
    })

    return false
  }

  return true
}


/*
*
* @params string username | string confirm_username
*
*/
var checkNewAndOldUsername = (data) => {
  const newUsername  = data.username
  const  { username } = app.views.main.router.currentRoute.params 

  if ( ! username ) {
    clearAndRedirectToLogin()
  }
  
  if ( newUsername.toLowerCase() == username.toLowerCase() ) {
    app.dialog.alert('Você deve inserir um nome diferente do atual.', 
    'Nome invalido', 
    () => {
      $('#set_username_field').focus()
    })

    return false
  }


  return true
}


/*
*
* @params string username | string confirm_username
*
*/
var checkUsernameAndConfirmUsername = (data) => {
  const { username, confirm_username } = data


  if ( username.toLowerCase() != confirm_username.toLowerCase() ) {

    app.dialog.alert('Os nomes digitados devem conter os mesmos valores.</br></br>Por favor tente novamente.', 
    'Nomes inválidos', 
    () => {
      $('#set_username_field').val('')
      $('#set_confirm_username_field').val('')
    })

    return false
  }


  return true
}


/*
*
* @params string username | string confirm_username
*
*/
var setUsername = async (data) => {
    const  { id } = app.views.main.router.currentRoute.params 
    try {
      const token = verifyToken()

      if ( ! token ) return

      const response = await axiosInstance.post(`/auth/set-username/${id}`, 
        {
          username: (data.username).toLowerCase(),
          confirm_username: (data.confirm_username).toLowerCase(),
        },
        {
          headers: {
            'Authorization' : `Bearer ${token}`
          },
        }
      )

      
      const message = setUsernameMessagesHandler(response.data)

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
        app.dialog.alert('Nome de usuário atualizado com sucesso.', 
          'Atualizado',
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


$('#set_username_btn_form').on('click', (e) => {
  e.preventDefault()

  const formData = app.form.convertToData('#set_username_form')
 
  if ( ! verifyFormData(formData) ) {
    return
  }

  if ( ! checkUsernameAndConfirmUsername(formData) ) {
    return
  }
  
  if ( ! checkNewAndOldUsername(formData) ) {
    return
  }
  
  $('.before-click-set-username').hide()
  $('.after-click-set-username').removeClass('display-none')
  
  setUsername(formData) 
})


/* input change event */
$('#set_username_field').on('input', () => {
  const usernameSize = $('#set_username_field').val().length

  if ( usernameSize < 3) {
    $('.username-alert-field').html('<small class="block text-color-red">Minimo 3 caracteres.</small>  ')
    return
  }

  if ( usernameSize > 30) {
    $('.username-alert-field').removeClass('display-none')
    $('.username-alert-field').html('<small  class="block text-color-red">Máximo 30 caracteres.</small> ')
    return
  }
  $('.username-alert-field').html('')
})

