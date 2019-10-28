require 'open-uri'
require 'mini_racer'

module ReactViews
  class ServerRenderError < StandardError; end

  class ServerRenderer
    CLIENT_REQUIRE = %r{__webpack_require__\(.*webpack-dev-server\/client\/index\.js.*\n}

    def self.reset
      @@context = MiniRacer::Context.new
      @@context.eval(get_webpack_file('react_views_server.js'), filename: 'react_views_server.js')

      @@context.attach('console.log', proc { |*args| log(:debug, args) })
      @@context.attach('console.debug', proc { |*args| log(:debug, args) })
      @@context.attach('console.error', proc { |*args| log(:error, args) })
      @@context.attach('console.warn', proc { |*args| log(:warn, args) })
      @@context.attach('console.info', proc { |*args| log(:info, args) })

      @@context.attach('readSourceMap', proc { |filename| get_webpack_file("#{filename}.map") } )
    end

    def self.render(view_name, props)
      js_args = {
        ctx: {
          viewName: view_name,
          props: props
        }
      }

      @@context.call('__react_views_exec', js_args)
    end

    private

    def self.log(level, args)
      Rails.logger.method(level).call(args.join(' '))
    end

    def self.get_webpack_file(filename)
      if Webpacker.dev_server.running?
        asset_path = Webpacker.manifest.lookup(filename).to_s
        ds = Webpacker.dev_server
        dev_server_asset = open("#{ds.protocol}://#{ds.host_with_port}#{asset_path}").read

        # Remove webpack-dev-server/client which cannot be processed by mini_racer.
        # This could be achieved by setting the webpack config to
        # `devServer.injectClient = false` for only react_views_server.js, but this
        # doesn't seem to be easy configurable.
        dev_server_asset.sub!(CLIENT_REQUIRE, '//\0')

        dev_server_asset
      else
        asset_filename = Webpacker.manifest.lookup!(path)[1..-1]
        full_path = ::Rails.root.join('public', asset_filename)
        File.read(full_path)
      end
    end

    def self.get_local_file(filename)
      full_path = File.join(File.dirname(__FILE__), './js/console-server.js')
      File.read(full_path)
    end
  end
end
