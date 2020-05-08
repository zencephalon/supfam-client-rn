# Supfam

## TODO

### Features

- CONTACTS import / inviting
- Push notifications

We don't have to launch with this.

- PROFILES
  - We can launch with just the single profile for now
- MESSAGING. Let's do DMs first and then groups.
  - read receipts, keep an index counter of the last message read, per user. Calculate unread count based on that
  - Need to figure out the schema again now that I've got profiles in the mix


- some kind of script to auto-update people's statuses to make the app lively during testing
- Finish making new seed data with more people in it


### Crypto

https://github.com/VirgilSecurity/react-native-virgil-crypto when we decide to eject and implement crypto.

We'll have to get off of Expo's push notification service at some point anyway.

### Ops, infra

- Upgrade postgres (have to migrate database to paid tier at some point)

https://stackoverflow.com/questions/23820570/ios-launching-messages-app-with-multiple-recipients
