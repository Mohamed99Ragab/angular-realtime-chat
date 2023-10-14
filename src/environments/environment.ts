// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BaseUrl:'http://websocket-chat.test/api/',
  broadcastBaseUrl:'http://websocket-chat.test/broadcasting/auth',
  pusher_key: 'mragab@1989msdfgj4t1',
  pusher_cluster: 'mt1',
  pusher_host: `localhost`
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
