class Api::V1::SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        user  = User.find_by_email(params[:email])

        if user&.valid_password?(params[:password])
            render json: {
                jwt: encode_token({
                    id: user.id,
                    email: user.email
                })
            }
        else
            head(:unauthorized)
        end
    end

    private 
    def encode_token (payload = {})
        exp = 2.minutes.from_now
        payload[:exp] = exp.to_i
        JWT.encode(payload,Rails.application.secrets.secret_key_base)
    end

    def destroy
    end

    # Only allow a list of trusted parameters through.
    def session_params
        params.require(:session).permit(:email, :password,:authentication_token)
    end
end