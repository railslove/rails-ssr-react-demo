require 'execjs'
require 'open-uri'

module ReactViews
  class ServerRenderer
    CLIENT_REQUIRE = %r{__webpack_require__\(.*webpack-dev-server\/client\/index\.js.*\n}

    def self.reset
      @@execjs_context = ExecJS.compile(get_file('react_views_server.js'))
    end

    def self.render(view_name, props)
      @@execjs_context.eval("renderReactViews('#{view_name}', #{props.to_json})")
    end

    private

    def self.get_file(filename)
      if Webpacker.dev_server.running?
        asset_path = Webpacker.manifest.lookup(filename).to_s
        ds = Webpacker.dev_server
        dev_server_asset = open("#{ds.protocol}://#{ds.host_with_port}#{asset_path}").read
        dev_server_asset.sub!(CLIENT_REQUIRE, '//\0')
        dev_server_asset
      else
        asset_filename = Webpacker.manifest.lookup!(path)[1..-1]
        full_path = ::Rails.root.join('public', asset_filename)
        File.read(full_path)
      end
    end
  end
end
