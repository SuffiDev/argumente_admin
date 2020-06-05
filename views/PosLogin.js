import React, {Component} from 'react'
import axios from 'axios'
import RNFS from 'react-native-fs'
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
const initialState = {delayTime: 3000, splashImage:'', abriu: false}
export default class Login extends Component {
    state = {
        ...initialState
    }
    onLoad = () => {

        let nomeArq = this.props.navigation.getParam('nomeArquivo', 0)
        let dadosImg = this.props.navigation.getParam('imgPatrocinio', 0)
        const imagePath = `${RNFS.TemporaryDirectoryPath}/temporario_logo${nomeArq}.png`
        RNFS.writeFile(imagePath, dadosImg, 'base64').then(() => {
            console.log('entrou no onLoad')
            console.log(dadosImg.length)
            this.setState({abriu:true , splashImage:{uri: 'file://'+imagePath}})
            console.log('splash: ' +this.state.splashImage)
            setTimeout(() => {  
                console.log('vou direcionar')
                this.props.navigation.navigate('Index')
            }, this.state.delayTime)            
        })
    }
    //Função do login    
    componentDidMount () {
        this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
          this.onLoad()
        });
    }
    render() {
        return(
            <View  style={styles.imageLogin}>
                <Text style={styles.logo} >
                        BEM-VINDO, ALUNO!
                    </Text>
                <Text style={styles.subLogo} >
                        SUA SESSÃO É PATROCINADA POR:
                    </Text>
                <View style={styles.content} >      
                <Image source={this.state.splashImage} style={{width:250, height: 250}}></Image>
                </View>        
            </View>
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
        height: 300,
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
        alignItems: 'center',        
        fontSize: 30,
        marginTop: '15%'
    },
    subLogo:{
        alignItems: 'center',      
        fontSize: 20,
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
