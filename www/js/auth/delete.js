var deleteAccount = async (id) => {
  try {
    const token = verifyToken()

    if ( ! token ) return

    const response = await axiosInstance.delete(`/auth/delete/${id}`, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })

     if ( response.status === 200 ) {
      clearAndRedirectToLogin()
     }
    

  } catch (error) {
    
    app.dialog.alert('Houve um erro, por favor tente novamente.', 'Ops..')
  }
}

$('#delete_account_btn').on('click', () => {
  const  { id } = app.views.main.router.currentRoute.params
  $('.before-click-delete-account').hide()
  $('.after-click-delete-account').removeClass('display-none')
  app.dialog.alert('Tem certeza desta ação?', 'Confirmar', () => {
    deleteAccount(id)
  })
})

