
import React, {Fragment} from 'react';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './assets/theme';

// init redux
import { Provider } from 'react-redux';
import AppStore from './reducers/AppStore'
import OuterNav from './OuterNav';




//load serialized values here if persisting
const store = AppStore();

const App = () => {
  return (
    
    <Provider store={ store }>
      <ThemeProvider theme={ theme }>
        <OuterNav></OuterNav>
      </ThemeProvider>
    </Provider> 
  );
};


export default App;