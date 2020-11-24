import React,{useState,useEffect} from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableWithoutFeedback,Keyboard, Alert} from 'react-native';
// Importando componenetes
import Formulario from './components/formulario'
import Clima from './components/clima'



const App = () => {

  const [busqueda,setBusqueda] = useState({
    ciudad:'',
    pais:''
  })

  const [consultar, setConsultar] = useState(false)
  const [resultado,setResultado] = useState({})
  const [bgColor,setBgColor] = useState('rgb(71,149,212)')
  useEffect(() =>{
    const consultarApi = async ()=>{
      if(consultar){

        const {ciudad,pais} = busqueda //Sacar el array a las variables 
        //Consultando api 
        const apiKey= 'a41ae5b47beed4613c831e6ca811d57c' // Api Key obtennido en la pagina de la api del clima 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`
      
      
        const respuesta = await fetch(url);
        const resultado = await respuesta.json()
        if(resultado.cod === '404'){
          Alert.alert(
            'Error',
            'No se obtuvieron datos',
            [{text:'Entendido'}]
          )
          setConsultar(false)

        }else{
          setResultado(resultado)
          console.log(resultado)

           //Modifica color bg segun temperatura
           const kelvin = 273.15
           const {main} = resultado 
           const actual = main.temp - kelvin 

           if(actual <= 10){
             setBgColor('#BFC6C6')
           }else if( actual > 10 && actual < 25){
             setBgColor('#83D2CC')
           }else{
             setBgColor('#BC3C09')
           }
          setConsultar(false)
        }
        
      }
    }
    consultarApi()
  },[consultar])

  const bgColorApp={
    backgroundColor:bgColor
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima 
            resultado={resultado}
            />
            <Formulario 
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            setConsultar={setConsultar} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center' //Colaca el contenido en la mitad de la app


  },
  contenido: {
    marginHorizontal: '3.5%'
  }
});

export default App;
