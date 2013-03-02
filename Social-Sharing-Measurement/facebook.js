/* facebookSocialSharing

    Leverages event handlers as described at - https://developers.facebook.com/docs/guides/web/
    This example uses a JavaScript interval methods to wait for the Facebook objects to load  -  http://www.w3schools.com/jsref/met_win_setinterval.asp
    This code should go in the plugins section of your Adobe Analytics s_code.js file
    *Dependency split function or you can write your own method to split strings.


 */



s.facebookSocialSharing=function(a,b,c,d,e,f,g,h){
    
    //allow for different object than 's' which is standard 
    var s = this;
    
    //handle interval timing
    s.fbICount ++;
    if (s.fbICount >= 5){
        clearInterval(socialInterval);
    }
    
    if(typeof(FB)!='undefined'){
        clearInterval(socialInterval);
        function re(a,b){
            a = s.split(a,'>'),
            
            //subscribe to series of Facebook Events
            FB.Event.subscribe(b, function() {
                track(a[0],a[1]);
            });
        }
        
        //subscribe to the Like button click
        if(b){re(b, 'edge.create');}
        
        //subscribe to the unlike action
        if(c){re(c, 'edge.remove');}
        
        //subscribe to the comment creation action
        if(d){re(d, 'comment.create');}
        
        //subscribe to the comment removal action
        if(e){re(e, 'comment.remove');}
        
        //subscribe to the Facebook login button
        if(f){re(f, 'auth.login');}
        
        //subscribe to the Facebook logout button
        if(g){re(g, 'auth.logout');}
        
        //subscribe to the Facebook message action
        if(h){re(h, 'message.send');}
    }
                    
    function track(m,n){
        //set the appropriate variables as defined in facebookSocialSharing parameters
        s.ltVT=s.linkTrackVars;
        s.ltET=s.linkTrackEvents;
        s.etE=s.events;
                        
        s.linkTrackVars=a?(a+',events'):'events';
        s.linkTrackEvents=n;
        s.events=n;
        if(a){s[a]=m;}
        
        //the 'tl' function will send in the data
        s.tl(this,'o',m);
                            
        //reset page vars back
        s.linkTrackVars=s.ltVT;
        s.linkTrackEvents=s.ltET;
        s.events=s.etE;
    }
}

//interval counter 
s.fbICount = 0;

//set up an interval to check for the Facebook Object
var socialInterval = setInterval( function() { 
    
    /*call the facebookSocialSharing function leveraging the following parameters:
    
        a = (string, optional) The variable to be populated with b-g: 'eVar50'
        b = (string, optional) The variable/custom link name and the event number to increment on a successful Facebook Like: 'fb:like>event26'
        c = (string, optional) The variable/custom link name and the event number to increment on a successful Facebook Unlike: 'fb:unlike>event27'
        d = (string, optional) The variable/custom link name and the event number to increment on a successful Facebook Comment: 'fb:comment>event28'
        e = (string, optional) The variable/custom link name and the event number to increment on a successful Facebook Comment Removed: 'fb:uncomment>event29'
        f = (string, optional) The variable/custom link name and the event number to increment on a successful Facebook Login: 'fb:login>event30'
        g = (string, optional) The variable/custom link name and the event number to increment on a successful Facebook Logout: 'fb:logout>event31'
        h = (string, optional) The variable/custom link name and the event number to increment on a successful Facebook Send: 'fb:send>event32'
    
    */
    
    s.facebookSocialSharing('eVar50','fb:like>event26','fb:unlike>event27','fb:comment>event28','fb:remove comment>event29','fb:login>event30','fb:logout>event31','fb:send>event32'); 
}, 1000);