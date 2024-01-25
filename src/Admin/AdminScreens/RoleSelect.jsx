import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const RoleSelect = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card} onPress={() => navigation.navigate('MainApp', { screen: 'Faculty' })}>
        <Card.Content style={styles.cardContent}>
          <Ionicons name="ios-school" size={50} color="white" />
          <Title style={styles.cardText}>Faculty Portal</Title>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate('MainApp', { screen: 'StudMain' })}>
        <Card.Content style={styles.cardContent}>
          <Ionicons name="ios-person" size={50} color="white" />
          <Title style={styles.cardText}>Student Portal</Title>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#3e4095',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
});

export default RoleSelect;
