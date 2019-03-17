import { StatusBar } from 'react-native';
import List from './screens/List';
import Detail from './screens/Detail';
import { createStackNavigator, createAppContainer } from 'react-navigation';

StatusBar.setBarStyle('light-content');

const RootNavigator = createStackNavigator ({
  List: List,
  Detail: Detail,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#68aa63',
    },
    headerTintColor: 'white',
  }
});

export default createAppContainer(RootNavigator)