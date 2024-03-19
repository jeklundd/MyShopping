#  Activate venv
### To activate the environment: source venv/bin/activate (in folder TOSSE)

### Versions:
* Java: 15
* Python: Least 3.8.5
* Node: v16.13.0

## For the android simulator
### 1. Install Android studio
Install these components
* Android SDK
* Android SDK Platform
* Android Virtual Device

### 2. React Native code requires Android 10(Q), this can be installed under SDK Manager
### 3. Look for and expand the Android 10 (Q) entry, then make sure the following items are checked:
* Android SDK Platform 30
* Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image
* Also create a virtual device: Pixel 4 with google play feature
### 4. Fix the path for Android simulator (if it does not work)
nano ~/.zsh_profile

export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

(save and exit: ctrl+x, y+enter)

source $HOME/.zsh_profile


### 5.  Packages to install
#### In **frontend**, write this in the terminal: 
* expo install react-native-screens react-native-safe-area-context

* For react native paper: npm install react-native-paper

* For react navigation: npm install @react-navigation/native @react-navigation/native-stack

* For checkbox: npm i react-native-bouncy-checkbox

* For charts: npm install react-native-gifted-charts react-native-linear-gradient react-native-svg
* npm install react-native-canvas react-native-webview

* To install EXPO: npm install --global expo-cli

#### In **backend**, write this in the terminal
* pip install django-rest-auth-dj4 django-allauth
* pip install django-cors-headers
* pip install djangorestframework

### 6. Start up the frontend and backend 
* npm start (in folder frontend)
* Open Android Studio and enter Virtual Device Manager
* Cold boot the device
* Press a in PyCharm

* In a new window cd into backend folder and write: python manage.py runserver










