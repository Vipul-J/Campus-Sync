import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const MakeAnnouncements = () => {
  const [facultyName, setFacultyName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [pdf, setPdf] = useState(null);

  const facultyNames = [
    'Prof. Suni Vernekar',
    'Prof. Akhila Shoddy',
    'Prof. Hema Chokaraddi',
    'Prof. Vishwanath Patil',
    'Prof. Sridevi Kuri',
    'Prof. Sushma Naikar',
    'Prof. Rohit K',
  ];

  const subjects = [
    'DAA',
    'Android',
    'Cyber Security',
    'Software Engg',
    'Data mining',
  ];

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (!result.cancelled) {
        console.log('Selected PDF:', result);
        setPdf(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const submitForm = async () => {
    try {
      if (!pdf) {
        console.error('No PDF file selected');
        return;
      }

      const formData = new FormData();
      formData.append('facultyName', facultyName);
      formData.append('subject', subject);
      formData.append('description', description);
      formData.append('pdf', {
        uri: pdf.uri,
        name: 'pdf',
        type: 'application/pdf',
      });

      const response = await axios.post('http://192.168.10.34:3001/api/saveAnnouncement', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      if (response.status === 201) {
        console.log('Announcement submitted successfully');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error submitting announcement:', error.response.data);
      } else if (error.request) {
        console.error('Error submitting announcement:', error.request);
      } else {
        console.error('Error submitting announcement:', error.message);
      }
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 32 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Make Announcement
      </Text>

      <Picker
        selectedValue={facultyName}
        onValueChange={(itemValue) => setFacultyName(itemValue)}
        style={{ backgroundColor: '#fafafa', marginVertical: 8 }}
      >
        <Picker.Item label="Select Faculty Name" value="" />
        {facultyNames.map((name) => (
          <Picker.Item key={name} label={name} value={name} />
        ))}
      </Picker>

      <Picker
        selectedValue={subject}
        onValueChange={(itemValue) => setSubject(itemValue)}
        style={{ backgroundColor: '#fafafa', marginVertical: 8 }}
      >
        <Picker.Item label="Select Subject" value="" />
        {subjects.map((subj) => (
          <Picker.Item key={subj} label={subj} value={subj} />
        ))}
      </Picker>

      <TextInput
        label="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        numberOfLines={3}  // You can adjust the number of lines as needed
        style={{ marginVertical: 8 }}
      />

      <Button icon="file-pdf" mode="contained" onPress={pickDocument} style={{ marginVertical: 8 }}>
        Pick PDF
      </Button>

      <Button mode="contained" onPress={submitForm} style={{ marginVertical: 8 }}>
        Submit
      </Button>
    </View>
  );
};

export default MakeAnnouncements;
