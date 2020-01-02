/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Liner from './components/Liner';


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Liner></Liner>
      </SafeAreaView>
    </>
  );
};

export default App;
