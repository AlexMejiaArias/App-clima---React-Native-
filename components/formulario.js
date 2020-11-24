import React,{useState} from 'react'
import {Alert,StyleSheet, Text, TextInput, View, TouchableWithoutFeedback,Animated} from 'react-native'
import {Picker} from '@react-native-community/picker'

const Formulario = ({busqueda,setBusqueda,setConsultar}) => {

    


       //Funcion para consultar clima 

       const consultarClima = () =>{
        console.log(busqueda)
        if(busqueda.pais === '' || busqueda.ciudad   === ''){
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios',
                [{text:"Entendido"}]
            )
            return;
        }else{
            setConsultar(true)
        }
    }

    const[animacionBoton,] = useState(new Animated.Value(1))//1 viene hacer el valor de incio


    const animacionEntrada = () => {
        Animated.spring(animacionBoton, { 
            toValue: .75,
            useNativeDriver: true
        }).start();
    }
    const animacionSalida = () => {
        Animated.spring(animacionBoton, { 
            toValue: 1, //Donde finaliza
            friction:1, //Es efecto de rebote 
            tension: 50,//Mientras meenor sea el numero mas suave es el movimeinto 
            useNativeDriver: true
        }).start();
    }

    const estiloAnimacion = {
        transform:[{ scale: animacionBoton}]
    }
    return (
        <>
            <View styles={styles.formulario}>
                <View> 
                    <TextInput 
                    onChangeText={ciudad => setBusqueda({pais:busqueda.pais,ciudad:ciudad})} 
                    value={busqueda.ciudad}
                    style={styles.input}
                    placeholder="Ingrese una ciudad"
                    placeholderTextColor='#666'
                    />
                </View>
                <View> 
                    <Picker style={styles.picker}
                    selectedValue={busqueda.pais}
                    onValueChange={pais => setBusqueda({ciudad:busqueda.ciudad,pais:pais})}>
                        <Picker.Item label="Seleccione un  pais" value=""/>
                        <Picker.Item label="Estados Unidos " value="US"/>
                        <Picker.Item label="Mexico" value="MX"/>
                        <Picker.Item label="Argentina" value="AR"/>
                        <Picker.Item label="Colombia" value="CO"/>
                        <Picker.Item label="España" value="ES"/>
                        <Picker.Item label="Ecuador" value="EC"/>

                    </Picker>
                </View>

                <TouchableWithoutFeedback
                    onPressIn={ ()=> animacionEntrada() } // Se ejecuta cuando mantenemos presionado el boton 
                    onPressOut={ ()=> animacionSalida() } //Se ejecuta cuando dejamos de presionar el boton 
                    onPress={ ()=> consultarClima()}
                >
                
                    <Animated.View style={[styles.btnBuscar, estiloAnimacion]} >
                        <Text style={styles.textBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    input:{
        padding:10,
        backgroundColor: 'white',
        fontSize:20,
        borderRadius:10,
        marginVertical:10,
        textAlign:'center'
    },
    picker:{
       
        marginVertical:10,
        backgroundColor:'white',
    },
    btnBuscar:{
        marginVertical:10,
        backgroundColor:'black'

    },
    textBuscar:{
        color:'white',
        textAlign:"center",
        padding:10,
        fontSize:19,
        fontWeight:'bold',
        textTransform: "uppercase"
        
    }
})

export default Formulario;