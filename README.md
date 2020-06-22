# Supfam

## On-boarding

`yarn install`

`yarn start`

To use local Rails set `API_URL` in `lib/constants.js` to `https://localhost:3000` or whichever port U use.

## eslint settings

You may want to add the following to your settings.json / eslint config elsewhere to prevent highlighting of linting errors common in the codebase:

```json
"eslint.options": {
    "plugins": ["react"],
    "rules": {
        "react/prop-types": 0,
        "react/display-name": 0
    }
}
```

## Current project

- Build script for updating app version and building in one command

## TODO

- Wire up location updates with API
- Handle notification badge numbers
- Consider moving Profile picture setting out of the registration flow

### Features

#### Must have for launch

- A way to block users (AppStore guidelines)
- Friendly empty states

- CONTACTS import / inviting

- PROFILES
  - We can launch with just the single profile for now

### Crypto

https://github.com/VirgilSecurity/react-native-virgil-crypto when we decide to eject and implement crypto.

We'll have to get off of Expo's push notification service at some point anyway.

We can use Pushy to do push notifications.

### Ops, infra

- Upgrade postgres (have to migrate database to paid tier at some point)

https://stackoverflow.com/questions/23820570/ios-launching-messages-app-with-multiple-recipients
