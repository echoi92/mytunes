// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});

    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(model.get('currentSong'));
      this.songQueueView.render();
    }, this);

    this.songQueueView.collection.on('add', function(model){
      this.songQueueView.render();
    }, this);

    this.songQueueView.collection.on('change: songQueue', function(){
      this.songQueueView.render();
    });
    

    this.libraryView.collection.on('play', function(song){
      this.set('currentSong', song);
    }, this);

    var that = this;

    this.songQueueView.collection.on('songEnded', function(song){
      var queueArray = that.songQueueView.collection.models;
      console.log('queueArray is ', queueArray)
      console.log('song is ', song)
      var songIndex = queueArray.indexOf(song);
      console.log('songIndex is ', songIndex)
      if(songIndex===0){
        queueArray.shift();
        console.log('shifted!')
        if(queueArray.length>0){
          queueArray[0].play();
        }else{
          this.songQueueView.render();
        }
      }else{
        queueArray.splice(songIndex, 1);
        console.log('spliced!')
        console.log(this.models);
        if(songIndex===0){
          queueArray[0].play();
        }else{
          this.songQueueView.render();
        }
      }
    }, this);


  },


  render: function(){
    return this.$el.html([
      this.playerView.$el,
      this.libraryView.$el,
      this.songQueueView.$el
    ]);
  }

});
