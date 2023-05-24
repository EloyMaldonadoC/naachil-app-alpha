import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput,
  Dimensions
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('screen');

const JoinBusiness = () => {

  const navigation = useNavigation();

  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@name', value);
    }catch (e){
      console.log(e)
    }
  }
  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('@name');
      alert(data)
    }catch(e) {
      console.log(e)
    }
  }

  function createDateName(text){
    if(text === ''){
      setShowAlert(true);
      return;
    }
    else{
      storeData(text)
      getData()
      navigation.navigate('Join2');
    }
  }

  return (
    <SafeAreaView>
      <StatusBar/>
      <View style={styles.bar}></View>
      <View style={styles.container}>
        <View style={styles.component1}>
          <Text style={styles.textHeader}> Bienvenido a Naáchil </Text>
          <Text style={styles.textDesc}>Para poder unirte a nuestros socios, ¿Cuál es el nombre de tu empresa o emprendimiento?</Text>
          <TextInput 
            style={styles.textInput} 
            onChangeText={text => onChangeText(text)}
            value={text}
            placeholder="Nombre de la Empresa"
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={() => createDateName(text)}
          >
            <Text style={{color: 'white', fontWeight: 'bold'}}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View> 
      <AwesomeAlert
        show={showAlert}
        title="Campos no válidos"
        message="Aún no ha introducido el nombre del local o empresa"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#9E758D"
        onConfirmPressed={ () => { setShowAlert(false) }}
      />
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  bar: {
    width: width,
    height: 24
  },
  container: {
    width: width,
    height: height,
    alignItems: 'center'
  },
  textHeader: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop:'60%',
    marginRight: 16,
    marginLeft: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  textDesc: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
    marginRight: 16,
    marginLeft: 16,
  },
  button: {
    backgroundColor: '#9E758D',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 8,
    width: 'auto',
    alignSelf: 'center',
    borderRadius: 8,
  },
  textInput:{
    height: 40,
    margin: 16,
    borderWidth:0.3,
    padding: 10,
    borderRadius: 8,
  },
  component1: {
    width: '92%',
    height: '91%',
    margin: 8,
    padding: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  }
});

export default JoinBusiness;
