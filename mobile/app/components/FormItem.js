
import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { Text, Button, Header, ListItem } from 'react-native-elements';


class FormItem extends Component {
    render(){
        return(<ListItem
            title={JSON.parse(this.props.form.Data).name} 
            bottomDivider
            onPress={ ()=> {
                this.props.navigation.navigate('FormDetail', { formData: this.props.form}); 
        }} />);
    }
}

export default FormItem