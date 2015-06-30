
if(Meteor.isClient){ 
	
 Template.leaderboard.helpers({
    'player': function(){
        return PlayersList.find()
    },
   'selectedClass': function(){ 
   	   var playerId = this._id;
   	   var selectedPlayer = Session.get('selectedPlayer');
   	   if(playerId == selectedPlayer){
   	   return "selected" }
   } ,
   'numberOfPlayers': function(){
   return PlayersList.find().count();
   }
  });

  Template.leaderboard.events({
    'click .player': function(){
        var playerId = this._id; 
        Session.set('selectedPlayer', playerId);
        // var selectedPlayer = Session.get('selectedPlayer');
        // console.log(selectedPlayer);
    },
       'dblclick .player': function(){
      console.log("You DOUBLE clicked a .player element");
    },
       'mouseover .player': function(){
      console.log("The mouse is over a .player element");
    }
    
  });
	
		
}


if(Meteor.isServer){ 
}

PlayersList = new Mongo.Collection('players');
