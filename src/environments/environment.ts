// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDP_CeXVzS-0p46Rb6Q2g6N0CIi8H3LCB0",
    authDomain: "oevent-staging.firebaseapp.com",
    databaseURL: "https://oevent-staging.firebaseio.com",
    projectId: "oevent-staging",
    storageBucket: "oevent-staging.appspot.com",
    messagingSenderId: "617317956709"
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
