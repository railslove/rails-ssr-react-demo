require 'execjs'
require 'open-uri'

module ReactViews
  class ServerRenderer
    CLIENT_REQUIRE = %r{__webpack_require__\(.*webpack-dev-server\/client\/index\.js.*\n}

    def self.reset
      js_code = <<-JS
        function __react_views_exec(ReactViews) {
          #{get_file('react_views_server.js')}
        }
      JS

      @@execjs_context = ExecJS.compile(js_code)
    end

    def self.render(view_name, props)
      js_code = <<-JS
        var __react_views_renderer;
        var __react_views_args = {
          ctx: {
            viewName: '#{view_name}',
            props: #{props.to_json.html_safe}
          },
          sendOutput: function(renderer) {
            __react_views_renderer = renderer;
          }
        };
        __react_views_exec(__react_views_args);
        return __react_views_renderer();
      JS

      @@execjs_context.exec(js_code)
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
