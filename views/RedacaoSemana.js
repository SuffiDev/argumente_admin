import React, {Component, Fragment} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
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

export default class Register extends Component {
    render() {
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
                <View  style={styles.paddingTop}>
                
                </View>
                <View style={styles.content_buttons}> 
                    <Text style={styles.textButton}> Tema: A importancia da Educação Financeira </Text>  
                </View>

                <View style={styles.content_buttons}> 

                    <TouchableOpacity onPress={()=>{}}>
                        <View>
                            <Text style={styles.textButton}> 
                                Texto de apoio (PDF): 
                            </Text>  
                                <Image style={styles.imgIcon} source={require('../assets/imgs/icon_pdf.png')} />

                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.content_buttons}> 

                    <TouchableOpacity onPress={()=>{}}>
                        <View>
                            <Text style={styles.textButton}> 
                                Texto de apoio (WEB): 
                            </Text>  
                                <Image style={styles.imgIcon} source={require('../assets/imgs/icon_web.png')} />

                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.content_buttons}> 

                    <TouchableOpacity onPress={()=>{}}>
                        <View>
                            <Text style={styles.textButton}> 
                                Video de Apoio: 
                            </Text>  
                                <Image style={styles.imgIcon} source={require('../assets/imgs/icon_video.png')} />

                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentImages}> 

                    <TouchableOpacity  onPress={()=>{}}>
                        <View>
                                <Image style={styles.imgIconLeft} source={require('../assets/imgs/icon_gallery.png')} />
                                <Image style={styles.imgIconRight} source={require('../assets/imgs/icon_camera.png')} />

                        </View>
                    </TouchableOpacity>
                </View>



                <View style={styles.contentSend}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={()=>{}}>
                        <View style={styles.headerSend}>
                            <Icon style={styles.iconStart} name="send" size={30} color='black' />
                            <Text style={styles.textSend} >Enviar redação</Text>
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
    content_buttons:{ // Texto dos botões que vão ficar no corpo da tela
        marginTop: 30,
        
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
        marginTop: 60,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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