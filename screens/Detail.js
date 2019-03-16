import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { WebBrowser } from 'expo';
import moment from 'moment';

class Detail extends Component {
    static navigationOptions = ({navigation}) => {
        const {name, imdbUrl } = navigation.getParam('film');

        return {
            title: name,
            headerRight: (
                <TouchableOpacity onPress={ () => WebBrowser.openBrowserAsync (imdbUrl)}>
                    <AntDesign name="rightcircleo" size={32} color="white" style={styles.icon}></AntDesign>
                </TouchableOpacity>
            )
        }
    };
    
    render() {
        const film = this.props.navigation.getParam('film');

        const source = `http://image.tmdb.org/t/p/w500/${film.tmdbImageId}.jpg`;
        const imageStyle = {
            height: 500,
            width: 340,
        };

        return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                {!!film.tmdbImageId && 
                    (<Image 
                        style={imageStyle} 
                        source={{uri: source}}>
                    </Image>
                    )}
            </View> 
            <View style={styles.textContainer}>
                <View style={styles.releaseRating}>
                    {!!film.year && 
                        (<Text style={styles.text}>Released in {film.year}</Text>
                        )}
                    {!!film.tmdbRating && 
                        (<Text style={styles.text}>Rating: {film.tmdbRating}%</Text>
                        )}
                </View>
            </View>
            <View style={styles.textContainer}>
                <View>
                    <Text style={styles.text}>Showtimes:</Text>
                    <Text style={styles.filmText}>{moment(`${film.showtimes[0].startsAtDate} ${film.showtimes[0].startsAtTime}`, 'YYYY-MM-DD HH:mm').calendar()} on {film.showtimes[0].channel}</Text>
                </View>
                <View style={styles.lineBreak}></View>
                <View>
                    <Text>{film.synopsis}</Text>
                </View>
            </View>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        },

    imageContainer: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        },

    textContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginHorizontal: 15,
        },
    text: {
        fontSize: 18,
        },
    releaseRating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    icon: {
        marginRight: 10,
    },
    lineBreak:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '100%',
        marginVertical: 15, 
    }
});

export default Detail;