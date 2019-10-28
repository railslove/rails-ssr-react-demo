require 'mini_racer'

module MiniRacer
  # monkeypatch MiniRacer Exceptions for better backtraces.
  # Watch out, this is a mess.

  class RuntimeError < EvalError
    def initialize(message)
      # Resetting will ensure that the error doesn't cause any side effects
      ::ReactViews::ServerRenderer.reset

      if message.start_with? "Error: Module build failed"
        raise ModuleBuildError.new(message.split("\n", 2)[1])
      end

      message, js_backtrace = message.split("\n", 2)
      if js_backtrace && !js_backtrace.empty?
        @js_backtrace = rubyfy_js_backtrace(js_backtrace)
      else
        @js_backtrace = nil
      end
      super(message)
    end

    private

    def rubyfy_js_backtrace(js_backtrace)
      lines = js_backtrace.split("\n")
      lines.map do |line|
        # from: "at Foo (/webpack:/app/javascript/Foo.js:7:1)"
        # to:   "app/javascript/Foo.js:7:1:in `Foo`"

        line = line.strip
        return line unless /^at \S* \(\/webpack:/.match?(line)

        line = line[0...-1] # remove last ")"
        line = line.sub!("at ", "")
        caller_name, file_location = line.split(" (/webpack:/", 2)

        "#{file_location}:in `#{caller_name}`"
      end
    end
  end

  # Support webpack module build errors (SyntaxErrors), whose stack traces are different.
  class ModuleBuildError < RuntimeError
    def initialize(message)
      if message.start_with? "SyntaxError:"
        # from: "SyntaxError: /file/path.js: some message (7:1)"
        # to:   "at ? (/webpack:/file/path.js:7:1)"
        # ... which then gets parsed by MiniRacer::RuntimeError
        location, error_message = message.split("\n", 2)[0].sub!("SyntaxError: ", "").split(":", 2)
        line_number = error_message.match(/\((.*)\)$/).captures.first

        message = [
          "SyntaxError: #{error_message}",
          "at ? (/webpack:/#{location}:#{line_number})"
        ].join("\n")
      end

      super(message)
    end
  end
end
