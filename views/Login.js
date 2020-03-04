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
import commonStyles from './commonStyles'
export default class Login extends Component {
    render() {
        return(
            <ImageBackground source={require('../assets/imgs/login.jpg')} style={styles.imageLogin}>
                    <Image source={require('../assets/imgs/logo_argumente.png')} style={styles.logo}/> 
                <View style={styles.content} >                       
                    <TextInput placeholder="Usuario" style={styles.textFields} />          
                    <TextInput placeholder="Senha" style={styles.textFields}/>
                    <Text style={styles.link}
                        onPress={() => this.props.navigation.navigate('Register')}>
                        Novo por aqui? Registre-se!
                    </Text>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={{fontSize: 20, color: '#FFF', fontFamily: commonStyles.fontFamily,}}> Login </Text>
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
        marginTop: '10%'
    },
    textFields:{
        backgroundColor: '#FFF',
        fontFamily: 'Lato',
        width:'90%',
        height:35,
        marginTop: 20,
        color: '#FFF',
    },
    logo:{
        width:200,
        height:160,
        marginTop: '15%'
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