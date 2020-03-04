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
        TouchableOpacity
    } from 'react-native'

export default class Index extends Component {
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
                        <Text style={styles.contentTextHeader} >BEM VINDO, ALUNO!</Text>
                    </View> 

                </View>
                <View style={styles.content_buttons}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={() => this.props.navigation.navigate('Perfil')}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="user" size={30} color='black' />
                            <Text style={styles.textButton} >Perfil</Text>
                        </View>
                    </TouchableOpacity>      
                </View>

                <View style={styles.content_buttons}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={()=>{}}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="book" size={30} color='black' />
                            <Text style={styles.textButton} >Tema da Semana</Text>
                        </View>
                    </TouchableOpacity>  
                </View>

                <View style={styles.content_buttons}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={()=>{}}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="clipboard" size={30} color='black' />
                            <Text style={styles.textButton} >Redações Finalizadas</Text>
                        </View>
                    </TouchableOpacity>     
                </View>

                <View style={styles.content_buttons}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={()=>{}}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="check" size={30} color='black' />
                            <Text style={styles.textButton} >Redações Corrigidas</Text>
                        </View>
                    </TouchableOpacity>  
                </View>

                <View style={styles.content_buttons}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={()=>{}}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="phone" size={30} color='black' />
                            <Text style={styles.textButton} >Fale Conosco</Text>
                        </View>
                    </TouchableOpacity>    
                </View>

                <View style={styles.content_buttons}> 
                    <TouchableOpacity style={styles.content_buttons} onPress={()=>{}}>
                        <View style={styles.headerButton}>
                            <Icon style={styles.iconStart} name="sign-out" size={40} color='black' />
                            <Text style={styles.textButton} >Sair</Text>
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
    content_buttons:{ // Style dos botões (TouchableHightlight)
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        borderRadius:10,
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
        borderColor:'#0066CC',
        borderWidth:1,
        borderRadius:10,
        width:'100%',
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    textButton:{ // Texto dos botões que vão ficar no corpo da tela
        color: 'black',
        
        fontSize: 20
    }
    
})