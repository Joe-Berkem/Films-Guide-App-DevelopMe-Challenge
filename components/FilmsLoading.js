
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const FilmsLoading  = () => {
      return (
         <View style = {styles.container}>
            <ActivityIndicator
               color = '#68aa63'
               size = "large"
               style = {styles.activityIndicator}/>
         </View>
      )
}

export default FilmsLoading;

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 50
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
})