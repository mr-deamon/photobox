#!/usr/bin/ruby

require 'pathname'
require 'filewatcher'

#if new file comes in, send notification to websocket

STDOUT.sync = true

Filewatcher.new('/tmp/*.jpg').watch do |filename|
  path = Pathname.new(filename)
  p "#{path.basename}"
end
