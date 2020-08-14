# Airbnb

Replica of the famous Airbnb App, coded during the amazing 10 weeks [lereacteur](https://lereacteur.io) bootcamp !

## Main Technologies

- [Expo](https://expo.io/) SDK 0.36
- [React Native](https://reactnative.dev/)

## Setup

To run the app on your computer, clone the repository and then install the dependencies using these command lines :

### Npm

`npm install`

### Yarn

`yarn add`

Then start the app :

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
