class PagesController < ApplicationController
  per_request_react_rails_prerenderer

  def main
    render locals: { greeting: 'World' }
  end
end
