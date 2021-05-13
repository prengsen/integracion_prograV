import * as React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//yarn add @react-navigation/bottom-tabs
//yarn add @react-navigation/native

function HomeScreen() {
    return (
      <View style={{ flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#47edab' }}>
        <Text>Home!</Text>
      </View>
    );
  }
  
function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }

const Tab = createBottomTabNavigator();

const mainScreen = () =>  {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        position: 'absolute',
                        bottom: 25,
                        left: 20,
                        right: 20,
                        elevation: 0,
                        backgroundColor: "#FFFFFF",
                        borderRadius: 15,
                        height: 90
                    }
                }}
            >
                <Tab.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{
                        tabBarIcon: ({focused}) => {
                            <View style={{ alignItems: 'center', justifyContent: 'center', top:10}}>
                                <Image 
                                    source={require('../assets/icons/home.png')}
                                    resizeMode="contain"
                                    style={{ 
                                        width: 25,
                                        height: 25,
                                        tintColor: focused? '#0000FF': '#47edab'
                                    }}
                                />
                                <Text>
                                    HOME
                                </Text>
                            </View>
                        }
                    }}
                
                
                />

                <Tab.Screen name="Alquilar/Compras" component={HomeScreen} />
                <Tab.Screen name="Membresias" component={HomeScreen} />
                <Tab.Screen name="Promos" component={HomeScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default mainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
}); 