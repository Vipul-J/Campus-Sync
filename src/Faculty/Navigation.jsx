// screens/FacultyScreen.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import MakeAnnouncements from './MakeAnnouncements';
  import MarkAttend from './MarkAttend';
import MarkInternal from './MarkInternal';
import LeaveApprove from './LeaveApprove';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MakeAnnouncements"
        component={MakeAnnouncements}
        options={{
          tabBarLabel: 'Announcements',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-megaphone" size={size} color={color} />
          ),
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
        }}
      />
      <Tab.Screen
        name="IAMarks"
        component={MarkInternal}
        options={{
          tabBarLabel: 'IA Marks',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-analytics" size={size} color={color} />
          ),
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
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
