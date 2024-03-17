var profile = async () => {
  try {
    const token = verifyToken()

    if ( ! token ) return

    const response = await axiosInstance.get('/auth/profile', {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })

    if (response.data.id) {
      return response.data
    }

  } catch (error) {
    
    app.dialog.alert('Houve um erro, por favor tente novamente.', 'Ops..',
    () => {
      clearAndRedirectToLogin()
    })
  }
}

var putUserDataIntoView = (user) => {
  $('.account-content').html('')
  $('.account-content').append(`
    <div class="list list-outline-ios list-strong-ios list-dividers-ios">
        <ul class="account-ul">
          <li>
            <a class="item-link item-content" href="/set-username/${user.id}/${user.username}/">
              <div class="item-inner">
                <div class="item-title">Nome de preferência</div>
                <div class="item-after username">${user.username}</div>
              </div>
            </a>
          </li>
          <li>
          <a class="item-link item-content" href="/set-email/${user.id}/${user.email}/">
            <div class="item-inner">
              <div class="item-title">E-mail</div>
              <div class="item-after">${user.email}</div>
            </div>
          </a>
        </li>
        </ul>
    </div>
  `)
  
  $('.account-ul').append(`
    <li>
      <a class="item-link item-content" href="/delete/${user.id}/${user.username}/">
        <div class="item-inner">
          <div class="item-title">Excluir minha conta</div>
        </div>
      </a>
    </li>
  `)
}

var fluxo = async () => {
  const user = await profile()
  putUserDataIntoView(user)
}

fluxo()

