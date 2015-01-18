#!/bin/bash
export SCRIPT_HOME=/path/to/cloned/repository
export PARSE_APP_KEY=your_parse_app_key
export PARSE_JAVASCRIPT_KEY=your_parse_app_javascript_key

cd $SCRIPT_HOME
# if you are using Ubuntu/Debian change node for nodejs
/usr/bin/node movies_checker.js
