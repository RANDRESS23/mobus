import 'dotenv/config'

export default {
  "expo": {
    "name": 'MoBus',
    "slug": 'mobus',
    "version": '1.0.0',
    "orientation": 'portrait',
    "icon": './assets/img/logoMobus.png',
    "splash": {
      "image": './assets/img/splash.png',
      "resizeMode": 'contain',
      "backgroundColor": '#7900AC'
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      '**/*'
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": 'com.randress.mobus',
      "buildNumber": '1.0.0'
    },
    "android": {
      "package": 'com.randress.mobus',
      "adaptiveIcon": {
        "foregroundImage": './assets/img/logoMobus.png',
        "backgroundColor": '#7900AC'
      },
      "versionCode": 1
    },
    "web": {
      "favicon": './assets/img/favicon.png'
    },
    "extra": {
      "apiKey": process.env.API_KEY,
      "authDomain": process.env.AUTH_DOMAIN,
      "projectId": process.env.PROJECT_ID,
      "storageBucket": process.env.STORAGE_BUCKET,
      "messagingSenderId": process.env.MESSAGING_SENDER_ID,
      "appId": process.env.APP_ID,
      "apiKeyMyMappi": process.env.MYMAPPI_API_KEY,
      "eas": {
        "projectId": process.env.PROJECT_ID_BUILD
      }
    }
  }
}
