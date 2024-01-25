import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import RoleSelect from './src/Admin/AdminScreens/RoleSelect';
import FacultyMain from './src/Faculty/FacultyMain';
import StudMain from './src/Students/StudMain';

// Add these lines for YourScreen and RoleSelectionScreen
import Splash from './src/Admin/Splash';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="RoleSelection" component={RoleSelect} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainApp = ({ route }) => {
  const { screen } = route.params || { screen: 'Faculty' };

  if (screen === 'Faculty') {
    return <FacultyMain />;
  } else if (screen === 'StudMain') {
    return <StudMain />;
  }

  return null;
};

export default App;
