import AsyncStorage from "@react-native-community/async-storage";
import { Usuario } from "../models/usuario";
import api, { autenticado, getErroMsg, limpaObjeto } from "./api.service";

/** Service que controla o acesso aos dados do usuário */
const UsuarioService = {

    /** Realiza o login do usuário */
    login: async (email: string, senha: string): Promise<{sucesso: boolean, usuario?:any}> => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (email == 'teste@teste.com' && senha == '123456')
                    resolve({sucesso:true, usuario:{email: 'teste@teste.com', id: 1}})
                resolve({sucesso: false});
            }, 1000) 
            
        })

        try {
            const response = await api.post('/login', {email, senha});
            if (response.status == 200) {
                AsyncStorage.setItem('jwt', response.data.jwt);
                const usuario = Object.assign({} as Usuario, response.data.usuario);
                AsyncStorage.setItem('usuario', JSON.stringify(usuario));
                return {sucesso: true, usuario }
            }
            return {sucesso: false}
        } catch (erro) {
            return {sucesso: false}
        } 
         
    },

    /** Cadastra um usuário */
    cadastrar: async (usuario): Promise<{sucesso: boolean, erro?:string, usuario?: Usuario}> => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (usuario.email != 'teste@teste.com')
                    resolve({sucesso: true})
                else resolve({sucesso: false, erro: 'Usuário já cadastrado'});
            }, 1000) 
            
        })

        try {
            const response = await api.post('/usuarios', {usuario})
            if (response.status == 201)
                return {sucesso: true}
            return {sucesso: false}
        } catch(erro) {
            return {sucesso: false, erro:getErroMsg(erro)};
        }
    },

     /** Atualiza o perfil do usuário */  
     editar: async (usuario: Usuario): Promise<{sucesso: boolean, erro?:string}> => {
        const api = await autenticado();
        try {
            usuario = await limpaObjeto(usuario);
            const response = await api.put('/usuarios', {usuario})
            return {sucesso: true}
        } catch(erro) {
            console.log(erro);
            return {sucesso: false, erro:getErroMsg(erro)}
        }
    },

    /** Desloga o usuário */
    logout: () => {

        AsyncStorage.clear()
    }
}



export default UsuarioService;