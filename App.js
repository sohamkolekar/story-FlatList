
import React from 'react';
import { StyleSheet,Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import WriteStory from './screens/WriteStory'
import ReadStory from './screens/ReadStory'
import Login from './screens/LoginStory'


export default class App extends React.Component{
  render(){
   return (
   
     <AppContainer/>
    
    );
   }
}



const TabNavigator=createBottomTabNavigator({
  WriteScreen:{screen:WriteStory},
  ReadScreen:{screen:ReadStory}
},
{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon: ()=>{
      const routeName=navigation.state.routeName;
      
      if(routeName==="WriteScreen"){
        return(
          <Image
          source={require('./images/write.png')}
          style={{width:50,height:50,marginBottom:10}}/>
        )
      }
      else if(routeName==="ReadScreen"){
        return(
          <Image
          source={require('./images/read.png')}
          style={{width:50,height:50,marginBottom:10}}/>
        )
      }
    }
  })
}
)

const SwitchNavigator=createSwitchNavigator({
  Login:{screen:Login},
  Tab:{screen:TabNavigator}
})

const AppContainer=createAppContainer(SwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
