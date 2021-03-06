/* global define, require */

define([
    'underscore',
    'loglevel',

    'tpl!templates/count.html',
    'tpl!templates/notification.html',
    'tpl!templates/paginator.html',
    'tpl!templates/panel.html',
    'tpl!templates/search.html',
    'tpl!templates/welcome.html',

    'tpl!templates/accordion/group.html',
    'tpl!templates/accordion/section.html',
    'tpl!templates/accordion/item.html',

    'tpl!templates/base/error-overlay.html',

    'tpl!templates/button/select-option.html',
    'tpl!templates/button/select.html',

    'tpl!templates/charts/chart.html',
    'tpl!templates/charts/editable-chart.html',

    'tpl!templates/concept/columns/available-group.html',
    'tpl!templates/concept/columns/available-section.html',
    'tpl!templates/concept/columns/available-item.html',
    'tpl!templates/concept/columns/selected-item.html',
    'tpl!templates/concept/columns/layout.html',
    'tpl!templates/concept/columns/dialog.html',

    'tpl!templates/concept/error.html',
    'tpl!templates/concept/form.html',
    'tpl!templates/concept/info.html',
    'tpl!templates/concept/panel.html',
    'tpl!templates/concept/workspace.html',
    'tpl!templates/concept/popover.html',

    'tpl!templates/export/dialog.html',
    'tpl!templates/export/option.html',
    'tpl!templates/export/batch.html',
    'tpl!templates/export/progress.html',

    'tpl!templates/context/panel.html',
    'tpl!templates/context/actions.html',
    'tpl!templates/context/info.html',
    'tpl!templates/context/empty.html',
    'tpl!templates/context/filter.html',

    'tpl!templates/controls/infograph/bar.html',
    'tpl!templates/controls/infograph/layout.html',
    'tpl!templates/controls/infograph/toolbar.html',

    'tpl!templates/controls/range/layout.html',

    'tpl!templates/controls/select/layout.html',
    'tpl!templates/controls/select/list.html',

    'tpl!templates/controls/search/layout.html',
    'tpl!templates/controls/search/item.html',

    'tpl!templates/controls/null/layout.html',

    'tpl!templates/field/form-condensed.html',
    'tpl!templates/field/form.html',
    'tpl!templates/field/info.html',
    'tpl!templates/field/stats.html',
    'tpl!templates/field/links.html',
    'tpl!templates/field/link.html',

    'tpl!templates/query/delete-dialog.html',
    'tpl!templates/query/edit-dialog.html',
    'tpl!templates/query/item.html',
    'tpl!templates/query/list.html',
    'tpl!templates/query/loader.html',

    'tpl!templates/values/list.html',

    'tpl!templates/workflows/query.html',
    'tpl!templates/workflows/results.html',
    'tpl!templates/workflows/workspace.html'

], function(_, loglevel) {

    // Built-in templates and application-defined templates
    var defaultTemplates = {},
        customTemplates = {};

    // Derives a template id from the template's path. This is an internal
    // function that assumes the base directory is under templates/
    var pathToId = function(name) {
        // Remove templates dir prefix, strip extension
        return name.replace(/^templates\//, '').replace(/\.html$/, '');
    };

    // Registers all built-in templates using the augmented _moduleName from
    // a modified version of the RequireJS tpl plugin.
    var templates = [].slice.call(arguments, 2);

    _.each(templates, function(func) {
        func.templateId = pathToId(func._moduleName);
        defaultTemplates[func.templateId] = func;
    });

    // Templates can be registered as AMD modules which will be immediately
    // fetched to obtain the resulting compiled template function. This is
    // count of the number of pending AMD modules that have not been fetched.
    var pendingRemotes = 0;

    // Loads the remote template and adds it to the custom cache.
    var loadRemote = function(id, module) {
        pendingRemotes++;

        require([
            module
        ], function(func) {
            customTemplates[id] = func;
            pendingRemotes--;
        }, function(err) {
            loglevel.debug(err);
            pendingRemotes--;
        });
    };

    // Handles the case when the registered function is *not* a function.
    var _set = function(id, func) {
        switch (typeof func) {
            case 'function':
                customTemplates[id] = func;
                break;
            case 'string':
                loadRemote(id, func);
                break;
            default:
                throw new Error('template must be a function or AMD module');
        }
    };

    return {
        // Get the template function by id. Checks the custom cache and falls back
        // to the built-in cache.
        get: function(id) {
            return customTemplates[id] || defaultTemplates[id];
        },

        // Sets a template in cache.
        set: function(id, func) {
            if (typeof id === 'object') {
                _.each(id, function(func, key) {
                    _set(key, func);
                });
            }
            else {
                _set(id, func);
            }
        },

        // Returns a boolean denoting if all AMD-based templates have been loaded.
        ready: function() {
            return pendingRemotes === 0;
        },

        // Clears the custom templates
        clear: function() {
            customTemplates = {};
        }
    };

});
