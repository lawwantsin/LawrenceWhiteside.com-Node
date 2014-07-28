define(['jquery', 'can', '../controls/app'], function($, can, App) {
  App.Models.Contact = can.Model.extend({

    create: 'POST /contact'

  }, {});

});
