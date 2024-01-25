import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import axios from 'axios';

const LeaveApprove = () => {
  const theme = useTheme();
  const [leaveApplications, setLeaveApplications] = useState([]);

  const fetchLeaveApplications = async () => {
    try {
      const response = await axios.get('http://192.168.10.34:3001/api/getLeaveApplications');
      setLeaveApplications(response.data.leaveApplications);
    } catch (error) {
      console.error('Error fetching leave applications:', error);
    }
  };

  useEffect(() => {
    fetchLeaveApplications();
  }, []);

  const handleProcessLeave = async (id, status) => {
    try {
      await axios.put(`http://192.168.10.34:3001/api/processLeaveApplication/${id}`, { status });
      fetchLeaveApplications();
    } catch (error) {
      console.error('Error processing leave application:', error);
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
      <Title style={{ marginBottom: 16, fontSize: 24 }}>Leave Applications</Title>
      {leaveApplications.map((leave) => (
        <Card key={leave._id} style={{ marginBottom: 16 }}>
          <Card.Content>
            <Title>{leave.subject}</Title>
            <Paragraph>{leave.description}</Paragraph>
            <Paragraph>{`From Date: ${leave.fromDate}`}</Paragraph>
            <Paragraph>{`To Date: ${leave.toDate}`}</Paragraph>
            <Paragraph>{`Status: ${leave.status}`}</Paragraph>
          </Card.Content>
          <Card.Actions style={{ justifyContent: 'flex-end' }}>
            <Button
              onPress={() => handleProcessLeave(leave._id, 'approved')}
              style={{ marginRight: 8 }}
            >
              Approve
            </Button>
            <Button onPress={() => handleProcessLeave(leave._id, 'rejected')}>Reject</Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

export default LeaveApprove;
