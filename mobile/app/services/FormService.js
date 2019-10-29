import { fetchFormsStart, fetchFormsSuccess, fetchFormsFailure} from '../reducers/modules/FormReducer';
import { sendFormsStart, sendFormsSuccess, sendFormsFailure} from '../reducers/modules/FormReducer';
import  axios  from 'axios';

export const fetchForms = () => {
    return async (dispatch, getState)  => {
        dispatch(fetchFormsStart(true));
        const tableUri = 'https://dopeswag.table.core.windows.net/formDefinitions/';
        const sasToken = '?sv=2019-02-02&ss=t&srt=sco&sp=rwdlacu&se=2019-11-30T23:21:06Z&st=2019-10-28T14:21:06Z&spr=https&sig=sfDJRB78MzQC8OyYqsV4o%2BmTLuAhs21cxzeVcVOM6Qo%3D';
        
        let URI= tableUri + sasToken;

        axios.get(URI,
            { 
                headers: {
                    'Content-Type': 'application/json'
                }
            }        
        ).then(
            res => {
                dispatch(fetchFormsSuccess(res.data.value));
                // place res into formlist object that is defined in global state
            }
        ).catch(
                //Error handle the promise and set your errorMessage
            err => {
                dispatch(fetchFormsFailure(err));
            }
        );
    }
}

export const sendForms = (formStructure, formData) => {
    return async (dispatch, getState)  => {
        const uuidv4 = require('uuid/v4');
        let activeFormName = JSON.parse(formStructure.Data).name;
        let debugObject = {
            PartitionKey: activeFormName,
            RowKey: uuidv4(),
            form: formStructure.Data,
            data: JSON.stringify(formData)
        }
        console.log(formStructure,formData)
        dispatch(sendFormsStart(debugObject));
        const tableUri = `https://dopeswag.table.core.windows.net/formResults(PartitionKey=%27${encodeURI(debugObject.PartitionKey)}%27,RowKey=%27${encodeURI(debugObject.RowKey)}%27)`;
        const sasToken = '?sv=2019-02-02&ss=t&srt=sco&sp=rwdlacu&se=2019-11-30T23:21:06Z&st=2019-10-28T14:21:06Z&spr=https&sig=sfDJRB78MzQC8OyYqsV4o%2BmTLuAhs21cxzeVcVOM6Qo%3D';
        let URI= tableUri + sasToken;
        axios.put(URI, debugObject,
            { 
                headers: {
                    'Content-Type': 'application/json'
                }
            }            
        ).then(
            res => {
                dispatch(sendFormsSuccess(res.data.value));
            }
        ).catch(
            err => {
                dispatch(sendFormsFailure(err));
            }
        );
    }
}
