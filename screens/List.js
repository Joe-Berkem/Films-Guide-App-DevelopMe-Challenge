import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableHighlight } from 'react-native';
import axios from 'axios';
import FilmsLoading from '../components/FilmsLoading';
import moment from 'moment';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            films: [],
            fetchingData: false,
          }

        this.onPress = this.onPress.bind(this);
        this.renderSeparator = this.renderSeparator.bind(this);
        this.keyExtractor = this.keyExtractor.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }
    
    static navigationOptions = {
        title: 'Films on Freeview',
        headerStyle: {
            backgroundColor: '#68aa63',
        },
        headerTintColor: 'white',
    }

    keyExtractor(item, index) {
        return `${index}`;
    }

    renderSeparator() {
        const style = { height: 1, backgroundColor: '#ddd', marginLeft: 10 };
        return <View style={style} />;
    }

    onPress(item) {
        this.props.navigation.navigate('Detail', {
            film: item
        });
    }

    refreshData() {
        this.setState({fetchingData: true});
        this.fetchData()
      }

    fetchData() {
        let promise = axios.get("https://filmsonfreeview.herokuapp.com/api/films");
    
        promise.then(response => {
          this.setState({films: response.data, fetchingData: false});
        })
    } 

    renderItem({item}) {
        return (
            <TouchableHighlight onPress={ () => this.onPress(item)} underlaycolor='e4e4e4'>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.filmTitle}>{item.name}</Text>
                        <Text style={styles.filmText}>{moment(`${item.showtimes[0].startsAtDate} ${item.showtimes[0].startsAtTime}`, 'YYYY-MM-DD HH:mm').calendar()} on {item.showtimes[0].channel}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        {!!item.tmdbRating && 
                            (<Text style={styles.ratingText}>{item.tmdbRating}%</Text>
                        )}
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        if (this.state.fetchingData) {
            return <FilmsLoading />;
        }
        return (
            <FlatList 
            onRefresh={this.refreshData} 
            refreshing={false} 
            data={this.state.films} 
            renderItem={this.renderItem} 
            keyExtractor={this.keyExtractor} 
            ItemSeparatorComponent={this.renderSeparator}>
            </FlatList>
        )
    }
    
    componentDidMount() {
        this.setState({ fetchingData: true });
        this.fetchData()
    }  
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        marginHorizontal: 15,
        marginVertical: 15,
        maxWidth: '75%',
    },
    filmTitle: {
        fontSize: 18,
    },
    filmText: {
        marginVertical: 5,
    },
    ratingContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 15,
    },
    ratingText: {
        fontSize: 18,
    }
});

export default List;