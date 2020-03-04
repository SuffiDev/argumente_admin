import React from 'react'
import { createAppContainer, createSwitchNavigator, Icon, Text, View  } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Index from './views/Index'
import Faleconosco from './views/Faleconosco'
import Login from './views/Login'
import Perfil from './views/Perfil'
import RedacaoSemana from './views/RedacaoSemana'
import Register from './views/Register'

import Menu from './views/Menu'

const menuConfig ={
  initialRouteName: 'Index',
  contentComponent: Menu,
  contentOptions: {
      labelStyle: {
          fontFamily:'Lato',
          fontWeight: 'normal',
          fontSize: 20
      },
      activeLabelStyle:{
          color: '#0066CC',
          fontWeight: 'bold',
      }
  }
}
const menuRoutes = {  
    Index: {
        name: 'Index',
        screen: props => <Index title='Index' {...props} />,
        navigationOptions:{
            title: 'Index'
                    
        }
    },
    Faleconosco: {
        name: 'Faleconosco',
        screen: props => <Faleconosco title='Faleconosco' {...props} />,
        navigationOptions:{
            title: 'Faleconosco'
        }
    },
    Perfil: {
        name: 'Perfil',
        screen: props => <Perfil title='Perfil' {...props} />,
        navigationOptions:{
            title: 'Perfil'
        }
    },
    RedacaoSemana: {
        name: 'RedacaoSemana',
        screen: props => <RedacaoSemana title='RedacaoSemana' {...props} />,
        navigationOptions:{
            title: 'RedacaoSemana'
        }
    },
    Login: {
        name: 'Login',
        screen: props => <Login title='Login' {...props} />,
        navigationOptions:{
            title: 'Logout'
        }
    },

}
const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)
  const mainRoutes = {
    Faleconosco: { 
      name: 'Faleconosco',
      screen: Faleconosco 
      },
    Login: { 
      name: 'Login',
      screen: Login 
      },
    Perfil: { 
      name: 'Perfil',
      screen: Perfil 
      },
    RedacaoSemana: { 
      name: 'RedacaoSemana',
      screen: RedacaoSemana 
      },
    Register: { 
      name: 'Register',
      screen: Register 
    },

    Index: { 
      name: 'Index',
      screen: menuNavigator 
      },
  };

const mainNavigator = createSwitchNavigator(mainRoutes,  {
    initialRouteName: 'Index'
})


export default createAppContainer(mainNavigator);