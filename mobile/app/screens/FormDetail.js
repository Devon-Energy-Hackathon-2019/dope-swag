
import React, { Component } from 'react';
import { ScrollView, View, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { Text, Button, Header, ListItem } from 'react-native-elements';
import AdaptiveCard from 'react-native-adaptivecards';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { sendForms } from '../services/FormService';

class FormDetail extends Component {
    static navigationOptions = {
        title: 'Form Detail',
      };

    render(){
        return(
            <ScrollView>
                <AdaptiveCard adaptiveCard={JSON.parse(this.props.currentForm.Data).card} 
                    onSubmit={(data)=>this.props.sendCurrentForm(this.props.currentForm, data)}/>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state, props) => ({
    currentForm: props.navigation.state.params.formData
})

const mapDispatchToProps = dispatch => bindActionCreators({
    sendCurrentForm: sendForms 
}, dispatch)

export default connect(
    mapStateToProps, mapDispatchToProps
)( FormDetail );


