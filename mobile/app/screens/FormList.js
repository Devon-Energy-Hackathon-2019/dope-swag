import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { Text, Button, Header, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { getForms, getFormsLoading, getFormsError } from '../reducers/modules/FormReducer';
import { fetchForms } from '../services/FormService';
import FormItem  from '../components/FormItem'
// import DispatchListItem from '../components/DispatchListItem'


class FormList extends Component {
    static navigationOptions = {
      title: 'Forms'
    };

    render() {
      return (  
        <View>
          <View style= {styles.outer}>
            <Button
              title = "Get Forms"
              onPress = { this.props.fetchFormsAction } /> 
          </View>
          <FlatList style={{marginBottom: 45}}
            data = { this.props.forms }
            keyExtractor={item => item.RowKey}
            renderItem={
                ({item}) => <FormItem navigation={ this.props.navigation } form={item} />
            }
          />
        </View>
      );
    };
}
  
  
const mapStateToProps = state => ({
  forms: getForms(state.FormReducer)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchFormsAction: fetchForms
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( FormList );

const styles = StyleSheet.create({
  outer: {justifyContent: "center", alignItems: "center" }
});