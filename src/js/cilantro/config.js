/* global define */

define([
    'jquery',
    './utils'
], function($, utils) {


    var defaultOptions = {
        // Run in debug mode to turn off various behaviors that impede
        // development and increase logging output to the console.
        debug: false,

        // The root URL to the application. If falsy, default is '/'
        root: '/',

        // The selector of the element views will be rendered within.
        main: '#cilantro-main',


        /*
         * Sessions
         *
         * - url: The URL of the API
         * - ping: The ping interval for endpoints that support it.
         * - data: Keys correspond to each resource under the `session.data`
         *   object. The value corresponds to GET or POST data to be
         *   used during a fetch.
         */

        session: {
            defaults: {
                url: null,
                credentials: null,
                ping: 30000, // 30 seconds
                data: {}
            }
        },

        // Convenience option: URL of the default session
        url: null,

        // Convenience option: Credentials for the default session
        credentials: null,
        /*
         * Threshold for showing counts of results as rounded and/or
         * prefixed numbers. set this threshold to be a number and if the
         * displayed counts are less than the threshold, there will be no
         * rounding and the count will be displayed as is (precise).
         */
         threshold: null,


        /*
         * Timeouts
         *
         * Timeouts for various components in Cilantro.
         */

        timeouts: {
            control: 10000
        },


        /*
         * Templates
         *
         * Maps template names to module paths or pre-compiled functions.
         */

        templates: {},


        /*
         * Controls
         *
         * Keys represent the names of the controls and the value is either
         * a control class or a module name (that will be fetched on demand).
         *
         * Built-in controls:
         * - infograph: cilantro/ui/controls/infograph
         * - number: cilantro/ui/controls/number
         * - date: cilantro/ui/controls/date
         * - search: cilantro/ui/controls/search
         * - singleSelectionList: cilantro/ui/controls/select
         * - multiSelectionList: cilantro/ui/controls/select
         * - nullSelector: cilantro/ui/controls/null
         */

        controls: {},

        /*
         * Concepts
         *
         * Shared:
         *
         * - form: options for ConceptForm, a ConceptForm subclass, a module name
         *
         * Precedence hierarchy:
         *
         * - defaults: default options for the component
         * - types: specific to concept type, overrides defaults
         * - instances: specific to a concept instance, overrides types
         */

        concepts: {

            defaults: {},

            types: {},

            instances: {}

        },

        /*
         * Fields
         *
         * Shared:
         *
         * - form: options for FieldForm, a FieldForm subclass, a module name
         *     - chart: true (show), false (hide; default), options (show)
         *     - info: true (show), false (hide), null (hide if only field in concept)
         *     - stats: true (show; default), false (hide)
         *     - controls: options for default control or a Control subclass
         *
         * Instance-only:
         *
         * - type: string explicitly defining an instance's type
         *
         * Precedence hierarchy:
         *
         * - defaults: default options for the component
         * - types: specific to concept type, overrides defaults
         * - instances: specific to a concept instance, overrides types
         *
         */

        fields: {

            defaults: {
                form: {
                    controls: ['search']
                }
            },

            types: {
                choice: {
                    form: {
                        controls: ['infograph']
                    }
                },

                number: {
                    form: {
                        chart: true,
                        controls: ['number']
                    }
                },

                date: {
                    form: {
                        chart: true,
                        controls: ['date']
                    }
                },

                time: {
                    form: {
                        chart: true,
                        controls: ['date']
                    }
                },

                datetime: {
                    form: {
                        chart: true,
                        controls: ['date']
                    }
                }
            },

            instances: {}
        }
    };


    // Takes N number of option objects with increasing precedence and deep
    // merges them with the default options.
    var Config = function() {
        this.reset.apply(this, arguments);
    };

    Config.prototype.reset = function() {
        var options = [].slice.call(arguments);
        this.options = $.extend.apply(null, [true, {}, defaultOptions].concat(options));
    };

    Config.prototype.get = function(key, def) {
        return utils.getDotProp(this.options, key, def);
    };

    Config.prototype.set = function(key, value) {
        utils.setDotProp(this.options, key, value);
    };

    Config.prototype.unset = function(key) {
        utils.setDotProp(this.options, key, undefined);
    };


    return {
        Config: Config,
        defaultOptions: defaultOptions
    };

});
