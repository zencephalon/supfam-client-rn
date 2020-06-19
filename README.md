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


## TODO

- Build script for updating app version and building in one command
- Wire up location updates with API

### Features

- CONTACTS import / inviting
- Push notifications

- PROFILES
  - We can launch with just the single profile for now
- MESSAGING. Let's do DMs first and then groups.
  - read receipts, keep an index counter of the last message read, per user. Calculate unread count based on that

### Crypto

https://github.com/VirgilSecurity/react-native-virgil-crypto when we decide to eject and implement crypto.

We'll have to get off of Expo's push notification service at some point anyway.

We can use Pushy to do push notifications.

### Ops, infra

- Upgrade postgres (have to migrate database to paid tier at some point)

https://stackoverflow.com/questions/23820570/ios-launching-messages-app-with-multiple-recipients
