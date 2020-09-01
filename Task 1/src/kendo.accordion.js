(function (f, define) {
    define(["./kendo.data"], f);
})(function () {

    var __meta__ = { // jshint ignore:line
        id: "accordion",
        name: "Accordion",
        category: "web",
        description: "The Accordion widget displays a collection of sections with associated animated toggling containers",
        depends: ["data"],
        features: [{
            id: "accordion-fx",
            name: "Animation",
            description: "Support for animation",
            depends: ["fx"]
        }]
    };

    (function ($, undefined) {

        var kendo = window.kendo,
            ui = kendo.ui,
            Widget = ui.Widget,
            CLICK = 'click';
        EXPANDED = 'k-accordion-expanded',
            CHANGE = "change";

        var Accordion = Widget.extend({

            init: function (element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);

                that._templates();

                that._wrapper();

                that._dataSource();

                that._updateClasses();



                that.wrapper.children('h3')
                    .on(CLICK, function (e) {

                        var item = $(e.currentTarget);
                        if (!item.hasClass(EXPANDED)) {
                            that._expand(item);
                        } else {
                            that._collapse(item);
                        }
                    })

            },

            _templates: function () {
                var that = this,
                    nameTemplate = that.options.nameTemplate || '#= data.Name #',
                    contentTemplate = that.options.contentTemplate || '#= data.Content #',
                    expanded = '#= data.expanded ? "k-accordion-expanded" : "" #';
                that.template = kendo.template('<h3 class="k-accordion-heading k-item ' + expanded + '">' + nameTemplate + '</h3><div class="k-accordion-content k-item">' + contentTemplate + '</div>');
            },

            _expand: function (item) {
                var that = this;



                // 
                if (!that.options.keepOpen) {
                    that._collapseAll();
                }


                var itemContent = item.next('div.k-accordion-content'),
                    collapsedHeight = 0,
                    expandedHeight = itemContent.css('height', 'auto').height();

                that._animateHeight(item, collapsedHeight, expandedHeight);
                item.addClass(EXPANDED);
            },

            _collapse: function (item) {

                var that = this,
                    itemContent = item.next('div.k-accordion-content'),
                    collapsedHeight = 0,
                    expandedHeight = itemContent.css('height', 'auto').height();

                that._animateHeight(item, expandedHeight, collapsedHeight);

                item.removeClass(EXPANDED);
            },

            _collapseAll: function () {
                var that = this,
                    currentlyExpanded = $('.' + EXPANDED);
                that._collapse(currentlyExpanded);
            },

            _animateHeight: function (item, start, end) {
                var that = this,
                    itemContent = item.next('div.k-accordion-content');

                itemContent.height(start).animate({ height: end }, that.options.animation.close.duration);
            },



            options: {
                name: "Accordion",
                autoBind: true,
                template: "",
                nameTemplate: "",
                contentTemplate: "",
                keepOpen: false,
                expanded: false,
                animation: {
                    open: {
                        duration: 200
                    },
                    close: {
                        duration: 200
                    }
                }
            },

            refresh: function () {
                var that = this,
                    view = that.dataSource.view(),
                    html = kendo.render(that.template, view);

                that.element.html(html);
            },



            _dataSource: function () {
                var that = this;

                // Returns the datasource OR creates one if using array or configuration.
                that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

                // Bind to the change event to refresh the widget.
                that.dataSource.bind(CHANGE, function () {
                    that.refresh();
                });

                // Trigger read on the dataSource if one has not happened yet.
                if (that.options.autoBind) {
                    that.dataSource.fetch();
                }

            },

            _updateClasses: function () {
                var that = this;
                that.wrapper.addClass("k-widget k-header k-accordion-menu");

            },

            _wrapper: function () {
                var that = this;

                that.wrapper = that.element;
            },




        });

        kendo.ui.plugin(Accordion);

    })(window.kendo.jQuery);

    return window.kendo;

}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) { (a3 || a2)(); });