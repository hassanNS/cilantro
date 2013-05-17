define [
    './core'
], (c) ->


    class Index extends c.Backbone.Model
        defaults:
            visible: true

        show: ->
            @set visible: true

        hide: ->
            @set visible: false



    class Indexes extends c.Backbone.Collection
        model: Index


    class Datum extends c.Backbone.Model
        constructor: (attrs, index, options) ->
            if not (index instanceof Index)
                index = new Index index
            @index = index
            super(attrs, options)

        size: -> 1

        width: -> 1


    # Internal container for the Series. It is a collection of Datum objects.
    class _DatumArray extends c.Backbone.Collection
        constructor: (attrs, indexes, options) ->
            @indexes = indexes
            super(attrs, options)

        model: (value, options) =>
            # Collections length are not updated immediately, so this uses
            # the internal hash to determine the next index
            index = @indexes.at(c._.keys(@_byId).length)

            new Datum
                value: value
            ,
                index


    class Series extends c.Backbone.Model
        constructor: (attrs, indexes, options={}) ->
            if not (indexes instanceof Indexes)
                indexes = new Indexes indexes
            @indexes = indexes

            if c._.isArray(attrs)
                data = attrs
                attrs = null
            else
                options.parse = true

            @data = new _DatumArray data, indexes

            super(attrs, options)

        parse: (resp, options) ->
            @data.reset(resp.values, options)
            return

        isColumn: ->
            @width() is 1

        isRow: ->
            not @isColumn()

        size: ->
            if @isColumn() then @data.length else 1

        width: ->
            @indexes.length

    # Internal container for the Frame. It is a collection of Series objects.
    class _SeriesArray extends c.Backbone.Collection
        constructor: (attrs, indexes, options) ->
            @indexes = indexes
            super(attrs, options)

        model: (attrs, options) =>
            new Series attrs, @indexes, options


    class Frame extends c.Backbone.Model
        options:
            paginate: true
            paginateBy: 50

        constructor: (attrs, indexes, options={}) ->
            if not (indexes instanceof Indexes)
                indexes = new Indexes indexes
            @indexes = indexes

            if c._.isArray(attrs)
                data = attrs
                attrs = null
            else
                options.parse = true

            @series = new _SeriesArray data, indexes

            super(attrs, options)

        parse: (resp, options) ->
            @indexes.reset(resp.keys, options)
            @series.reset(resp.objects, options)
            return

        size: ->
            @series.length

        width: ->
            @indexes.length

        column: (index) ->
            data = @series.map (series) ->
                series.data.at(index)
            new Series data, @indexes.at(index)


    { Frame, Series, Datum, Index, Indexes }