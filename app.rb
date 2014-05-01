require "rubygems"
require "sinatra/base"
require "slim"
require 'sinatra/reloader'

class App < Sinatra::Base

  # auto reload
  configure :development do
    register Sinatra::Reloader
  end

  get '/' do
    slim :index
  end

  get '/hello/:name' do
    slim :hello
  end

  get '/test' do
    slim :test
  end

end

