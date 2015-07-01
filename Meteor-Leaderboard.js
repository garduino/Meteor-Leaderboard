
if(Meteor.isClient){ 
	
 Template.leaderboard.helpers({
    'player': function(){
        return PlayersList.find({}, {sort: {score: -1, name: 1} })
    },
   'selectedClass': function(){ 
   	   var playerId = this._id;
   	   var selectedPlayer = Session.get('selectedPlayer');
   	   if(playerId == selectedPlayer){
   	   return "selected" }
   } ,
   'numberOfPlayers': function(){
   return PlayersList.find().count();
   },
   'showSelectedPlayer': function(){
   	   var selectedPlayer = Session.get('selectedPlayer');
   	   return PlayersList.findOne(selectedPlayer)
}
  });

  Template.leaderboard.events({
    'click .player': function(){
        var playerId = this._id; 
        Session.set('selectedPlayer', playerId);
        // var selectedPlayer = Session.get('selectedPlayer');
        // console.log(selectedPlayer);
    },
       // 'dblclick .player': function(){
      // console.log("You DOUBLE clicked a .player element");
    // },
    //   'mouseover .player': function(){
    //  console.log("The mouse is over a .player element");
    // }
    'click .increment': function(){
    	var selectedPlayer = Session.get('selectedPlayer');
    	PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },
       'click .decrement': function(){
    	var selectedPlayer = Session.get('selectedPlayer');
    	PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    },
    'click .remove': function(){
    	var selectedPlayer = Session.get('selectedPlayer');
    	
    	if (confirm('Are you sure?')) { 
 	PlayersList.remove(selectedPlayer);
 		}
    	
    }
    
  });
  
  Template.addPlayerForm.events({
  'submit form': function(event){
  	  event.preventDefault();
  	  var playerNameVar = event.target.playerName.value;
  	  var playerScoreVar = event.target.playerScore.value;
  	 PlayersList.insert({
  	 		 name: playerNameVar,
  	 		 score: playerScoreVar,
  	 		});
  	 // pedido en el summary, resetear playerName field a un valor vacío.
  	 event.target.playerName.value = '';
  	 event.target.playerScore.value = 0;
  		  }
  });
	
		
}


if(Meteor.isServer){ 
}

PlayersList = new Mongo.Collection('players');
