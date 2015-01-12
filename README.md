# yts-movies-checker
A Nodejs script which check Yts.re's rss feed for new movies and send push notifications using Parse

# Usage
1 - Clone this repository

2 - Set env variables for PARSE_APP_KEY and PARSE_JAVASCRIPT_KEY. For example add those variables to your .bash_profile file:

	export PARSE_APP_KEY=your_parse_app_key
  	export PARSE_JAVASCRIPT_KEY=your_parse_app_javascript_key
  	
3 - Install Node.js: http://nodejs.org/download/ 

4 - Install MongoDB: http://docs.mongodb.org/manual/installation/

5 - Install the dependencies:

	npm install
	
6 - Set a cron job to run the script at certain time. For example run the script every hour:

	0 * * * * /usr/local/bin/node /path/to/cloned/repository/movies_checker.js
