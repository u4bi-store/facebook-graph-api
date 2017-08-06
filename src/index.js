window.fbAsyncInit = function() {
    FB.init({
    appId      : API_KEY,
    xfbml      : true,
    version    : 'v2.10'
    });
    FB.AppEvents.logPageView();

    FB.getLoginStatus(checkStatus);

};



function loginCallback(e){
    FB.getLoginStatus(checkStatus);
}




function checkStatus(e) {
    
    if(e.status === 'connected'){
        var 
            auth = e.authResponse;

        console.log(auth.accessToken, auth.expiresIn, auth.userID);

        apiCallback();

    } 
}

function apiCallback(){
    /* get profile */
    FB.api('/me', function(e){
        console.log('/me', e);
    });

    /* get permissions */
    FB.api('/me/permissions', function(e){
        console.log('/me/permissions', e.data);
    });
    
    /* get email ( scope : email ) */
    FB.api('me/?fields=email', function(e){
        console.log('/me/email', e);
    });

    /* get picture */
    FB.api('me/?fields=picture', function(e){
        console.log('/me/picture', e.picture.data.url);
    });

    /* get gender */
    FB.api('me/?fields=gender', function(e){
        console.log('/me/gender', e);
    });

    /* get timeline link */
    FB.api('me/?fields=link', function(e){
        console.log('/me/link', e);
    });    

    /* get likes page ( scope : user_likes ) */
    FB.api('me/?fields=likes', function(e){
        console.log('/me/likes', e);
    });                

}

function insertScope(e){
    
    /* facebook permissions scope : https://developers.facebook.com/docs/facebook-login/permissions */
    
    FB.login(function(response) {
        console.log(response);
    }, {scope: e});

}

function removeScope(e){
    FB.api('me/permissions/'+e, 'DELETE', function(e){
        console.log('remove scope', e.success);
    });
}

