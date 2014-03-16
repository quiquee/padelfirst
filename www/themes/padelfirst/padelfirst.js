/**
 * Implements DrupalGap's template_info() hook.
 */
function padelfirst_info() {
  try {
    var theme = {
      "name":"padelfirst",
      "regions":{
        "header":{
          "attributes":{
            "data-role":"header",
            'data-theme': 'b',
          }
        },
        "navigation":{
          "attributes":{
            "data-role":"navbar"
          }
        },
        "sub_navigation":{
          "attributes":{
            "data-role":"navbar"
          }
        },
        "content":{
          "attributes":{
            "data-role":"content"
          }
        },
        "footer":{
          "attributes":{
            "data-role":"footer",
            'data-theme': 'b',
            'data-position': 'fixed'
          }
        }
      }
    };
    return theme;
  }
  catch (error) { drupalgap_error(error); }
}

