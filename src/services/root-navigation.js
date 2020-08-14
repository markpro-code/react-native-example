/**
 *  Usage
 *  ---------------
 * in any js module
 * ```
 * import * as RootNavigation from './path/to/RootNavigation.js';
 * RootNavigation.navigate('ChatScreen', { userName: 'Lucy' });
 * ```
 */


import  React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

// add other navigation functions that you need and export them
