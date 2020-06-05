import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
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
import NovaRedacao from './views/NovaRedacao'
import PosLogin from './views/PosLogin'
import Menu from './views/Menu'

const menuConfig ={
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

const AppNavigator = createStackNavigator({
    Login: {screen: Login,  navigationOptions: { header: null }},
    Index: {screen: Index, navigationOptions: { header: null }},
    Register: {screen: Register,  navigationOptions: { header: null }},
    FaleConosco: {screen: Faleconosco, navigationOptions: { header: null }},
    Perfil: {screen: Perfil, navigationOptions: { header: null }},
    RedacaoSemana: {screen: RedacaoSemana, navigationOptions: { header: null }},
    RedacoesFinalizadas: {screen: RedacoesFinalizadas, navigationOptions: { header: null }},
    RedacoesNaoCorrigidas: {screen: RedacoesNaoCorrigidas, navigationOptions: { header: null }},
    DetalhesRedacao: {screen: DetalhesRedacao, navigationOptions: { header: null }},
    NovaRedacao: {screen: NovaRedacao, navigationOptions: { header: null }},
    PosLogin: {screen: PosLogin, navigationOptions: { header: null }},
});
const Nav = createDrawerNavigator({
    Stack: {screen:AppNavigator,navigationOptions:{
        drawerLabel: () => null
    }},
    Index: {screen:Index,navigationOptions:{
        title: 'Index'
    }},
    Perfil: {screen:Perfil,navigationOptions:{
        title: 'Perfil'
    }},
    FaleConosco: {screen:Faleconosco,navigationOptions:{
        title: 'Fale Conosco'
    }},
    RedacaoSemana: {screen:RedacaoSemana,navigationOptions:{
        title: 'Redação da Semana'
    }},
    DetalhesRedacao: {screen:DetalhesRedacao,navigationOptions:{
        drawerLabel: () => null
    }},
    RedacoesNaoCorrigidas: {screen:RedacoesNaoCorrigidas,navigationOptions:{
        title: 'Redações não Corrigidas'
    }},
    NovaRedacao: {screen:NovaRedacao,navigationOptions:{
        drawerLabel: () => null
    }},
    RedacoesFinalizadas: {screen:RedacoesFinalizadas,navigationOptions:{
        title: 'Redações Finalizadas'
    }},
    PosLogin: {screen: PosLogin,navigationOptions:{
        drawerLabel: () => null
    }},
    Register: {screen: Register,navigationOptions:{
        drawerLabel: () => null
    }},
    Logout: {screen: Login,navigationOptions:{
        title: 'Logout'
    }},
},{
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontFamily:'Lato',
            fontWeight: 'normal',
            fontSize: 15
        },
        activeLabelStyle:{
            color: '#0066CC',
            fontWeight: 'bold',
        }
    }
}); 
 
export default createAppContainer(Nav);