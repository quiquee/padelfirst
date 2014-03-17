/**
 * Implements hook_block_info().
 */
function PlayersModule_block_info() {
  var blocks = {
	booking_block:{
      delta:'booking_block',
      module:'PlayersModule',
    },
  };
  return blocks;
}

/**
 * Implements hook_block_view().
 */
function PlayersModule_block_view(delta) {
  var content = '';
  if (delta == 'booking_block') {
    // Show today's date for the block's content.
    var d = new Date();
    // content = '<center>' + d.toDateString() + '</center>';
    content = '<center>Juega al Padel<br> en Ginebra</center>';
  }
  return content;
}

/**
 * Implements hook_menu().
 */
function PlayersModule_menu() {
  var items = { 'PlayersModule/list': {
      'title': 'Padelfirst Players',
      'page_callback': 'PlayersModule_list',
      'pageshow': 'PlayersModule_pageshow'
    }
  };
  
  return items;
}

function PlayersModule_list() {
	try {
		// Place an empty item list that will hold a list of users.
		var content = {
				'user_listing': {
					'theme': 'jqm_item_list',
					'title': 'Users',
					'items': [],
					'attributes': {'id': 'PlayersList_items'}
				}		
		};	
		 console.log('PlayersModule_list - list created' ) ;
		return content;
	}
	catch (error) { console.log('PlayersModule_list - ' + error); 
	}
}


/**
 * The pageshow callback handler for the user listing page.
 */
function PlayersModule_pageshow() {
	try {
		// Grab some users and display them.
		drupalgap.views_datasource.call({
			'path': 'drupalgap/views_datasource/padel_players',
			'success': function(data) {
				// Extract the users into items, then drop them in the list.
				var items = [];
				$.each(data.players, function(index, object) {
					items.push(l(object.player.nombre + ' ' + object.player.apellido , 'user/' + object.player.email));
				});
				drupalgap_item_list_populate('#PlayersList_items', items);
			}
		});
	}
	catch (error) { console.log('PlayersModule_pageshow - ' + error); }
}



