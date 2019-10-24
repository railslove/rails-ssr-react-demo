class ReactTemplateHandler
  include React::Rails::ViewHelper

  def call(view, _source)
    # TODO: When an error is raised, the "real" error only will be displayed the
    # first time. Reloading the error page will show a non-helpful error
    <<-RUBY
      react_component("#{view.virtual_path}", local_assigns, { prerender: true });
    RUBY
  end
end

ActionView::Template.register_template_handler(:js, ReactTemplateHandler.new)
ActionView::Template.register_template_handler(:jsx, ReactTemplateHandler.new)

module React
  module Rails
    class ComponentMount

      private

      # Override to grab styles from ssr-rendered code
      def prerender_component(component_name, props, prerender_options)
       renderer = @controller.try(:react_rails_prerenderer) || React::ServerRendering
       rendered = renderer.render(component_name, props, prerender_options)
       parts = JSON.parse(rendered)

       @controller.ssr_styles = parts["styles"].html_safe
       parts["html"].html_safe
     end
    end
  end
end
