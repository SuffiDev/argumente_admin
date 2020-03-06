import React, {Component} from 'react'
import axios from 'axios'
import {
        View,
        Text, 
        ImageBackground, 
        StyleSheet,
        TextInput,
        Image,
        Alert,
        ToastAndroid,
        TouchableOpacity
    } from 'react-native'
import commonStyles from './commonStyles'
const initialState = {usuario: '', senha: ''}
export default class Login extends Component {
    state = {
        ...initialState
    }

    login = async () => {
        let jsonEnvio = this.state
        if(this.state.usuario == "" || this.state.senha == ""){
            Alert.alert( 'Erro ao logar','Preencha o usuario e senha corretamente!',[{text: 'Voltar', onPress: () => {}}])
        }else{
            try{
                let retornoReq = await axios.post('http://192.168.0.29:3000/login',{                   
                    usuario: jsonEnvio.usuario,
                    senha: jsonEnvio.senha,
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    let retorno = data.data
                    console.log(retorno['status'])
                    switch(retorno['status']) {
                        case 'ok':
                            ToastAndroid.show('Login efetuado com sucesso!', ToastAndroid.LONG);
                            this.props.navigation.navigate('Index')
                            break;
                        case 'erro':
                            Alert.alert( 'Erro ao logar','Erro ao logar. Tente novamente mais tarde!',[{text: 'Voltar', onPress: () => {}}])
                            break;
                    }
                })
            }catch(err){
                Alert.alert( 'Erro ao logar','Erro ao logar. Tente novamente mais tarde!',[{text: 'Voltar', onPress: () => {}}])
            }
        }

    }
    render() {
        return(
            <ImageBackground source={require('../assets/imgs/login.jpg')} style={styles.imageLogin}>
                    <Image source={require('../assets/imgs/logo_argumente.png')} style={styles.logo}/> 
                <View style={styles.content} >                       
                    <TextInput placeholder="Usuario" style={styles.textFields}  onChangeText={usuario => this.setState({usuario})}/>          
                    <TextInput placeholder="Senha" style={styles.textFields}  onChangeText={senha => this.setState({senha})}/>
                    <Text style={styles.link}
                        onPress={() => this.props.navigation.navigate('Register')}>
                        Novo por aqui? Registre-se!
                    </Text>
                    <TouchableOpacity style={styles.buttons} onPress={this.login}>
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