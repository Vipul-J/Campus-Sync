import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, DataTable, Subheading, Caption, Snackbar, List, Card, Title } from 'react-native-paper';
import axios from 'axios';

const CheckAttend = () => {
  const [regNumber, setRegNumber] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleRegNumberSubmit = async () => {
    try {
      const response = await axios.get(`http://192.168.10.34:3001/api/getStudentByRegNumber/${regNumber}`, {
        timeout: 5000,
      });
      setStudentData(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
      console.log('Error response:', error.response);
      console.log('Error request:', error.request);
      setStudentData(null);
      setSnackbarVisible(true);
    }
  };

  const calculateAttendancePercentage = (subject) => {
    if (studentData && studentData.attendance.length > 0) {
      const totalClasses = studentData.attendance.filter((entry) => entry.subject === subject).length;
      const presentClasses = studentData.attendance.filter(
        (entry) => entry.subject === subject && entry.status === 'present'
      ).length;
      const percentage = (presentClasses / totalClasses) * 100;
      return percentage.toFixed(2);
    }
    return 'N/A';
  };

  const renderAttendanceWarning = (subject) => {
    const attendancePercentage = calculateAttendancePercentage(subject);
    if (attendancePercentage !== 'N/A' && parseFloat(attendancePercentage) < 75) {
      return (
        <Text style={styles.textDanger}>
          Warning: You are in shortage of attendance in {subject}!
        </Text>
      );
    }
    return null;
  };

  const renderAttendanceItem = ({ item }) => (
    <List.Item
      title={new Date(item.date).toLocaleDateString()}
      description={`Timing: ${item.timings}, Status: ${item.status}, Attendance Percentage: ${calculateAttendancePercentage(
        item.subject
      )}%`}
    />
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Title style={styles.heading}>Student Portal</Title>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.formContainer}>
              <TextInput
                label="Enter Registration Number"
                value={regNumber}
                onChangeText={(text) => setRegNumber(text)}
                keyboardType="numeric"
                style={styles.input}
              />
              <TouchableOpacity onPress={handleRegNumberSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {studentData && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.welcome}>
                Welcome,
                <Text style={styles.welcomeName}> {studentData.name}!</Text>
              </Title>
              <Caption>Class: {studentData.studentClass}</Caption>

              {studentData.attendance.length > 0 && (
                <View>
                  <Subheading style={styles.subHeading}>Attendance History</Subheading>
                  {['Cyber Security', 'DAA', 'Android', 'Python', 'Web Tech'].map((subject) => (
                    <View key={subject} style={styles.subjectContainer}>
                      <Title style={styles.subject}>{subject}</Title>
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title>Date</DataTable.Title>
                          <DataTable.Title>Timing</DataTable.Title>
                          <DataTable.Title>Status</DataTable.Title>
                          <DataTable.Title>Attendance Percentage</DataTable.Title>
                        </DataTable.Header>
                        {studentData.attendance
                          .filter((entry) => entry.subject === subject)
                          .map((item, index) => (
                            <DataTable.Row key={index}>
                              <DataTable.Cell>{new Date(item.date).toLocaleDateString()}</DataTable.Cell>
                              <DataTable.Cell>{item.timings}</DataTable.Cell>
                              <DataTable.Cell>{item.status}</DataTable.Cell>
                              <DataTable.Cell>{calculateAttendancePercentage(item.subject)}%</DataTable.Cell>
                            </DataTable.Row>
                          ))}
                      </DataTable>
                      {renderAttendanceWarning(subject)}
                    </View>
                  ))}
                </View>
              )}

              {studentData.attendance.length === 0 && <Text>No attendance history available</Text>}
            </Card.Content>
          </Card>
        )}

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          action={{
            label: 'OK',
            onPress: () => {},
          }}
        >
          Error fetching student data.
        </Snackbar>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  highlightedText: {
    color: 'blue', // Change the color to your preferred highlight color
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  card: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 32,
    color: '#3e4095',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  welcomeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3e4095',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subjectContainer: {
    marginBottom: 20,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textDanger: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3e4095',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CheckAttend;
