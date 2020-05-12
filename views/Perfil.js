import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ModalDropdown from 'react-native-modal-dropdown'
import {
        View,
        Text, 
        StyleSheet,
        TextInput,
        TouchableOpacity,
        BackHandler,
        Alert,
        ToastAndroid
    } from 'react-native'
    const initialState = {screen: 'Perfil',nome:'', sobrenome: '', usuario:'', senha: '', email: '', idade:'', escolaridade: 'Selecione', cidade: '', estado: 'Selecione', abriu: true}
export default class Register extends Component {
    state = {
        ...initialState
    }
    listEscolaridades = [
        'Fundamental Completo',
        'Fundamental Incompleto',
        'Ensino Médio Completo',
        'Ensino Médio Incompleto',
        'Ensino Superior Completo',
        'Ensino Superior Incompleto'
    ]
    listEstados = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]
    //Função chamada assim que a tela abre
    onLoad = async () => {
        try {
            const idAluno = await AsyncStorage.getItem('@idAluno')
            let idAlunoInt = parseInt( idAluno.replace(/^"|"$/g, ""))
            console.log(idAlunoInt)
            console.log(typeof parseInt(idAluno));
            let retornoReq = await axios.post('http://178.128.148.63:3000/get_aluno',{                   
                    id: idAlunoInt,
                }, (err, data) => {
                    console.log(err)

                    console.log(data)
                }).then(data => {
                    this.setState({abriu:false})
                    console.log('entrou')
                    console.log(data.data['desc'])
                    this.loadItems(data)
                    
                })
        } catch (error) {
            console.log(error)
        // Error saving data
        }
        
    }
    //Função que seta valores para os campos assim que o resultado vem do banco
    loadItems = (data) => {
        console.log(data.data['desc'][0]['idade'])
        this.setState({
            nome: this.state.nome + data.data['desc'][0]['nome'], 
            sobrenome: data.data['desc'][0]['sobrenome'], 
            usuario:data.data['desc'][0]['usuario'], 
            senha: data.data['desc'][0]['senha'], 
            email: data.data['desc'][0]['email'], 
            idade: '' + data.data['desc'][0]['idade'], 
            escolaridade: data.data['desc'][0]['escolaridade'], 
            cidade: data.data['desc'][0]['cidade'], 
            estado: data.data['desc'][0]['estado']
        })
    }

    //Função que salva o perfil
    savePerfil = async () => {
        try{
            console.log(this.verificaCampos())
            if(this.verificaCampos()){
                ToastAndroid.show('Por favor, aguarde...', ToastAndroid.SHORT)
                const idAluno = await AsyncStorage.getItem('@idAluno')
                let idAlunoInt = parseInt( idAluno.replace(/^"|"$/g, ""))
                await axios.post('http://178.128.148.63:3000/salvaPerfil',{           
                    id: idAlunoInt,
                    nome: this.state.nome,
                    sobrenome: this.state.sobrenome,
                    usuario: this.state.usuario,
                    senha: this.state.senha,
                    email: this.state.email,
                    idade: this.state.idade,
                    escolaridade: this.state.escolaridade,
                    cidade: this.state.cidade,
                    estado: this.state.estado
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    if(data.data['status'] == 'ok'){
                        Alert.alert( 'Dados de Perfil',"Dados Salvos com sucesso!",[{text: 'OK', onPress: () => {}}])
                    }else{
                        console.log(JSON.stringify(data.data))
                        Alert.alert( 'Dados de Perfil',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
                    }
                })
            }else{
                Alert.alert( 'Dados de Perfil',"Preencha todos os campos!",[{text: 'OK', onPress: () => {}}])
            }
        }catch(err){
            Alert.alert( 'Dados de Perfil',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
        }
        
    }
    //Função que verifica se tem algum campo vazio
    verificaCampos = () => {
        try{
            console.log(this.state)
            if( this.state.nome == null || this.state.sobrenome == null || this.state.usuario == null ||
            this.state.senha == null || this.state.email == null || this.state.idade == null ||
            this.state.escolaridade == undefined || this.state.cidade == null || this.state.estado == undefined){
                return false
            }else{
                return true
            }

        }catch(err){
            Alert.alert( 'Dados de Perfil',"Erro ao salvar dados! Verifique os campos e tente novamente",[{text: 'OK', onPress: () => {}}])
        }
    }
    updateEstado(estado) {
        this.setState({
            estado: this.listEstados[estado]
        })
    }
    updateEscolaridade(escolaridade) {
        this.setState({
            escolaridade: this.listEscolaridades[escolaridade]
        })
    }
    render() {
        if(this.state.abriu){
            this.onLoad()
        }
        return(
            <View style={styles.content} >  
                <View style={styles.header}>
                    <View style={styles.iconHeader}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="bars" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.contentTextHeader} >SEU PERFIL</Text>
                    </View>

                </View>
                <View  style={styles.paddingTop}>
                
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Nome: </Text>
                    <TextInput controlled={true} style={styles.textContent} value={this.state.nome} placeholder="Nome" onChangeText={(nome) => this.setState({ nome })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Sobrenome: </Text>
                    <TextInput style={styles.textContent} value={this.state.sobrenome} placeholder="Sobrenome" onChangeText={(sobrenome) => this.setState({ sobrenome })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Usuario: </Text>
                    <TextInput style={styles.textContent} value={this.state.usuario} placeholder="Usuario" onChangeText={(usuario) => this.setState({ usuario })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Senha: </Text>
                    <TextInput style={styles.textContent} value={this.state.senha} placeholder="Senha" onChangeText={(senha) => this.setState({ senha })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >E-Mail: </Text>
                    <TextInput style={styles.textContent} value={this.state.email} placeholder="E-Mail" onChangeText={(email) => this.setState({ email })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Idade: </Text>
                    <TextInput style={styles.textContent} keyboardType='numeric' value={this.state.idade} placeholder="Idade"  onChangeText={(idade) => this.setState({ idade })}/>  
                </View>
                

                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Escolaridade: </Text>
                    <ModalDropdown 
                        style={styles.textDropDown} ref="dropEscolaridade"
                        textStyle={styles.textDropDownText} 
                        dropdownStyle={styles.textDropDownRow} 
                        value={this.state.escolaridade}
                        defaultValue={this.state.escolaridade} options={this.listEscolaridades} onSelect={(escolaridade) => this.updateEscolaridade(escolaridade)}/> 
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Cidade: </Text>
                    <TextInput style={styles.textContent} value={this.state.cidade} placeholder="Cidade" onChangeText={(cidade) => this.setState({ cidade })}/>  
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Estado: </Text>
                    <ModalDropdown 
                        style={styles.textDropDown} ref="dropEstado"
                        textStyle={styles.textDropDownText} 
                        dropdownStyle={styles.textDropDownRow} 
                        value={this.state.estado} defaultValue={this.state.estado} options={this.listEstados} onSelect={(estado) => this.updateEstado(estado)}/> 
                     
                </View>
                <View style={styles.contentSend}> 
                    <TouchableOpacity style={styles.sendButton} onPress={this.savePerfil}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="save" size={30} color='black' />
                            <Text style={styles.textButton} >Salvar Dados</Text>
                        </View>
                    </TouchableOpacity>    
                </View>


            </View>        
        )
    }
}

const styles = StyleSheet.create({
    content:{ //Style do content da pagina
        flex:1,
        width: '100%',
        height: '100%'
    },
    header:{ // Style do Header geral
        backgroundColor:'#0066CC',
        width:'100%',
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:60
    },
    iconStart:{ // Style do Icone que fica no start do Header
        justifyContent: 'flex-start',
        position: 'absolute',
        left:0,
        marginLeft:5
        
    },
    contentTextHeader:{ // Style do Texto que fica no centro do header
        justifyContent: 'center',
        color:'white',
        textAlign:'center',
        alignSelf:'center',
        fontSize:20,
        fontFamily: "Arial",
    },
    headerButton:{ //Header de cada um dos botões que vão ficar no corpo da tela
        borderColor:'grey',
        borderWidth:1,
        borderRadius:10,
        width:'100%',
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },

    content_buttons_add:{ // Style dos botões (TouchableHightlight)
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        borderRadius:10,
    },
    contentButtons:{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    textContent:{
        color: 'black',
        flex: 1,
        height: 40,
        paddingLeft:10,
        borderRadius:10,
        borderWidth: 0.1,
        fontSize: 15
    },
    textDropDown:{
        color: 'black',
        paddingLeft:10,
        width:'100%',
        fontSize: 10
    }, 
    textDropDownText:{
        color: 'black',
        fontSize: 15,
    }, 
    textDropDownRow:{
        color: 'black',
        fontSize: 20,
        width: 180
    }, 
    textButton:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',
        flex: 1,
        paddingLeft:25,
        borderBottomWidth: 1,
        fontSize: 20
    },
    labelButton:{ // Label dos textos
        color: 'black',
        marginLeft:25,
        fontSize: 20
    },
    contentSend:{ // Label dos textos
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        borderRadius:10,
    },
    sendButton:{
        borderColor:'#0066CC',
        borderWidth:1,
        borderRadius:10,
        width:'100%',
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    paddingTop:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 0
    },
    textButton:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',        
        fontSize: 20
    },
    iconStart:{ // Style do Icone que fica no start do Header
        justifyContent: 'flex-start',
        position: 'absolute',
        left:0,
        marginLeft:5
        
    },
    iconHeader:{ // Style do Icone que fica no start do Header
        justifyContent: 'flex-start',
        position: 'absolute',
        left:0,
        marginLeft:15
        
    },
    
})