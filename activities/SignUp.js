import React from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity, ImageBackground} from 'react-native';

export const signUpScreen = ({navigation}) =>  {
    return (
        <View style={styles.container}>
            <Text> Estas en SignUp </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
}); 