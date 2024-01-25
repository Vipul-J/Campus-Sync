// screens/StudMain.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo's vector icons
 
import CheckAnnoucne from './CheckAnnoucne';
import CheckAttend from './CheckAttend';
import CheckInternal from './CheckInternal';
import LeaveApply from './LeaveApply';

const Tab = createBottomTabNavigator();

const StudMain = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#3e4095', // Set the active tab icon color
        inactiveTintColor: 'gray', // Set the inactive tab icon color
      }}
    >
      <Tab.Screen
        name="Announcements"
        component={CheckAnnoucne}
        options={{
          tabBarLabel: 'Announcements',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-megaphone" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="TrackAttendance"
        component={CheckAttend}
        options={{
          tabBarLabel: 'Track Attendance',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-calendar" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CheckIAMarks"
        component={CheckInternal}
        options={{
          tabBarLabel: 'Check IA Marks',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-analytics" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ApplyForLeave"
        component={LeaveApply}
        options={{
          tabBarLabel: 'Apply for Leave',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-document" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default StudMain;
