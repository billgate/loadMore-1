"use strict";

(function($) {


var Loadmore = function(element, options) {
  this.$element = element,
  this.$loader = $(options.loader),
  this.height = element.height();
  this.options = options;
  this.addListeners();
}

Loadmore.prototype.addListeners = function() {
  var self = this;

  this.$element.on('scroll', function() {
    self.scrolled()
  });
}

Loadmore.prototype.stopListner = function() {
  this.$element.unbind('scroll');
}

Loadmore.prototype.scrolled = function() {
  var contentClass = this.options.contentClass,
    contentHeight = this.$element.find('.'+ contentClass).height();
  
  if ((this.$element.scrollTop() + this.options.offset) >= (contentHeight -  this.height)) {
    this.stopListner();
    this.fetch();
  }
}

Loadmore.prototype.fetch = function() {
  var self = this,
    url = self.options.url + '?'+ self.options.name +'='+ self.options.page,
    contentClass = self.options.contentClass;

  self.$element.find('.'+ contentClass).append(self.$loader);
  $.ajax({
    method: 'GET', 
    url: url,
    success: function(response) {
      self.options.page++;
      self.addListeners();
      self.$loader.remove();
      self.success(response);
    },
    error: function(response) {
      self.error(response);
    }
  })
} 


// plugin defaults
Loadmore.DEFAULTS = {
  'contentClass': 'content'
}

// creates the Plugin
function Plugin(option) {
    var data  = this.data('plugin.loadmore'),
    loadmore = false,
    options = $.extend({}, Loadmore.DEFAULTS, option);


    if (!data) {
      loadmore =  new Loadmore(this, options);
      this.data('plugin.dropdown', (data = loadmore));
    }

    return loadmore;
}

$.fn.loadmore = Plugin;
})(jQuery) 



  