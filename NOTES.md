# Dev mode on Android phone

https://developer.android.com/studio/debug/dev-options.html

# Ensure all the android studio is installed

Assume it is in /opt/android-sdk

# Building APK

```sh
export ANDROID_HOME=/opt/android-sdk
/opt/android-sdk/tools/bin/sdkmanager --licenses # Gotta accept these
yarn run eject # Convert from an Expo project to an 'android' dir
cd android && ./gradlew assembleRelease
ls -l ./app/build/outputs/apk/app-release-unsigned.apk
```

If needing a signed release:
https://stackoverflow.com/questions/35935060/how-can-i-generate-an-apk-that-can-run-without-server-with-react-native


## Signed release APK

```sh
$ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Place the my-release-key.keystore file under the android/app directory
in your project folder. Then edit the file ~/.gradle/gradle.properties
and add the following (replace **** with the correct keystore
password, alias and key password)

MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=****
MYAPP_RELEASE_KEY_PASSWORD=****

If you're using MacOS, you can store your password in the keychain
using the instructions here instead of storing it in plaintext.

Then edit app/build.gradle and ensure the following are there (the
sections with signingConfigs signingConfig may need to be added) :

```json
...
android {
...
defaultConfig {... [
                    signingConfigs {
                    release {
                    if (project.hasProperty ('MYAPP_RELEASE_STORE_FILE ')) {
                    storeFile file (MYAPP_RELEASE_STORE_FILE)
                    storePassword MYAPP_RELEASE_STORE_PASSWORD
                    keyAlias MYAPP_RELEASE_KEY_ALIAS
                    keyPassword MYAPP_RELEASE_KEY_PASSWORD
                    [
                     [
                      [
                       buildTypes {
                       release {
                       ...
                       signingConfig signingConfigs.release
                       [
                        [
                         [
                          ...]]]}}]]]}}}] }}
```

Then run the command cd android && ./gradlew assembleRelease ,
