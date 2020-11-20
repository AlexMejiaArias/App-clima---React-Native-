import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableWithoutFeedback,Keyboard} from 'react-native';
// Importando componenetes
import Formulario from './components/formulario'

const App = () => {
  return (
    <>
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.app}>
          <View style={styles.contenido}>
            <Formulario />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'rgb(71,149,212)',
    justifyContent: 'center' //Colaca el contenido en la mitad de la app


  },
  contenido: {
    marginHorizontal: '3.5%'
  }
});

export default App;
