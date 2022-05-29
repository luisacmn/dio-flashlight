import React, { useState, useEffect } from "react"
import {View, StyleSheet, Image, TouchableOpacity} from "react-native"
import Torch from "react-native-torch";
import RNShake from "react-native-shake"

const App =() =>{
  const [toggle, setToggle] = useState(false);      //começa com estado falso

  const handlePress = () => {
    return setToggle((prevState) => !prevState)
  }

  //atualizar o estado da lanterna
  useEffect(()=>{
    Torch.switchState(toggle);
  }, [toggle])

  //quando o celular for chacoalhado, mudaremos o toggle
  useEffect(()=>{
    const subscription = RNShake.addListener(()=>{
      setToggle(prevState => !prevState)
    })
    return subscription.remove();
  },[])

  return (  
    //Quando apertar em qualquer uma das imagens, retorna o estado oposto do anterior. O estilo é aplicado de acordo com o estado (true or false)
    <View style={toggle? style.containerLight : style.container}>  
      <TouchableOpacity onPress={handlePress}>  
        <Image       
          style={toggle? style.lightingOn : style.lightingOff}
          source={toggle ? require("./assets/icons/eco-light.png") : require("./assets/icons/eco-light-off.png")}
        />
        <Image 
          style={style.dioLogo}
          source={toggle ? require("./assets/icons/logo-dio.png") : require("./assets/icons/logo-dio-white.png")}
        />
      </TouchableOpacity>
    </View>
  ) 

}

export default App;

//criar um objeto de estilo, que será utilizado no View (body do app)
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLight: {
    flex:1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  lightingOn: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 150, 
    height: 150,
  },
  lightingOff: {
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: "white",
    width: 150, 
    height: 150,
  },
  dioLogo: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 200, 
    height: 200,
  },
})