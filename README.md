# Airbnb

Replica of the famous Airbnb App, coded during the amazing 10 weeks [lereacteur](https://lereacteur.io) bootcamp !

## Technologies

- [Expo](https://expo.io/) SDK 0.36
- [React Native](https://reactnative.dev/)

## Install

To run the app on your computer, install these packages :

### Npm

`npm install`

### Yarn

`yarn add`

Then run this command line to start the app :
`expo start`

## Features

### Sign-in / Sign-up

- Sign-in
  | Value | Type |
  | ------------- |:-------------:|
  | email | `email` |
  | password | `string` |

- Sign-up
  | Value | Type |
  | ------------- |:-------------:|
  | email | `email` |
  | username | `string` |
  | name | `string` |
  | description | `textarea` `string` |
  | password | `string` |
  | confirm password | `string` |

### Home

- Scroll for rooms results in Home Screen
- Access to romm details by clicking on a room result

### Room

- Swipe through pictures

### Around Me

- Navigate around Paris to find rooms
- Click on a map marker to access room details
  > Note that there's only a few rooms located only in Paris in the API data, so default user location is set there

### Profile

- See your profile infos
- Only profile picture, username and description inputs are editable
- Log out
