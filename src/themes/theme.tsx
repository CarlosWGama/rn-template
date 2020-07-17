import React from 'react'
import styled from 'styled-components/native'
import * as Colors from './colors';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

export const AppMain: any = styled.View`
    flex: 1;
    background-color: #CDC9C9;
    align-items: ${(props:any) => props.horizontalAlign ?  props.horizontalAlign : 'center'};
    justify-content: ${(props:any) => props.verticalAlign ?  props.verticalAlign : 'center'};
`

export const AppContainer: any  = styled.View`
    margin-top: 80px;
    width: 100%;
    padding: 10px;
    flex: 1;
    align-items: ${(props:any) => props.horizontalAlign ?  props.horizontalAlign : 'center'};
    justify-content: ${(props:any) => props.verticalAlign ?  props.verticalAlign : 'center'};
`

export const AppTextError: any = styled.Text`
    color: red;
    text-align: right;
    margin-bottom: 10px
`

export const AppButton = (props: {title:string, onPress?:any, style?:any}) => (
    <View style={[{backgroundColor: Colors.PRIMARY, padding: 10, borderRadius: 5}, props.style]}>
        <TouchableOpacity onPress={() => props.onPress()}>
            <Text style={{color:'white', textAlign:'center'}}>{props.title}</Text>
        </TouchableOpacity>
    </View>
)

export const AppInput = (props: {titulo?: string, children:any, touched?:boolean, error?:string, noBorder?: boolean}) => (
    <View style={[{width:'100%', flexDirection:'column', justifyContent:'center', marginVertical:5, minHeight: 40}, (props.noBorder ? {} : {borderBottomWidth: 1, borderBottomColor: 'lightgrey'})]}>
        {/* CAMPO */}
        <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
            {props.titulo && <Text style={{width:100}}>{props.titulo}:</Text>}
            <View style={{flex:1, alignItems:'stretch'}}>{props.children}</View>
        </View>
        {/* ERRRO */}
        <View>
            {props.touched && props.error && <AppTextError>{props.error}</AppTextError>}
        </View>
    </View>
)

export const AppHeader = (props:{backButton?:boolean, backScreen?:string, titulo: string, extra?:any}) => {
    const nav = useNavigation()
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: 70,
            backgroundColor: Colors.SECONDARY,
            borderBottomStartRadius: 10,
            borderBottomEndRadius: 10
        }}>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', padding: 20}}>
                {/* Botão Voltar */}
                <View>
                    {(props.backButton || props.backScreen) &&
                        <TouchableOpacity onPress={() => {
                            (props.backScreen ? nav.navigate(props.backScreen) : nav.goBack())
                        }}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Ionicons name="ios-arrow-back" color="white" />
                                <Text style={{color:'white', marginLeft: 5}}>VOLTAR</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                {/* Título */}
                <View><Text style={{color:'white', textTransform: 'uppercase'}}>{props.titulo}</Text></View>
                {/* Botão Extras */}
                <View>{props.extra}</View>
            </View>
        </View>
    )
}