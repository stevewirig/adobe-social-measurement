/* googleSocialSharing

   Leverages event handlers as described at - https://developers.google.com/+/web/+1button/
   This code should go in the plugins section of your Adobe Analytics s_code.js file
   *Dependency split function or you can write your own method to split strings.
 
     This plugin uses the following instantiation of the Google Plus One button on the page level and uses a global method 'gSP'
     
     <script type="text/javascript" src="http://apis.google.com/js/plusone.js"></script>
     <g:plusone callback="gSP"></g:plusone>
     
 
 */
 
 
  
 
 s.googleSocialSharing=function(a,b,c,d) {
	
	if(b && d.state == "on"){
		b = s.split(b,'>');
		track(b[0],b[1]);		
	}
	
	if(c && d.state == "off"){
		c = s.split(c,'>');
		track(c[0],c[1]);		
	}
	
	function track(m,n){
		s.ltVT=s.linkTrackVars;
		s.ltET=s.linkTrackEvents;
		s.etE=s.events;
					   
		s.linkTrackVars=a?(a+',events'):'events';
		s.linkTrackEvents=n;
		s.events=n;
		if(a){s[a]=m;}
		s.tl(this,'o',m);

		//reset page vars back
		s.linkTrackVars=s.ltVT;
		s.linkTrackEvents=s.ltET;
		s.events=s.etE;
	}
	
}


gSP=function( obj ) {

    /*call the facebookSocialSharing function leveraging the following parameters:
        a = (string, optional) The variable to be populated with b and c: 'eVar50'
        b = (string, optional) The variable/custom link name and the event number to increment on a successful plus one: 'google:plusone>event40'
        c = (string, optional) The variable/custom link name and the event number to increment on a successful minus one: 'google:minusone>event41'
     */   
    s.googleSocialSharing('eVar50','google:plusone>event40','google:minusone>event41',obj);
}