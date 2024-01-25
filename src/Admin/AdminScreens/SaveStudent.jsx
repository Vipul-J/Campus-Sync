import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';

const SaveStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTimings, setSelectedTimings] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');

  // Dummy data for options
  const classOptions = ['IA1', 'IA2', 'IA3', 'IIIA1', 'IIIA2', 'IVA1'];
  const subjectOptions = ['Cyber Security', 'DAA', 'Android', 'Python', 'Web Tech'];
  const randomTimings = ['09:00 AM - 10:30 AM', '11:00 AM - 12:30 PM', '02:00 PM - 03:30 PM'];
  const classProfessors = [
    'Prof. Suni Vernekar',
    'Prof. Akhila Kohday',
    'Prof. Hema Chokaraddi',
    'Prof. Vishwanath Patil',
    'Prof. Ashwatth Uppor',
    'Prof. Sridevi Kuri',
    'Prof. Sushma Naikar',
    'Prof. Rohit K',
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Make API request to fetch students based on selected class
        // Adjust the API endpoint based on your server implementation
        const response = await fetch(`http://localhost:3001/api/getStudentsByClass/${selectedClass}`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    if (selectedClass) {
      fetchStudents();
    } else {
      setStudents([]);
    }
  }, [selectedClass]);

  const handleFormSubmit = async () => {
    try {
      // Display confirmation popup
      if (window.confirm('Are you sure you want to mark attendance?')) {
        // Make API request to mark attendance
        // Adjust the API endpoint based on your server implementation
        const response = await fetch('http://localhost:3001/api/markAttendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selectedClass,
            selectedSubject,
            selectedTimings,
            selectedDate,
            selectedProfessor,
            attendanceData,
          }),
        });

        // Reset form state after successful submission
        if (response.ok) {
          setSelectedClass('');
          setSelectedSubject('');
          setSelectedTimings('');
          setSelectedProfessor('');
          setSelectedDate('');
          setAttendanceData({});
        } else {
          console.error('Failed to mark attendance:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const handleRadioChange = (studentId, status) => {
    setAttendanceData((prevAttendanceData) => ({
      ...prevAttendanceData,
      [studentId]: status,
    }));
  };

  return (
    <View>
      <Text>Mark Attendance</Text>
      <View>
        <Text>Select Class:</Text>
        <Picker
          selectedValue={selectedClass}
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
        >
          <Picker.Item label="Select Class" value="" />
          {classOptions.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View>
        <Text>Select Subject:</Text>
        <Picker
          selectedValue={selectedSubject}
          onValueChange={(value) => setSelectedSubject(value)}
        >
          <Picker.Item label="Select Subject" value="" />
          {subjectOptions.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View>
        <Text>Select Professor Name:</Text>
        <Picker
          selectedValue={selectedProfessor}
          onValueChange={(value) => setSelectedProfessor(value)}
        >
          <Picker.Item label="Select Professor" value="" />
          {classProfessors.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View>
        <Text>Select Date:</Text>
        <DatePicker
  style={{ width: 200 }}
  value={new Date(selectedDate)} // Assuming selectedDate is a valid date string
  mode="date"
  display="default"
  onChange={(event, date) => {
    if (date) {
      setSelectedDate(date.toISOString().split('T')[0]);
    }
  }}
/>

      </View>

      <TouchableOpacity onPress={handleFormSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>

      {students.length > 0 ? (
        <View>
          <Text>Student List</Text>
          {students.map((student) => (
            <View key={student._id}>
              <Text>{student.name}</Text>
              <Text>{student.regNo}</Text>
              <View>
                <Text>Present</Text>
                <TouchableOpacity onPress={() => handleRadioChange(student._id, 'present')}>
                  <Text>Present</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text>Absent</Text>
                <TouchableOpacity onPress={() => handleRadioChange(student._id, 'absent')}>
                  <Text>Absent</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text>No student data available</Text>
      )}
    </View>
  );
};

export default SaveStudent;
