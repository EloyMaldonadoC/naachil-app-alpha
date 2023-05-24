import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";
import { db, storage } from "../utils/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const { width, height } = Dimensions.get("screen");

const JoinPickImage = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertRequest, setShowAlertRequest] = useState(false);

  const PickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });
    if (result.canceled === true) {
      setShowAlert(true);
      return;
    } else {
      setImage(result.assets[0].uri);
    }
  };
  const getAsyncStorage = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }
  const nextPage = () => {
    if(!image) {
      setShowAlertRequest(false);
      setShowAlert(true);
      return;
    }
    uploadImage();
    navigation.navigate('Join4')
  }

  const uploadImage = async () => {
    //Convierte imagen a blob
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request error: " + xhr.response));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    //crea metadata de la imagen
    const metadata = {
      contentType: "image/jpeg",
    };
    //sube la imagen al almacenamiento
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <SafeAreaProvider>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.component}>
          <Text style={styles.textHeader}>
            Selecciona una imagen para encabezado
          </Text>
          <Text style={styles.textDesc}>
            La imagen seleccionada se mostrara en la portada de tu local.
          </Text>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.button} onPress={() => PickImage()}>
            <Text style={styles.textButton}>Seleccionar</Text>
          </TouchableOpacity>
          <View style={styles.container2}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowAlertRequest(true)}
            >
              <Text style={styles.textButton}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <AwesomeAlert
        show={showAlert}
        title="Campos no válidos"
        message="Selecciona una imagen "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#9E758D"
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
      <AwesomeAlert
        show={showAlertRequest}
        title="Advertencia"
        message="¿Quiere usar esta imagen como portada para su negocio?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Aceptar"
        cancelText="Cancelar"
        confirmButtonColor="#9E758D"
        cancelButtonTextStyle={{color: "#000000", fontWeight: "bold"}}
        confirmButtonTextStyle={{color: "#FFFFFF", fontWeight: "bold"}}
        onConfirmPressed={() => {
          nextPage()
        }}
        onCancelPressed={ () => {
          setShowAlertRequest(false)
        }}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  component: {
    width: "92%",
    height: "91%",
    margin: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00000",
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
  button: {
    backgroundColor: "#9E758D",
    margin: 8,
    width: "auto",
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  image: {
    width: 350,
    height: 150,
    margin: 8,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textDesc: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  container2: {
    marginTop: 30,
    marginRight: 8,
    width: "100%",
    alignItems: "flex-end",
  },
});

export default JoinPickImage;
