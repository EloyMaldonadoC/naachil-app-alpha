import React, { useState } from 'react';
import { SafeAreaView, View, Image, Button, Text, TouchableOpacity, StyleSheet, Dimensions, ImageComponent } from 'react-native';
import { Camera, getCameraPermissionsAsync, getPermissionsAsync } from 'expo-camera'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import *as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import AwesomeAlert from 'react-native-awesome-alerts';

const {width, height} = Dimensions.get('screen');

const JoinBusiness4 = () => {

    const [showAlert, setShowAlert] = useState(false);
    var [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const getPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se necesitan permisos para acceder a la galeria');
            return;
        }
        pickImage();
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,2.5],
            quality: 1,
        });
        if(result.canceled === true) {
            alert('no se selecciono una imagen')
            return;
        }
        const res = result.assets[0].uri
        console.log(result.assets[0].uri);
        setImage(res);
        console.log(image);
    }

    const cropImage = async () => {
        const manipResult = await manipulateAsync(image, 
            [{
                crop: {
                    originX: 0,
                    originY: 0,
                    width: 350,
                    height: 150,
                }
            }],{compress: 1, format: 'jpeg' });
    }

    return(
        <SafeAreaProvider>
            <StatusBar/>
            <View style={styles.container}>
                <View style={styles.component1}>
                    <Text style={styles.textHeader}>Selecciona una portada</Text>
                    <Text style={styles.textDesc}>La imagen seleccionada se mostrara en la portada de la vista previa de tu negocio</Text>
                    {image && <Image 
                        source={{
                            uri: image
                        }}
                        style={{
                            width: 350,
                            height: 150,
                            marginTop: 8,
                            marginBottom: 8,
                        }}
                    />}
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => getPermission()}
                    >
                        <Text style={{ color: "white", fontWeight: "bold" }}>Selecciona</Text>
                    </TouchableOpacity>
                    <View style={{alignItems: 'flex-end', width: '100%', marginTop: 56 }}>
                    <TouchableOpacity 
                        style={styles.buttonFinal}
                        onPress={() => console.log(image)}
                    >
                        <Text style={{ color: '#565656', fontWeight: 'bold' }}>Finalizar</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    bar: {
        width: width,
        height: 24
    },
    container: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    component1: {
        width: '92%',
        height: '91%',
        margin: 8,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
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
    button: {
        backgroundColor: "#9E758D",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        margin: 8,
        width: "auto",
        alignSelf: "center",
        borderRadius: 8,
      },
    buttonFinal: {
        backgroundColor: "#F4D80C",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        margin: 8,
        width: "auto",
        borderRadius: 8,
    },
    input: {
        height: 40,
        width: 252,
        margin: 8,
        borderWidth: 0.3,
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    textLabel: {
        fontSize: 16,
        marginTop: 8,
        marginBottom: 8,
        marginRight: 16,
        marginLeft: 16,
    },
    textHeader: {
        fontSize: 30,
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
});

export default JoinBusiness4;