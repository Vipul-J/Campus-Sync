// screens/FacultyMain.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo's vector icons

import MakeAnnouncements from './MakeAnnouncements'; 
import MarkAttend from './MarkAttend';
import LeaveApprove from './LeaveApprove';
import FacultyChat from './FacultyChat';

const Tab = createBottomTabNavigator();

const FacultyMain = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#3e4095',  
        inactiveTintColor: 'gray',  
      }}
    >
      <Tab.Screen
        name="MakeAnnouncements"
        component={MakeAnnouncements}
        options={{
          tabBarLabel: 'Announcements',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-megaphone" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MarkAttendance"
        component={MarkAttend}
        options={{
          tabBarLabel: 'Mark Attendance',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-checkmark-circle" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="FacultyChat"
        component={FacultyChat}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-people" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="LeaveApprovals"
        component={LeaveApprove}
        options={{
          tabBarLabel: 'Leave Approvals',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-calendar" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default FacultyMain;
