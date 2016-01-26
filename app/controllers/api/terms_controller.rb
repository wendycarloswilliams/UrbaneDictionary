class Api::TermsController < ApplicationController
  def new
    @term = Term.new
    render json: @term
  end

  def create
    @term = Term.create(term_params)
    if @term.save
      render json: @term
    else
      render json: @term.errors.full_messages, status: 422
    end
  end

  def index
    @terms = Term.all
    render json: @terms
  end

  def show
    @term = Term.find(term_params[:id])
    render json: @term
  end

  def update
    @term = Term.find(term_params[:id])
    if @term.update(term_params)
      render json: @term
    else
      render @term.errors.full_messages, status: 422
    end
  end

  def destroy
    @term = Term.find(term_params[:id])
    @term.delete
  end

  private

  def term_params
    params.require(:term).permit(:term, :definition, :usage)
  end

end
