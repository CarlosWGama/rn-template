import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { AppMain, AppContainer } from '../../themes/theme'; 
import { useNavigation } from '@react-navigation/native';

export function MainScreen () {

    const nav = useNavigation();

    return (
      <AppMain>
        <Text>Opções:</Text>
        <Button title="Formulário" onPress={() => nav.navigate("formulario")}/>
      </AppMain>
    );
}