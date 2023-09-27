# LUDICON 2 HOW TO RUN:


## setup android emulator
- follow instructions from the link below (do not worry about Multiple adb versions)
- https://docs.expo.dev/workflow/android-studio-emulator/#set-up-android-studios-tools

## clone repo
- git clone or whatnot and cd into LUDICON
- 
## setup amplify 
- install amplify cli https://docs.amplify.aws/cli/start/install/
- run 'amplify pull' inside the project directory
- Select the authentication method you want to use: AWS profile 
- Please choose the profile you want to use: Yuri
- Which app are you working on? LUDICON2 d27nm4roc7ta02
- Backend environment 'dev' found. Initializing..
- Choose your default editor: Visual Studio Code
- Choose the type of app that you're building: android
- Where is your Res directory: (default) app/src/main/res
- Do you plan on modifying this backend? No
## install npm dependencies
```
npm install
```

## run the app
```
npm start
```
- this will launch expo
- you can scan the qr code on your phone thru expo app
- press 'w' to run it in web browser
- press 'a' to start android emulator. It should automatically launch emulator
