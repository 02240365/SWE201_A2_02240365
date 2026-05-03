import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';
import AnimationDemoScreen from '../screens/AnimationDemoScreen';
import { Colors } from '../theme/colors';

export type RootStackParamList = {
  MainTabs: undefined;
  Detail: { taskId: string };
  AnimationDemo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: '600',
        },
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Task Details' }}
      />
      <Stack.Screen
        name="AnimationDemo"
        component={AnimationDemoScreen}
        options={{ title: 'Animation Demo' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;