import React from 'react';
import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import moment from 'moment';

const FilmDetail = ({ film }) => {

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
                <Text style={styles.smallText}>{moment(`${film.showtimes[0].startsAtDate} ${film.showtimes[0].startsAtTime}`, 'YYYY-MM-DD HH:mm').calendar()} on {film.showtimes[0].channel}</Text>
            </View>
            <View style={styles.lineBreak}></View>
            <View>
                <Text style={styles.smallText}>{film.synopsis}</Text>
            </View>
        </View>
    </ScrollView>
    )
}
export default FilmDetail;


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
        paddingVertical: 5,
        },
    smallText: {
        fontSize: 14,
        paddingVertical: 5,
        },
    releaseRating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    lineBreak:{
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        width: '100%',
        marginVertical: 15, 
    }
});