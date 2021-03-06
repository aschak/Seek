class Api::CommentsController < ApplicationController

  def index
    @comments = Comment.all
  end

  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: "Unprocessable Entity"
    end
  end

  def show
    @comment = Comment.find(params[:id])
    render :show
  end

  def destroy
    comment = current_user.comments.find(params[:id])
    comment.destroy
    render json: comment #Why does what we render not matter? Comment has no show page!
  end

  def update
    @comment = current_user.comments.find(params[:id])

    if @comment.update(comment_params)
      render :show
    else
      render json: @comment.errors.full_messages, status: "Unprocessable Entity"
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :answer_id)
  end
end
