class PagesController < ApplicationController
  def main
    render locals: { greeting: 'World' }
  end
end
