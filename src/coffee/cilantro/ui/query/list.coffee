define [
    'underscore'
    'marionette'
    '../core'
    './item'
    './dialog'
    'tpl!templates/query/list.html'
], (_, Marionette, c, item, dialog, templates...) ->

    templates = _.object ['list'], templates

    class QueryList extends Marionette.CompositeView
        emptyView: item.EmptyQueryItem

        itemView: item.QueryItem

        itemViewContainer: '.items'

        template: templates.list

        itemViewOptions: (model, index) ->
            model: model
            view: @data.view
            context: @data.context
            index: index
            editable: @editable

        ui:
            title: '.title'

        initialize: ->
            @data = {}

            @editable = if @options.editable? then @options.editable else true

            if not (@data.context = @options.context)
                throw new Error 'context model required'
            if not (@data.view = @options.view)
                throw new Error 'view model required'

            if not (@title = @options.title)
                @title = 'Queries'

            @editQueryRegion = @options.editQueryRegion
            @deleteQueryRegion = @options.deleteQueryRegion

            @on 'itemview:showEditQueryModal', (options) ->
                @editQueryRegion.currentView.open(options.model)
            @on 'itemview:showDeleteQueryModal', (options) ->
                @deleteQueryRegion.currentView.open(options.model)

            @editQueryRegion.show new dialog.EditQueryDialog
                header: 'Edit Query'
                collection: @collection
                context: @data.context
                view: @data.view

        onRender: ->
            @ui.title.html(@title)

            @deleteQueryRegion.show new dialog.DeleteQueryDialog
                collection: @collection

    { QueryList }
