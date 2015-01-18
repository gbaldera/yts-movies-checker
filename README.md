# yts-movies-checker
A Nodejs script which check Yts.re's rss feed for new movies and send push notifications using Parse

# Usage
1 - Clone this repository

2 - Modify run.sh and set the env variables listed there. For example:

	export SCRIPT_HOME=/path/to/cloned/repository
	export PARSE_APP_KEY=your_parse_app_key
  	export PARSE_JAVASCRIPT_KEY=your_parse_app_javascript_key
  	
3 - Install Node.js: http://nodejs.org/download/ 

4 - Install MongoDB: http://docs.mongodb.org/manual/installation/

5 - Install the dependencies:

	npm install
	
6 - Set a cron job to run the script at certain time. For example run the script every hour:

	0 * * * * /bin/sh /path/to/cloned/repository/run.sh
