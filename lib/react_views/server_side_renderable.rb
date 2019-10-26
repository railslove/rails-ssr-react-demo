module ReactViews
  module ServerSideRenderable
    extend ActiveSupport::Concern

    included do
      attr_accessor :__react_views_ssr_head
      attr_accessor :__react_views_props
      attr_accessor :__react_views_view_name
    end
  end
end
