import React, {Component} from 'react'
import {
        View,
        Text, 
        ImageBackground, 
        StyleSheet,
        TextInput,
        Image,
        Linking,
        Button,
        TouchableOpacity
    } from 'react-native'

export default class Login extends Component {
    render() {
        return(
            <ImageBackground source={require('../assets/imgs/login.jpg')} style={styles.imageLogin}>
                <Image source={require('../assets/imgs/logo_argumente.png')} style={styles.logo}/> 
                <View style={styles.content} >                       
                    <TextInput placeholder="Nome" style={styles.textFields} />          
                    <TextInput placeholder="Sobrenome" style={styles.textFields}/>
                    <TextInput placeholder="Usuario (Login)" style={styles.textFields}/>
                    <TextInput placeholder="Senha" style={styles.textFields}/>
                    <TextInput placeholder="E-Mail" style={styles.textFields}/>
                    <TextInput placeholder="Código de acesso" style={styles.textFields}/>
                    <Text style={styles.link}
                        onPress={() => Linking.openURL('http://google.com')}>
                        Já possui Registro? Faça o Login!
                    </Text>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={{fontSize: 20, color: '#FFF', fontFamily: 'Lato'}}> Registre-se </Text>
                    </TouchableOpacity>
                </View>        
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    imageLogin:{
        height:'100%',
        width: '100%',
        alignItems: 'center'
    },content:{
        alignItems: 'center',         
        padding: 20,
        width: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },textFields:{
        backgroundColor: '#FFF',
        fontFamily: 'Lato',
        width:'90%',
        height:35,
        marginTop: 20
    },
    logo:{
        width:200,
        height:160,
        marginTop: '5%'
    },
    link:{
        color:'#FFF',
        width:'90%',
        textAlign: 'right',
        marginTop: 10,
        fontSize: 15
    },
    buttons:{
        width:'90%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#0066CC',
        marginTop: 20
    }
})