import React from 'react'
import {StyleSheet,View,Text,Image} from 'react-native'

const Clima = ({resultado}) => {
    
    const {name,main} = resultado
    //Grados kelvin 
   

    if(!name) return null;

    const kelvin = 273.15 // grados kevin 
    const temperatura = main.temp
    const temperaturaCentidrados = temperatura - kelvin // transformaciona grados centigrados
    return(
        <>
        <View style={styles.clima}>
            <Text style={[styles.texto, styles.actual]}>
                {parseInt(temperaturaCentidrados)}
                <Text style={styles.centigrados}>&#x2103;</Text>
                <Image 
                style={styles.imagen}
                source={{uri: `https://openweathermap.org/img/wn/${resultado.weather[0].icon}.png`}}
                />
            </Text>

            <View style={styles.temperaturas}>
                <Text style={styles.texto}> Min {' '}
                    <Text style={styles.centigrados}>
                        {parseInt(main.temp_min - kelvin)} &#x2103;
                    </Text>
                </Text>

                <Text style={styles.texto}> Max {' '}
                    <Text style={styles.centigrados}>
                        {parseInt(main.temp_max - kelvin)} &#x2103;
                    </Text>
                </Text>

            </View>
           
        </View>
        </>
    )
}

const styles = StyleSheet.create({
clima:{
    marginBottom:20
},
texto:{
    color:'white',
    fontSize:20,
    textAlign:'center',
    marginRight:4,
    marginLeft:4
    
},
actual:{
    fontSize:80,
    fontWeight:'bold'
},
centigrados:{
    fontSize:24,
    fontWeight:"normal",

},
imagen:{    
    width:66,
    height:58

},
temperaturas:{
    flexDirection:"row", //Cambiamos la direcion a horizontal
    justifyContent:'center' //Centramos el texto 
}
})


export default Clima;