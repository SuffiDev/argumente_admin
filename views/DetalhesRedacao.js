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
        Alert,
        ToastAndroid
    } from 'react-native'
    const initialState = {id_redacao:'', redacao: '', resposta:'', dataCorrecao: '', abriu: true}
export default class Register extends Component {
    state = {
        ...initialState
    }
    //Função chamada assim que a tela abre
    onLoad = async () => {
        try {
            let idAlunoInt = this.props.navigation.getParam('id', 0)
            let retornoReq = await axios.post('http://178.128.148.63:3000/getCorrecao',{                   
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
        console.log(data.data['desc'][0]['observacao'])
        this.setState({
            dataCorrecao: 'Data de correção: ' + data.data['desc'][0]['data'], 
            redacao: data.data['desc'][0]['tema'], 
            resposta:data.data['desc'][0]['observacao'], 
        })
    }
    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
          this.setState({...initialState});
        });
    }
    render() {
        if(this.state.abriu){
            this.onLoad()
        }
        return(
            <View style={styles.content} >  
                <View style={styles.header}>
                    <View style={styles.iconHeader}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('RedacoesFinalizadas')}>
                            <Icon name="arrow-left" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >      
                        <Text style={styles.contentTextHeader} >{this.state.redacao}</Text>
                    </View>

                </View>
                <View  style={styles.paddingTop}>

                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >{this.state.dataCorrecao} </Text>
                </View>
                
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Resposta do Professor: </Text>         
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >{this.state.resposta}</Text>            
                </View>
                <View
                    style={{
                        marginTop:10,
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                    />
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButtonFinal} >Ei, não pare por aqui! Fique atento as observações dos Professores e envie novas redações!</Text>
                </View>
                <View style={styles.contentSend}> 
                    <TouchableOpacity style={styles.sendButton} onPress={() => this.props.navigation.navigate('RedacoesFinalizadas')}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="check" size={30} color='black' />
                            <Text style={styles.textButton} >Voltar</Text>
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
        fontSize: 20
    },
    textDropDown:{
        color: 'black',
        paddingLeft:10,
        width:'100%',
        fontSize: 10
    }, 
    textDropDownText:{
        color: 'black',
        fontSize: 20,
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
    labelButtonFinal:{ // Label dos textos
        color: 'gray',
        marginLeft:25,
        fontSize: 15,
        marginRight:10,
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