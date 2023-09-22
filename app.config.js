import 'dotenv/config';

export default {
  "expo": {
    "name": "togs-app",
    "slug": "togs-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/logo/logo.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/logo/splash-screen.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/logo/logo.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "android.permission.RECORD_AUDIO"
      ],
      "package": "com.ashwinsuvarna043.togs"
    },
    "web": {
      "favicon": "./assets/logo/logo.png",
      "bundler": "metro"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": process.env.EAS_PROJECT_ID
      },
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/2c6b9777-be35-4e93-9e7d-4d5335e7a4d3"
    }
  }
}


// {
//   "expo": {
//     "name": "togs",
//     "slug": "togs",
//     "version": "1.0.0",
//     "orientation": "portrait",
//     "icon": "./assets/icon.png",
//     "userInterfaceStyle": "light",
//     "splash": {
//       "image": "./assets/splash.png",
//       "resizeMode": "contain",
//       "backgroundColor": "#ffffff"
//     },
//     "assetBundlePatterns": [
//       "**/*"
//     ],
//     "ios": {
//       "supportsTablet": true
//     },
//     "android": {
//       "adaptiveIcon": {
//         "foregroundImage": "./assets/adaptive-icon.png",
//         "backgroundColor": "#ffffff"
//       },
//       "package": "com.ashwinsuvarna043.togs"
//     },
//     "web": {
//       "favicon": "./assets/favicon.png",
//       "bundler": "metro"
//     },
//     "extra": {
//       "eas": {
//         "projectId": "260ebdf3-fbd8-4675-80aa-fffa10deb12f"
//       }
//     },
//     "runtimeVersion": {
//       "policy": "appVersion"
//     },
//     "updates": {
//       "url": "https://u.expo.dev/260ebdf3-fbd8-4675-80aa-fffa10deb12f"
//     }
//   }
// }
