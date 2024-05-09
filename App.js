// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform, TouchableOpacity, Text } from 'react-native';
import Main from "./components/Main";
import Manager from "./components/Manager";
import Form from "./components/Form";


import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  

 
  return (
    <View style={styles.container}>
      
     
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Our Phones" component = {Main}></Stack.Screen>
          <Stack.Screen name = "Devices" component = {Manager}></Stack.Screen>
          <Stack.Screen name = "Form" component = {Form}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
   
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: Platform.OS == 'ios' ? 50 : 0,
  },
 
});
