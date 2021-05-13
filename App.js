import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity, ImageBackground} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {signUpScreen} from './activities/SignUp';
import mainScreen from './activities/mainScreen';


const image = {uri: 'https://p4.wallpaperbetter.com/wallpaper/944/111/648/book-books-culture-edition-wallpaper-preview.jpg'}

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.mainForm}>
          <TextInput 
            style={styles.inputs}
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(usernameText) => setUsername(usernameText)}
          />

          <TextInput 
            style={styles.inputs}
            placeholder="Password"
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(passwordText) => setPassword(passwordText)}
          />

          <TouchableOpacity style={styles.mainButton} 
            onPress={() => {
              console.log(password);
              console.log(username);
              
              let authParams = {'username': username, 'password': password}

              fetch('http://10.0.2.2:5000/login_request/', 
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(authParams)
              })
                .then(response => response.json())
                .then(data => {
                  if(data.Salida == true){
                    console.log("Login Permitido");
                    navigation.navigate('MainScreen');
                  } else {
                    console.log("Login NO Permitido");
                  }
                })
            }}>
            <Text style={styles.mainButtonText} > LogIn </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text 
              style={styles.signUp}
              onPress={() => {navigation.navigate('SignUp')}}
            > 
              ¿No tienes cuenta? Crear una Cuenta
            </Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>
  );
}

const AppNavigator = createStackNavigator({
  LogIn: {
    screen: LoginScreen
  },

  SignUp: {
    screen: signUpScreen
  },

  MainScreen: {
    screen: mainScreen
  }
}, {
  initialRouteName: 'MainScreen' //regresar a screen Login
})

export default createAppContainer(AppNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    flex: 1,
    width: '100%',
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center'
  },
  mainForm: {
    height: 450,
    borderRadius: 50,
    opacity: 0.85,
    width: 360,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 

  inputs: {
    fontSize: 25,
    width: 320,
    height: 55,
    color: 'black',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#009EFA',
    margin: 15,
    paddingLeft: 20
  },

  mainButton: {
    backgroundColor: '#009EFA',
    margin: 15,
    height: 50,
    borderRadius: 30,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },

  mainButtonText:{
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },

  signUp:{
    fontSize: 12
  }

});

//Paleta de Colores
//#845EC2
//#009EFA
//#00D2FC
//#4FFBDF