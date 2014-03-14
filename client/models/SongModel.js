// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({

  play: function(){
    // Triggering an event here will also trigger the event on the collection
    
    this.trigger('play', this);
    console.log('play triggered!');
  },

  selectSong:function(){
    this.trigger('selectSong', this);
  },

  songEnded:function(){
    this.trigger('songEnded', this);
  }

});
