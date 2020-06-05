import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-picker'
import Loader from './LoadSpinner'
import {
        View,
        Text, 
        StyleSheet,
        Image,
        Linking,
        TouchableOpacity,
        Alert,
        ToastAndroid
    } from 'react-native'
    const initialState = {loading: false,achouTema: false,abriu: false, descricao: '', semana: '', mes: '', ano: '', apoioPdf: '', apoioWeb: '', apoioYoutube: '', tema: '', previewImg: require('../assets/imgs/icon_no_photo.png'),caminhoImg: '',idtema:''}
    const options = {
        quality       : 1,
        mediaType    : "photo",
        cameraType  : "back",
        allowsEditing : true,
        noData          : false,

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      };
export default class Register extends Component {
    state = {
        ...initialState
    }
    openPDF = () => {
        Linking.openURL(this.state.apoioPdf).catch(err => console.error("Erro ao abrir pagina : ", err))
    }
    openWeb = () => {
        Linking.openURL(this.state.apoioWeb).catch(err => console.error("Erro ao abrir pagina : ", err))
    }
    openYoutube = () => {
        Linking.openURL(this.state.apoioYoutube).catch(err => console.error("Erro ao abrir pagina : ", err))
    }
    loadItems = (data) => {
        this.setState({
            tema: data.data['desc'][0]['tema'],
            dias: data.data['desc'][0]['dias'],
            mes: data.data['desc'][0]['mes'],
            ano: data.data['desc'][0]['ano'],
            apoioPdf: data.data['desc'][0]['apoio_pdf'],
            apoioWeb: data.data['desc'][0]['apoio_web'],
            apoioYoutube: data.data['desc'][0]['apoio_video'],
            idTema: data.data['desc'][0]['id'],
            descricao: data.data['desc'][0]['descricao']
        })
    }
    getRedacao = async () => {
        try {
            this.setState({loading: true})
            const idAluno = await AsyncStorage.getItem('@idAluno')
            let idAlunoInt = parseInt( idAluno.replace(/^"|"$/g, ""))
            console.log(idAlunoInt)
            console.log(typeof parseInt(idAluno));
            await axios.post('http://178.128.148.63:3000/get_tema',{                   
                    id: idAlunoInt,
                }, (err, data) => {
                    console.log(err)
                    console.log(data)
                }).then(data => {
                    this.setState({abriu:true, loading: false})
                    console.log('entrou')
                    console.log(data.data['desc'])
                    if(data.data['desc'].length == 0){
                        this.setState({achouTema:false})
                        Alert.alert( 'Redação','Não foi possível encontrar nenhum Tema. Tente novamente mais tarde ou no proximo Dia',[{text: 'Voltar', onPress: () => this.props.navigation.navigate("Index")}])
                    }else{
                        this.setState({achouTema:true})
                        this.loadItems(data)
                    }
                    
                })
        } catch (error) {
            console.log(error)
            this.setState({loading: false})
        // Error saving data
        }
        
    }
    openCamera = () => {
        ImagePicker.launchCamera(options, (response) => {
            const source = { uri: 'file://' +response.path }
            this.setState({ previewImg: {uri: 'file://' + response.path }, caminhoImg: response.data });
        });
    }
    openGallery = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log(response.data)
            const source = { uri: 'file://' +response.path }
            this.setState({ previewImg: {uri: 'file://' + response.path }, caminhoImg: response.data });
          });
    }
    sendRedacao = async () => {
        try {
            if(!this.state.achouTema){
                Alert.alert( 'Redação','Não foi possível encontrar nenhum Tema. Tente novamente mais tarde ou no proximo Dia',[{text: 'Voltar', onPress: () => {}}])
            }else{
                try{
                    this.setState({loading:true})
                    const idAluno = await AsyncStorage.getItem('@idAluno')
                    let idAlunoInt = parseInt( idAluno.replace(/^"|"$/g, ""))
                    ToastAndroid.show('Por favor, aguarde! Isto pode demorar alguns segundos...', ToastAndroid.LONG)
                    await axios.post('http://178.128.148.63:3000/send_redacao',{                   
                            idAluno: idAlunoInt,                   
                            imgPhoto: this.state.caminhoImg,
                            idTema: this.state.idTema
                        }, (err, data) => {
                            console.log(err)
                            console.log(data)
                    }).then(data => {
                        this.setState({loading:false})
                        let retorno = data.data
                        switch(retorno['status']) {
                            case 'ok':
                                Alert.alert( 'Sucesso','Redação enviada com sucesso! Em breve um professor irá corrigi-la',[{text: 'Voltar', onPress: () => this.props.navigation.push("Index")}])
                                break
                            case 'erro':
                                Alert.alert( 'ERRO','Ocorreu um ao erro enviar sua redação! tente novamente mais tarde!',[{text: 'Voltar', onPress: () => {}}])
                                break
                            default:
                                Alert.alert( 'ERRO','Ocorreu um ao erro enviar sua redação! tente novamente mais tarde!',[{text: 'Voltar', onPress: () => {}}])
                                break
                        }
                    })
                }catch(error){
                    Alert.alert( 'Redação','Ocorreu um erro ao enviar a Redação. Detalhes:' + error,[{text: 'Voltar', onPress: () => {}}])
                    console.log(error)
                    this.setState({loading:false})
                }
            }
            
        } catch (error) {
            console.log(error)
            this.setState({loading:false})
        // Error saving data
        }
    }
    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
            if(!this.state.abriu)
                this.getRedacao()
        });
    }
    render() {
        return(
            <View style={styles.content} >  
                <Loader
                    loading={this.state.loading} />
                <View style={styles.header}>

                    <View style={styles.iconHeader}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="bars" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.contentTextHeader} >REDAÇÃO DA SEMANA</Text>
                    </View>

                </View>
                <View style={styles.content_buttons_first}> 
                    <Text style={styles.textTema}>Tema: {this.state.tema} </Text>  
                </View>
                <View style={styles.content_buttons}> 
                    <Text style={styles.textButton}>{this.state.descricao} </Text>  
                </View>

                <View style={styles.content_buttons}> 

                    <TouchableOpacity onPress={this.openPDF}>
                        <View style={{flexDirection:"row"}}>
                            <View style={{flex:2,}}>
                            <Text style={styles.textButton}> 
                                Texto de apoio (PDF): 
                            </Text>  
                            </View>
                            <View style={{flex:1,}}>
                                <Image style={styles.imgIcon} source={require('../assets/imgs/icon_pdf.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.content_buttons}> 

                    <TouchableOpacity onPress={this.openWeb}>
                        <View style={{flexDirection:"row"}}>
                            <View style={{flex:2,}}>
                            <Text style={styles.textButton}> 
                                Texto de apoio (WEB): 
                            </Text>  
                            </View>
                            <View style={{flex:1,}}>
                                <Image style={styles.imgIcon} source={require('../assets/imgs/icon_web.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.content_buttons}> 

                    <TouchableOpacity onPress={this.openYoutube}>
                        <View style={{flexDirection:"row"}}>
                            <View style={{flex:2,}}>
                                <Text style={styles.textButton}> 
                                    Video de Apoio: 
                                </Text>  
                            </View>
                            <View style={{flex:1,}}>
                                <Image style={styles.imgIcon} source={require('../assets/imgs/icon_video.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentImages}> 
                    
                        
                        <View style={{flexDirection:"row"}}>
                            <View style={{flex:1,}}>
                                <TouchableOpacity style={styles.imgIconLeft} onPress={this.openGallery}>
                                        <Image style={{width: 80, height: '100%'}} source={require('../assets/imgs/icon_gallery.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1,}}>
                                <TouchableOpacity   style={styles.imgIconRight}  onPress={this.openCamera}>
                                        <Image style={{width: 80, height: '100%'}} source={require('../assets/imgs/icon_camera.png')} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    
                </View>
                <View style={styles.showImagem}> 
                    <TouchableOpacity style={{height:100}}   onPress={()=>{}}>
                        <Image style={{width:100, height:100}}source={this.state.previewImg} />
                    </TouchableOpacity>
                </View>



                <View style={styles.buttonSend}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={this.sendRedacao}>
                        <View style={styles.headerSend}>
                            <Icon style={styles.iconStart} name="send" size={30} color='black' />
                            <Text style={styles.textSend} >Enviar Redação</Text>
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
    textTema:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',
        fontSize: 20
    },
    content_buttons:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 15, 
    },
    content_buttons_first:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 0,      
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',  
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20,
    },
    buttonSend:{
        marginLeft: 20,
        marginRight: 20,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        borderRadius:10,
    },
    contentSend:{
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        borderRadius:10,
    },
    headerSend:{
        borderColor:'#0066CC',
        borderWidth:1,
        borderRadius:10,
        width:'100%',
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    textSend:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',
        fontSize: 20
    },
    contentImages:{
        marginTop: 20,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    showImagem:{
        marginTop: 10,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain'

    },
    imgIcon:{
        justifyContent: 'flex-end',
        height: 25,
        width:25,
    },
    textButton:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',
        justifyContent:'flex-start',
        marginLeft: 20,
        fontSize: 15,
        
    },
    imgIconLeft:{
        justifyContent: 'flex-start',
        height: 60,
        marginLeft: 20,
    },
    imgIconRight:{
        justifyContent: 'flex-end',
        right:0,
        height: 60,
        resizeMode: 'contain',
        marginLeft: 20,
    },
    iconHeader:{ // Style do Icone que fica no start do Header
        justifyContent: 'flex-start',
        position: 'absolute',
        left:0,
        marginLeft:15
        
    },
    
})