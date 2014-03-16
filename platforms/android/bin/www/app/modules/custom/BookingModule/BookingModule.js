/**
 * Implements hook_block_info().
 */
function BookingModule_block_info() {
  var blocks = {
	booking_block:{
      delta:'booking_block',
      module:'BookingModule',
    },
  };
  return blocks;
}

/**
 * Implements hook_block_view().
 */
function BookingModule_block_view(delta) {
  var content = '';
  if (delta == 'booking_block') {
    // Show today's date for the block's content.
    var d = new Date();
    // content = '<center>' + d.toDateString() + '</center>';
    content = '<center>Juega al Padel<br> en Ginebra</center>';
  }
  return content;
}