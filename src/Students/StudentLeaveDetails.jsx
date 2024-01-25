import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import axios from 'axios';

const StudentLeaveDetails = ({ studentRegNum }) => {
  const theme = useTheme();
  const [leaveApplications, setLeaveApplications] = useState([]);

  useEffect(() => {
    const fetchLeaveApplications = async () => {
      try {
        const response = await axios.get(`http://192.168.10.34:3001/api/getLeaveApplications/${studentRegNum}`);
        setLeaveApplications(response.data.leaveApplications);
      } catch (error) {
        console.error('Error fetching leave applications:', error);
      }
    };

    fetchLeaveApplications();
  }, [studentRegNum]);

  return (
    <ScrollView>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>Your Leave Applications:</Text>
      {leaveApplications.map((leave) => (
        <Card key={leave._id} style={{ marginBottom: 16, backgroundColor: theme.colors.surface }}>
          <Card.Content>
            <Text>{`Subject: ${leave.subject}`}</Text>
            <Text>{`Student Name: ${leave.studentName}`}</Text>
            <Text>{`Student RegNo: ${leave.studentRegNum}`}</Text>
            <Text>{`Student Email: ${leave.studentEmail}`}</Text>
            <Text>{`Description: ${leave.description}`}</Text>
             <Text>{`From Date: ${leave.fromDate}`}</Text>
            <Text>{`To Date: ${leave.toDate}`}</Text>
            <Text>{`Status: ${leave.status}`}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

export default StudentLeaveDetails;
