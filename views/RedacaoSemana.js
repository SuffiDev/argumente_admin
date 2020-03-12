import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-picker'
import {
        View,
        Text, 
        ImageBackground, 
        StyleSheet,
        TextInput,
        Image,
        Linking,
        Button,
        TouchableHighlight,
        TouchableOpacity
    } from 'react-native'
    const initialState = {abriu: true, semana: '', mes: '', ano: '', apoioPdf: '', apoioWeb: '', apoioYoutube: '', tema: '', previewImg: require('../assets/imgs/icon_no_photo.png'),caminhoImg: ''}
    const options = {
        quality       : 1,
        mediaType    : "photo",
        cameraType  : "back",
        allowsEditing : true,
        noData          : true,

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
            apoioYoutube: data.data['desc'][0]['apoio_video']
        })
    }
    getRedacao = async () => {
        try {
            const idAluno = await AsyncStorage.getItem('@idAluno')
            let idAlunoInt = parseInt( idAluno.replace(/^"|"$/g, ""))
            console.log(idAlunoInt)
            console.log(typeof parseInt(idAluno));
            await axios.post('http://192.168.0.22:3000/get_tema',{                   
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
    openCamera = () => {
        ImagePicker.launchCamera(options, (response) => {
            const source = { uri: 'file://' +response.path }
            this.setState({ previewImg: {uri: 'file://' + response.path }, caminhoImg: response.path });
        });
    }
    openGallery = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            const source = { uri: 'file://' +response.path }
            this.setState({ previewImg: {uri: 'file://' + response.path }, caminhoImg: response.path });
          });
    }
    render() {
        if(this.state.abriu){
            this.getRedacao()
        }
        return(
            <View style={styles.content} >  
                <View style={styles.header}>

                    <View style={styles.iconStart}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="bars" size={30} color='#FFF'  /> 
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.contentTextHeader} >Redação da Semana</Text>
                    </View>

                </View>
                <View style={styles.content_buttons_first}> 
                    <Text style={styles.textTema}>Tema: {this.state.tema} </Text>  
                </View>

                <View style={styles.content_buttons}> 

                    <TouchableOpacity onPress={this.openPDF}>
                        <View>
                            <Text style={styles.textButton}> 
                                Texto de apoio (PDF): 
                            </Text>  
                                <Image style={styles.imgIcon} source={require('../assets/imgs/icon_pdf.png')} />

                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.content_buttons}> 

                    <TouchableOpacity onPress={this.openWeb}>
                        <View>
                            <Text style={styles.textButton}> 
                                Texto de apoio (WEB): 
                            </Text>  
                                <Image style={styles.imgIcon} source={require('../assets/imgs/icon_web.png')} />

                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.content_buttons}> 

                    <TouchableOpacity onPress={this.openYoutube}>
                        <View>
                            <Text style={styles.textButton}> 
                                Video de Apoio: 
                            </Text>  
                                <Image style={styles.imgIcon} source={require('../assets/imgs/icon_video.png')} />

                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentImages}> 
                    
                        <View>
                            <TouchableOpacity style={styles.imgIconLeft} onPress={this.openGallery}>
                                    <Image style={{width: 100, height: '100%'}} source={require('../assets/imgs/icon_gallery.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity   style={styles.imgIconRight}  onPress={this.openCamera}>
                                    <Image style={{width: 100, height: '100%'}} source={require('../assets/imgs/icon_camera.png')} />
                            </TouchableOpacity>

                        </View>
                    
                </View>
                <View style={styles.showImagem}> 
                    <TouchableOpacity style={{height:150}}   onPress={()=>{}}>
                        <Image style={{width:150, height:150}}source={this.state.previewImg} />
                    </TouchableOpacity>
                </View>



                <View style={styles.buttonSend}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={()=>{}}>
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
    textButton:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',
        marginLeft:40,
        fontSize: 20
    },
    textTema:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',
        fontSize: 20
    },
    content_buttons:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 20,        
    },
    content_buttons_first:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 0,      
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',  
        marginLeft: 20,
        height:60,
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
        marginTop: 30,
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
        left:0,
        position: 'absolute',
        marginLeft:20,
        width: '100%',
        height: 30,
        resizeMode: 'contain'
    },
    imgIconLeft:{
        justifyContent: 'flex-start',
        left:0,
        position: 'absolute',
        height: 80,
        resizeMode: 'contain'
    },
    imgIconRight:{
        justifyContent: 'flex-end',
        right:0,
        height: 80,
        marginLeft:120,
        resizeMode: 'contain'
    }
    
})