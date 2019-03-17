import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { WebBrowser } from 'expo';
import FilmDetail from '../components/FilmDetail'

class Detail extends Component {
    static navigationOptions = ({navigation}) => {
        const {name, imdbUrl } = navigation.getParam('film');

        return {
            title: name,
            headerRight: (
                <TouchableOpacity onPress={ () => WebBrowser.openBrowserAsync (imdbUrl)}>
                    <AntDesign 
                    name="rightcircleo" 
                    size={32} color="white" 
                    style={styles.icon}>
                    </AntDesign>
                </TouchableOpacity>
            )
        }
    };
    
    render() {
        const {film} = this.props.navigation.state.params;
        return <FilmDetail film={film} />;
    }
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 10,
    },
});

export default Detail;