import React from 'react';
import {View,TouchableOpacity,Text,StyleSheet,FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'


class ReadStory extends React.Component{
    constructor(){
        super()
        this.state={
            search:'',
            allFilteredStories:''
        }
    }

    retrieveStory=async(input)=>{
        var enteredText=input.split()
        var Input=input.toLowerCase()
        
        var story=await db.collection("stories").where("storyName","==",input).get()
        
        if(story.empty===false){
            story.docs.map((docs)=>{
                this.setState({
                    allFilteredStories:[...this.state.allFilteredStories,docs.data()]
                })
            })
        }
        else{
            var story=await db.collection("stories").where("author","==",input).get()
            story.docs.map((docs)=>{
                this.setState({
                    allFilteredStories:[...this.state.allFilteredStories,docs.data()]
                })
            })
        }

        console.log(this.state.allFilteredStories)
        
    }
    
    componentDidMount=async()=>{
        const query=await db .collection("stories").get()
        query.docs.map((doc)=>{
            this.setState({
                allFilteredStories:[...this.state.allFilteredStories,doc.data()]
            })
        })
    }

    render(){
        return(
            <View>
                <SearchBar
                placeholder="Search story"
                onChangeText={text=>(
                    this.setState({
                        search:text
                    })
                )}
                value={this.state.search}
                />
                <TouchableOpacity
                style={styles.smallBox}
                onPress={()=>{
                    this.retrieveStory(this.state.search)
                    this.setState({
                        allFilteredStories:''
                    })
                }}
                >
                    <Text>Search</Text>
                </TouchableOpacity>

                <FlatList
                    data={this.state.allFilteredStories}
                    renderItem={({item})=>(
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:2}}>
                            <Text>{"author Name:"+item.author}</Text>
                            <Text>{"date:"+item.date}</Text>
                            <Text>{"story:"+item.story}</Text>
                            <Text>{"storyName:"+item.storyName}</Text>

                        </View>
                        
                    )
                    }
                        
                    keyExtractor={(item,index)=>index.toString()}
                />   
               
            </View>
        )
    }
}
 

const styles=StyleSheet.create({
    smallBox:{
        borderWidth:3,
        borderColor:"rgb(100,79,23)",
        marginTop:30,
        width:100,
        textAlign:'center'
    },
    
})

/*<ScrollView>
{this.state.allFilteredStories.map((doc)=>{
    return(
        <View key={index} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text>{"author Name"+doc.author}</Text>
            <Text>{"date"+doc.date}</Text>
            <Text>{"story"+doc.story}</Text>
            <Text>{"storyName"+doc.storyName}</Text>
        </View>
    )
})
}
</ScrollView>*/

export default ReadStory