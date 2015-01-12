var slug = require('slug')
    , FeedParser = require('feedparser')
    , Parse = require("parse").Parse
    , MongoClient = require('mongodb').MongoClient
    , assert = require('assert')
    , request = require('request')
    , _ = require('underscore');

var req = request('https://yts.re/rss')
    , feedparser = new FeedParser()
    , parsedMovies = [];

var Movie = (function () {
    function Movie(item) {
        this.title = item.title;
        this.link = item.link;
        this.pub_date = item.pubDate;
        this.hash = slug(item.title, "_");
    }
    return Movie;
})();

function filterMovies(db, movies, callback){
    var slugs = _.pluck(movies, "hash");
    var collection = db.collection('movies');

    // Find already inserted movies
    collection.find({"hash": {$in:slugs}}).toArray(function(err, alreadyInsertedMovies) {
        assert.equal(err, null);

        // take the ones that are not included
        var alreadyInsertedSlugs = _.pluck(alreadyInsertedMovies, "hash");
        var filteredMovies = _.reject(movies, function(movie){
            return _.contains(alreadyInsertedSlugs, movie.hash);
        });

        callback(filteredMovies);
    });
}
function insertMovies(db, movies, callback){
    movies = movies || [];

    if(!movies.length){
        return callback(movies);
    }

    var collection = db.collection('movies');

    // Insert filtered movies
    collection.insert(movies, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted "+ movies.length +" documents into the movies collection");
        callback(movies);
    });
}
function sendPushNotifications(movies){
    console.log("new movies:");
    console.log(movies);
    if(!movies.length){
        return;
    }

    // TODO: read these values from env vars
}

req.on('error', function (error) {
    // handle any request errors
});
req.on('response', function (res) {
    var stream = this;

    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

    stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
    // always handle errors
    console.log(error);
});
feedparser.on('readable', function() {
    var stream = this
        , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
        , item;

    while (item = stream.read()) {
        parsedMovies.push(new Movie(item));
    }
});
feedparser.on('end', function(){ // This is where the action is!
    if(parsedMovies.length){

        // Connection URL
        var url = 'mongodb://localhost:27017/yts';

        // Use connect method to connect to the Server
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            filterMovies(db, movies, function(filteredMovies){
                insertMovies(db, filteredMovies, function(insertedMovies){
                    db.close();
                    sendPushNotifications(insertedMovies);
                });
            });
        });
    }
});