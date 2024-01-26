import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Card, List } from 'react-native-paper';
import axios from 'axios';

const CheckAnnoucne = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.10.34:3001/api/submissions');
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Recent Announcements</Text>
      {submissions.length === 0 ? (
        <Text>No submissions available</Text>
      ) : (
        <List.Section>
          {submissions.map((item) => (
            <Card key={item._id} style={styles.card}>
              <Card.Content>
                <View style={styles.postHeader}>
                  <Image
                    source={{ uri: 'https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-graduation-academic-cap-free-png-education-vector-clipart-png-image_5791037.png' }} // Placeholder image URL
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.facultyName}>{item.facultyName}</Text>
                    <Text style={styles.subject}>{item.subject}</Text>
                  </View>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </Card.Content>
            </Card>
          ))}
        </List.Section>
      )}
            <Text style={{margin: 14}}></Text>

    </ScrollView>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3e4095', // React Native Paper primary color
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  facultyName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  subject: {
    fontSize: 14,
    color: '#777',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
});

export default CheckAnnoucne;
