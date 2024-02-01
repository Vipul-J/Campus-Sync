// screens/StudMain.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  
 
import CheckAnnoucne from './CheckAnnoucne';
import CheckAttend from './CheckAttend';
 import LeaveApply from './LeaveApply';
import StudChat from './StudChat';

const Tab = createBottomTabNavigator();

const StudMain = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#3e4095', 
        inactiveTintColor: 'gray',  
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
        component={StudChat}
        options={{
          tabBarLabel: 'Cmommunity',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-people" size={size} color={color} />
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
