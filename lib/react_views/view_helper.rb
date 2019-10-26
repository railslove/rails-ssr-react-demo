module ReactViews
  module ViewHelper
    def render_react_view(view_name, plain_props)
      props = plain_props.deep_transform_keys { |key| key.to_s.camelcase(:lower) }
      output = ::ReactViews::ServerRenderer.render(view_name, props)
      controller.__react_views_ssr_head = output["head"].html_safe
      controller.__react_views_props = props
      controller.__react_views_view_name = view_name

      content_tag(:div, id: '__react-views') do
        output["view"].html_safe
      end
    end

    def ssr_head
      data_tag = content_tag(:script, id: '__react-views-data', type: 'application/json') do
        {
          props: controller.__react_views_props,
          viewName: controller.__react_views_view_name
        }.to_json.html_safe
      end

      controller.__react_views_ssr_head + "\n" + data_tag
    end
  end
end