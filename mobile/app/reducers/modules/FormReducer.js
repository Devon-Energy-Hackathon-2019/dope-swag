/* init state */
const INITIAL_STATE = {
  forms: [],
  loading: false,
  error: {}
};

/* define action types */
const FETCH_FORMS_START = "eagle/form/FETCH"
const FETCH_FORMS_FAILURE = "eagle/form/FAILURE"
const FETCH_FORMS_SUCCESS = "eagle/form/SUCCESS"
const SEND_FORMS_START = "eagle/form/SEND"
const SEND_FORMS_FAILURE = "eagle/form/FAILURE"
const SEND_FORMS_SUCCESS = "eagle/form/SUCCESS"
/* define actions */
export const fetchFormsStart = () => ({
  type: FETCH_FORMS_START
});

export const fetchFormsFailure = (error) => ({
  type: FETCH_FORMS_FAILURE,
  error: error
});

export const fetchFormsSuccess = (data) => ({
  type: FETCH_FORMS_SUCCESS,
  payload: data
});

const baseURI = 'https://dopeswag.table.core.windows.net/formResults/';
const sasToken = '?sv=2019-02-02&ss=t&srt=sco&sp=rwdlacu&se=2019-11-30T23:21:06Z&st=2019-10-28T14:21:06Z&spr=https&sig=sfDJRB78MzQC8OyYqsV4o%2BmTLuAhs21cxzeVcVOM6Qo%3D';

export const sendFormsStart = (saveObj) => ({
  type: SEND_FORMS_START,
  meta: {
    offline: {
      // the network action to execute:
      effect: { 
        url: baseURI + `(PartitionKey=%27${encodeURI(saveObj.PartitionKey)}%27,RowKey=%27${encodeURI(saveObj.RowKey)}%27)` + sasToken,
        method: 'PUT', 
        json: { saveObj } },
      // action to dispatch when effect succeeds:
      commit: { type: 'SEND_FORMS_SUCCESS', meta: { saveObj } },
      // action to dispatch if network action fails permanently:
      rollback: { type: 'SEND_FORMS_FAILURE', meta: { saveObj } }
    }
  }
});

export const sendFormsFailure = (error) => ({
  type: SEND_FORMS_FAILURE,
  error: error
});

export const sendFormsSuccess = (data) => ({
  type: SEND_FORMS_SUCCESS,
  payload: data
});

/* reducer */
export default reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
      case FETCH_FORMS_START: 
          return {
              ...state,
              loading: true
          }
      case FETCH_FORMS_SUCCESS:
          return {
              ...state,
              loading: false,
              Forms: action.payload
          }
      case FETCH_FORMS_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.error
          }
      case SEND_FORMS_START: 
          return {
              ...state,
              loading: true
          }
      case SEND_FORMS_SUCCESS:
          return {
              ...state,
              loading: false
          }
      case SEND_FORMS_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.error
          }
      default:
          return state;
  }
};

/* selectors to make using state a little cleaner */
export const getForms = state => state.Forms;
export const getFormsLoading = state => state.loading;
export const getFormsError = state => state.error;

export const sendFormsLoading = state => state.loading;
export const sendFormsError = state => state.error;