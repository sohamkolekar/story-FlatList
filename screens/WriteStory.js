import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,KeyboardAvoidingView,ToastAndroid} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase'
import db from '../config';


class WriteStory extends React.Component{
    constructor(){
        super();
        this.state={
            storyName:'',
            authorName:'',
            story:''
        }
    }

    submitStory=async()=>{
        var submitMessage
        db.collection("stories").add({
            "author":this.state.authorName,
            "storyName":this.state.storyName,
            "story":this.state.story,
            "date":firebase.firestore.Timestamp.now().toDate(),
        })
        submitMessage="story saved"
        
        ToastAndroid.show(submitMessage,ToastAndroid.SHORT);

        this.setState({
            authorName:'',
            storyName:'',
            story:''
        })
    }

    render(){
        return(
            <KeyboardAvoidingView
            behavior="padding" 
            style={styles.container} 
            enabled
           >
                <TextInput
                    placeholder="Name ?"
                    style={styles.smallBox}
                    onChangeText={text=>(
                        this.setState({
                            storyName:text
                        })
                    )}
                />

               <TextInput
                    placeholder="Author ?"
                    style={styles.smallBox}
                    onChangeText={text=>(
                        this.setState({
                            authorName:text
                        })
                    )}
                />

                <TextInput
                    multiline={true}
                    placeholder="story ?"
                    style={styles.storybox}
                    onChangeText={text=>(
                        this.setState({
                            story:text
                        })
                    )}
                />

                <TouchableOpacity
                style={styles.submitBox}
                onPress={this.submitStory}>
                    <Text style={styles.SubmitBoxText}>Submit</Text>
                </TouchableOpacity>

           </KeyboardAvoidingView> 
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    },
    smallBox:{
        borderWidth:3,
        borderColor:"rgb(100,79,23)",
        marginTop:30,
        width:100,
        textAlign:'center'
    },
    storybox:{
        borderWidth:3,
        borderColor:"rgb(30,79,230)",
        width:200,
        marginTop:30,
        height:40,
        textDecorationColor:"red",
        textAlign:'center'
       
    },
    submitBox:{
        width:60,
        height:60,
        borderRadius:30,
        borderColor:"orange",
        marginTop:20,
        borderWidth:6,
        
    },
    SubmitBoxText:{
        textAlign:'center',
        marginTop:15,
        fontWeight:'bold',
        fontSize:17
    }
})

export default WriteStory