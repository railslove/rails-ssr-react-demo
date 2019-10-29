module ReactViews
  class TemplateHandler
    def call(view, _source)
      <<-RUBY
        render_react_view("#{view.virtual_path}", local_assigns)
      RUBY
    end
  end
end
