import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {  Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;

const Splash = ({ navigation }) => {
  const handleButtonPress = () => {
    // Navigate to your desired screen when the button is pressed
    navigation.navigate('RoleSelection'); // Replace 'Splash' with the screen you want to navigate to
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Campus Sync</Text>
        <Text style={styles.subtitle}>"Sync, Study, Slay"</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleButtonPress}
      >
        <Text style={styles.buttonText}>Get Started - Dive In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    content: {
      flex: 1,
      justifyContent: 'flex-start',
      marginTop:'30%',
      alignItems: 'center',
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 38,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#3e4095',
      textDecorationLine: 'underline',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 24,
      textAlign: 'center',
      color: '#3e4095',
    },
    button: {
      width: '90%', // Full width button
      paddingVertical: 15,
      backgroundColor: '#3e4095',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0, // Fixed at the bottom
      borderRadius: 10,
       marginBottom: 50,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default Splash;