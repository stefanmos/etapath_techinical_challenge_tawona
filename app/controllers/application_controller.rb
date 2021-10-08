class ApplicationController < ActionController::Base

    #function to verify authenticity and create @current_user instance
    def verify_authenticity_token
        #check if header has authorization
        if request.headers['Authorization'].nil? 
          #send an empty response with status unauthorized
          head :unauthorized
        else
          begin
            token = request.headers["Authorization"]
            #use rails secret_key to decode because it was used to encode
            decoded = JWT.decode(token,Rails.application.secrets.secret_key_base).first
            #if decoding succeeds now we have access the user id and we can get the current user
            @current_user = User.find(decoded["id"])
          rescue #JWT:: Verification error, either token is invalid or token expired
            # send login required flag in response
            render json: {
              loginRequired: true,
            }
          end
        end    
    end
end
