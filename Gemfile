source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '>= 5.0.0.beta3', '< 5.1'
gem 'puma'

gem 'figaro'

gem 'rack-cors'
gem 'redis', '~> 3.0'

gem 'sqlite3'

gem 'high_voltage', '~> 2.4.0'

# Models
# gem 'mongoid', '>= 6.0.0', git: 'https://github.com/mongodb/mongoid'
gem 'mongoid', git: 'https://github.com/estolfo/mongoid.git', branch: 'MONGOID-4218-rails-5'
gem 'paperclip', '~> 5.0.0.beta1'
gem 'mongoid-paperclip', require: 'mongoid_paperclip'
# gem 'mongoid-enum'

# Actors
# gem 'celluloid'
# gem 'parallel'

# Json
gem 'jbuilder', '~> 2.0'
gem 'yajl-ruby', require: 'yajl'

#HTTP clients
gem 'faraday'
gem 'faraday_middleware'

#Parsers
gem 'nokogiri'

#Spreadsheet parsers
gem 'roo', '~> 2.3'
gem 'roo-xls'
gem 'axlsx', git: 'https://github.com/randym/axlsx'

group :development, :test do
  gem 'awesome_print'
  gem 'byebug' # Call 'byebug' anywhere in the code to stop execution and get a debugger console
end

group :development do
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'capistrano-rails'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
