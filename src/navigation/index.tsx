import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FormularioScreen } from '../screens/formulario';
import { MainScreen } from '../screens/main';

const Stack = createStackNavigator()

export default function MainNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen component={MainScreen} name="main"/>
                <Stack.Screen component={FormularioScreen} name="formulario"/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}