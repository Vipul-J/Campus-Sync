import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import StudentLeaveDetails from './StudentLeaveDetails';

const LeaveApply = ({ navigation }) => {
  const theme = useTheme();
  const [studentRegNum, setStudentRegNum] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState('');
  const [leaveDetails, setLeaveDetails] = useState(null);

  const handleFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDatePicker(Platform.OS === 'ios');
    setFromDate(currentDate);
  };

  const handleToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatePicker(Platform.OS === 'ios');
    setToDate(currentDate);
  };

  const showFromDatepicker = () => {
    setShowFromDatePicker(true);
  };

  const showToDatepicker = () => {
    setShowToDatePicker(true);
  };

  const handleApplyLeave = async () => {
    try {
      const response = await axios.post('http://192.168.10.34:3001/api/applyLeave', {
        studentRegNum,
        studentName,
        studentEmail,
        subject,
        description,
        fromDate,
        toDate,
      });

      console.log('Full response:', response.data);

      const { success, message, status, leaveDetails: details } = response.data;

      console.log(message);

      if (success) {
        setLeaveStatus(status);
        setLeaveDetails(details);

        // Update your UI or navigate to another screen based on the leave status
        if (status === 'approved') {
          console.log('Leave is approved!');
          // Update the UI or navigate to another screen
        } else {
          console.log('Leave is pending or rejected.');
          // Update the UI or navigate to another screen
        }
      }
    } catch (error) {
      console.error('Error applying leave:', error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 16 }}>Apply for Leave</Text>

      <TextInput
        label="Student Registration Number"
        value={studentRegNum}
        onChangeText={setStudentRegNum}
        style={{ marginBottom: 16 }}
      />

      <TextInput label="Student Name" value={studentName} onChangeText={setStudentName} style={{ marginBottom: 16 }} />

      <TextInput
        label="Student Email"
        value={studentEmail}
        onChangeText={setStudentEmail}
        style={{ marginBottom: 16 }}
      />

      <TextInput label="Subject" value={subject} onChangeText={setSubject} style={{ marginBottom: 16 }} />

      <TextInput label="Description" value={description} onChangeText={setDescription} style={{ marginBottom: 16 }} />

      <Button onPress={showFromDatepicker} style={{ marginBottom: 16 }}>
        {`From Date: ${fromDate.toISOString().split('T')[0]}`}
      </Button>
      {showFromDatePicker && (
        <DateTimePicker
          testID="fromDatePicker"
          value={fromDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleFromDateChange}
        />
      )}

      <Button onPress={showToDatepicker} style={{ marginBottom: 16 }}>
        {`To Date: ${toDate.toISOString().split('T')[0]}`}
      </Button>
      {showToDatePicker && (
        <DateTimePicker
          testID="toDatePicker"
          value={toDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleToDateChange}
        />
      )}

      <Button mode="contained" onPress={handleApplyLeave} style={{ marginBottom: 16 }}>
        Apply Leave
      </Button>

      <Text style={{ fontSize: 18, marginTop: 16 }}>{`Leave Status: ${leaveStatus}`}</Text>

      {leaveDetails && (
        <View>
          <Text style={{ fontSize: 18, marginTop: 16 }}>Leave Details:</Text>
          <Text>{`Subject: ${leaveDetails.subject}`}</Text>
          <Text>{`Description: ${leaveDetails.description}`}</Text>
          <Text>{`From Date: ${leaveDetails.fromDate}`}</Text>
          <Text>{`To Date: ${leaveDetails.toDate}`}</Text>
        </View>
      )}

      <StudentLeaveDetails studentRegNum={studentRegNum} />
    </ScrollView>
  );
};

export default LeaveApply;
