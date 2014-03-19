/**
 * Implements hook_block_info().
 */
function Ranking_block_info() {
  var blocks = {
	booking_block:{
      delta:'booking_block',
      module:'Ranking',
    },
  };
  return blocks;
}

/**
 * Implements hook_block_view().
 */
function Ranking_block_view(delta) {
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
function Ranking_menu() {
  var items = { 'Ranking/list': {
      'title': 'Padelfirst Rankings',
      'page_callback': 'Ranking_list',
      'pageshow': 'Ranking_pageshow'
    }
  };
  
  return items;
}

function Ranking_list() {
	try {
		// Place an empty item list that will hold a list of users.
		var content = {
				'user_listing': {
					'theme': 'jqm_item_list',
					'title': 'Padelfirst Rankings',
					'items': [],
					'attributes': {'id': 'RankingList_items'}
				}		
		};	
		 console.log('Ranking_list - list created' ) ;
		return content;
	}
	catch (error) { console.log('Ranking_list - ' + error); 
	}
}


/**
 * The pageshow callback handler for the user listing page.
 */
function Ranking_pageshow() {
	try {
		// Grab some users and display them.
		drupalgap.views_datasource.call({
			'path': 'drupalgap/views_datasource/padel_ranking',
			'success': function(data) {
				// Extract the users into items, then drop them in the list.
				var items = [];
				var rank = 0;
				$.each(data.ranking, function(index, object) {
					rank=rank+1;
					items.push(l(rank + ' ' + object.position.team + ' ' + object.position.Ganados , 'team/' + object.position.team));
					
				});
				drupalgap_item_list_populate('#RankingList_items', items);
			}
		});
	}
	catch (error) { console.log('Ranking_pageshow - ' + error); }
}



