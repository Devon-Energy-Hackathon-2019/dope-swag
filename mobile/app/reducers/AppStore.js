import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import FormReducer from './modules/FormReducer';

import thunk from 'redux-thunk';

//setup middleware here if needed.
const middlewares = [thunk];

const reducer = combineReducers({
  FormReducer
});

const configureStore = (initialState) =>
    createStore(reducer, initialState,
      compose (applyMiddleware(...middlewares), 
        offline(offlineConfig)
      )
    );
    
export default configureStore;