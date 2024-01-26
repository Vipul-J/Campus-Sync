import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Appbar, TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import axios from 'axios';

const MakeAnnouncements = () => {
  const [formData, setFormData] = useState({
    facultyName: '',
    subject: '',
    title: '',
    description: '',
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://192.168.10.34:3001/api/submissions', formData);
      // Optionally, you can reset the form fields here
      setFormData({
        facultyName: '',
        subject: '',
        title: '',
        description: '',
      });
      Alert.alert(
        'Submission Successful',
        'Your announcement has been successfully submitted!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      console.log('Submission successful');
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make Announcements</Text>
      <Picker
        selectedValue={formData.facultyName}
        onValueChange={(value) => handleChange('facultyName', value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Professor" value="Select Professor" />
        <Picker.Item label="Prof. Suni Vernekar" value="Prof. Suni Vernekar" />
        <Picker.Item label="Prof. Suni Vernekar" value="Prof. Suni Vernekar" />
        <Picker.Item label="Prof. Akhila Khoday" value="Prof. Akhila Khoday" />
        <Picker.Item label="Prof. Hema Chikaraddi" value="Prof. Hemahikaraddidi" />
      </Picker>

      <Picker
        selectedValue={formData.subject}
        onValueChange={(value) => handleChange('subject', value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Subject" value="Select Subject" />
        <Picker.Item label="DAA" value="DAA" />
        <Picker.Item label="Android" value="Android" />
        <Picker.Item label="Cyber Security" value="Cyber Security" />
        <Picker.Item label="Software Engg" value="Software Engg" />
        <Picker.Item label="Data mining" value="Data mining" />
      </Picker>

      <PaperTextInput
        label="Title"
        value={formData.title}
        onChangeText={(value) => handleChange('title', value)}
        style={styles.input}
      />

      <PaperTextInput
        label="Description"
        value={formData.description}
        onChangeText={(value) => handleChange('description', value)}
        multiline
        style={styles.input}
      />

      <PaperButton mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
      </PaperButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginTop: 32 // Background color for the entire screen
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Text color
  },
  picker: {
    marginBottom: 16,
    backgroundColor: '#ffffff', // Background color for pickers
  },
  input: {
     marginTop: 8,
  },
  button: {
     marginTop: 16,
    backgroundColor: '#3e4095', // Button background color

  },
});

export default MakeAnnouncements;
