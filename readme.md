## M jafferjees mobile

### How to run this project?

Clone project & install node modules then install ios dependencies with pod install

### For release APK

First run this cmd

- cd android && ./gradlew clean && cd..

then run this cmd

- npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

discard all the files execpt index.android.bundle

then run this cmd

- cd android && ./gradlew assembleRelease

### For release IPA

Go the xcode and then select any ios device (arm64) in the simulators list then
click on product menu
click on Archive
it will give you 4 options

- App store connect
- Adhoc
- Develop

#### use AddHoc for giving ipa release to QA.

#### use App store connect to publish app to Test Flight. Make sure to increase
