define(['jquery', 'can', '../controls/app'], function($, can, App) {

  App.Maps.Contact  = can.Map.extend({

    init :function() {
      this.validatePresenceOf('name', {message: 'Please include your name'});
      this.validatePresenceOf('email', {message: 'Please include your E-Mail'});
      this.validateFormatOf('email', /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/, {message: 'Please include your E-Mail'});
      this.validatePresenceOf('message', {message: 'Please include a small description of your needs'});
    }

  }, {});

  App.Models.Contact = can.Model.extend({

    create: 'POST /contact'

  }, {});

});
