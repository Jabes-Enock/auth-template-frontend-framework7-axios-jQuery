//start project
document.addEventListener('deviceready', onDeviceReady, false)

var app = new Framework7({
  // App root element
  el: '#app',
  // App Name
  name: 'Auth template',

  dialog: {
    buttonOk: 'ok',
    buttonCancel: 'cancelar',
  },

  // specify primary color theme
  colors: {
    primary: '#0B6623'
  },

 

  // Add default routes
  routes: [
    // path: '/index/'
    {
      path: '/index/',
      url: 'index.html',
      animate: false,
      on: {
        pageBeforeIn: function (event, page) {

          $('.toolbar').hide()

          
        },
        pageInit: function (event, page) {
        // fazer algo quando a página for inicializada
        const userIsLoggedIn = () => {
          const login =  localStorage.getItem('isLoggedIn')
          
          if ( ! login ) {
            app.views.main.router.navigate('/login/', {
              transition: "f7-fade"
            })
            return
          }

          app.views.main.router.navigate('/home/')
        }

        setTimeout(userIsLoggedIn, 100)
        },
      }
    },
    // path: '/login/'
    {
      path: '/login/',
      name: 'login',
      url: 'views/auth/login.html',
      options: {
        transition: 'f7-fade'
      },
      animate: false,
      on: {
        pageBeforeIn: function (event, page) {
          $('.toolbar').hide()
        },
        pageInit: function (event, page) {
          $.getScript('js/auth/login.js')
        }
      }
    },
    // path: '/register/'
    {
      path: '/register/',
      name: 'register',
      url: 'views/auth/register.html',
      animate: false,
      options: {
        transition: 'f7-fade'
      },
      on: {
        pageBeforeIn: function (event, page) {
          $('.toolbar').hide()
          const tokenInLocalStorage = localStorage.getItem('token') || false

          if ( ! token && !tokenInLocalStorage) {
            clearAndRedirectToLogin()
            return
          }
        },
        pageInit: function (event, page) {
          $.getScript('js/auth/register.js')
        }
      }
    },
     // path: '/user/'
     {
      path: '/account/',
      url: 'views/auth/account.html',
      animate: false,
      options: {
        transition: 'f7-fade'
      },
      on: {
        pageBeforeIn: function (event, page) {
          $('.toolbar').show()
        },
        pageInit: function (event, page) {
          $.getScript('js/auth/profile.js')
          $.getScript('js/auth/logout.js')
        }
      }
    },
    // path: '/home/:token?'
    {
      path: '/home/:token?/',
      name: 'home',
      url: 'home.html',
      options: {
        transition: 'f7-fade'
      },
      on: {
        pageBeforeIn: function (event, page) {

          $('.toolbar').show()

          const  { token } = app.views.main.router.currentRoute.params 
          const tokenInLocalStorage = localStorage.getItem('token') || false

          if ( ! token && !tokenInLocalStorage) {
            clearAndRedirectToLogin()
            return
          }

          if ( token ) {
            localStorage.setItem('token', token)
          }



          localStorage.setItem('isLoggedIn', true)
        },
        pageInit: function (event, page) {
        // fazer algo quando a página for inicializada
          $.getScript('js/auth/profile.js')
          $.getScript('js/home.js')
        }
      }
    },
   
  ],
  // ... other parameters
})

//browser test
var mainView = app.views.create('.view-main', { url: '/index/' })

//event to set which page is active
app.on('routeChange', function (route) {
  var currentRoute = route.url
  //console.log(currentRoute)
  document.querySelectorAll('.tab-link').forEach(function (el) {
    el.classList.remove('active')
  })
  var targetEl = document.querySelector('.tab-link[href="' + currentRoute + '"]')
  if (targetEl) {
    targetEl.classList.add('active')
  }
})


function onDeviceReady() {
  
  var mainView = app.views.create('.view-main', { url: '/index/' })

  //native mobile back button
  document.addEventListener("backbutton", function (e) {

    if (mainView.router.currentRoute.path === '/index/') {
      e.preventDefault()
      app.dialog.confirm('Deseja sair do aplicativo?', function () {
        navigator.app.exitApp()
      })
    } else {
      e.preventDefault()
      mainView.router.back({ force: true })
    }
  }, false)

}
