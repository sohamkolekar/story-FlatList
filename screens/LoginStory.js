import React from 'react';
import { Alert } from 'react-native';
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from 'react-native';
import firebase from 'firebase'

export default class Login extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
        
    }

    UserSignUp=(email,password)=>{
        console.log("hi")
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((user)=>{
            return Alert.alert("user added successfully"),
            console.log("user added successfully")
        })
        .catch((error)=>{
            var errorCode=error.code
            var errorMessage=error.message
            console.log(errorMessage)
        })

        
        
    }

    UserLogin=async(email,password)=>{
        if(email&&password){
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(email,password)
                console.log(response)
                if(response){
                    this.props.navigation.navigate("WriteScreen")
                    console.log("logged in")
                }
            }
            catch(error){
              
               console.log(error)

            }
                
            
        }
        else{
            return Alert.alert("email or password not written"),
            console.log("email or password not written")
        }
        
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>login</Text>
                <TextInput
                placeholder="email/"
                style={styles.inputBox}
                onChangeText={text=>(
                    this.setState({
                        email:text
                    })
                )}
                />
                <TextInput
                placeholder="password/"
                style={styles.inputBox}
                onChangeText={text=>(
                    this.setState({
                        password:text
                    })
                )}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    style={styles.smallBox}
                    onPress={()=>this.UserSignUp(this.state.email,this.state.password)}
                    >
                        <Text>SignUp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={styles.smallBox}
                    onPress={()=>this.UserLogin(this.state.email,this.state.password)}
                    >
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    inputBox:{
        width:200,
        height:30,
        borderWidth:3,
        padding:10,
        marginTop:20
    },
    smallBox:{
        borderWidth:3,
        borderColor:"rgb(100,79,23)",
        marginTop:30,
        width:100,
        textAlign:'center',
        marginRight:10
    },
    buttonContainer:{
        flexDirection:'row',        
    }

})