import React, {Component} from 'react'
import axios from 'axios'
import {
        View,
        Text, 
        ImageBackground, 
        StyleSheet,
        TextInput,
        Image,
        Linking,
        Alert,
        ToastAndroid,
        TouchableOpacity
    } from 'react-native'
const initialState = {nome:'', sobrenome: '', usuario:'', senha: '', email: '', codigoAcesso: '', idade:'', escolaridade: '', cidade: '', estado: ''}
export default class Login extends Component {
    state = {
        ...initialState
    }
    save = async () => {
        let jsonEnvio = this.state
        let boolCampos = false;
        if( this.state.nome === '' || this.state.sobreNome === '' || this.state.usuario === '' || this.state.senha === '' || this.state.email === '' || this.state.codigoAcesso === ''){
            boolCampos = true;
        }

        if(boolCampos == true){
            Alert.alert( 'Erro ao registrar-se','Preencha todos os campos corretamente!',[{text: 'Voltar', onPress: () => {}}])
        }else{
            try{
                ToastAndroid.show('Por favor, aguarde...', ToastAndroid.SHORT);
                let retornoReq = await axios.post('http://178.128.148.63:3000/register',{                   
                    nome: jsonEnvio.nome,
                    sobreNome: jsonEnvio.sobreNome,
                    usuario: jsonEnvio.usuario,
                    senha: jsonEnvio.senha,
                    email: jsonEnvio.email,
                    codigoAcesso: jsonEnvio.codigoAcesso,
                    escolaridade: jsonEnvio.escolaridade,
                    cidade: jsonEnvio.cidade,
                    estado: jsonEnvio.estado,
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    let retorno = data.data
                    console.log(retorno['status'])
                    switch(retorno['status']) {
                        case 'ok':
                            ToastAndroid.show('registrado com sucesso!', ToastAndroid.LONG);
                            this.props.navigation.navigate('Login')
                            break;
                        case 'erro':
                            Alert.alert( 'Erro ao registrar-se','Ocorreu um erro ao se registrar, tente novamente mais tarde!',[{text: 'Voltar', onPress: () => {}}])
                            break;
                        case 'erro_code':
                            Alert.alert( 'Erro ao registrar-se','O Codigo preenchido está incorreto. Verifique e tente novamente!',[{text: 'Voltar', onPress: () => {}}])
                            break;
                        default:
                            Alert.alert( 'Sucesso!','Registrado com sucesso!',[{text: 'Voltar', onPress: () => {}}])
                            break;
                    }
                })
            }catch(err){
                console.log(err)
            }
            
        }
    }
    render() {
        return(
            <ImageBackground source={require('../assets/imgs/login.jpg')} style={styles.imageLogin}>
                <Image source={require('../assets/imgs/logo_argumente.png')} style={styles.logo}/> 
                <View style={styles.content} >                       
                    <TextInput placeholder="Nome" style={styles.textFields} onChangeText={nome => this.setState({nome})}/>          
                    <TextInput placeholder="Sobrenome" style={styles.textFields} onChangeText={sobreNome => this.setState({sobreNome})}/>
                    <TextInput placeholder="Usuario (Login)" style={styles.textFields} onChangeText={usuario => this.setState({usuario})}/>
                    <TextInput placeholder="Senha" style={styles.textFields} onChangeText={senha => this.setState({senha})}/>
                    <TextInput placeholder="E-Mail" style={styles.textFields} onChangeText={email => this.setState({email})}/>
                    <TextInput placeholder="Código de acesso" style={styles.textFields} onChangeText={codigoAcesso => this.setState({codigoAcesso})}/>
                    <Text style={styles.link}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        Já possui Registro? Faça o Login!
                    </Text>
                    <TouchableOpacity style={styles.buttons} onPress={this.save}>
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