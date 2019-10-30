import React, { Component } from 'react';
import { Badge, withBadge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import FormList from './screens/FormList'
import FormDetail from './screens/FormDetail'
//fake in a badge for the dispatches

const stackNavStyle = {
    headerStyle: {
       backgroundColor:"#616161"
    },
    headerTintColor: '#DDD',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
};

//dispatches
const formDataStack = createStackNavigator({
    ListOfForms: {screen: FormList},
    FormDetail: {screen: FormDetail}
}, {
    initialRouteName: 'ListOfForms',
    defaultNavigationOptions: stackNavStyle,
    navigationOptions: {
        title: 'Forms',
        tabBarIcon: <Icon name='form' size={20} />
    }
});


//bottom tabs
const TabScreens = createBottomTabNavigator({
    Form: formDataStack,
}, {
    tabBarOptions: {

    }
})

//final app container
export default createAppContainer(TabScreens);