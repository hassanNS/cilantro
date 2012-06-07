// Generated by CoffeeScript 1.3.3
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['environ', 'mediator', 'jquery', 'underscore', 'backbone'], function(environ, mediator, $, _, Backbone) {
  var Columns;
  return Columns = (function(_super) {

    __extends(Columns, _super);

    function Columns() {
      this.remove = __bind(this.remove, this);

      this.add = __bind(this.add, this);

      this.render = __bind(this.render, this);
      return Columns.__super__.constructor.apply(this, arguments);
    }

    Columns.prototype.template = _.template('\
            <div id=columns-modal class="modal fade">\
                <div class=modal-header>\
                    <a class=close data-dismiss=modal>×</a>\
                    <h3>Data Columns</h3>\
                </div>\
                <div class=modal-body>\
                    <ul class="available-columns span4"></ul>\
                    <ul class="selected-columns span4"></ul>\
                </div>\
                <div class=modal-footer>\
                    <button data-save class="btn btn-primary">Save</button>\
                    <button data-close class=btn>Close</button>\
                </div>\
            </div>\
        ');

    Columns.prototype.availableItemTemplate = _.template('\
            <li data-id={{ id }}>\
                {{ name }}\
                <span class=controls>\
                    <button class="btn btn-success btn-mini">+</button>\
                </span>\
            </li>\
        ');

    Columns.prototype.selectedItemTemplate = _.template('\
            <li data-id={{ id }}>\
                {{ name }}\
                <span class=controls>\
                    <button class="btn btn-danger btn-mini">&mdash;</button>\
                </span>\
            </li>\
        ');

    Columns.prototype.events = {
      'click [data-close]': 'hide',
      'click [data-save]': 'save',
      'click .available-columns button': 'clickAdd',
      'click .selected-columns button': 'clickRemove',
      'mouseenter .available-columns': 'showAvailableControls',
      'mouseleave .available-columns': 'hideAvailableControls',
      'mouseenter .selected-columns': 'showSelectedControls',
      'mouseleave .selected-columns': 'hideSelectedControls'
    };

    Columns.prototype.initialize = function() {
      var _this = this;
      this.setElement(this.template());
      this.$available = this.$('.available-columns');
      this.$selected = this.$('.selected-columns').sortable({
        cursor: 'move',
        forcePlaceholderSize: true,
        placeholder: 'placeholder'
      });
      this.$el.addClass('loading');
      this.collection.deferred.done(function() {
        _this.$el.removeClass('loading');
        return _this.render();
      });
      return App.DataView.deferred.done(function() {
        return _this.collection.deferred.done(function() {
          var id, json, _i, _len, _ref;
          if ((json = App.DataView.session.get('json'))) {
            _ref = json.concepts;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              id = _ref[_i];
              _this.add(id);
            }
          }
        });
      });
    };

    Columns.prototype.render = function() {
      var availableHtml, model, selectedHtml, _i, _len, _ref;
      availableHtml = [];
      selectedHtml = [];
      _ref = this.collection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        availableHtml.push(this.availableItemTemplate(model.attributes));
        selectedHtml.push(this.selectedItemTemplate(model.attributes));
      }
      this.$available.html(availableHtml.join(''));
      this.$selected.html(selectedHtml.join(''));
      return this;
    };

    Columns.prototype.showAvailableControls = function(event) {
      clearTimeout(this._availableControlsTimer);
      return this.$available.find('.controls').fadeIn(100);
    };

    Columns.prototype.hideAvailableControls = function(event) {
      var _this = this;
      clearTimeout(this._availableControlsTimer);
      return this._availableControlsTimer = _.delay(function() {
        return _this.$available.find('.controls').fadeOut(100);
      }, 300);
    };

    Columns.prototype.showSelectedControls = function(event) {
      clearTimeout(this._selectedControlsTimer);
      return this.$selected.find('.controls').fadeIn(100);
    };

    Columns.prototype.hideSelectedControls = function(event) {
      var _this = this;
      clearTimeout(this._selectedControlsTimer);
      return this._selectedControlsTimer = _.delay(function() {
        return _this.$selected.find('.controls').fadeOut(100);
      }, 300);
    };

    Columns.prototype.show = function() {
      return this.$el.modal('show');
    };

    Columns.prototype.hide = function() {
      return this.$el.modal('hide');
    };

    Columns.prototype.save = function() {
      var ids, json;
      this.hide();
      ids = $.map(this.$selected.children(), function(elem) {
        var data;
        if ((data = $(elem).data()).selected) {
          return data.id;
        }
      });
      json = App.DataView.session.get('json') || {};
      json.concepts = ids;
      return App.DataView.session.save('json', json);
    };

    Columns.prototype.add = function(id) {
      this.$available.find("[data-id=" + id + "]").closest('li').hide();
      return this.$selected.find("[data-id=" + id + "]").detach().appendTo(this.$selected).show().data('selected', true);
    };

    Columns.prototype.remove = function(id) {
      this.$selected.find("[data-id=" + id + "]").hide().data('selected', false);
      return this.$available.find("[data-id=" + id + "]").closest('li').show();
    };

    Columns.prototype.clickAdd = function(event) {
      event.preventDefault();
      return this.add($(event.target).closest('li').data('id'));
    };

    Columns.prototype.clickRemove = function(event) {
      event.preventDefault();
      return this.remove($(event.target).closest('li').data('id'));
    };

    return Columns;

  })(Backbone.View);
});
