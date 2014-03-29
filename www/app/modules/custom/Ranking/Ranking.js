/**
 * Implements hook_block_info().
 */
function Ranking_block_info() {
  var blocks = {
	booking_block: {
      delta: 'booking_block',
      module: 'Ranking'
    }
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
		// Place an empty item tabkle with ranking.
		var header = [];
		header.push({data: 'Pos'});
		header.push({data: 'Team'});
		header.push({data: 'J'});
		header.push({data: 'G'});
		header.push({data: 'P'});
		header.push({data: 'F'});
		header.push({data: 'C'});
		var rows = [];
		var content = {
				'ranking_list': {
					'theme': 'table',
					'header': header,
					'rows': rows,
					'attributes': {'id': 'Ranking_list'}
				}
		};
		 console.log('Ranking_list - list created');
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
				var rows = [];
				var rank = 0;
				$.each(data.ranking, function(index, object) {
					rank = rank + 1;
					var pos = object.position;
					rows.push([rank, 
					           l(pos.team,"leage/matches/?team=" + pos.team), 
					           pos.Jugados, pos.Ganados, pos.Perdidos, pos.SetsFavor, pos.SetsContra]);

				});
				drupalgap_table_populate('#Ranking_list', rows);
			}
		});
		console.log( $('#Ranking_list').html());
	}
	catch (error) { console.log('Ranking_pageshow - ' + error); }
}



