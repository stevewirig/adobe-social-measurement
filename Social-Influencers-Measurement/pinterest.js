/* Pinterest Influencers
    
    Copyright 1996-2013 Adobe, Inc. All Rights Reserved
    
    This code should go in the plugins section of your Adobe Analytics s_code.js file
    
    This code "sample" is using Yahoo Query Language YQL to screen scrape Pinterest pages.  As Pinterest templates change periodically, the actual query needs to be maintained.  
    
    ***Dependency: split function or you can write your own method to split strings.
    ***Dependency: on the "Integrate Module" that handles timing between 3rd party calls and the page which can be acquired through your Account Manager or Adobe Consultant

 */

 
 
 
s.pinterest=function(eVar){
	var s = this, g, pin;
	g = s.referrer ? s.referrer : document.referrer;
	if(g.indexOf('pinterest.com/pin')!=-1){
		//console.log('referrer is pinterest');
		s.pin = escape(s.split(g,"/")[4]);
		s.Integrate.add("PinterestAuthor");
		s.Integrate.PinterestAuthor.tEvar = eVar;
		s.Integrate.PinterestAuthor.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fpinterest.com%2Fpin%2F'+s.pin+'%2F%22%20and%20xpath%3D\'%2F%2Fp%5B%40id%3D%22PinnerName%22%5D%2Fa\'&format=json&callback=s.pinterestSearch&var=[VAR]');
		s.Integrate.PinterestAuthor.delay();
		s.Integrate.PinterestAuthor.setVars = function(s, p) {
			s[p.tEvar] = s.user;
        }
	}
}

s.pinterestSearch = function(obj) {
	if(obj['query']['results']==null){
		s.user='Not Found';
		s.Integrate.PinterestAuthor.ready();
		return;
	}
	s.user = obj['query']['results']['a']['content'];
	s.Integrate.PinterestAuthor.ready();
}