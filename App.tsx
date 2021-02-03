import React, { useEffect, useState } from 'react';
import { UsuarioContextProvider } from './src/context/usuario.context';
import MainNavigation from './src/navigation';
import * as Updates from 'expo-updates';
import { LoadingScreen } from './src/screens/loading';

export default function App() {

    //Atualiza
    const [estaAtualizacao, setEstaAtualizacao] = useState(false);
    useEffect(() => {
      setEstaAtualizacao(true);
      //Busca por atualizações
      const update = async () => {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
          }
        } catch(e) {
          console.log(e)
        }
        setEstaAtualizacao(false);
      }
      update();
    }, [])
    
    //Fonte
    //let [fontsLoaded] = useFonts({Nunito_400Regular, Nunito_700Bold});
    //if (!fontsLoaded || estaAtualizacao) return <LoadingScreen />;
    if (estaAtualizacao) return <LoadingScreen />;
  
    return (
      <UsuarioContextProvider>
        <MainNavigation/>
      </UsuarioContextProvider>
    );
  }