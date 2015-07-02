
if(Meteor.isClient){ 
	
 Template.leaderboard.helpers({
    'player': function(){
        // With the following code, only the users created by the current user are displayed
        // var currentUserId = Meteor.userId();
        // return PlayersList.find({createdBy: currentUserId},{sort: {score: -1, name: 1}});
	// After put in place the feature of publishing/subscribe, is not more needed 
        // the above way to show only records belonging to the logged user.
        // In the book exist also the next sentence:
        // var currentUserId = Meteor.userId();
        // but I think is not needed because the data is already filtered for the logged user
        return PlayersList.find({}, {sort: {score: -1, name: 1}});
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
    	// PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    	Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
       'click .decrement': function(){
    	var selectedPlayer = Session.get('selectedPlayer');
    	//PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    	Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    },
    'click .remove': function(){
    	var selectedPlayer = Session.get('selectedPlayer');
    	
    	if (confirm('Are you sure?')) { 
 	//PlayersList.remove(selectedPlayer);
 	Meteor.call('removePlayerData', selectedPlayer);
 		}
    	
    }
    
  });
  
  Template.addPlayerForm.events({
  'submit form': function(event){
  	  event.preventDefault();
  	  var playerNameVar = event.target.playerName.value;
  	  var playerScoreVar = event.target.playerScore.value;
  	 // var currentUserId = Meteor.userId();
  	 //PlayersList.insert({
  	 //		 name: playerNameVar,
  	 //		 score: playerScoreVar,
  	 //		 createdBy: currentUserId
  	 //		});
  	 // pedido en el summary, resetear playerName field a un valor vac�o.
  	 Meteor.call('insertPlayerData', playerNameVar, playerScoreVar);
  	 event.target.playerName.value = '';
  	 event.target.playerScore.value = 0;
  		  }
  });
   
  Meteor.subscribe('thePlayers');
		
}


if(Meteor.isServer){
	Meteor.publish('thePlayers', function(){
			var currentUserId = this.userId;
			return PlayersList.find({createdBy: currentUserId})
			});



Meteor.methods({ 'insertPlayerData': function(playerNameVar, playerScoreVar){
var currentUserId = Meteor.userId(); PlayersList.insert({
            name: playerNameVar,
            score: playerScoreVar,
            createdBy: currentUserId
}); },

'removePlayerData': function(selectedPlayer){
	var currentUserId = Meteor.userId();
	PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});
},

'modifyPlayerScore': function(selectedPlayer, scoreValue){
	var currentUserId = Meteor.userId();
	PlayersList.update( {_id: selectedPlayer, createdBy: currentUserId},
                        {$inc: {score: scoreValue} });
}

});
	
	
	
}

PlayersList = new Mongo.Collection('players');
