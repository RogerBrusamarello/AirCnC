import React, { useState, useEffect } from 'react';
import {
    View, AsyncStorage,
    KeyboardAvoidingView, Text, /*Platform,*/ TextInput,
    Image, StyleSheet, TouchableOpacity
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

//o navigation é uma função para poder utilizar as rotas, NAVEGANDO entre telas
export default function Login({ navigation }) {

    //Estados, são tipo variaveis e metodos
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    //Verifica se o usuário ja se logou, utilizando o banco local
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            //verifica e joga diretamente para o list sem passar pelo login
            if (user) {
                navigation.navigate('List'); 
            }
        });
    }, [])

    async function handleSubmit() {
        //email, techs
        //salva no Banco usando a api
        const response = await api.post('/sessions', {
            email
        })

        //Guarda o id em uma variavel
        const { _id } = response.data;

        // Salva no celular o usuario e as tecnologias
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        //Redireciona o usuario para a pagina list
        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView  /*enabled={Platform.OS === 'ios' }*/ behavior="padding" style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}>SEU EMAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu melhor e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar Spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});