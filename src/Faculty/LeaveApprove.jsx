import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import axios from 'axios';

const LeaveApprove = () => {
  const theme = useTheme();
  const [leaveApplications, setLeaveApplications] = useState([]);

  const fetchLeaveApplications = async () => {
    try {
      const response = await axios.get('http://192.168.115.252:3001/api/getLeaveApplications');
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
      await axios.put(`http://192.168.115.252:3001/api/processLeaveApplication/${id}`, { status });
      fetchLeaveApplications();
    } catch (error) {
      console.error('Error processing leave application:', error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
        padding: 20, 
        marginTop: 32 
      }}
    >
      <Title style={{ marginBottom: 16, fontSize: 24, fontWeight: 'bold' }}>Leave Applications</Title>
      {leaveApplications.map((leave) => (
        <Card key={leave._id} style={{ marginBottom: 16 }}>
          <Card.Content>
            <Paragraph><Paragraph style={{fontWeight: 'bold'}}>Subject :</Paragraph>{leave.subject}</Paragraph>
            <Paragraph><Paragraph style={{fontWeight: 'bold'}}>Description :</Paragraph>{leave.description}</Paragraph>
            <Paragraph><Paragraph style={{fontWeight: 'bold'}}>From :</Paragraph>{` ${leave.fromDate}`}</Paragraph>
            <Paragraph><Paragraph style={{fontWeight: 'bold'}}>To :</Paragraph>{` ${leave.toDate}`}</Paragraph>
            <Paragraph><Paragraph style={{fontWeight: 'bold'}}>Status :</Paragraph>{`${leave.status}`}</Paragraph>
          </Card.Content>
          <Card.Actions style={{ justifyContent: 'flex-end' }}>
            <Button
              onPress={() => handleProcessLeave(leave._id, 'APPROVED')}
              style={{ marginRight: 8 }}
            >
              Approve
            </Button>
            <Button onPress={() => handleProcessLeave(leave._id, 'REJECTED')}>Reject</Button>
          </Card.Actions>
        </Card>
      ))}
      <Text style={{margin: 14}}></Text>
    </ScrollView>
  );
};

export default LeaveApprove;
