import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import RNFS from 'react-native-fs'
import Loader from './LoadSpinner'
import SoundPlayer from 'react-native-sound-player'
import ImageZoom from 'react-native-image-pan-zoom'
import {
        View,
        Text, 
        Modal,
        StyleSheet,
        TouchableOpacity,
        Image,
        Linking,
        Dimensions,
        ToastAndroid,
        ImageBackground
    } from 'react-native'
    const initialState = {show_preview: false, caminho_imagem_android: '', playable: false, loading: false, screen: 'DetalheRedacao',id_redacao:'', redacao: '', resposta:'', dataCorrecao: '', abriu: false, nota: ''}
export default class Register extends Component {
    state = {
        ...initialState
    }
    //Função chamada assim que a tela abre
    onLoad = async () => {
        try {
            this.setState({loading: true})
            let idAlunoInt = this.props.navigation.getParam('id', 0)
            ToastAndroid.show('Por favor, aguarde! Isto pode demorar alguns segundos...', ToastAndroid.LONG)
            await axios.post('http://178.128.148.63:3000/getCorrecao',{                   
                    id: idAlunoInt,
                }, (err, data) => {
                    console.log(err)

                    console.log(data)
                }).then(data => {
                    this.setState({abriu:true})
                    console.log('entrou')
                    console.log(data.data['desc'])
                    this.loadItems(data)
                    
                })
        } catch (error) {
            console.log(error)
        // Error saving data
        }
        
    }

    playAudio = () => {
        try{
            if(this.state.playable)
                SoundPlayer.play()
            else
                ToastAndroid.show('O Audio está sendo carregado! Tente novamente em alguns segundos!', ToastAndroid.LONG)
        }catch(error){
            console.log(error)
        }
    }
    //Função que seta valores para os campos assim que o resultado vem do banco
    loadItems = (data) => {
        try{
            console.log(data.data['desc']['observacao'])
            let randomNumber = Math.random() * (99 - 1) + 1
            let randomName = 'imagem'+randomNumber
            const imagePath = `${RNFS.TemporaryDirectoryPath}/${randomName}.png`
            let dadosImg = data.data['desc']['caminho_imagem']
            this.setState({caminho_imagem_android: imagePath})
            RNFS.writeFile(imagePath, dadosImg, 'base64').then(() => {
                try{
                    this.setState({
                        dataCorrecao: 'Data da Redação: ' + data.data['desc']['data'], 
                        redacao: data.data['desc']['tema'], 
                        idAudio: data.data['desc']['idCorrecao'],
                        resposta:data.data['desc']['observacao'], 
                        nota:data.data['desc']['nota'], 
                        previewImg: {uri: 'file://' + imagePath }
                    })
                    SoundPlayer.loadUrl(`http://178.128.148.63:3000/getAudio.aac?id=${this.state.idAudio}`)   
                    this.setState({loading:false})

                }catch(error){
                    console.log(error)
                    this.setState({loading: false})
                    ToastAndroid.show('Ocorreu um erro ao carregar os dados...', ToastAndroid.LONG)

                }
            })

        }catch(error){
            console.log(error)
            this.setState({loading: false})
            ToastAndroid.show('Ocorreu um erro ao carregar os dados...', ToastAndroid.LONG)
        }
    }
    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
            this.onLoad()
        });
        SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
            this.setState({playable: true})
            console.log('finished loading url', success, url)
        })
        SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
            console.log('finished playing', success)
        })
    }
    alteraPreview = () => {
        console.log('alterando o preview')
        this.setState({show_preview:false})
    }
    abreIamgem = () => {
        //Linking.openURL('file://'+this.state.caminho_imagem_android).catch(err => console.error("Erro ao abrir pagina : ", err))   
        this.setState({show_preview: true})     
        //ToastAndroid.show('Em Desenvolvimento', ToastAndroid.LONG)
    }
    render() {
        return(
            <View style={styles.content} >  
                <Modal visible={this.state.show_preview} style={{backgroundColor: 'black'}} transparent={false}>
                    <ImageBackground resizeMode={'contain'} style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height }}source={this.state.previewImg} >
                        <View>
                            <View style={styles.headerModal}>
                                <TouchableOpacity  onPress={() => {this.alteraPreview()}}>
                                    <Icon  name="close" size={40} color='black'  /> 
                                </TouchableOpacity>
                            </View>                    
                        </View>
                    </ImageBackground>
                </Modal>
                <Loader
                    loading={this.state.loading} />
                <View style={styles.header}>
                    <View style={styles.iconHeader}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="bars" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >      
                        <Text style={styles.contentTextHeader} >DETALHES DA REDAÇÃO</Text>
                    </View>

                </View>
                <View  style={styles.paddingTop}>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >{this.state.redacao} </Text>
                </View>

                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >{this.state.dataCorrecao} </Text>
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Nota: {this.state.nota} </Text>
                </View>
                
                </View>
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >Resposta do Professor: </Text>         
                </View>
                <View style={styles.content_buttons_first}> 
                    <Text style={styles.labelButton} >Áudio dica: {this.state.contador} </Text>
                    <TouchableOpacity  onPress={() => this.playAudio()}>
                                <Icon name="play" size={40} color='#000'  /> 
                    </TouchableOpacity>  
                </View>  
                <View style={styles.contentButtons}> 
                    <Text style={styles.labelButton} >{this.state.resposta}</Text>            
                </View>

                <View style={styles.showImagem}> 
                    <TouchableOpacity style={{height:150}}   onPress={()=>{this.abreIamgem()}}>
                        <Image style={{width:150, height:150}}source={this.state.previewImg} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentSend}> 
                    <TouchableOpacity style={styles.sendButton} onPress={() => this.props.navigation.goBack(null)}>
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
        height:60,
    },
    headerModal:{ // Style do Header da Modal
        flexDirection:"row",
        borderRadius: 25,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop:10,
        marginLeft: 10,
        height:50,
        width:50
    },
    content_buttons_first:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 0,      
        flexDirection:"row",
        alignItems: 'center',
        height:60,
        marginRight: 20,
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
    showImagem:{
        marginTop: 10,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain'

    },
    
})