require 'json'

releaseObject = JSON.parse(File.read('./EXPO_RELEASE.json'))
releaseNumber = releaseObject['ios']

system("expo publish --release-channel ios-v#{releaseNumber}", out: $stdout)