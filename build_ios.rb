require 'semantic'
require 'json'

raw = File.read('app.json')

json = JSON.parse(raw)

version = Semantic::Version.new json["expo"]["ios"]["buildNumber"]
new_version = version.patch!

json["expo"]["ios"]["buildNumber"] = new_version.to_s

File.write('app.json', JSON.pretty_generate(json))