import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, View, Alert, Platform, StatusBar, Image, AsyncStorage, StyleSheet } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
    //Estados, são tipo variaveis e metodos
    const [techs, setTechs] = useState([]);

    useEffect(() => {

        //Pega o usuario do cliente pelo socket
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.1.112:3333',{
                query: { user_id }
            })
            
            //Manda a mensagem para o usuario com os dados da resposta
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
                console.log(booking.approved);
            });
            
        })
    }, []);

    useEffect(() => {
        //pega as tecnologias que foram guardadas no localStorage(celular) e separa por vigula elas
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, [])

    return (
        //SAFEAREAVIEW é para ficar abaixo da statusbar
        <View style={styles.container}>
            <SafeAreaView style={styles.AndroidSafeArea}>
                <Image style={styles.logo} source={logo} />
                <ScrollView>
                    {/* FOR pegando todas as tecnologias, e colocando o componente SpotList */}
                    {techs.map(tech => <SpotList key={tech} tech={tech} />)}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },

    AndroidSafeArea: {
        //if para verificar se é android e corrigir o problema de ficar atras da statusbar
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
});