import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ActivityIndicator, Platform, ToastAndroid, Image } from 'react-native';
import { AppMain, AppHeader, AppContainer, AppInput, AppButton } from '../../themes/theme'; 
import { Formik } from 'formik';
import * as Yup from 'yup';
import UsuarioService from '../../services/usuario.service';
import { useNavigation } from '@react-navigation/native';
import { Toast } from '../../global/helpers';

export function FormularioScreen () {

    // //Cadastra o usuário
    const [erro, setErro] = React.useState<string|null>(null);
    const nav = useNavigation()

    const cadastrar = async (dados, {resetForm}) => {
        setErro(null);
        const resposta = await UsuarioService.cadastrar(dados);
        if (resposta.sucesso) {
            resetForm({});
            Toast("Usuário cadastrado com sucesso")
            nav.navigate('main')
        } else {
            setErro(String(resposta.erro))
        }
    }

    //View
    return (
      <AppMain horizontalAlign="stretch">
        <AppHeader titulo="Cadastro de usuário" backButton/>

        <AppContainer horizontalAlign="stretch" verticalAlign="flex-start">
 
            <Formik
                //Dados iniciais 
                initialValues={{nome: '', email: '', senha: ''}}
                // Validação de formulário
                validationSchema={Yup.object().shape({
                    nome: Yup.string().required('Nome obrigatório'),
                    email: Yup.string().required('Email obrigatório').email('Email inválido').required('Email obrigatório'),
                    senha: Yup.string().required('Senha obrigatória').min(6, 'Pelo menos 6 caractetes')
                })}
                //Envio
                onSubmit={cadastrar}
            >
                {({errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting}) => (
                    <View style={style.formulario}>
                        <Text style={style.titulo}>Cadastro de Usuário</Text>

                        {/* NOME */}
                        <AppInput titulo="Nome" touched={touched.nome} error={errors.nome}>
                            <TextInput 
                                placeholder="Digite seu nome"
                                onBlur={handleBlur('nome')} 
                                onChangeText={handleChange('nome')} />
                        </AppInput>
                        {/* EMAIL */}
                        <AppInput titulo="Email" touched={touched.email} error={errors.email}>
                            <TextInput 
                                keyboardType="email-address"
                                placeholder="Digite seu Email"
                                onBlur={handleBlur('email')} 
                                onChangeText={handleChange('email')} />
                        </AppInput>

                        {/* SENHA */}
                        <AppInput titulo="Senha" touched={touched.senha} error={errors.senha} noBorder>
                            <TextInput 
                                placeholder="Digite sua senha"
                                secureTextEntry
                                onBlur={handleBlur('senha')} 
                                onChangeText={handleChange('senha')} />
                        </AppInput>
                        {/* Botão */}
                        { erro && <Text style={style.erro}>{erro}</Text>}
                        { isSubmitting && <ActivityIndicator />}
                        { !isSubmitting && <AppButton title="Cadastrar" onPress={handleSubmit}/>}

                    </View>
                )}
            </Formik>
        </AppContainer>



      </AppMain>
    );
}

const style = StyleSheet.create({
    formulario: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    imgBG: {width:'100%', height:'100%', elevation:-1, position: 'absolute'},
    titulo: { textAlign: "center", fontSize: 20},
    erro: { textAlign: 'center', color: 'red', textTransform: 'uppercase', fontSize: 20}
})

