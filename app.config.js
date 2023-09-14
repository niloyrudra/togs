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
      "package": "com.ashwinsuvarna043.togsapp"
    },
    "web": {
      "favicon": "./assets/logo/logo.png"
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
        "projectId": "c5adad08-b0b8-49cb-9560-34324d942939"
      },
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    }
  }
}
