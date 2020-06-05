import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ModalDropdown from 'react-native-modal-dropdown'
import {
        View,
        Text, 
        StyleSheet,
        TouchableOpacity,
        Alert,
        BackHandler,
        ToastAndroid,
        FlatList
    } from 'react-native'
const initialState = {screen: 'RedacoesNaoCorrigidas',registros: [],abriu: false}

function Item({ title, id, navigate }) {
    return (
        <View >
            <TouchableOpacity style={{        
            borderColor:'#0066CC',
            borderWidth:1,
            width:'100%',
            marginTop: 10,
            flexDirection:"row",
            alignItems: 'center',
            justifyContent: 'center',
            height: 40
        }}onPress={() => navigate.novaRedacao(id)}>
                <Icon style={styles.iconStart} name="check" size={30} color='black' />
                <Text style={{
                    color: 'black',
                    fontSize: 15
                }}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
    }
export default class Register extends Component {
    state = {
        ...initialState
    }
    novaRedacao = async (id) => {
        try {
            const idAluno = await AsyncStorage.getItem('@idAluno')
            let idAlunoInt = parseInt( idAluno.replace(/^"|"$/g, ""))
            await axios.post('http://178.128.148.63:3000/get_dados_tema',{                   
                idAluno: idAlunoInt,    
                idTema: id          
            }).then(data => {
                console.log('valor do desc: ' + data.data['desc'])
                if(data.data['desc'] == ""){
                    console.log('caiu aqui')
                    this.props.navigation.navigate('NovaRedacao',{'id':id})
                }
                else if(data.data['desc'][0]['idCorrecao'] != null)
                    Alert.alert( 'Redação','Você já enviou uma redação com este tema!',[
                        {text: 'Visualizar Correção', onPress: () => this.props.navigation.navigate('DetalhesRedacao',{'id':id})},
                        {text: 'Enviar nova redação', onPress: () => this.props.navigation.navigate('NovaRedacao',{'id':id})},
                        {text: 'Cancelar', onPress: () => {}}
                    ])
                    
                else
                    Alert.alert( 'Redação','Você já enviou uma redação com este tema, porém a mesma ainda não foi corrigida!',[
                        {text: 'Enviar nova redação', onPress: () => this.props.navigation.navigate('NovaRedacao',{'id':id})},
                        {text: 'Cancelar', onPress: () => {}}
                    ])
            })
        //this.props.navigation.navigate('NovaRedacao',{'id':id})
        } catch (error) {
            console.log(error)
        // Error saving data
        }
    }
    getRedacoes = async () => {
        try {
            const idAluno = await AsyncStorage.getItem('@idAluno')
            let idAlunoInt = parseInt( idAluno.replace(/^"|"$/g, ""))
            await axios.post('http://178.128.148.63:3000/get_temas',{                   
                    idAluno: idAlunoInt,              
                    tipoRedacao: 'naoCorrigida'
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    this.setState({abriu:true})
                    let listItems = []
                    let currentItem
                    console.log(data.data['desc'])
                    for(let i =0; i< data.data['desc'].length; i++){
                        currentItem = data.data['desc'][i]
                        listItems.push({id: currentItem['id'], title: ' Semana ' + currentItem['semana']})
                    }
                    console.log(JSON.stringify(listItems))
                    this.setState({registros:listItems})
                    
                })
        } catch (error) {
            console.log(error)
        // Error saving data
        }
    }
    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
            if(!this.state.abriu)
                this.getRedacoes()
        });
    }  
    render() {
        return(
            <View style={styles.content} >  
                <View style={styles.header}>
                    <View style={styles.iconHeader}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="bars" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.contentTextHeader} >REDAÇÕES ANTERIORES</Text>
                    </View>

                </View>

                <View  style={styles.paddingTop}></View>
                <View style={{
                    marginLeft: 20,
                    marginRight: 20
                }}>
                    <FlatList
                        data={this.state.registros}
                        renderItem={({ item }) => <Item style={{borderWidth: 1}}title={item.title} id={item.id} navigate={this} />}
                        keyExtractor={item => item.id}
                    />
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
    iconHeader:{ // Style do Icone que fica no start do Header
        justifyContent: 'flex-start',
        position: 'absolute',
        left:0,
        marginLeft:15
        
    },
    contentTextHeader:{ // Style do Texto que fica no centro do header
        justifyContent: 'center',
        color:'white',
        textAlign:'center',
        alignSelf:'center',
        fontSize:20,
        fontFamily: "Arial",
    },

})