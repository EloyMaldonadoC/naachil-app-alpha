import React, { useEffect, useState, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput,
  Dimensions,
  Animated,
  ScrollView
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, } from "react-native-maps";
import *as Location from "expo-location";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from "../utils/firebaseConfig";
import { ref, set } from 'firebase/database';


const {width, height} = Dimensions.get('screen');

//BackHandler.addEventListener('hardwareBackPress', function(){return true;});
//BackHandler.removeEventListener("hardwareBackPress");

const JoinBusiness3 = () => {

  const navigation = useNavigation();

  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState('');
  const [town, setTown] = React.useState('');
  const [townShip, setTownShip] = React.useState('');
  const [addressStreet, setAddressStreet] = React.useState('');
  const [stateLocation, setStateLocation] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  const getAsyncStorage = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
    } catch (e) {
      console.error(e);
    }
  }
  function writeLocalData(userId){
    set(ref(db, 'bussines/'+userId),{
      name: getAsyncStorage('@name'),
      description: getAsyncStorage('@Descrip'),
      photoHeader: getAsyncStorage('@photoHeader'),
    })
  }

  function writeAddressData(userId, country, state, town, addressStreet) {
    set(ref(db, 'business/' + userId + '/Address'), {
      Addres1: addressStreet,
      country: country,
      state: state,
      twon: town,
      townShip: townShip
    });
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@Address', JSON.stringify(value));
    }catch (e){
      console.log(e)
    }
  }
  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('@Address');
      alert(data)
    }catch(e) {
      console.log(e)
    }
  }

  function createDataUbication(stateLocation, country, state, town, townShip, addressStreet){
    //alert(country + ' ' + state + ' ' + town + ' ' + townShip + ' ' + addressStreet)
    if(stateLocation === false ||country === '' || state === '' || town === '' || townShip === '' || addressStreet === ''){
      setShowAlert(true);
      return;
    }
    else{
      const address = {
        coutry: country,
        state: state,
        town: town,
        township: townShip,
        addressStreet: addressStreet,
      }
      storeData(address)
      getData()
      navigation.navigate("Join4")
      console.log(address);
    }
  }

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.09,
    longitudeDelta: 0.04
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const startLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted' ) {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04
    });
    setStateLocation(true);
  }
  
  return (
    <ScrollView>
      <StatusBar/>
      <View style={styles.bar}></View>
      <View style={styles.container}>
        <View style={styles.component1}>
          <Text style={styles.textHeader}> ¿Dondé se encuentra tu local? </Text>
          <Text style={styles.textDesc}>Coloca en el mapa la localización de tu local,
          es recomendable estar en el local, despues agrega tu dirección.</Text>
          { location.latitude ? (<MapView 
            style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}
            initialRegion={location}
            onPress={(evento) => setLocation(evento.nativeEvent.coordinate)}
          >
            <Marker
              coordinate={location}
              draggable
              onDragEnd={(direction) => setLocation(direction.nativeEvent.coordinate)}
              title="Ubicación seleccionada"
            />
          </MapView>) : 
          (<TouchableOpacity 
            style={styles.button}
            onPress={startLocation}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Selecciona la Ubicación</Text>
          </TouchableOpacity>)
          }

          <Text style={styles.textLabel}>Nombre del País</Text>
          <TextInput 
            style={styles.textInput} 
            onChangeText={coutry  => setCountry(coutry)}
            value={country}
            placeholder="Nombre del País"
          />
          <Text style={styles.textLabel}>Nombre del Estado</Text>
          <TextInput 
            style={styles.textInput} 
            onChangeText={state  => setState(state)}
            value={state}
            placeholder="Nombre de el Estado"
          />
          <Text style={styles.textLabel}>Nombre de el Municipio</Text>
          <TextInput 
            style={styles.textInput} 
            onChangeText={town  => setTown(town)}
            value={town}
            placeholder="Nombre de el Municipio"
          />
          <Text style={styles.textLabel}>Nombre de la Ciudad o Localidad</Text>
          <TextInput 
            style={styles.textInput} 
            onChangeText={townShip  => setTownShip(townShip)}
            value={townShip}
            placeholder="Nombre de la Ciudad o localidad"
          />
          <Text style={styles.textLabel}>Dirección de la Calle</Text>
          <TextInput 
            style={styles.textInput} 
            onChangeText={addressStreet  => setAddressStreet(addressStreet)}
            value={addressStreet}
            placeholder="Dirección de la Calle"
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={() => createDataUbication(stateLocation, country, state, town, townShip, addressStreet)}
          >
            <Text style={{color: 'white', fontWeight: 'bold'}}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View> 
      <AwesomeAlert
        show={showAlert}
        title="Campos no válidos"
        message="Aún no ha introducido todos los datos"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#9E758D"
        onConfirmPressed={ () => { setShowAlert(false) }}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  bar: {
    width: width,
    height: 24
  },
  container: {
    width: width,
    height: 'auto',
    alignItems: 'center'
  },
  textHeader: {
    fontSize: 24,
    alignSelf: 'center',
    marginTop:'10%',
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
  textLabel: {
    fontSize: 16,
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
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
    borderWidth:0.3,
    padding: 10,
    borderRadius: 8,
  },
  component1: {
    width: '92%',
    height: 920,
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
  },
  map: {
    width: '92%',
    height: '20%',
    alignSelf: 'center',
    borderRadius: 8,
    margin: 16
  }
});

export default JoinBusiness3;
