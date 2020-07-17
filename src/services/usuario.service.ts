/** Service que controla o acesso aos dados do usuário */
const UsuarioService = {

    /** Realiza o login do usuário */
    login: (email: string, senha: string): Promise<{sucesso: boolean, usuario?:any}> => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (email == 'teste@teste.com' && senha == '123456')
                    resolve({sucesso:true, usuario:{email: 'teste@teste.com', id: 1}})
                resolve({sucesso: false});
            }, 1000) 
            
        })
         
    },

    /** Cadastra um usuário */
    cadastrar: (dados): Promise<{sucesso: boolean, erro?:string}> => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (dados.email != 'teste@teste.com')
                    resolve({sucesso: true})
                else resolve({sucesso: false, erro: 'Usuário já cadastrado'});
            }, 1000) 
            
        })
    },

    /** Desloga o usuário */
    logout: () => {

    }
}



export default UsuarioService;