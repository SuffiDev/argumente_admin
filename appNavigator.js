import React from 'react'
import { createAppContainer, createSwitchNavigator, Icon, Text, View  } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Index from './views/Index'
import Faleconosco from './views/Faleconosco'
import Login from './views/Login'
import Perfil from './views/Perfil'
import RedacaoSemana from './views/RedacaoSemana'
import Register from './views/Register'
import RedacoesFinalizadas from './views/RedacoesFinalizadas'
import RedacoesNaoCorrigidas from './views/RedacoesNaoCorrigidas'
import DetalhesRedacao from './views/DetalhesRedacao'
import PosLogin from './views/PosLogin'

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
        name: 'Fale Conosco',
        screen: props => <Faleconosco title='Faleconosco' {...props} />,
        navigationOptions:{
            title: 'Fale Conosco'
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
            title: 'Enviar Redação'
        }
    },
    RedacoesNaoCorrigidas: {
        name: 'RedacoesNaoCorrigidas',
        screen: props => <RedacoesNaoCorrigidas title='RedacoesNaoCorrigidas' {...props} />,
        navigationOptions:{
            title: 'Redações Não Corrigidas'
        }
    },
    RedacoesFinalizadas: {
        name: 'RedacoesFinalizadas',
        screen: props => <RedacoesFinalizadas title='RedacoesFinalizadas' {...props} />,
        navigationOptions:{
            title: 'Redações Finalizadas'
        }
    },
    DetalhesRedacao: {
        name: 'DetalhesRedacao',
        screen: props => <DetalhesRedacao title='DetalhesRedacao' {...props} />,
        navigationOptions:{            
            drawerLabel: () => null
        }
    },
    PosLogin: {
        name: 'PosLogin',
        screen: props => <PosLogin title='PosLogin' {...props} />,
        navigationOptions:{            
            drawerLabel: () => null
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
    PosLogin: { 
      name: 'PosLogin',
      screen: PosLogin 
    },

    Index: { 
      name: 'Index',
      screen: menuNavigator 
      },
  };

const mainNavigator = createSwitchNavigator(mainRoutes,  {
    initialRouteName: 'Login'
})


export default createAppContainer(mainNavigator);