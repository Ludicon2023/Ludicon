# LUDICON 2 HOW TO RUN:


## setup android emulator
- follow instructions from the link below (do not worry about Multiple adb versions)
- https://docs.expo.dev/workflow/android-studio-emulator/#set-up-android-studios-tools

## clone repo
- git clone
- cd into LUDICON
- 
## setup amplify 
- install amplify cli https://docs.amplify.aws/cli/start/install/
- run 'amplify pull' inside the project directory
- make sure to select LUDICONFINAL2 on OHIO when selecting the app
- might need to create AWS/Amplify profile https://docs.amplify.aws/start/getting-started/installation/q/integration/react-native/#configure-the-amplify-cli)
![image](https://github.com/Ludicon2023/Ludicon/assets/70405634/82c4f049-2716-4f90-8588-e2b2d24e3f63)

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
