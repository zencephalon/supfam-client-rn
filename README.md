# Supfam

## TODO

- Initial message doesn't work, maybe the conversation doesn't exist?
  - janky

### Features

- MESSAGING. Let's do DMs first and then groups.
  - read receipts, keep an index counter of the last message read, per user. Calculate unread count based on that
- FAMILIES
- PROFILES
- Push notifications

- twilio phone number verification to log in?

  - I don't know if we actually need this

- some kind of script to auto-update people's statuses to make the app lively during testing
- Finish making new seed data with more people in it

### Ops, infra

- Upgrade postgres (have to migrate database to paid tier at some point)

https://stackoverflow.com/questions/23820570/ios-launching-messages-app-with-multiple-recipients
