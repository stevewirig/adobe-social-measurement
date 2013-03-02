/* twitterSocialSharing

    Copyright 1996-2013 Adobe, Inc. All Rights Reserved

    Leverages event handlers as described at - https://dev.twitter.com/docs/tweet-button
    This example uses a JavaScript interval methods to wait for the Twitter objects to load  -  http://www.w3schools.com/jsref/met_win_setinterval.asp
    This code should go in the plugins section of your Adobe Analytics s_code.js file
    *Dependency split function or you can write your own method to split strings.
 
 */


s.twitterSocialSharing=function(a,b,c,d,e,f){
    
    //allow for different object than 's' which is standard for s_code
    var s = this;
    
    //handle interval timing
    s.twICount ++;
    if (s.twICount >= 5){
        clearInterval(twttrInterval);
    }
    
    if(typeof(twttr)!='undefined'){
        clearInterval(twttrInterval);
        function re(a,b){
            a = s.split(a,'>'),
            
            //subscribe to series of Twitter Events
            twttr.events.bind(b, function() {
                track(a[0],a[1]);
            });
        }
        
        //subscribe to the click action (will start the tweet modal process)
        if(b){re(b, 'click');}
        
        //subscribe to the tweet action
        if(c){re(c, 'tweet');}
        
        //subscribe to the retweet action
        if(d){re(d, 'retweet');}
        
        //subscribe to the favorite action
        if(e){re(e, 'favorite');}
        
        //subscribe to the follow action
        if(f){re(f, 'follow');}
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

s.twICount = 0;

var twttrInterval = setInterval( function(){

    /*call the twitterSocialSharing function leveraging the following parameters:
    
        a = (string, optional) The variable to be populated with b-g: 'eVar50'
        b = (string, optional) The variable/custom link name and the event number to increment on the click of a Twitter element: 'twt:click>event26'
        c = (string, optional) The variable/custom link name and the event number to increment on a successful Twitter tweet: 'twt:tweet>event27'
        d = (string, optional) The variable/custom link name and the event number to increment on a successful Twitter retweet: 'twt:retweet>event28'
        e = (string, optional) The variable/custom link name and the event number to increment on a successful Twitter favorite: 'twt:favorite>event29'
        f = (string, optional) The variable/custom link name and the event number to increment on a successful Twitter follow: 'twt:follow>event30'

    
    */
    
    s.twitterSocialSharing('eVar50','twitter:click>event45','twitter:tweet>event46','twitter:retweet>event47','twitter:favorite>event48','twitter:follow>event49'); 
}, 1000);