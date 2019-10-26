module ReactViews
  class Railtie < ::Rails::Railtie
    config.react_views = ActiveSupport::OrderedOptions.new
    config.react_views.watch_directories = ['/app/views/', 'app/javascript/']
    config.react_views.watch_extensions = ['jsx', 'js']

    initializer 'react_views.watch_files', after: :load_config_initializers, group: :all do |app|
      reload_paths = config.react_views.watch_directories.reduce({}) do |acc, dir|
        app_dir = File.join(app.root, dir)
        acc[app_dir] = config.react_views.watch_extensions
        acc
      end

      react_views_reloader = app.config.file_watcher.new([], reload_paths) do
        ReactViews::ServerRenderer.reset
      end
      app.reloaders << react_views_reloader

      config.to_prepare { react_views_reloader.execute_if_updated }
    end

    initializer 'react_views.setup_view_helpers', after: :load_config_initializers, group: :all do |app|
      ::ReactViews::ServerRenderer.reset

      ActiveSupport.on_load(:action_controller) do
        include ::ReactViews::ServerSideRenderable
      end

      ActiveSupport.on_load(:action_view) do
        include ::ReactViews::ViewHelper

        react_views_handler = ReactViews::TemplateHandler.new

        ActionView::Template.register_template_handler(:js, react_views_handler)
        ActionView::Template.register_template_handler(:jsx, react_views_handler)
      end
    end
  end
end
