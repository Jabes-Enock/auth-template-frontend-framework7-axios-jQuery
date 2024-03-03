
var logout = async () => {
  try {
    
    const token = verifyToken()

    if ( ! token ) return

    const response = await axiosInstance.get('/auth/logout', {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })

    if ( response.status == 201) {
      clearAndRedirectToLogin()
    }
    
  } catch (error) {
    app.dialog.close()
    app.dialog.alert('Houve um erro. Por favor tente novamente.', 'Ops..', () => {
      clearAndRedirectToLogin()
    })
  }

}


$('#account_btn_logout').on('click', () => {
  $('.before-click-logout').hide()
  $('.after-click-logout').removeClass('display-none')

  logout() 
  //app.dialog.alert(JSON.stringify(formData))
})
