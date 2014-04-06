/**
* Implements hook_menu().
*/
function padelfirst_menu() {
  var items = {};
  items['padelfirst'] = {
    title: 'PadelFirst',
    page_callback: 'padelfirst_page'
  };
  return items;
}

/**
* The callback for the "Hello World" page.
*/
function padelfirst_page() {
  var content = {};
  content['my_paragraph'] = {
    markup: '<p>"Hello World"</p>'
  };
  return content;
}