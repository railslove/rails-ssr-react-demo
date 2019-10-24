class ReactTemplateHandler
  include React::Rails::ViewHelper

  def call(view, _source)
    # TODO: When an error is raised, the "real" error only will be displayed the
    # first time. Reloading the error page will show a non-helpful error
    <<-RUBY
      react_component("#{view.virtual_path}", local_assigns, { prerender: true, camelize_props: true });
    RUBY
  end
end

ActionView::Template.register_template_handler(:js, ReactTemplateHandler.new)
ActionView::Template.register_template_handler(:jsx, ReactTemplateHandler.new)
