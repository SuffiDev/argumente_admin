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
        BackHandler,
        ToastAndroid,
        TouchableOpacity        
    } from 'react-native'
import commonStyles from './commonStyles'
import AsyncStorage from '@react-native-community/async-storage'
const initialState = {screen: 'Login',usuario: '', senha: '',logoPatrocinio:''}
export default class Login extends Component {
    state = {
        ...initialState
    }
    //Salva a sessão e redireciona para o Index 
    newSession = async (dados_retorno) => {
        ToastAndroid.show('Login efetuado com sucesso!', ToastAndroid.LONG);
        await AsyncStorage.setItem('@dadosLogin', JSON.stringify(dados_retorno));
        this.props.navigation.navigate('Index')
    }

    //Função do login
    login = async () => {
        let jsonEnvio = this.state
        if(this.state.usuario == "" || this.state.senha == ""){
            Alert.alert( 'Erro ao logar','Preencha o usuario e senha corretamente!',[{text: 'Voltar', onPress: () => {}}])
        }else{
            try{
                ToastAndroid.show('Por favor, aguarde...', ToastAndroid.SHORT);
                let retornoReq = await axios.post('http://178.128.148.63:3000/login',{                   
                    usuario: jsonEnvio.usuario,
                    senha: jsonEnvio.senha,
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {                    
                    let retorno = data.data
                    switch(retorno['status']) {
                        case 'ok':
                            console.log('id :' + retorno['desc']['id'])
                            this.setState({logoPatrocinio:retorno['desc']['caminhoImg']})
                            setaSessao(checaNullos(retorno['desc']),retorno['desc']).then((data) =>{
                                if(data == 'ok'){
                                    console.log(this.state.logoPatrocinio.length)
                                    this.props.navigation.navigate('PosLogin',{'imgPatrocinio':this.state.logoPatrocinio,'nomeArquivo':this.state.usuario})
                                }else{
                                    Alert.alert( 'Erro ao logar','Erro ao logar. Tente novamente mais tarde!',[{text: 'Voltar', onPress: () => {}}])
                                }
                            })                            
                            break;
                        case 'erro':
                            Alert.alert( 'Erro ao logar','Erro ao logar. Tente novamente mais tarde!',[{text: 'Voltar', onPress: () => {}}])
                            break;
                    }
                })
            }catch(err){
                console.log(err)
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
                    <TextInput placeholder="Senha" secureTextEntry={true} style={styles.textFields}  onChangeText={senha => this.setState({senha})}/>
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

//Função usada para saber se algum dos dados digitados pelo usuario está vazio
function checaNullos(jsonAluno){
    if(jsonAluno['cidade'] == null || jsonAluno['codigo_acesso'] == null || jsonAluno['escolaridade'] == null ||
       jsonAluno['estado'] == null || jsonAluno['idade'] == null || jsonAluno['nome'] == null ||
       jsonAluno['senha'] == null || jsonAluno['sobreNome'] == null || jsonAluno['usuario'] == null
    ){
        return true
    }else{
        return false
    }
}
async function setaSessao(perfilCompleto, dados){
    try{
        if( perfilCompleto )
            await AsyncStorage.setItem('@perfilCompleto', 'sim')
        else
            await AsyncStorage.setItem('@perfilCompleto', 'nao')
        await AsyncStorage.setItem('@idAluno', '"' + dados['id']+ '"')
        await AsyncStorage.setItem('@nomeAluno', dados['nome'])
        return 'ok'
    }catch(err){
        console.log(err)
        return err
    }

}