#
# Less to CSS converter for Jekyll.
# In your less file, add two lines of --- at the top.
#
module Jekyll
  class LessConverter < Converter
    safe true
    priority :highest
    
    def setup
      return if @setup
      require 'less'
      @setup = true
    rescue LoadError
      STDERR.puts 'You are missing the library required for less. Please run:'
      STDERR.puts ' $ [sudo] gem install less'
      raise FatalException.new("Missing dependency: less")
    end
    
    def matches(ext)
      ext =~ /less|lcss/i
    end
    
    def output_ext(ext)
      ".css"
    end
    
    def convert(content)
      setup
      begin
        parser = Less::Parser.new                                                                    
        tree = parser.parse(content)
        tree.to_css(:compress => true)
      rescue => e
        puts "Less Exception: #{e.message}"
      end
    end
  end
end