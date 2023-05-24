import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('screen');

const LoginBusiness = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <SafeAreaProvider>
            <StatusBar/>
            <View style={styles.container}>
                <View style={styles.componentContainer}>
                    <Text style={styles.header}>Bienvenido al apartado de locales</Text>
                    <TextInput 
                        style={styles.label}
                        placeholder='Correo Electrónico'
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        autoCorrect={true}
                    />
                    <TextInput
                        style={styles.label}
                        placeholder='Contraseña'
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        secureTextEntry={true}
                        caretHidden={true}
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textButton}>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    componentContainer: {
        width: '92%',
        height: '92%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
        padding: 8,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 8,
        backgroundColor: '#FFFFFF'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 8
    },
    label: {
        width: 252,
        height: 40,
        margin: 8,
        borderWidth: 0.3,
        padding: 10,
        borderRadius: 8,
        fontSize: 16
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
    textButton: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    }
});

export default LoginBusiness;