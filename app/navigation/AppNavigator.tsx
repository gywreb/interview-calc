import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalculatorMain from '../screens/CalculatorMain';
import CalculatorResult from '../screens/CalculatorResult';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="CalculatorMain"
        component={CalculatorMain}
        options={{title: 'Calculator'}}
      />
      <Tab.Screen name="CalculatorResult" component={CalculatorResult} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
