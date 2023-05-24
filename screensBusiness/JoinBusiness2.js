import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput,
  Dimensions,
  BackHandler
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width, height} = Dimensions.get('screen');

//BackHandler.addEventListener('hardwareBackPress', function(){return true;});
//BackHandler.removeEventListener("hardwareBackPress");

const JoinBusiness2 = () => {
  
  const navigation = useNavigation();

  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@Descrip', value);
    }catch (e){
      console.log(e)
    }
  }
  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('@Descrip');
      alert(data)
    }catch(e) {
      console.log(e)
    }
  }

  function createDataDescription(text){
    if(text === ''){
      setShowAlert(true)
      return;
    }
    else{
      storeData(text);
      getData()
      navigation.navigate('Join3');
    }
  }

  return (
    <SafeAreaView>
      <StatusBar/>
      <View style={styles.bar}></View>
      <View style={styles.container}>
        <View style={styles.component1}>
          <Text style={styles.textHeader}> Escribe una Descripción de tú Empresa </Text>
          <Text style={styles.textDesc}>Tu descripción debera de ser breve y concreta, no debe de exceder los 100 caracteres</Text>
          <TextInput 
            style={styles.textInput} 
            onChangeText={text => onChangeText(text)}
            value={text}
            placeholder="Nombre de la Empresa"
            multiline={true}
            numberOfLines={3}
            maxLength={100}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={() => createDataDescription(text)}
          >
            <Text style={{color: 'white', fontWeight: 'bold'}}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AwesomeAlert
        show={showAlert}
        title="Campos no válidos"
        message="Aún no ha introducido una description"
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
    fontSize: 24,
    alignSelf: 'center',
    marginTop:'60%',
    marginBottom: 8,
    marginRight: 16,
    marginLeft: 16,
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
    height: 80,
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

export default JoinBusiness2;
