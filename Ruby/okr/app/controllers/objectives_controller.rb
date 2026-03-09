class ObjectivesController < ApplicationController
  before_action :set_objective, only: %i[ show edit update ]

  def index
    @objectives = Objective.all
  end

  def show
    @objective = Objective.find(params[:id])
  end

  def new
    @objective = Objective.new
  end

  def create
    @objective = Objective.new(objective_params)
    if @objective.save
      redirect_to @objective
    else
      render :new, status: :unprocessable_entity
    end
  end

  class ProductsController < ApplicationController
    def index
      @products = Product.all
    end

    def show
      @product = Product.find(params[:id])
    end

    def new
      @product = Product.new
    end

    def create
      @product = Product.new(product_params)
      if @product.save
        redirect_to @product
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit
      @product = Product.find(params[:id])
    end

    def update
      @product = Product.find(params[:id])
      if @product.update(product_params)
        redirect_to @product
      else
        render :edit, status: :unprocessable_entity
      end
    end

    private
      def product_params
        params.expect(product: [ :name ])
      end
  end

  private
    def objective_params
      params.expect(objective: [ :title ])
    end
end
