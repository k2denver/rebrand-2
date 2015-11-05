
	$('a:not([href])').click(function(){
        // = this;
        $(this).next('ul').toggleClass('open-up');
        //$(this).toggleClass('open-up');
    });

    $('#menu-icon').click(function() {
        $('body').toggleClass('mobile-menu-up');
    });
    $('#menu-close').click(function() {
        $('body').toggleClass('mobile-menu-up');
    });

$('#phone-close').click(function(){
    $('.iphone-widget').hide();
});



var loginServer = "http://login.k2.com";
if (window.location.href.indexOf("01.") > -1) loginServer = "http://login01.k2.com";
if (window.location.href.indexOf("dev.") > -1) loginServer = "http://dev.login.k2.com";
/*********STICKY SCROLL*************/
/**
* StickyScroll
* written by Rick Harris - @iamrickharris
* 
* Requires jQuery 1.4+
* 
* Make elements stick to the top of your page as you scroll
*
* See README for details
*
*/

(function ($) {
    $.fn.stickyScroll = function (options) {

        var methods = {

            init: function (options) {

                var settings;

                if (options.mode !== 'auto' && options.mode !== 'manual') {
                    if (options.container) {
                        options.mode = 'auto';
                    }
                    if (options.bottomBoundary) {
                        options.mode = 'manual';
                    }
                }

                settings = $.extend({
                    mode: 'auto', // 'auto' or 'manual'
                    container: $('body'),
                    topBoundary: null,
                    bottomBoundary: null
                }, options);

                function bottomBoundary() {
                    return $(document).height() - settings.container.offset().top
            - settings.container.attr('offsetHeight');
                }

                function topBoundary() {
                    return settings.container.offset().top
                }

                function elHeight(el) {
                    return $(el).attr('offsetHeight');
                }

                // make sure user input is a jQuery object
                settings.container = $(settings.container);
                if (!settings.container.length) {
                    if (console) {
                        console.log('StickyScroll: the element ' + options.container +
              ' does not exist, we\'re throwing in the towel');
                    }
                    return;
                }

                // calculate automatic bottomBoundary
                if (settings.mode === 'auto') {
                    settings.topBoundary = topBoundary();
                    settings.bottomBoundary = bottomBoundary();
                }

                return this.each(function (index) {

                    var el = $(this),
            win = $(window),
            id = (new Date()) + index,
            height = elHeight(el);

                    el.data('sticky-id', id);

                    win.bind('scroll.stickyscroll-' + id, function () {
                        var top = $(document).scrollTop(),
              bottom = $(document).height() - top - height;

                        if (bottom <= settings.bottomBoundary) {
                            el.offset({
                                top: $(document).height() - settings.bottomBoundary - height
                            })
              .removeClass('sticky-active')
              .removeClass('sticky-inactive')
              .addClass('sticky-stopped');
                        }
                        else if (top > settings.topBoundary) {
                            el.offset({
                                top: $(window).scrollTop()
                            })
              .removeClass('sticky-stopped')
              .removeClass('sticky-inactive')
              .addClass('sticky-active');
                        }
                        else if (top < settings.topBoundary) {
                            el.css({
                                position: '',
                                top: '',
                                bottom: ''
                            })
              .removeClass('sticky-stopped')
              .removeClass('sticky-active')
              .addClass('sticky-inactive');
                        }
                    });

                    win.bind('resize.stickyscroll-' + id, function () {
                        if (settings.mode === 'auto') {
                            settings.topBoundary = topBoundary();
                            settings.bottomBoundary = bottomBoundary();
                        }
                        height = elHeight(el);
                        $(this).scroll();
                    })

                    el.addClass('sticky-processed');

                    // start it off
                    win.scroll();

                });

            },

            reset: function () {
                return this.each(function () {
                    var el = $(this),
            id = el.data('sticky-id');

                    el.css({
                        position: '',
                        top: '',
                        bottom: ''
                    })
          .removeClass('sticky-stopped')
          .removeClass('sticky-active')
          .removeClass('sticky-inactive')
          .removeClass('sticky-processed');

                    $(window).unbind('.stickyscroll-' + id);
                });
            }

        };

        // if options is a valid method, execute it
        if (methods[options]) {
            return methods[options].apply(this,
        Array.prototype.slice.call(arguments, 1));
        }
            // or, if options is a config object, or no options are passed, init
        else if (typeof options === 'object' || !options) {
            return methods.init.apply(this, arguments);
        }

        else if (console) {
            console.log('Method' + options +
        ' does not exist on jQuery.stickyScroll');
        }

    };
})(jQuery);


/**********************Top BAR******************************/
/*
* jQuery Foundation Top Bar 2.0.2
* http://foundation.zurb.com
* Copyright 2012, ZURB
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

/*jslint unparam: true, browser: true, indent: 2 */

; (function ($, window, undefined) {
    'use strict';

    var settings = {
        index: 0,
        initialized: false
    },
    methods = {
        init: function (options) {
            return this.each(function () {
                settings = $.extend(settings, options);
                settings.$w = $(window),
          settings.$topbar = $('nav.top-bar'),
          settings.$section = settings.$topbar.find('section'),
          settings.$titlebar = settings.$topbar.children('ul:first');
                var breakpoint = $("<div class='top-bar-js-breakpoint'/>").appendTo("body");
                settings.breakPoint = breakpoint.width();
                breakpoint.remove();

                if (!settings.initialized) {
                    methods.assemble();
                    settings.initialized = true;
                }

                if (!settings.height) {
                    methods.largestUL();
                }

                if (settings.$topbar.parent().hasClass('fixed')) {
                    $('body').css('padding-top', settings.$topbar.outerHeight())
                }

                //$('.top-bar .toggle-topbar').die('click.fndtn').live('click.fndtn', function (e) {
                $('.PageContainer').off('click.fndtn','.top-bar .toggle-topbar').on('click.fndtn', '.top-bar .toggle-topbar', function (e) {
                    e.preventDefault();

                    if (methods.breakpoint()) {
                        settings.$topbar.toggleClass('expanded');
                        settings.$topbar.css('min-height', '');
                    }

                    if (!settings.$topbar.hasClass('expanded')) {
                        settings.$section.css({ left: '0%' });
                        settings.$section.find('>.name').css({ left: '100%' });
                        settings.$section.find('li.moved').removeClass('moved');
                        settings.index = 0;
                    }
                });

                // Show the Dropdown Levels on Click
                //$('.top-bar .has-dropdown>a').die('click.fndtn').live('click.fndtn', function (e) {
                $('.PageContainer').off('click.fndtn','.top-bar .has-dropdown>a').on('click.fndtn', '.top-bar .has-dropdown>a',function (e) {
                    if (Modernizr.touch || methods.breakpoint() || navigator.userAgent.match(/Windows Phone/gi))
                        e.preventDefault();
                    if (methods.breakpoint()) {
                        var $this = $(this),
                  $selectedLi = $this.closest('li'),
                  $nextLevelUl = $selectedLi.children('ul'),
                  $nextLevelUlHeight = 0,
                  $largestUl;

                        settings.index += 1;
                        $selectedLi.addClass('moved');
                        settings.$section.css({ left: -(100 * settings.index) + '%' });
                        settings.$section.find('>.name').css({ left: 100 * settings.index + '%' });
                        $this.siblings('ul').height(settings.height + settings.$titlebar.outerHeight(true));
                        settings.$topbar.css('min-height', settings.height + settings.$titlebar.outerHeight(true) * 2)
                    }
                });

                //$(window).live('resize.fndtn.topbar', function () {
                $(window).on('resize.fndtn.topbar', function () {
                    if (!methods.breakpoint()) {
                        settings.$topbar.css('min-height', '');
                    }
                });

                // Go up a level on Click
                //$('.top-bar .has-dropdown .back').die('click.fndtn').live('click.fndtn', function (e) {
                $('.PageContainer').off('click.fndtn','.top-bar .has-dropdown .back').on('click.fndtn', '.top-bar .has-dropdown .back', function (e) {
                    e.preventDefault();

                    var $this = $(this),
              $movedLi = $this.closest('li.moved'),
              $previousLevelUl = $movedLi.parent();

                    settings.index -= 1;
                    settings.$section.css({ left: -(100 * settings.index) + '%' });
                    settings.$section.find('>.name').css({ 'left': 100 * settings.index + '%' });

                    if (settings.index === 0) {
                        settings.$topbar.css('min-height', 0);
                    }

                    setTimeout(function () {
                        $movedLi.removeClass('moved');
                    }, 300);
                });
            });
        },
        breakpoint: function () {
            return settings.$w.width() < settings.breakPoint;
        },
        assemble: function () {
            // Pull element out of the DOM for manipulation
            settings.$section.detach();

            settings.$section.find('.has-dropdown>a').each(function () {
                var $link = $(this),
              $dropdown = $link.siblings('.dropdown'),
              $titleLi = $('<li class="title back js-generated"><h5><a href="#"></a></h5></li>');

                // Copy link to subnav
                $titleLi.find('h5>a').html($link.html());
                $dropdown.prepend($titleLi);
            });

            // Put element back in the DOM
            settings.$section.appendTo(settings.$topbar);
        },
        largestUL: function () {
            var uls = settings.$topbar.find('section ul ul'),
            largest = uls.first(),
            total = 0;

            uls.each(function () {
                if ($(this).children('li').length > largest.children('li').length) {
                    largest = $(this);
                }
            });

            largest.children('li').each(function () { total += $(this).outerHeight(true); });

            settings.height = total;
        }
    };

    $.fn.foundationTopBar = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.foundationTopBar');
        }
    };

}(jQuery, this));

(function ($) {
    function returnfalse() { return false; };
    $.fn.contextmenu = function (option) {
        option = $.extend({ alias: "cmroot", width: 150 }, option);
        var ruleName = null, target = null,
	    groups = {}, mitems = {}, actions = {}, showGroups = [],
        itemTpl = "<div class='b-m-$[type]' unselectable=on><nobr unselectable=on><img src='$[icon]' align='absmiddle'/><span unselectable=on>$[text]</span></nobr></div>";
        var gTemplet = $("<div/>").addClass("b-m-mpanel").attr("unselectable", "on").css("display", "none");
        var iTemplet = $("<div/>").addClass("b-m-item").attr("unselectable", "on");
        var sTemplet = $("<div/>").addClass("b-m-split");
        //build group item, which has sub items
        var buildGroup = function (obj) {
            groups[obj.alias] = this;
            this.gidx = obj.alias;
            this.id = obj.alias;
            if (obj.disable) {
                this.disable = obj.disable;
                this.className = "b-m-idisable";
            }
            $(this).width(obj.width).click(returnfalse).mousedown(returnfalse).appendTo($("body"));
            obj = null;
            return this;
        };
        var buildItem = function (obj) {
            var T = this;
            T.title = obj.text;
            T.idx = obj.alias;
            T.gidx = obj.gidx;
            T.data = obj;
            T.innerHTML = itemTpl.replace(/\$\[([^\]]+)\]/g, function () {
                return obj[arguments[1]];
            });
            if (obj.disable) {
                T.disable = obj.disable;
                T.className = "b-m-idisable";
            }
            obj.items && (T.group = true);
            obj.action && (actions[obj.alias] = obj.action);
            mitems[obj.alias] = T;
            T = obj = null;
            return this;
        };
        //add new items
        var addItems = function (gidx, items) {
            var tmp = null;
            for (var i = 0; i < items.length; i++) {
                if (items[i].type == "splitLine") {
                    //split line
                    tmp = sTemplet.clone()[0];
                } else {
                    items[i].gidx = gidx;
                    if (items[i].type == "group") {
                        //group 
                        buildGroup.apply(gTemplet.clone()[0], [items[i]]);
                        arguments.callee(items[i].alias, items[i].items);
                        items[i].type = "arrow";
                        tmp = buildItem.apply(iTemplet.clone()[0], [items[i]]);
                    } else {
                        //normal item
                        items[i].type = "ibody";
                        tmp = buildItem.apply(iTemplet.clone()[0], [items[i]]);
                        $(tmp).click(function (e) {
                            if (!this.disable) {
                                if ($.isFunction(actions[this.idx])) {
                                    actions[this.idx].call(this, target);
                                }
                                hideMenuPane();
                            }
                            return false;
                        });

                    } //end if
                    $(tmp).bind("contextmenu", returnfalse).hover(overItem, outItem);
                }
                groups[gidx].appendChild(tmp);
                tmp = items[i] = items[i].items = null;
            } //end for
            gidx = items = null;
        };
        var overItem = function (e) {
            //menu item is disabled          
            if (this.disable)
                return false;
            hideMenuPane.call(groups[this.gidx]);
            //has sub items
            if (this.group) {
                var pos = $(this).offset();
                var width = $(this).outerWidth();
                showMenuGroup.apply(groups[this.idx], [pos, width]);
            }
            this.className = "b-m-ifocus";
            return false;
        };
        //menu loses focus
        var outItem = function (e) {
            //disabled item
            if (this.disable)
                return false;
            if (!this.group) {
                //normal item
                this.className = "b-m-item";
            } //Endif
            return false;
        };
        //show menu group at specified position
        var showMenuGroup = function (pos, width) {
            var bwidth = $("body").width();
            var bheight = document.documentElement.clientHeight;
            var mwidth = $(this).outerWidth();
            var mheight = $(this).outerHeight();
            pos.left = (pos.left + width + mwidth > bwidth) ? (pos.left - mwidth < 0 ? 0 : pos.left - mwidth) : pos.left + width;
            pos.top = (pos.top + mheight > bheight) ? (pos.top - mheight + (width > 0 ? 25 : 0) < 0 ? 0 : pos.top - mheight + (width > 0 ? 25 : 0)) : pos.top;
            $(this).css(pos).show();
            showGroups.push(this.gidx);
        };
        //to hide menu
        var hideMenuPane = function () {
            var alias = null;
            for (var i = showGroups.length - 1; i >= 0; i--) {
                if (showGroups[i] == this.gidx)
                    break;
                alias = showGroups.pop();
                groups[alias].style.display = "none";
                mitems[alias] && (mitems[alias].className = "b-m-item");
            } //Endfor
            //CollectGarbage();
        };
        function applyRule(rule) {
            if (ruleName && ruleName == rule.name)
                return false;
            for (var i in mitems)
                disable(i, !rule.disable);
            for (var i = 0; i < rule.items.length; i++)
                disable(rule.items[i], rule.disable);
            ruleName = rule.name;
        };
        function disable(alias, disabled) {
            var item = mitems[alias];
            item.className = (item.disable = item.lastChild.disabled = disabled) ? "b-m-idisable" : "b-m-item";
        };

        /* to show menu  */
        function showMenu(e, menutarget) {
            target = menutarget;
            showMenuGroup.call(groups.cmroot, { left: e.pageX, top: e.pageY }, 0);
            $(document).one('mousedown', hideMenuPane);
        }
        var $root = $("#" + option.alias);
        var root = null;
        if ($root.length == 0) {
            root = buildGroup.apply(gTemplet.clone()[0], [option]);
            root.applyrule = applyRule;
            root.showMenu = showMenu;
            addItems(option.alias, option.items);
        }
        else {
            root = $root[0];
        }
        var me = $(this).each(function () {
            return $(this).bind('contextmenu', function (e) {
                var bShowContext = (option.onContextMenu && $.isFunction(option.onContextMenu)) ? option.onContextMenu.call(this, e) : true;
                if (bShowContext) {
                    if (option.onShow && $.isFunction(option.onShow)) {
                        option.onShow.call(this, root);
                    }
                    root.showMenu(e, this);
                }
                return false;
            });
        });
        //to apply rule
        if (option.rule) {
            applyRule(option.rule);
        }
        gTemplet = iTemplet = sTemplet = itemTpl = buildGroup = buildItem = null;
        addItems = overItem = outItem = null;
        //CollectGarbage();
        return me;
    }
})(jQuery);

function autoResize(id) {
    var newheight;
    var newwidth;
    if (document.getElementById) {
        newheight = document.getElementById(id).contentWindow.document.body.scrollHeight;
        newwidth = document.getElementById(id).contentWindow.document.body.scrollWidth;
    }

    document.getElementById(id).height = (newheight) + "px";
    document.getElementById(id).width = (newwidth) + "px";
}
/********************MOSTLY FROM MONDO (K2ComV5.js)*******************************/

var k2 = k2 || {};

$(function () {

    var $doc = $(document),
      Modernizr = window.Modernizr;

    $.fn.foundationAlerts ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs ? $doc.foundationTabs({ callback: $.foundation.customForms.appendCustomMarkup }) : null;
    $.fn.foundationTooltips ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing ? $doc.foundationClearing() : null;
    $.fn.placeholder ? $('input, textarea').placeholder() : null;

    k2.helpers = k2.helpers || {};
    k2.helpers.is_agent = function (ua_types) {
        var uagent = navigator.userAgent.toLowerCase();
        var is_agent = false;

        if (typeof (ua_types) == 'string') {
            is_agent = !(uagent.indexOf(ua_types) == -1)
        }
        else if (typeof (ua_types) == 'object') {
            for (var type in ua_types) {
                is_agent = is_agent || !(uagent.indexOf(ua_types[type]) == -1);
                if (is_agent) {
                    break;
                }
            }
        }

        return is_agent;
    };

    k2.helpers.is_safari = function () {
        var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        var is_safari = navigator.userAgent.indexOf("Safari") > -1;
        if ((is_chrome) && (is_safari)) { is_safari = false; }
        return is_safari;
    };
    k2.helpers.is_touch = function () {
        return navigator.userAgent.indexOf("Touch") > -1;

    }
    k2.helpers.is_ie = function () {
        return k2.helpers.is_agent('msie');
    };
    k2.helpers.is_ipad = function () {
        return k2.helpers.is_agent('ipad');
    };

    k2.helpers.is_ios = function () {
        return k2.helpers.is_agent(['ipad', 'iphone', 'ipod']);
    };

    k2.helpers.is_mobile = function () {
        return k2.helpers.is_agent(['ipad', 'iphone', 'ipod', 'android', 'mobile']);
    }

    k2.helpers.is_surface = function () {
        return k2.helpers.is_agent('touch');
    };

    k2.helpers.reinitialize_drawers = function () {
        var $counters = $('.counter');
        $('li .drawer', $counters).each(function (item, index) {
            var $this = $(this);
            $this.css({ 'padding-bottom': $this.find('.actions').outerHeight(true) });
        });

        $('li:has(.drawer) .trigger', $counters).unbind('click').click(function (e) {
            e.preventDefault();

            var $li = $(this).closest('li');
            if (!$(this).hasClass("ignore")) {
                $('li:has(.drawer)', $li.closest('.counter')).not($li).removeClass('open');
                $li.toggleClass('open');
            }
        });

        var $expands = $('.expand[data-to-expand]');

        $('.mobile-nav').unbind('click').click(function () {
            $expands.each(function () {
                $($(this).data('to-expand')).removeClass('expanded');
            });
        });

        $expands.unbind('click').click(function () {
            var selector = $(this).data('to-expand');
            $('.expanded').not(selector).removeClass('expanded');
            $(selector).toggleClass('expanded');
        });
    };

    k2.helpers.reinitialize_drawers();

    var is_small = function () {
        var isSmall = $('.hide-for-small:visible').length <= 0;
        if (!isSmall) { if (window.innerWdith <= 768) isSmall = true; }
        return isSmall;
    };


    var $window = $(window);
    k2.helpers.setup_header = function () {
        /*******************************
        * Sticky Header
        *******************************/
        var $primary = $('.primary-nav');
        var initial_top = 0;
        var is_stuck = false;
        var $row = $primary.closest('.row');
        $row.height($row.height());
        $window
        .unbind('resize.k2')
        .bind('resize.k2', function () {
            try {
                if ($('.hide-for-small:visible').length > 0) {
                    //$('.fill').attr('style', 'width: ' + $('.fill').parents(".nav-bar").width() + 'px !important;');
                    $('.sub-nav.fill').each(function () {
                        var navBar = $(this).parents(".nav-bar");
                        var li = $(this).parent();
                        var newWidth = navBar.width();
                        $(this).attr('style', 'width: ' + newWidth + 'px !important;top: ' + li.height() + 'px !important; left: -' + li.position().left + 'px');
                    });
                } else { $('.sub-nav.fill').attr('style', ''); }


                initial_top = $primary.offset().top;
                $primary.removeClass('sticky-active');
                var _is_small = is_small();
                if (!_is_small) {
                    $window
                        .unbind('scroll.k2')
                        .bind('scroll.k2', function (e) {
                            if (initial_top < 0 && !is_stuck) {
                                is_stuck = true;
                                $primary.stickyScroll({});
                                $primary.addClass('sticky-active');
                            }
                            else if ($(this).scrollTop() > initial_top && !is_stuck) {
                                is_stuck = true;
                                $primary.stickyScroll({});
                            } else if (is_stuck && $(this).scrollTop() < initial_top) {
                                is_stuck = false;
                                //Reset sticky scroll at the end of the current call stack
                                //(because the plugin scroll event is fired before this one)
                                window.setTimeout(function () { $primary.stickyScroll('reset'); }, 0);

                            }
                        });
                } else if (_is_small) {
                    //Reset sticky scroll at the end of the current call stack
                    //(because the plugin scroll event is fired before this one)
                    $window.unbind('scroll.k2');
                    window.setTimeout(function () { is_stuck = false; $primary.stickyScroll('reset'); }, 0);
                }

                $window.trigger('scroll.k2');
            } catch (e) { }
        })
        .trigger('resize.k2');
    }

    k2.helpers.setup_header();
    /*******************************
    * Mobile Sub Nav Init
    *******************************/
    $('.mobile-sub-nav').change(function () {
        if ($(this).val() != '') {
            if ($(this).val().indexOf("#") == 0) {
                var key = $(this).val().replace("#", "");
                var scrollToTag = $("._scrollTo[key='" + key + "']");
                $('html, body').animate({ scrollTop: scrollToTag.offset().top - 20 }, 1000);
            } else {
                window.location.href = $(this).val();
            }
        }
    });

    $('.image-cta').click(function () {
        var fullimg = $(this).attr("target");
        var newImg = new Image();
        var imgTag = $("#image-modal").find("img");
        newImg.onload = function () {
            var newW = newImg.width;
            var newH = newImg.height;
            imgTag.attr("src", fullimg);
            $('#image-modal').reveal();

            var hL = (jQuery(window).innerWidth() - newW) / 2; if (hL < 0) hL = 0;
            var mL = (hL / jQuery(window).innerWidth()) * 100 * 2;
            $('#image-modal').css({ "margin-left": "-" + mL + "%" });
            //$('#image-modal').animate({ left: hL }, 500);

        };
        newImg.src = fullimg;
    });
    $('.video-cta').click(function () {

    });


    /*******************************
    * Foundation Orbiter
    *******************************/
    var printObj = typeof JSON != "undefined" ? JSON.stringify : function (obj) {
        var arr = [];
        $.each(obj, function (key, val) {
            var next = key + ": ";
            next += $.isPlainObject(val) ? printObj(val) : val;
            arr.push(next);
        });
        return "{ " + arr.join(", ") + " }";
    };

    var orbitOptions = {
        fluid: '960x522', animation: 'fade', animationSpeed: 1000, timer: true, advanceSpeed: 8000,
        pauseOnHover: true, startClockOnMouseOut: true, directionalNav: false, bullets: false, captions: false, bulletThumbs: false
    };
    var $orbiter = $('.orbiter');
    $orbiter.each(function (index, el) {
        var $el = $(el);
        var elOptions = {};
        var newOptions = {};
        var customOptions = $(this).attr("target");
        //alert(customOptions);
        if (!IsEmptyOrNull(customOptions)) {
            var properties = customOptions.split(', ');
            var overrideOptions = {};
            properties.forEach(function (property) {
                var tup = property.split(':');
                if (tup[1] == "true") { overrideOptions[tup[0]] = true; }
                else if (tup[1] == "false") { overrideOptions[tup[0]] = false; }
                else if (!isNaN(tup[1])) { overrideOptions[tup[0]] = Number(tup[1]); }
                else { overrideOptions[tup[0]] = tup[1].replace(/'/gi,""); }
            });
            $.extend(elOptions, orbitOptions, overrideOptions);
        } else {
            if ($el.hasClass('bullets')) {
                $.extend(elOptions, orbitOptions, { bullets: true });
            }

            if ($el.hasClass('arrows')) {
                $.extend(elOptions, orbitOptions, { directionalNav: true });
            }
        }
        var $frameButtons = $(this).find(".FrameButton");
        $frameButtons.off("click").on("click", function (e) {
            if (!IsEmptyOrNull($(this).attr("target"))) {
                try { $el.trigger("orbit.goto", [$(this).attr("target")]); } catch (e) { }
            }
        });
        var $frameButtonNext = $(this).find(".FrameButtonNext");
        $frameButtonNext.off("click").on("click", function (e) {
            $el.trigger("orbit.next");

        });
        var $frameButtonPrev = $(this).find(".FrameButtonPrev");
        $frameButtonPrev.off("click").on("click", function (e) {
            $el.trigger("orbit.prev");
        });
        $el.orbit(elOptions);
        //$el.find('.orbit-item.not-first').parent().css('opacity', 0);
    });

    /*******************************
    * DOM Events
    *******************************/
    //Display Search Form when a user clicks search nav button
    $('nav li button').click(function (e) {
        e.stopPropagation();

        var $this = $(this);
        var $li = $this.closest('li');
        if ($li.hasClass('active')) {
            $li.removeClass('active');
        } else {
            var $nav = $this.closest('nav');

            $nav.find('li.active').removeClass('active');
            $li.addClass('active');
            $("._SiteSearch").focus();
        }
    });
    //Hide Search Form when a user clicks outside of search form or search nav button
    $('body').click(function (e) {
        var $target = $(e.target);
        if ($target.closest('.search-item').length <= 0) {
            $('nav li.search-item').removeClass('active');
        }
        if ($target.closest('.has-flyout').length > 0) {
            $target = $target.closest('.has-flyout');
        }
        if (!$target.hasClass('has-flyout')) {
            $('.nav-bar > li.has-flyout.reveal').removeClass('reveal');
        }
    });

    //verticall aligning something to the bottom without absolute positioning
    // is not possible with a variable height element
    var $valign_bottoms = $('.vertical-bottom');

    $valign_bottoms.each(function (item, index) {
        var $this = $(this);

        var $parent = $this.offsetParent();

        $this.css('bottom', ($this.position().top + $this.height()) - $parent.height());
    });

    /* A Simple fix for links that trigger modals not popping to the top of the page, 
    propbably not nessacry once K2's modal solution is in place */
    $('div[data-reveal-id]').click(function (e) {
        e.preventDefault();
    });

    /*************************************
    Company Leadership
    *************************************/
    var $bio_box = $('.bio-box');

    var bio_summaries = $('.leaders .leader[data-bio-image]');
    var bio_links = $('a', bio_summaries);

    //bio_links.live('click', function (e) {
    bio_links.on('click', function (e) {
        e.preventDefault();
        if (!$bio_box.hasClass('show')) {
            var $parent = $(this).closest('.leader');

            $bio_box.find('.content').append($('<img class="columns three" src="' + $parent.data('bio-image') + '" />'));
            $bio_box.find('.content').append('<div class="columns nine wrapper">' + $parent.html() + '</div>');

            if (k2.helpers.is_mobile()) {
                if (is_small()) {
                    var setBioBoxTop = function (scrollTop) {
                        $bio_box.css('top', scrollTop - $bio_box.offsetParent().offset().top);
                    }

                    var scroll_top = $(window).scrollTop();

                    setBioBoxTop(scroll_top);
                }

                bio_links.hide(0);
            }

            $bio_box.addClass('show');
        }
        return false;
    });

    //$bio_box.find('a[href="#close"]').live('click', function (e) {
    $bio_box.find('a[href="#close"]').on('click', function (e) {
        e.preventDefault();

        if (k2.helpers.is_mobile()) {
            bio_links.show(0);
        }

        $bio_box.removeClass('show');
        $bio_box.find('.content').empty();

        $(window).unbind('scroll.bio_box');

        return false;
    });

    /*************************************
    Mobile methods
    *************************************/
    if (!is_small()) {
        if (typeof ($.fn.k2_wheel) === 'function') {
            $.fn.k2_wheel();
        }
    }
    if (k2.helpers.is_mobile() || Modernizr.touch) {
        var evtName = "";
        if (IsEmptyOrNull(evtName) && isEventSupported("MSPointerDown")) evtName = "MSPointerDown";
        if (IsEmptyOrNull(evtName) && isEventSupported("touchstart")) { evtName = ((k2.helpers.is_mobile()) ? "touchstart" : "touchstart mousedown"); }
        if (IsEmptyOrNull(evtName)) evtName = "mousedown";
        var eventExecuting = false;
        $('.nav-bar > li.has-flyout').bind(evtName, function (e) {
            if (!eventExecuting) {
                eventExecuting = true;
                var $clicked = $(e.target);
                if ($clicked.prop('tagName') != 'LI') {
                    $clicked = $clicked.closest('li');
                }
                if ($clicked.hasClass('has-flyout')) {
                    $('.nav-bar > li.has-flyout.reveal').not($(this)).removeClass('reveal');
                    $('.nav-bar > li.search-item').removeClass('active');
                    $(this).toggleClass('reveal');
                }
                setTimeout(function () { eventExecuting = false; }, 250);
            }
        });
    }

    if (k2.helpers.is_ipad()) {
        $('body').bind('touchstart', function (e) {
            var $target = $(e.target);

            if ($target.closest('.has-flyout').length > 0) {
                $target = $target.closest('.has-flyout');
            }

            if (!$target.hasClass('has-flyout')) {
                $('.nav-bar > li.has-flyout.reveal').removeClass('reveal');
            }
        });
    }

    /*************************************
    Blog
    *************************************/

    //Blog Sticky Sidebar
    //    var $sidebar = $('.blog-sidebar'),
    //      footerOffset = $('footer').offset().top,
    //      $window = $(window),
    //      offset = $sidebar.offset(),
    //      topPadding = 70;

    //    if ($sidebar.length > 0) {
    //        var maxY = footerOffset - $sidebar.outerHeight();

    //        $window.scroll(function () {
    //            if ($window.width() >= 768) {
    //                if ($window.scrollTop() > offset.top) {
    //                    if ($window.scrollTop() < maxY) {
    //                        $sidebar.stop().animate({
    //                            marginTop: $window.scrollTop() - offset.top + topPadding
    //                        });
    //                    }
    //                } else {
    //                    $sidebar.stop().animate({
    //                        marginTop: 0
    //                    });
    //                }
    //            }
    //        });
    //    }

    //Expand tags in mobile version
    if ($window.width() <= 768) {
        $('.tags').hover(
        function () {
            $(this).children('span').addClass('active');
            $(this).children('ul').show();
        },
        function () {
            $(this).children('span').removeClass('active');
            $(this).children('ul').hide();
        }
    );

    }
})

$(window).bind('orientationchange', function (e) {
    k2.helpers.reinitialize_drawers();
    k2.helpers.setup_header();
});
var isEventSupported = (function () {
    var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
    }
    function isEventSupported(eventName) {
        var el = document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;
        var isSupported = (eventName in el);
        if (!isSupported) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] == 'function';
        }
        el = null;
        return isSupported;
    }
    return isEventSupported;
})();
/***********************Wheel.js****************************************/
(function ($) {
    $.fn.k2_wheel = function (options) {
        var methods = {

            init: function () {
                /*******************************
                * Wheel Rollover
                *******************************/
                $('#workflow, #workflow-hover-img').hover(function () {
                    $('#fullcolor-text, .overview-info').hide();
                    $('#workflow-hover-img, #workflow-text, .workflow-info').show();
                }, function () {
                    $('#workflow-hover-img, #workflow-text, .workflow-info').hide();
                    $('#fullcolor-text, .overview-info').show();
                });

                $('#forms, #forms-hover-img').hover(function () {
                    $('#fullcolor-text, .overview-info').hide();
                    $('#forms-hover-img, #forms-text, .forms-info').show();
                }, function () {
                    $('#forms-hover-img, #forms-text, .forms-info').hide();
                    $('#fullcolor-text, .overview-info').show();
                });

                $('#reports, #reports-hover-img').hover(function () {
                    $('#fullcolor-text, .overview-info').hide();
                    $('#reports-hover-img, #reports-text, .reports-info').show();
                }, function () {
                    $('#reports-hover-img, #reports-text, .reports-info').hide();
                    $('#fullcolor-text, .overview-info').show();
                });

                $('#data, #data-hover-img').hover(function () {
                    $('#fullcolor-text, .overview-info').hide();
                    $('#data-hover-img, #data-text, .data-info').show();
                }, function () {
                    $('#data-hover-img, #data-text, .data-info').hide();
                    $('#fullcolor-text, .overview-info').show();
                });
                $('#reports-hover-img').click(function (e) {
                    $("#reports").click();
                });
                $('#forms-hover-img').click(function (e) {
                    $("#forms").click();
                });
                $('#data-hover-img').click(function (e) {
                    $("#data").click();
                });
                $('#workflow-hover-img').click(function (e) {
                    $("#workflow").click();
                });

            },
            unbind: function () {
                $('#workflow, #workflow-hover-img').unbind('mouseenter mouseleave click');
                $('#forms, #forms-hover-img').unbind('mouseenter mouseleave click')
                $('#reports, #reports-hover-img').unbind('mouseenter mouseleave click')
                $('#data, #data-hover-img').unbind('mouseenter mouseleave click')
            }
        };

        // if options is a valid method, execute it
        if (methods[options]) {
            return methods[options].apply(this,
        Array.prototype.slice.call(arguments, 1));
        }
            // or, if options is a config object, or no options are passed, init
        else if (typeof options === 'object' || !options) {
            return methods.init.apply(this, arguments);
        }
    };
})(jQuery);
/**********************K2_CMS_JS.js (need to review)*****************************************/
//jquery.ba-resize.min.js
//-----------------------------------------
(function ($, h, c) { var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j + "-special-event", b = "delay", f = "throttleWindow"; e[b] = 250; e[f] = true; $.event.special[j] = { setup: function () { if (!e[f] && this[k]) { return false } var l = $(this); a = a.add(l); $.data(this, d, { w: l.width(), h: l.height() }); if (a.length === 1) { g() } }, teardown: function () { if (!e[f] && this[k]) { return false } var l = $(this); a = a.not(l); l.removeData(d); if (!a.length) { clearTimeout(i) } }, add: function (l) { if (!e[f] && this[k]) { return false } var n; function m(s, o, p) { var q = $(this), r = $.data(this, d); r.w = o !== c ? o : q.width(); r.h = p !== c ? p : q.height(); n.apply(this, arguments) } if ($.isFunction(l)) { n = l; return m } else { n = l.handler; l.handler = m } } }; function g() { i = h[k](function () { a.each(function () { var n = $(this), m = n.width(), l = n.height(), o = $.data(this, d); if (m !== o.w || l !== o.h) { n.trigger(j, [o.w = m, o.h = l]) } }); g() }, e[b]) } })(jQuery, this);
//-----------------------------------------
//swfupload.js
//-----------------------------------------
var SWFUpload; if (SWFUpload == undefined) { SWFUpload = function (settings) { this.initSWFUpload(settings); }; }
SWFUpload.prototype.initSWFUpload = function (settings) { try { this.customSettings = {}; this.settings = settings; this.eventQueue = []; this.movieName = "SWFUpload_" + SWFUpload.movieCount++; this.movieElement = null; SWFUpload.instances[this.movieName] = this; this.initSettings(); this.loadFlash(); this.displayDebugInfo(); } catch (ex) { delete SWFUpload.instances[this.movieName]; throw ex; } }; SWFUpload.instances = {}; SWFUpload.movieCount = 0; SWFUpload.version = "2.2.0 2009-03-25"; SWFUpload.QUEUE_ERROR = { QUEUE_LIMIT_EXCEEDED: -100, FILE_EXCEEDS_SIZE_LIMIT: -110, ZERO_BYTE_FILE: -120, INVALID_FILETYPE: -130 }; SWFUpload.UPLOAD_ERROR = { HTTP_ERROR: -200, MISSING_UPLOAD_URL: -210, IO_ERROR: -220, SECURITY_ERROR: -230, UPLOAD_LIMIT_EXCEEDED: -240, UPLOAD_FAILED: -250, SPECIFIED_FILE_ID_NOT_FOUND: -260, FILE_VALIDATION_FAILED: -270, FILE_CANCELLED: -280, UPLOAD_STOPPED: -290 }; SWFUpload.FILE_STATUS = { QUEUED: -1, IN_PROGRESS: -2, ERROR: -3, COMPLETE: -4, CANCELLED: -5 }; SWFUpload.BUTTON_ACTION = { SELECT_FILE: -100, SELECT_FILES: -110, START_UPLOAD: -120 }; SWFUpload.CURSOR = { ARROW: -1, HAND: -2 }; SWFUpload.WINDOW_MODE = { WINDOW: "window", TRANSPARENT: "transparent", OPAQUE: "opaque" }; SWFUpload.completeURL = function (url) {
    if (typeof (url) !== "string" || url.match(/^https?:\/\//i) || url.match(/^\//)) { return url; }
    var currentURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""); var indexSlash = window.location.pathname.lastIndexOf("/"); if (indexSlash <= 0) { path = "/"; } else { path = window.location.pathname.substr(0, indexSlash) + "/"; }
    return path + url;
}; SWFUpload.prototype.initSettings = function () {
    this.ensureDefault = function (settingName, defaultValue) { this.settings[settingName] = (this.settings[settingName] == undefined) ? defaultValue : this.settings[settingName]; }; this.ensureDefault("upload_url", ""); this.ensureDefault("preserve_relative_urls", false); this.ensureDefault("file_post_name", "Filedata"); this.ensureDefault("post_params", {}); this.ensureDefault("use_query_string", false); this.ensureDefault("requeue_on_error", false); this.ensureDefault("http_success", []); this.ensureDefault("assume_success_timeout", 0); this.ensureDefault("file_types", "*.*"); this.ensureDefault("file_types_description", "All Files"); this.ensureDefault("file_size_limit", 0); this.ensureDefault("file_upload_limit", 0); this.ensureDefault("file_queue_limit", 0); this.ensureDefault("flash_url", "swfupload.swf"); this.ensureDefault("prevent_swf_caching", true); this.ensureDefault("button_image_url", ""); this.ensureDefault("button_width", 1); this.ensureDefault("button_height", 1); this.ensureDefault("button_text", ""); this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;"); this.ensureDefault("button_text_top_padding", 0); this.ensureDefault("button_text_left_padding", 0); this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES); this.ensureDefault("button_disabled", false); this.ensureDefault("button_placeholder_id", ""); this.ensureDefault("button_placeholder", null); this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW); this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW); this.ensureDefault("debug", false); this.settings.debug_enabled = this.settings.debug; this.settings.return_upload_start_handler = this.returnUploadStart; this.ensureDefault("swfupload_loaded_handler", null); this.ensureDefault("file_dialog_start_handler", null); this.ensureDefault("file_queued_handler", null); this.ensureDefault("file_queue_error_handler", null); this.ensureDefault("file_dialog_complete_handler", null); this.ensureDefault("upload_start_handler", null); this.ensureDefault("upload_progress_handler", null); this.ensureDefault("upload_error_handler", null); this.ensureDefault("upload_success_handler", null); this.ensureDefault("upload_complete_handler", null); this.ensureDefault("debug_handler", this.debugMessage); this.ensureDefault("custom_settings", {}); this.customSettings = this.settings.custom_settings; if (!!this.settings.prevent_swf_caching) { this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + new Date().getTime(); }
    if (!this.settings.preserve_relative_urls) { this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url); this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url); }
    delete this.ensureDefault;
}; SWFUpload.prototype.loadFlash = function () {
    var targetElement, tempParent; if (document.getElementById(this.movieName) !== null) { throw "ID " + this.movieName + " is already in use. The Flash Object could not be added"; }
    targetElement = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder; if (targetElement == undefined) { throw "Could not find the placeholder element: " + this.settings.button_placeholder_id; }
    tempParent = document.createElement("div"); tempParent.innerHTML = this.getFlashHTML(); targetElement.parentNode.replaceChild(tempParent.firstChild, targetElement); if (window[this.movieName] == undefined) { window[this.movieName] = this.getMovieElement(); }
}; SWFUpload.prototype.getFlashHTML = function () { return ['<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">', '<param name="wmode" value="', this.settings.button_window_mode, '" />', '<param name="movie" value="', this.settings.flash_url, '" />', '<param name="quality" value="high" />', '<param name="menu" value="false" />', '<param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' + this.getFlashVars() + '" />', '</object>'].join(""); }; SWFUpload.prototype.getFlashVars = function () { var paramString = this.buildParamString(); var httpSuccessString = this.settings.http_success.join(","); return ["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(httpSuccessString), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(paramString), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join(""); }; SWFUpload.prototype.getMovieElement = function () {
    if (this.movieElement == undefined) { this.movieElement = document.getElementById(this.movieName); }
    if (this.movieElement === null) { throw "Could not find Flash element"; }
    return this.movieElement;
}; SWFUpload.prototype.buildParamString = function () {
    var postParams = this.settings.post_params; var paramStringPairs = []; if (typeof (postParams) === "object") { for (var name in postParams) { if (postParams.hasOwnProperty(name)) { paramStringPairs.push(encodeURIComponent(name.toString()) + "=" + encodeURIComponent(postParams[name].toString())); } } }
    return paramStringPairs.join("&amp;");
}; SWFUpload.prototype.destroy = function () {
    try {
        this.cancelUpload(null, false); var movieElement = null; movieElement = this.getMovieElement(); if (movieElement && typeof (movieElement.CallFunction) === "unknown") {
            for (var i in movieElement) { try { if (typeof (movieElement[i]) === "function") { movieElement[i] = null; } } catch (ex1) { } }
            try { movieElement.parentNode.removeChild(movieElement); } catch (ex) { }
        }
        window[this.movieName] = null; SWFUpload.instances[this.movieName] = null; delete SWFUpload.instances[this.movieName]; this.movieElement = null; this.settings = null; this.customSettings = null; this.eventQueue = null; this.movieName = null; return true;
    } catch (ex2) { return false; }
}; SWFUpload.prototype.displayDebugInfo = function () { this.debug(["---SWFUpload Instance Info---\n", "Version: ", SWFUpload.version, "\n", "Movie Name: ", this.movieName, "\n", "Settings:\n", "\t", "upload_url:               ", this.settings.upload_url, "\n", "\t", "flash_url:                ", this.settings.flash_url, "\n", "\t", "use_query_string:         ", this.settings.use_query_string.toString(), "\n", "\t", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n", "\t", "http_success:             ", this.settings.http_success.join(", "), "\n", "\t", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n", "\t", "file_post_name:           ", this.settings.file_post_name, "\n", "\t", "post_params:              ", this.settings.post_params.toString(), "\n", "\t", "file_types:               ", this.settings.file_types, "\n", "\t", "file_types_description:   ", this.settings.file_types_description, "\n", "\t", "file_size_limit:          ", this.settings.file_size_limit, "\n", "\t", "file_upload_limit:        ", this.settings.file_upload_limit, "\n", "\t", "file_queue_limit:         ", this.settings.file_queue_limit, "\n", "\t", "debug:                    ", this.settings.debug.toString(), "\n", "\t", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n", "\t", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n", "\t", "button_placeholder:       ", (this.settings.button_placeholder ? "Set" : "Not Set"), "\n", "\t", "button_image_url:         ", this.settings.button_image_url.toString(), "\n", "\t", "button_width:             ", this.settings.button_width.toString(), "\n", "\t", "button_height:            ", this.settings.button_height.toString(), "\n", "\t", "button_text:              ", this.settings.button_text.toString(), "\n", "\t", "button_text_style:        ", this.settings.button_text_style.toString(), "\n", "\t", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n", "\t", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n", "\t", "button_action:            ", this.settings.button_action.toString(), "\n", "\t", "button_disabled:          ", this.settings.button_disabled.toString(), "\n", "\t", "custom_settings:          ", this.settings.custom_settings.toString(), "\n", "Event Handlers:\n", "\t", "swfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler === "function").toString(), "\n", "\t", "file_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler === "function").toString(), "\n", "\t", "file_queued_handler assigned:       ", (typeof this.settings.file_queued_handler === "function").toString(), "\n", "\t", "file_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler === "function").toString(), "\n", "\t", "upload_start_handler assigned:      ", (typeof this.settings.upload_start_handler === "function").toString(), "\n", "\t", "upload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler === "function").toString(), "\n", "\t", "upload_error_handler assigned:      ", (typeof this.settings.upload_error_handler === "function").toString(), "\n", "\t", "upload_success_handler assigned:    ", (typeof this.settings.upload_success_handler === "function").toString(), "\n", "\t", "upload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler === "function").toString(), "\n", "\t", "debug_handler assigned:             ", (typeof this.settings.debug_handler === "function").toString(), "\n"].join("")); }; SWFUpload.prototype.addSetting = function (name, value, default_value) { if (value == undefined) { return (this.settings[name] = default_value); } else { return (this.settings[name] = value); } }; SWFUpload.prototype.getSetting = function (name) {
    if (this.settings[name] != undefined) { return this.settings[name]; }
    return "";
}; SWFUpload.prototype.callFlash = function (functionName, argumentArray) {
    argumentArray = argumentArray || []; var movieElement = this.getMovieElement(); var returnValue, returnString; try { returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + '</invoke>'); returnValue = eval(returnString); } catch (ex) { throw "Call to " + functionName + " failed"; }
    if (returnValue != undefined && typeof returnValue.post === "object") { returnValue = this.unescapeFilePostParams(returnValue); }
    return returnValue;
}; SWFUpload.prototype.selectFile = function () { this.callFlash("SelectFile"); }; SWFUpload.prototype.selectFiles = function () { this.callFlash("SelectFiles"); }; SWFUpload.prototype.startUpload = function (fileID) { this.callFlash("StartUpload", [fileID]); }; SWFUpload.prototype.cancelUpload = function (fileID, triggerErrorEvent) {
    if (triggerErrorEvent !== false) { triggerErrorEvent = true; }
    this.callFlash("CancelUpload", [fileID, triggerErrorEvent]);
}; SWFUpload.prototype.stopUpload = function () { this.callFlash("StopUpload"); }; SWFUpload.prototype.getStats = function () { return this.callFlash("GetStats"); }; SWFUpload.prototype.setStats = function (statsObject) { this.callFlash("SetStats", [statsObject]); }; SWFUpload.prototype.getFile = function (fileID) { if (typeof (fileID) === "number") { return this.callFlash("GetFileByIndex", [fileID]); } else { return this.callFlash("GetFile", [fileID]); } }; SWFUpload.prototype.addFileParam = function (fileID, name, value) { return this.callFlash("AddFileParam", [fileID, name, value]); }; SWFUpload.prototype.removeFileParam = function (fileID, name) { this.callFlash("RemoveFileParam", [fileID, name]); }; SWFUpload.prototype.setUploadURL = function (url) { this.settings.upload_url = url.toString(); this.callFlash("SetUploadURL", [url]); }; SWFUpload.prototype.setPostParams = function (paramsObject) { this.settings.post_params = paramsObject; this.callFlash("SetPostParams", [paramsObject]); }; SWFUpload.prototype.addPostParam = function (name, value) { this.settings.post_params[name] = value; this.callFlash("SetPostParams", [this.settings.post_params]); }; SWFUpload.prototype.removePostParam = function (name) { delete this.settings.post_params[name]; this.callFlash("SetPostParams", [this.settings.post_params]); }; SWFUpload.prototype.setFileTypes = function (types, description) { this.settings.file_types = types; this.settings.file_types_description = description; this.callFlash("SetFileTypes", [types, description]); }; SWFUpload.prototype.setFileSizeLimit = function (fileSizeLimit) { this.settings.file_size_limit = fileSizeLimit; this.callFlash("SetFileSizeLimit", [fileSizeLimit]); }; SWFUpload.prototype.setFileUploadLimit = function (fileUploadLimit) { this.settings.file_upload_limit = fileUploadLimit; this.callFlash("SetFileUploadLimit", [fileUploadLimit]); }; SWFUpload.prototype.setFileQueueLimit = function (fileQueueLimit) { this.settings.file_queue_limit = fileQueueLimit; this.callFlash("SetFileQueueLimit", [fileQueueLimit]); }; SWFUpload.prototype.setFilePostName = function (filePostName) { this.settings.file_post_name = filePostName; this.callFlash("SetFilePostName", [filePostName]); }; SWFUpload.prototype.setUseQueryString = function (useQueryString) { this.settings.use_query_string = useQueryString; this.callFlash("SetUseQueryString", [useQueryString]); }; SWFUpload.prototype.setRequeueOnError = function (requeueOnError) { this.settings.requeue_on_error = requeueOnError; this.callFlash("SetRequeueOnError", [requeueOnError]); }; SWFUpload.prototype.setHTTPSuccess = function (http_status_codes) {
    if (typeof http_status_codes === "string") { http_status_codes = http_status_codes.replace(" ", "").split(","); }
    this.settings.http_success = http_status_codes; this.callFlash("SetHTTPSuccess", [http_status_codes]);
}; SWFUpload.prototype.setAssumeSuccessTimeout = function (timeout_seconds) { this.settings.assume_success_timeout = timeout_seconds; this.callFlash("SetAssumeSuccessTimeout", [timeout_seconds]); }; SWFUpload.prototype.setDebugEnabled = function (debugEnabled) { this.settings.debug_enabled = debugEnabled; this.callFlash("SetDebugEnabled", [debugEnabled]); }; SWFUpload.prototype.setButtonImageURL = function (buttonImageURL) {
    if (buttonImageURL == undefined) { buttonImageURL = ""; }
    this.settings.button_image_url = buttonImageURL; this.callFlash("SetButtonImageURL", [buttonImageURL]);
}; SWFUpload.prototype.setButtonDimensions = function (width, height) {
    this.settings.button_width = width; this.settings.button_height = height; var movie = this.getMovieElement(); if (movie != undefined) { movie.style.width = width + "px"; movie.style.height = height + "px"; }
    this.callFlash("SetButtonDimensions", [width, height]);
}; SWFUpload.prototype.setButtonText = function (html) { this.settings.button_text = html; this.callFlash("SetButtonText", [html]); }; SWFUpload.prototype.setButtonTextPadding = function (left, top) { this.settings.button_text_top_padding = top; this.settings.button_text_left_padding = left; this.callFlash("SetButtonTextPadding", [left, top]); }; SWFUpload.prototype.setButtonTextStyle = function (css) { this.settings.button_text_style = css; this.callFlash("SetButtonTextStyle", [css]); }; SWFUpload.prototype.setButtonDisabled = function (isDisabled) { this.settings.button_disabled = isDisabled; this.callFlash("SetButtonDisabled", [isDisabled]); }; SWFUpload.prototype.setButtonAction = function (buttonAction) { this.settings.button_action = buttonAction; this.callFlash("SetButtonAction", [buttonAction]); }; SWFUpload.prototype.setButtonCursor = function (cursor) { this.settings.button_cursor = cursor; this.callFlash("SetButtonCursor", [cursor]); }; SWFUpload.prototype.queueEvent = function (handlerName, argumentArray) {
    if (argumentArray == undefined) { argumentArray = []; } else if (!(argumentArray instanceof Array)) { argumentArray = [argumentArray]; }
    var self = this; if (typeof this.settings[handlerName] === "function") { this.eventQueue.push(function () { this.settings[handlerName].apply(this, argumentArray); }); setTimeout(function () { self.executeNextEvent(); }, 0); } else if (this.settings[handlerName] !== null) { throw "Event handler " + handlerName + " is unknown or is not a function"; }
}; SWFUpload.prototype.executeNextEvent = function () { var f = this.eventQueue ? this.eventQueue.shift() : null; if (typeof (f) === "function") { f.apply(this); } }; SWFUpload.prototype.unescapeFilePostParams = function (file) {
    var reg = /[$]([0-9a-f]{4})/i; var unescapedPost = {}; var uk; if (file != undefined) {
        for (var k in file.post) {
            if (file.post.hasOwnProperty(k)) {
                uk = k; var match; while ((match = reg.exec(uk)) !== null) { uk = uk.replace(match[0], String.fromCharCode(parseInt("0x" + match[1], 16))); }
                unescapedPost[uk] = file.post[k];
            }
        }
        file.post = unescapedPost;
    }
    return file;
}; SWFUpload.prototype.testExternalInterface = function () { try { return this.callFlash("TestExternalInterface"); } catch (ex) { return false; } }; SWFUpload.prototype.flashReady = function () {
    var movieElement = this.getMovieElement(); if (!movieElement) { this.debug("Flash called back ready but the flash movie can't be found."); return; }
    this.cleanUp(movieElement); this.queueEvent("swfupload_loaded_handler");
}; SWFUpload.prototype.cleanUp = function (movieElement) {
    try { if (this.movieElement && typeof (movieElement.CallFunction) === "unknown") { this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)"); for (var key in movieElement) { try { if (typeof (movieElement[key]) === "function") { movieElement[key] = null; } } catch (ex) { } } } } catch (ex1) { }
    window["__flash__removeCallback"] = function (instance, name) { try { if (instance) { instance[name] = null; } } catch (flashEx) { } };
}; SWFUpload.prototype.fileDialogStart = function () { this.queueEvent("file_dialog_start_handler"); }; SWFUpload.prototype.fileQueued = function (file) { file = this.unescapeFilePostParams(file); this.queueEvent("file_queued_handler", file); }; SWFUpload.prototype.fileQueueError = function (file, errorCode, message) { file = this.unescapeFilePostParams(file); this.queueEvent("file_queue_error_handler", [file, errorCode, message]); }; SWFUpload.prototype.fileDialogComplete = function (numFilesSelected, numFilesQueued, numFilesInQueue) { this.queueEvent("file_dialog_complete_handler", [numFilesSelected, numFilesQueued, numFilesInQueue]); }; SWFUpload.prototype.uploadStart = function (file) { file = this.unescapeFilePostParams(file); this.queueEvent("return_upload_start_handler", file); }; SWFUpload.prototype.returnUploadStart = function (file) {
    var returnValue; if (typeof this.settings.upload_start_handler === "function") { file = this.unescapeFilePostParams(file); returnValue = this.settings.upload_start_handler.call(this, file); } else if (this.settings.upload_start_handler != undefined) { throw "upload_start_handler must be a function"; }
    if (returnValue === undefined) { returnValue = true; }
    returnValue = !!returnValue; this.callFlash("ReturnUploadStart", [returnValue]);
}; SWFUpload.prototype.uploadProgress = function (file, bytesComplete, bytesTotal) { file = this.unescapeFilePostParams(file); this.queueEvent("upload_progress_handler", [file, bytesComplete, bytesTotal]); }; SWFUpload.prototype.uploadError = function (file, errorCode, message) { file = this.unescapeFilePostParams(file); this.queueEvent("upload_error_handler", [file, errorCode, message]); }; SWFUpload.prototype.uploadSuccess = function (file, serverData, responseReceived) { file = this.unescapeFilePostParams(file); this.queueEvent("upload_success_handler", [file, serverData, responseReceived]); }; SWFUpload.prototype.uploadComplete = function (file) { file = this.unescapeFilePostParams(file); this.queueEvent("upload_complete_handler", file); }; SWFUpload.prototype.debug = function (message) { this.queueEvent("debug_handler", message); }; SWFUpload.prototype.debugMessage = function (message) {
    if (this.settings.debug) {
        var exceptionMessage, exceptionValues = []; if (typeof message === "object" && typeof message.name === "string" && typeof message.message === "string") {
            for (var key in message) { if (message.hasOwnProperty(key)) { exceptionValues.push(key + ": " + message[key]); } }
            exceptionMessage = exceptionValues.join("\n") || ""; exceptionValues = exceptionMessage.split("\n"); exceptionMessage = "EXCEPTION: " + exceptionValues.join("\nEXCEPTION: "); SWFUpload.Console.writeLine(exceptionMessage);
        } else { SWFUpload.Console.writeLine(message); }
    }
}; SWFUpload.Console = {}; SWFUpload.Console.writeLine = function (message) {
    var console, documentForm; try {
        console = document.getElementById("SWFUpload_Console"); if (!console) { documentForm = document.createElement("form"); document.getElementsByTagName("body")[0].appendChild(documentForm); console = document.createElement("textarea"); console.id = "SWFUpload_Console"; console.style.fontFamily = "monospace"; console.setAttribute("wrap", "off"); console.wrap = "off"; console.style.overflow = "auto"; console.style.width = "700px"; console.style.height = "350px"; console.style.margin = "5px"; documentForm.appendChild(console); }
        console.value += message + "\n"; console.scrollTop = console.scrollHeight - console.clientHeight;
    } catch (ex) { alert("Exception: " + ex.name + " Message: " + ex.message); }
};
//-----------------------------------------
//jquery-asyncUpload-0.1.js
//-----------------------------------------
(function ($) {
    $.fn.makeAsyncUploader = function (options) {
        return this.each(function () {
            var id = $(this).attr("id"); var container = $("<span class='asyncUploader'/>"); container.append($("<div class='ProgressBar'> <div>&nbsp;</div> </div>")); container.append($("<span id='" + id + "_completedMessage'/>")); container.append($("<span id='" + id + "_uploading'>Uploading: <span id='" + id + "_percentdone'></span> <input type='button' value='Cancel'/></span>")); container.append($("<span id='" + id + "_swf'/>")); container.append($("<input type='hidden' id='" + id + "_filename' name='" + id + "_filename' required='true' title='You must upload a file before continuing'/>")); container.append($("<input type='hidden' id='" + id + "_guid' name='" + id + "_guid'/>")); $(this).before(container).remove(); $("div.ProgressBar", container).hide(); $("span[id$=_uploading]", container).hide(); var swfu; var width = 109, height = 22; var complete_callback = function () { }; if (options) { width = options.width || width; height = options.height || height; if (options.complete) complete_callback = options.complete; }
            var defaults = {
                flash_url: "swfupload.swf", upload_url: "/videos/uploadpost", file_size_limit: "1024 MB", file_types: "*.*", file_types_description: "All Files", debug: false, button_image_url: "blankButton.png", button_width: width, button_height: height, button_placeholder_id: id + "_swf", button_text: "<font face='Arial' size='13pt'>Choose file</span>", button_text_left_padding: (width - 70) / 2, button_text_top_padding: 1, file_queued_handler: function (file) { swfu.startUpload(); }, file_queue_error_handler: function (file, code, msg) { alert("Sorry, your file wasn't uploaded: " + msg); }, upload_error_handler: function (file, code, msg) { alert("Sorry, your file wasn't uploaded: " + msg); }, upload_start_handler: function () {
                    swfu.setButtonDimensions(0, height); $("input[name$=_filename]", container).val(""); $("input[name$=_guid]", container).val(""); $("div.ProgressBar div", container).css("width", "0px"); $("div.ProgressBar", container).show(); $("span[id$=_uploading]", container).show(); $("span[id$=_completedMessage]", container).html("").hide(); if (options.disableDuringUpload)
                        $(options.disableDuringUpload).attr("disabled", "disabled");
                }, upload_success_handler: function (file, response) { $("input[name$=_filename]", container).val(file.name); $("input[name$=_guid]", container).val(response); $("span[id$=_completedMessage]", container).html("Uploaded <b>{0}</b> ({1} KB)".replace("{0}", "<a href='"+response+"' target='_blank'>"+response+"</a>").replace("{1}", Math.round(file.size / 1024))); complete_callback(file, response); }, upload_complete_handler: function () {
                    var clearup = function () { $("div.ProgressBar", container).hide(); $("span[id$=_completedMessage]", container).show(); $("span[id$=_uploading]", container).hide(); swfu.setButtonDimensions(width, height); }; if ($("input[name$=_filename]", container).val() != "")
                        $("div.ProgressBar div", container).animate({ width: "100%" }, { duration: "fast", queue: false, complete: clearup }); else { clearup(); }
                    if (options.disableDuringUpload)
                        $(options.disableDuringUpload).removeAttr("disabled");
                }, upload_progress_handler: function (file, bytes, total) { var percent = 100 * bytes / total; $("span[id$=_percentdone]").html(Math.round(percent) + "% done"); $("div.ProgressBar div", container).animate({ width: percent + "%" }, { duration: 500, queue: false }); }
            }; swfu = new SWFUpload($.extend(defaults, options || {})); $("span[id$=_uploading] input[type='button']", container).click(function () { swfu.cancelUpload(null, false); }); if (options.existingFilename || "" != "") { $("span[id$=_completedMessage]", container).html("Uploaded <b>{0}</b> ({1} KB)".replace("{0}", options.existingFilename).replace("{1}", options.existingFileSize ? Math.round(options.existingFileSize / 1024) : "?")).show(); $("input[name$=_filename]", container).val(options.existingFilename); }
            if (options.existingGuid || "" != "")
                $("input[name$=_guid]", container).val(options.existingGuid);
        });
    }
})(jQuery); (function ($) {
    $.fn.makeStringListControl = function (options) {
        return this.each(function () {
            var obj = $(this); var id = obj.attr("id"); var currentList = $(this).val().split(','); var container = $("<span id='" + id + "_list' class='_arrayList'/>"); for (var x = 0; x < currentList.length; x++) { if (currentList[x] != "") container.append($("<div style='padding-left:10px;'><span class='_arrayListRemove' style='cursor:pointer;'>X</span> <span class='_arrayListItem'>" + currentList[x] + "</span></div>")); }
            container.append($("<div><input type='text' id='" + id + "_add'><input type='button' id='" + id + "_add' type='button' value='Add' class='_arrayListButon'/></div>")); $(this).before(container).hide(); $("._arrayListRemove").click(function () { var stringVal = $(this).next().html(); $(this).parent().remove(); currentList[$.inArray(stringVal, currentList)] = ""; UpdateList(); }); $("._arrayListButon").click(function (e) { e.preventDefault(); var stringVal = $(this).prev().val(); if ($.inArray(stringVal, currentList) == -1) { $("span[id='" + id + "_list']").prepend($("<div style='padding-left:10px;'><span class='_arrayListRemove' style='cursor:pointer;'>X</span> <span class='_arrayListItem'>" + stringVal + "</span></div>")); currentList.push(stringVal); UpdateList(); $(this).prev().val(""); } else { alert("Value already exists"); } }); function UpdateList() {
                var newVal = ""; for (var x = 0; x < currentList.length; x++) { if (currentList[x] != "") newVal += currentList[x] + ","; }
                $(obj).val(newVal);
            }
        });
    }
})(jQuery);
//-----------------------------------------
//fullcalendar.min.js
//-----------------------------------------
//(function (o, K) {
//    function Ia(a, b) { a._id = a._id || (a.id === K ? "_fc" + Eb++ : a.id + ""); if (a.date) { if (!a.start) a.start = a.date; delete a.date } a._start = q(a.start = ib(a.start)); a.end = ib(a.end); if (a.end && a.end <= a.start) a.end = null; a._end = a.end ? q(a.end) : null; if (a.allDay === K) a.allDay = b.allDayDefault; if (a.className) { if (typeof a.className == "string") a.className = a.className.split(/\s+/) } else a.className = [] } function Wa(a, b, f, c) {
//        function g(m, e, j, r) {
//            N = m; L = e; ca = b.theme ? "ui" : "fc"; O = b.weekends ? 0 : 1; ua = b.firstDay; if (ra = b.isRTL) {
//                ka =
//                -1; R = L - 1
//            } else { ka = 1; R = 0 } var s = A.start.getMonth(), I = Ga(new Date), E, B = q(A.visStart); if (U) {
//                t(); e = U.find("tr").length; if (N < e) U.find("tr:gt(" + (N - 1) + ")").remove(); else if (N > e) { m = ""; for (e = e; e < N; e++) { m += "<tr class='fc-week" + e + "'>"; for (E = 0; E < L; E++) { m += "<td class='fc-" + za[B.getDay()] + " " + ca + "-state-default fc-new fc-day" + (e * L + E) + (E == R ? " fc-leftmost" : "") + "'>" + (r ? "<div class='fc-day-number'></div>" : "") + "<div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></td>"; C(B, 1); O && da(B) } m += "</tr>" } U.append(m) } fa(U.find("td.fc-new").removeClass("fc-new"));
//                B = q(A.visStart); U.find("td").each(function () { var W = o(this); if (N > 1) B.getMonth() == s ? W.removeClass("fc-other-month") : W.addClass("fc-other-month"); +B == +I ? W.removeClass("fc-not-today").addClass("fc-today").addClass(ca + "-state-highlight") : W.addClass("fc-not-today").removeClass("fc-today").removeClass(ca + "-state-highlight"); W.find("div.fc-day-number").text(B.getDate()); C(B, 1); O && da(B) }); if (N == 1) {
//                    B = q(A.visStart); x.find("th").each(function () {
//                        o(this).text(oa(B, j, b)); this.className = this.className.replace(/^fc-\w+(?= )/,
//                        "fc-" + za[B.getDay()]); C(B, 1); O && da(B)
//                    }); B = q(A.visStart); U.find("td").each(function () { this.className = this.className.replace(/^fc-\w+(?= )/, "fc-" + za[B.getDay()]); C(B, 1); O && da(B) })
//                }
//            } else {
//                var J = o("<table/>").appendTo(a); m = "<thead><tr>"; for (e = 0; e < L; e++) { m += "<th class='fc-" + za[B.getDay()] + " " + ca + "-state-default" + (e == R ? " fc-leftmost" : "") + "'>" + oa(B, j, b) + "</th>"; C(B, 1); O && da(B) } x = o(m + "</tr></thead>").appendTo(J); m = "<tbody>"; B = q(A.visStart); for (e = 0; e < N; e++) {
//                    m += "<tr class='fc-week" + e + "'>"; for (E = 0; E < L; E++) {
//                        m +=
//                        "<td class='fc-" + za[B.getDay()] + " " + ca + "-state-default fc-day" + (e * L + E) + (E == R ? " fc-leftmost" : "") + (N > 1 && B.getMonth() != s ? " fc-other-month" : "") + (+B == +I ? " fc-today " + ca + "-state-highlight" : " fc-not-today") + "'>" + (r ? "<div class='fc-day-number'>" + B.getDate() + "</div>" : "") + "<div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></td>"; C(B, 1); O && da(B)
//                    } m += "</tr>"
//                } U = o(m + "</tbody>").appendTo(J); fa(U.find("td")); P = o("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(a)
//            }
//        } function n(m) {
//            Fa =
//            m; m = U.find("tr td:first-child"); var e = Fa - x.height(), j; if (b.weekMode == "variable") j = e = Math.floor(e / (N == 1 ? 2 : 6)); else { j = Math.floor(e / N); e = e - j * (N - 1) } if (Xa === K) { var r = U.find("tr:first").find("td:first"); r.height(j); Xa = j != r.height() } if (Xa) { m.slice(0, -1).height(j); m.slice(-1).height(e) } else { Sa(m.slice(0, -1), j); Sa(m.slice(-1), e) }
//        } function k(m) { va = m; la.clear(); Ja(x.find("th").slice(0, -1), Aa = Math.floor(va / L)) } function y(m) { A.reportEvents(wa = m); M(H(m)) } function w(m) { t(); M(H(wa), m) } function t() {
//            A._clearEvents();
//            P.empty()
//        } function H(m) { var e = q(A.visStart), j = C(q(e), L), r = o.map(m, Pa), s, I, E, B, J, W, Ba = []; for (s = 0; s < N; s++) { I = Ya(A.sliceSegs(m, r, e, j)); for (E = 0; E < I.length; E++) { B = I[E]; for (J = 0; J < B.length; J++) { W = B[J]; W.row = s; W.level = E; Ba.push(W) } } C(e, 7); C(j, 7) } return Ba } function M(m, e) { jb(m, N, A, 0, va, function (j) { return U.find("tr:eq(" + j + ")") }, la.left, la.right, P, sa, e) } function sa(m, e, j) { A.eventElementHandlers(m, e); if (m.editable || m.editable === K && b.editable) { G(m, e); j.isEnd && A.resizableDayEvent(m, e, Aa) } } function G(m, e) {
//            if (!b.disableDragging &&
//            e.draggable) {
//                var j; e.draggable({
//                    zIndex: 9, delay: 50, opacity: A.option("dragOpacity"), revertDuration: b.dragRevertDuration, start: function (r, s) { A.trigger("eventDragStart", e, m, r, s); A.hideEvents(m, e); Z.start(function (I, E, B, J) { e.draggable("option", "revert", !I || !B && !J); ga(); if (I) { j = B * 7 + J * ka; ma(C(q(m.start), j), C(Pa(m), j)) } else j = 0 }, r, "drag") }, stop: function (r, s) {
//                        Z.stop(); ga(); A.trigger("eventDragStop", e, m, r, s); if (j) { e.find("a").removeAttr("href"); A.eventDrop(this, m, j, 0, m.allDay, r, s) } else {
//                            o.browser.msie && e.css("filter",
//                            ""); A.showEvents(m, e)
//                        }
//                    }
//                })
//            }
//        } function fa(m) { m.click(D).mousedown(ia) } function D(m) { if (!A.option("selectable")) { var e = parseInt(this.className.match(/fc\-day(\d+)/)[1]); e = C(q(A.visStart), Math.floor(e / L) * 7 + e % L); A.trigger("dayClick", this, e, true, m) } } function Q(m, e, j, r) { $ = true; A.trigger("select", A, m, e, j, r) } function ha(m) { if ($) { ga(); $ = false; A.trigger("unselect", A, m) } } function ma(m, e) {
//            for (var j = q(A.visStart), r = C(q(j), L), s = 0; s < N; s++) {
//                var I = new Date(Math.max(j, m)), E = new Date(Math.min(r, e)); if (I < E) {
//                    var B; if (ra) {
//                        B =
//                        Ca(E, j) * ka + R + 1; I = Ca(I, j) * ka + R + 1
//                    } else { B = Ca(I, j); I = Ca(E, j) } fa(pa(s, B, s, I - 1))
//                } C(j, 7); C(r, 7)
//            }
//        } function pa(m, e, j, r) { m = aa.rect(m, e, j, r, a); return A.renderOverlay(m, a) } function ga() { A.clearOverlays() } function X(m) { return C(q(A.visStart), m.row * 7 + m.col * ka + R) } var ca, ua, O, ra, ka, R, va, Fa, N, L, Aa, x, U, wa = [], P, la = new kb(function (m) { return U.find("td:eq(" + (m - Math.max(ua, O) + L) % L + ") div div") }), A = o.extend(this, lb, f, { renderGrid: g, renderEvents: y, rerenderEvents: w, clearEvents: t, setHeight: n, setWidth: k, defaultEventEnd: function (m) { return q(m.start) } });
//        A.name = c; A.init(a, b); mb(a.addClass("fc-grid")); var aa = new nb(function (m, e) { var j, r, s, I = U.find("tr:first td"); if (ra) I = o(I.get().reverse()); I.each(function (E, B) { j = o(B); r = j.offset().left; if (E) s[1] = r; s = [r]; e[E] = s }); s[1] = r + j.outerWidth(); U.find("tr").each(function (E, B) { j = o(B); r = j.offset().top; if (E) s[1] = r; s = [r]; m[E] = s }); s[1] = r + j.outerHeight() }), Z = new ob(aa), $ = false, ia = pb(A, Z, X, function () { return true }, ma, ga, Q, ha); A.select = function (m, e, j) { aa.build(); ha(); e || (e = q(m)); ma(m, C(q(e), 1)); Q(m, e, j) }; A.unselect = ha;
//        qb(A, ha); A.dragStart = function (m, e) { Z.start(function (j) { ga(); j && pa(j.row, j.col, j.row, j.col) }, e) }; A.dragStop = function (m, e, j) { var r = Z.stop(); ga(); if (r) { r = X(r); A.trigger("drop", m, r, true, e, j) } }
//    } function jb(a, b, f, c, g, n, k, y, w, t, H) {
//        var M = f.options, sa = M.isRTL, G, fa = a.length, D, Q, ha, ma, pa, ga = "", X = {}, ca = {}, ua = [], O = []; for (G = 0; G < fa; G++) {
//            D = a[G]; Q = D.event; ha = "fc-event fc-event-hori "; if (sa) {
//                if (D.isStart) ha += "fc-corner-right "; if (D.isEnd) ha += "fc-corner-left "; ma = D.isEnd ? k(D.end.getDay() - 1) : c; pa = D.isStart ? y(D.start.getDay()) :
//                g
//            } else { if (D.isStart) ha += "fc-corner-left "; if (D.isEnd) ha += "fc-corner-right "; ma = D.isStart ? k(D.start.getDay()) : c; pa = D.isEnd ? y(D.end.getDay() - 1) : g } ga += "<div class='" + ha + Q.className.join(" ") + "' style='position:absolute;z-index:8;left:" + ma + "px'><a" + (Q.url ? " href='" + Ka(Q.url) + "'" : "") + ">" + (!Q.allDay && D.isStart ? "<span class='fc-event-time'>" + Ka(Ha(Q.start, Q.end, f.option("timeFormat"), M)) + "</span>" : "") + "<span class='fc-event-title'>" + Ka(Q.title) + "</span></a>" + ((Q.editable || Q.editable === K && M.editable) && !M.disableResizing &&
//            o.fn.resizable ? "<div class='ui-resizable-handle ui-resizable-" + (sa ? "w" : "e") + "'></div>" : "") + "</div>"; D.left = ma; D.outerWidth = pa - ma
//        } w[0].innerHTML = ga; g = w.children(); for (G = 0; G < fa; G++) { D = a[G]; c = o(g[G]); Q = D.event; k = f.trigger("eventRender", Q, Q, c); if (k === false) c.remove(); else { if (k && k !== true) { c.remove(); c = o(k).css({ position: "absolute", left: D.left }).appendTo(w) } D.element = c; if (Q._id === H) t(Q, c, D); else c[0]._fci = G; f.reportEventElement(Q, c) } } rb(w, a, t); for (G = 0; G < fa; G++) {
//            D = a[G]; if (c = D.element) {
//                t = X[w = D.key = sb(c[0])];
//                D.hsides = t === K ? (X[w] = Za(c[0], true)) : t
//            }
//        } for (G = 0; G < fa; G++) { D = a[G]; if (c = D.element) c[0].style.width = D.outerWidth - D.hsides + "px" } for (G = 0; G < fa; G++) { D = a[G]; if (c = D.element) { t = ca[w = D.key]; D.outerHeight = c[0].offsetHeight + (t === K ? (ca[w] = tb(c[0])) : t) } } for (X = G = 0; X < b; X++) { for (ca = w = t = 0; G < fa && (D = a[G]).row == X;) { if (D.level != w) { ca += t; t = 0; w++ } t = Math.max(t, D.outerHeight || 0); D.top = ca; G++ } ua[X] = n(X).find("td:first div.fc-day-content > div").height(ca + t) } for (X = 0; X < b; X++) O[X] = ua[X][0].offsetTop; for (G = 0; G < fa; G++) {
//            D = a[G]; if (c =
//            D.element) { c[0].style.top = O[D.row] + D.top + "px"; Q = D.event; f.trigger("eventAfterRender", Q, Q, c) }
//        }
//    } function ub(a, b, f, c) {
//        function g(d, i) {
//            m = d; na = b.theme ? "ui" : "fc"; La = b.weekends ? 0 : 1; vb = b.firstDay; if (Ta = b.isRTL) { Y = -1; ta = m - 1 } else { Y = 1; ta = 0 } Da = wb(b.minTime); Ua = wb(b.maxTime); d = Ta ? C(q(v.visEnd), -1) : q(v.visStart); var h = q(d), p = Ga(new Date); if (A) {
//                G(); A.find("tr:first th").slice(1, -1).each(function () {
//                    o(this).text(oa(h, i, b)); this.className = this.className.replace(/^fc-\w+(?= )/, "fc-" + za[h.getDay()]); C(h, Y); La && da(h,
//                    Y)
//                }); h = q(d); ia.find("td").each(function () { this.className = this.className.replace(/^fc-\w+(?= )/, "fc-" + za[h.getDay()]); +h == +p ? o(this).removeClass("fc-not-today").addClass("fc-today").addClass(na + "-state-highlight") : o(this).addClass("fc-not-today").removeClass("fc-today").removeClass(na + "-state-highlight"); C(h, Y); La && da(h, Y) })
//            } else {
//                var l, u, z = b.slotMinutes % 15 == 0, F = "<div class='fc-agenda-head' style='position:relative;z-index:4'><table style='width:100%'><tr class='fc-first" + (b.allDaySlot ? "" : " fc-last") +
//                "'><th class='fc-leftmost " + na + "-state-default'>&nbsp;</th>"; for (l = 0; l < m; l++) { F += "<th class='fc-" + za[h.getDay()] + " " + na + "-state-default'>" + oa(h, i, b) + "</th>"; C(h, Y); La && da(h, Y) } F += "<th class='" + na + "-state-default'>&nbsp;</th></tr>"; if (b.allDaySlot) F += "<tr class='fc-all-day'><th class='fc-axis fc-leftmost " + na + "-state-default'>" + b.allDayText + "</th><td colspan='" + m + "' class='" + na + "-state-default'><div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></td><th class='" + na + "-state-default'>&nbsp;</th></tr><tr class='fc-divider fc-last'><th colspan='" +
//                (m + 2) + "' class='" + na + "-state-default fc-leftmost'><div/></th></tr>"; F += "</table></div>"; A = o(F).appendTo(a); w(A.find("td")); W = o("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(A); h = xb(); var T = ba(q(h), Ua); ba(h, Da); F = "<table>"; for (l = 0; h < T; l++) {
//                    u = h.getMinutes(); F += "<tr class='" + (!l ? "fc-first" : !u ? "" : "fc-minor") + "'><th class='fc-axis fc-leftmost " + na + "-state-default'>" + (!z || !u ? oa(h, b.axisFormat) : "&nbsp;") + "</th><td class='fc-slot" + l + " " + na + "-state-default'><div style='position:relative'>&nbsp;</div></td></tr>";
//                    ba(h, b.slotMinutes); e++
//                } F += "</table>"; aa = o("<div class='fc-agenda-body' style='position:relative;z-index:2;overflow:auto'/>").append(Z = o("<div style='position:relative;overflow:hidden'>").append($ = o(F))).appendTo(a); t(aa.find("td")); Ba = o("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(Z); h = q(d); F = "<div class='fc-agenda-bg' style='position:absolute;z-index:1'><table style='width:100%;height:100%'><tr class='fc-first'>"; for (l = 0; l < m; l++) {
//                    F += "<td class='fc-" + za[h.getDay()] + " " + na +
//                    "-state-default " + (!l ? "fc-leftmost " : "") + (+h == +p ? na + "-state-highlight fc-today" : "fc-not-today") + "'><div class='fc-day-content'><div>&nbsp;</div></div></td>"; C(h, Y); La && da(h, Y)
//                } F += "</tr></table></div>"; ia = o(F).appendTo(a)
//            }
//        } function n() { var d = xb(), i = q(d); i.setHours(b.firstHour); var h = O(d, i) + 1; d = function () { aa.scrollTop(h) }; d(); setTimeout(d, 0) } function k(d, i) { E = d; $a = {}; aa.height(d - A.height()); s = aa.find("tr:first div").height() + 1; ia.css({ top: A.find("tr").height(), height: d }); i && n() } function y(d) {
//            I = d; Qa.clear();
//            aa.width(d); $.width(""); d = A.find("tr:first th"); var i = ia.find("td"), h = aa[0].clientWidth; $.width(h); j = 0; Ja(A.find("tr:lt(2) th:first").add(aa.find("tr:first th")).width("").each(function () { j = Math.max(j, o(this).outerWidth()) }), j); r = Math.floor((h - j) / m); Ja(i.slice(0, -1), r); Ja(d.slice(1, -2), r); Ja(d.slice(-2, -1), h - j - r * (m - 1)); ia.css({ left: j, width: h - j })
//        } function w(d) { d.click(H).mousedown(Fb) } function t(d) { d.click(H).mousedown(ra) } function H(d) {
//            if (!v.option("selectable")) {
//                var i = Math.min(m - 1, Math.floor((d.pageX -
//                ia.offset().left) / r)); i = C(q(v.visStart), i * Y + ta); var h = this.className.match(/fc-slot(\d+)/); if (h) { h = parseInt(h[1]) * b.slotMinutes; var p = Math.floor(h / 60); i.setHours(p); i.setMinutes(h % 60 + Da); v.trigger("dayClick", this, i, false, d) } else v.trigger("dayClick", this, i, true, d)
//            }
//        } function M(d, i) { v.reportEvents(J = d); var h, p = d.length, l = [], u = []; for (h = 0; h < p; h++) d[h].allDay ? l.push(d[h]) : u.push(d[h]); Q(fa(l), i); ha(D(u), i) } function sa(d) { G(); M(J, d) } function G() { v._clearEvents(); W.empty(); Ba.empty() } function fa(d) {
//            d = Ya(v.sliceSegs(d,
//            o.map(d, Pa), v.visStart, v.visEnd)); var i, h = d.length, p, l, u, z = []; for (i = 0; i < h; i++) { p = d[i]; for (l = 0; l < p.length; l++) { u = p[l]; u.row = 0; u.level = i; z.push(u) } } return z
//        } function D(d) { var i = ba(q(v.visStart), Da), h = o.map(d, U), p, l, u, z, F, T, S = []; for (p = 0; p < m; p++) { l = Ya(v.sliceSegs(d, h, i, ba(q(i), Ua - Da))); Gb(l); for (u = 0; u < l.length; u++) { z = l[u]; for (F = 0; F < z.length; F++) { T = z[F]; T.col = p; T.level = u; S.push(T) } } C(i, 1, true) } return S } function Q(d, i) {
//            if (b.allDaySlot) {
//                jb(d, 1, v, j, I, function () { return A.find("tr.fc-all-day") }, function (h) {
//                    return j +
//                    Qa.left(wa(h))
//                }, function (h) { return j + Qa.right(wa(h)) }, W, pa, i); k(E)
//            }
//        } function ha(d, i) {
//            var h, p = d.length, l, u, z, F, T, S, V, ea, ja, xa, ab = "", Ma = {}, yb = {}; for (h = 0; h < p; h++) {
//                l = d[h]; u = l.event; z = "fc-event fc-event-vert "; if (l.isStart) z += "fc-corner-top "; if (l.isEnd) z += "fc-corner-bottom "; F = O(l.start, l.start); T = O(l.start, l.end); S = l.col; V = l.level; ea = l.forward || 0; ja = j + Qa.left(S * Y + ta); xa = j + Qa.right(S * Y + ta) - ja; xa = Math.min(xa - 6, xa * 0.95); S = V ? xa / (V + ea + 1) : ea ? (xa / (ea + 1) - 6) * 2 : xa; V = ja + xa / (V + ea + 1) * V * Y + (Ta ? xa - S : 0); l.top = F; l.left =
//                V; l.outerWidth = S; l.outerHeight = T - F; ab += ma(u, l, z)
//            } Ba[0].innerHTML = ab; F = Ba.children(); for (h = 0; h < p; h++) { l = d[h]; u = l.event; z = o(F[h]); T = v.trigger("eventRender", u, u, z); if (T === false) z.remove(); else { if (T && T !== true) { z.remove(); z = o(T).css({ position: "absolute", top: l.top, left: l.left }).appendTo(Ba) } l.element = z; if (u._id === i) ga(u, z, l); else z[0]._fci = h; v.reportEventElement(u, z) } } rb(Ba, d, ga); for (h = 0; h < p; h++) {
//                l = d[h]; if (z = l.element) {
//                    i = Ma[u = l.key = sb(z[0])]; l.vsides = i === K ? (Ma[u] = bb(z[0], true)) : i; i = yb[u]; l.hsides = i === K ?
//                    (yb[u] = Za(z[0], true)) : i; u = z.find("span.fc-event-title"); if (u.length) l.titleTop = u[0].offsetTop
//                }
//            } for (h = 0; h < p; h++) { l = d[h]; if (z = l.element) { z[0].style.width = l.outerWidth - l.hsides + "px"; z[0].style.height = (Ma = l.outerHeight - l.vsides) + "px"; u = l.event; if (l.titleTop !== K && Ma - l.titleTop < 10) { z.find("span.fc-event-time").text(oa(u.start, v.option("timeFormat")) + " - " + u.title); z.find("span.fc-event-title").remove() } v.trigger("eventAfterRender", u, u, z) } }
//        } function ma(d, i, h) {
//            return "<div class='" + h + d.className.join(" ") +
//            "' style='position:absolute;z-index:8;top:" + i.top + "px;left:" + i.left + "px'><a" + (d.url ? " href='" + Ka(d.url) + "'" : "") + "><span class='fc-event-bg'></span><span class='fc-event-time'>" + Ka(Ha(d.start, d.end, v.option("timeFormat"))) + "</span><span class='fc-event-title'>" + Ka(d.title) + "</span></a>" + ((d.editable || d.editable === K && b.editable) && !b.disableResizing && o.fn.resizable ? "<div class='ui-resizable-handle ui-resizable-s'>=</div>" : "") + "</div>"
//        } function pa(d, i, h) {
//            v.eventElementHandlers(d, i); if (d.editable || d.editable ===
//            K && b.editable) { X(d, i, h.isStart); h.isEnd && v.resizableDayEvent(d, i, r) }
//        } function ga(d, i, h) { v.eventElementHandlers(d, i); if (d.editable || d.editable === K && b.editable) { var p = i.find("span.fc-event-time"); ca(d, i, p); h.isEnd && ua(d, i, p) } } function X(d, i, h) {
//            if (!b.disableDragging && i.draggable) {
//                var p, l = true, u; i.draggable({
//                    zIndex: 9, opacity: v.option("dragOpacity", "month"), revertDuration: b.dragRevertDuration, start: function (F, T) {
//                        v.trigger("eventDragStart", i, d, F, T); v.hideEvents(d, i); p = i.width(); Ea.start(function (S, V, ea,
//                        ja) { i.draggable("option", "revert", !S || !ea && !ja); x(); if (S) { u = ja * Y; if (S.row) { if (h && l) { Sa(i.width(r - 10), s * Math.round((d.end ? (d.end - d.start) / Hb : b.defaultEventMinutes) / b.slotMinutes)); i.draggable("option", "grid", [r, 1]); l = false } } else { N(C(q(d.start), u), C(Pa(d), u)); z() } } }, F, "drag")
//                    }, stop: function (F, T) {
//                        var S = Ea.stop(); x(); v.trigger("eventDragStop", i, d, F, T); if (S && (!l || u)) {
//                            i.find("a").removeAttr("href"); S = 0; l || (S = Math.round((i.offset().top - Z.offset().top) / s) * b.slotMinutes + Da - (d.start.getHours() * 60 + d.start.getMinutes()));
//                            v.eventDrop(this, d, u, S, l, F, T)
//                        } else { z(); o.browser.msie && i.css("filter", ""); v.showEvents(d, i) }
//                    }
//                }); function z() { if (!l) { i.width(p).height("").draggable("option", "grid", null); l = true } }
//            }
//        } function ca(d, i, h) {
//            if (!b.disableDragging && i.draggable) {
//                var p, l = false, u, z, F; i.draggable({
//                    zIndex: 9, scroll: false, grid: [r, s], axis: m == 1 ? "y" : false, opacity: v.option("dragOpacity"), revertDuration: b.dragRevertDuration, start: function (V, ea) {
//                        v.trigger("eventDragStart", i, d, V, ea); v.hideEvents(d, i); o.browser.msie && i.find("span.fc-event-bg").hide();
//                        p = i.position(); z = F = 0; Ea.start(function (ja, xa, ab, Ma) { i.draggable("option", "revert", !ja); x(); if (ja) { u = Ma * Y; if (b.allDaySlot && !ja.row) { if (!l) { l = true; h.hide(); i.draggable("option", "grid", null) } N(C(q(d.start), u), C(Pa(d), u)) } else S() } }, V, "drag")
//                    }, drag: function (V, ea) { z = Math.round((ea.position.top - p.top) / s) * b.slotMinutes; if (z != F) { l || T(z); F = z } }, stop: function (V, ea) {
//                        var ja = Ea.stop(); x(); v.trigger("eventDragStop", i, d, V, ea); if (ja && (u || z || l)) v.eventDrop(this, d, u, l ? 0 : z, l, V, ea); else {
//                            S(); i.css(p); T(0); o.browser.msie &&
//                            i.css("filter", "").find("span.fc-event-bg").css("display", ""); v.showEvents(d, i)
//                        }
//                    }
//                }); function T(V) { var ea = ba(q(d.start), V), ja; if (d.end) ja = ba(q(d.end), V); h.text(Ha(ea, ja, v.option("timeFormat"))) } function S() { if (l) { h.css("display", ""); i.draggable("option", "grid", [r, s]); l = false } }
//            }
//        } function ua(d, i, h) {
//            if (!b.disableResizing && i.resizable) {
//                var p, l; i.resizable({
//                    handles: { s: "div.ui-resizable-s" }, grid: s, start: function (u, z) {
//                        p = l = 0; v.hideEvents(d, i); o.browser.msie && o.browser.version == "6.0" && i.css("overflow", "hidden");
//                        i.css("z-index", 9); v.trigger("eventResizeStart", this, d, u, z)
//                    }, resize: function (u, z) { p = Math.round((Math.max(s, i.height()) - z.originalSize.height) / s); if (p != l) { h.text(Ha(d.start, !p && !d.end ? null : ba(v.eventEnd(d), b.slotMinutes * p), v.option("timeFormat"))); l = p } }, stop: function (u, z) { v.trigger("eventResizeStop", this, d, u, z); if (p) v.eventResize(this, d, 0, b.slotMinutes * p, u, z); else { i.css("z-index", 8); v.showEvents(d, i) } }
//                })
//            }
//        } function O(d, i) {
//            d = q(d, true); if (i < ba(q(d), Da)) return 0; if (i >= ba(q(d), Ua)) return Z.height(); d = b.slotMinutes;
//            i = i.getHours() * 60 + i.getMinutes() - Da; var h = Math.floor(i / d), p = $a[h]; if (p === K) p = $a[h] = aa.find("tr:eq(" + h + ") td div")[0].offsetTop; return Math.max(0, Math.round(p - 1 + s * (i % d / d)))
//        } function ra(d) {
//            if (v.option("selectable")) {
//                R(d); var i = this, h; Ea.start(function (p, l) { Fa(); if (p && p.col == l.col && !la(p)) { l = P(l); p = P(p); h = [l, ba(q(l), b.slotMinutes), p, ba(q(p), b.slotMinutes)].sort(zb); va(h[0], h[3]) } else h = null }, d); o(document).one("mouseup", function (p) {
//                    Ea.stop(); if (h) {
//                        +h[0] == +h[1] && v.trigger("dayClick", i, h[0], false, p); ka(h[0],
//                        h[3], false, p)
//                    }
//                })
//            }
//        } function ka(d, i, h, p) { cb = true; v.trigger("select", v, d, i, h, p) } function R(d) { if (cb) { Fa(); cb = false; v.trigger("unselect", v, d) } } function va(d, i) {
//            var h = v.option("selectHelper"); if (h) {
//                var p = Ca(d, v.visStart) * Y + ta; if (p >= 0 && p < m) {
//                    p = Ra.rect(0, p, 0, p, Z); var l = O(d, d), u = O(d, i); if (u > l) {
//                        p.top = l; p.height = u - l; p.left += 2; p.width -= 5; if (o.isFunction(h)) { if (d = h(d, i)) { p.position = "absolute"; p.zIndex = 8; qa = o(d).css(p).appendTo(Z) } } else {
//                            qa = o(ma({ title: "", start: d, end: i, className: [], editable: false }, p, "fc-event fc-event-vert fc-corner-top fc-corner-bottom "));
//                            o.browser.msie && qa.find("span.fc-event-bg").hide(); qa.css("opacity", v.option("dragOpacity"))
//                        } if (qa) { t(qa); Z.append(qa); Ja(qa, p.width, true); Sa(qa, p.height, true) }
//                    }
//                }
//            } else Aa(d, i)
//        } function Fa() { x(); if (qa) { qa.remove(); qa = null } } function N(d, i) { var h; if (Ta) { h = Ca(i, v.visStart) * Y + ta + 1; d = Ca(d, v.visStart) * Y + ta + 1 } else { h = Ca(d, v.visStart); d = Ca(i, v.visStart) } h = Math.max(0, h); d = Math.min(m, d); h < d && w(L(0, h, 0, d - 1)) } function L(d, i, h, p) { d = Ra.rect(d, i, h, p, A); return v.renderOverlay(d, A) } function Aa(d, i) {
//            for (var h = q(v.visStart),
//            p = C(q(h), 1), l = 0; l < m; l++) { var u = new Date(Math.max(h, d)), z = new Date(Math.min(p, i)); if (u < z) { var F = l * Y + ta; F = Ra.rect(0, F, 0, F, Z); u = O(h, u); z = O(h, z); F.top = u; F.height = z - u; t(v.renderOverlay(F, Z)) } C(h, 1); C(p, 1) }
//        } function x() { v.clearOverlays() } function U(d) { return d.end ? q(d.end) : ba(q(d.start), b.defaultEventMinutes) } function wa(d) { return (d - Math.max(vb, La) + m) % m * Y + ta } function P(d) { var i = C(q(v.visStart), d.col * Y + ta); d = d.row; b.allDaySlot && d--; d >= 0 && ba(i, Da + d * b.slotMinutes); return i } function la(d) {
//            return b.allDaySlot &&
//            !d.row
//        } var A, aa, Z, $, ia, m, e = 0, j, r, s, I, E, B, J = [], W, Ba, na, vb, La, Ta, Y, ta, Da, Ua, Qa = new kb(function (d) { return ia.find("td:eq(" + d + ") div div") }), $a = {}, v = o.extend(this, lb, f, { renderAgenda: g, renderEvents: M, rerenderEvents: sa, clearEvents: G, setHeight: k, setWidth: y, beforeHide: function () { B = aa.scrollTop() }, afterShow: function () { aa.scrollTop(B) }, defaultEventEnd: function (d) { var i = q(d.start); if (d.allDay) return i; return ba(i, b.defaultEventMinutes) } }); v.name = c; v.init(a, b); mb(a.addClass("fc-agenda")); var Ra = new nb(function (d,
//        i) { function h(V) { return Math.max(F, Math.min(T, V)) } var p, l, u; ia.find("td").each(function (V, ea) { p = o(ea); l = p.offset().left; if (V) u[1] = l; u = [l]; i[V] = u }); u[1] = l + p.outerWidth(); if (b.allDaySlot) { p = A.find("td"); l = p.offset().top; d[0] = [l, l + p.outerHeight()] } for (var z = Z.offset().top, F = aa.offset().top, T = F + aa.outerHeight(), S = 0; S < e; S++) d.push([h(z + s * S), h(z + s * (S + 1))]) }), Ea = new ob(Ra), cb = false, Fb = pb(v, Ea, P, la, N, x, ka, R); v.select = function (d, i, h) {
//            Ra.build(); R(); if (h) { if (b.allDaySlot) { i || (i = q(d)); N(d, C(q(i), 1)) } } else {
//                i ||
//                (i = ba(q(d), b.slotMinutes)); va(d, i)
//            } ka(d, i, h)
//        }; v.unselect = R; qb(v, R); var qa; v.dragStart = function (d, i) { Ea.start(function (h) { x(); if (h) if (la(h)) L(h.row, h.col, h.row, h.col); else { h = P(h); var p = ba(q(h), b.defaultEventMinutes); Aa(h, p) } }, i) }; v.dragStop = function (d, i, h) { var p = Ea.stop(); x(); p && v.trigger("drop", d, P(p), la(p), i, h) }
//    } function Gb(a) {
//        var b, f, c, g, n, k; for (b = a.length - 1; b > 0; b--) {
//            g = a[b]; for (f = 0; f < g.length; f++) {
//                n = g[f]; for (c = 0; c < a[b - 1].length; c++) {
//                    k = a[b - 1][c]; if (Ab(n, k)) k.forward = Math.max(k.forward || 0, (n.forward ||
//                    0) + 1)
//                }
//            }
//        }
//    } function rb(a, b, f) { a.unbind("mouseover").mouseover(function (c) { for (var g = c.target, n; g != this;) { n = g; g = g.parentNode } if ((g = n._fci) !== K) { n._fci = K; n = b[g]; f(n.event, n.element, n); o(c.target).trigger(c) } c.stopPropagation() }) } function Ya(a) { var b = [], f, c = a.length, g, n, k, y; for (f = 0; f < c; f++) { g = a[f]; for (n = 0; ;) { k = false; if (b[n]) for (y = 0; y < b[n].length; y++) if (Ab(b[n][y], g)) { k = true; break } if (k) n++; else break } if (b[n]) b[n].push(g); else b[n] = [g] } return b } function Ib(a, b) {
//        return (b.msLength - a.msLength) * 100 + (a.event.start -
//        b.event.start)
//    } function Ab(a, b) { return a.end > b.start && a.start < b.end } function pb(a, b, f, c, g, n, k, y) { return function (w) { if (a.option("selectable")) { y(w); var t = this, H; b.start(function (M, sa) { n(); if (M && c(M)) { H = [f(sa), f(M)].sort(zb); g(H[0], C(q(H[1]), 1), true) } else H = null }, w); o(document).one("mouseup", function (M) { b.stop(); if (H) { +H[0] == +H[1] && a.trigger("dayClick", t, H[0], true, M); k(H[0], H[1], true, M) } }) } } } function qb(a, b) {
//        a.option("selectable") && a.option("unselectAuto") && o(document).mousedown(function (f) {
//            var c =
//            a.option("unselectCancel"); if (c) if (o(f.target).parents(c).length) return; b(f)
//        })
//    } function db(a, b, f) { a.setFullYear(a.getFullYear() + b); f || Ga(a); return a } function eb(a, b, f) { if (+a) { b = a.getMonth() + b; var c = q(a); c.setDate(1); c.setMonth(b); a.setMonth(b); for (f || Ga(a) ; a.getMonth() != c.getMonth() ;) a.setDate(a.getDate() + (a < c ? 1 : -1)) } return a } function C(a, b, f) { if (+a) { b = a.getDate() + b; var c = q(a); c.setHours(9); c.setDate(b); a.setDate(b); f || Ga(a); fb(a, c) } return a } function fb(a, b) {
//        if (+a) for (; a.getDate() != b.getDate() ;) a.setTime(+a +
//        (a < b ? 1 : -1) * Jb)
//    } function ba(a, b) { a.setMinutes(a.getMinutes() + b); return a } function Ga(a) { a.setHours(0); a.setMinutes(0); a.setSeconds(0); a.setMilliseconds(0); return a } function q(a, b) { if (b) return Ga(new Date(+a)); return new Date(+a) } function xb() { var a = 0, b; do b = new Date(1970, a++, 1); while (b.getHours()); return b } function da(a, b, f) { for (b = b || 1; !a.getDay() || f && a.getDay() == 1 || !f && a.getDay() == 6;) C(a, b); return a } function Ca(a, b) { return Math.round((q(a, true) - q(b, true)) / Bb) } function Cb(a, b, f, c) {
//        if (b !== K && b != a.getFullYear()) {
//            a.setDate(1);
//            a.setMonth(0); a.setFullYear(b)
//        } if (f !== K && f != a.getMonth()) { a.setDate(1); a.setMonth(f) } c !== K && a.setDate(c)
//    } function Ja(a, b, f) { a.each(function (c, g) { g.style.width = b - Za(g, f) + "px" }) } function Sa(a, b, f) { a.each(function (c, g) { g.style.height = b - bb(g, f) + "px" }) } function Za(a, b) {
//        return (parseFloat(jQuery.curCSS(a, "paddingLeft", true)) || 0) + (parseFloat(jQuery.curCSS(a, "paddingRight", true)) || 0) + (parseFloat(jQuery.curCSS(a, "borderLeftWidth", true)) || 0) + (parseFloat(jQuery.curCSS(a, "borderRightWidth", true)) || 0) + (b ? Kb(a) :
//        0)
//    } function Kb(a) { return (parseFloat(jQuery.curCSS(a, "marginLeft", true)) || 0) + (parseFloat(jQuery.curCSS(a, "marginRight", true)) || 0) } function bb(a, b) { return (parseFloat(jQuery.curCSS(a, "paddingTop", true)) || 0) + (parseFloat(jQuery.curCSS(a, "paddingBottom", true)) || 0) + (parseFloat(jQuery.curCSS(a, "borderTopWidth", true)) || 0) + (parseFloat(jQuery.curCSS(a, "borderBottomWidth", true)) || 0) + (b ? tb(a) : 0) } function tb(a) {
//        return (parseFloat(jQuery.curCSS(a, "marginTop", true)) || 0) + (parseFloat(jQuery.curCSS(a, "marginBottom",
//        true)) || 0)
//    } function gb(a, b) { b = typeof b == "number" ? b + "px" : b; a[0].style.cssText += ";min-height:" + b + ";_height:" + b } function nb(a) { var b = this, f, c; b.build = function () { f = []; c = []; a(f, c) }; b.cell = function (g, n) { var k = f.length, y = c.length, w, t = -1, H = -1; for (w = 0; w < k; w++) if (n >= f[w][0] && n < f[w][1]) { t = w; break } for (w = 0; w < y; w++) if (g >= c[w][0] && g < c[w][1]) { H = w; break } return t >= 0 && H >= 0 ? { row: t, col: H } : null }; b.rect = function (g, n, k, y, w) { w = w.offset(); return { top: f[g][0] - w.top, left: c[n][0] - w.left, width: c[y][1] - c[n][0], height: f[k][1] - f[g][0] } } }
//    function ob(a) { function b(y) { y = a.cell(y.pageX, y.pageY); if (!y != !k || y && (y.row != k.row || y.col != k.col)) { if (y) { n || (n = y); g(y, n, y.row - n.row, y.col - n.col) } else g(y, n); k = y } } var f = this, c, g, n, k; f.start = function (y, w, t) { g = y; n = k = null; a.build(); b(w); c = t || "mousemove"; o(document).bind(c, b) }; f.stop = function () { o(document).unbind(c, b); return k } } function Na(a) { return (a < 10 ? "0" : "") + a } function hb(a, b) { if (a[b] !== K) return a[b]; b = b.split(/(?=[A-Z])/); for (var f = b.length - 1, c; f >= 0; f--) { c = a[b[f].toLowerCase()]; if (c !== K) return c } return a[""] }
//    function Ka(a) { return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />") } function kb(a) { function b(k) { return c[k] = c[k] || a(k) } var f = this, c = {}, g = {}, n = {}; f.left = function (k) { return g[k] = g[k] === K ? b(k).position().left : g[k] }; f.right = function (k) { return n[k] = n[k] === K ? f.left(k) + b(k).width() : n[k] }; f.clear = function () { c = {}; g = {}; n = {} } } function sb(a) {
//        return a.id + "/" + a.className + "/" + a.style.cssText.replace(/(^|;)\s*(top|left|width|height)\s*:[^;]*/ig,
//        "")
//    } function zb(a, b) { return a - b } function Pa(a) { return a.end ? Lb(a.end, a.allDay) : C(q(a.start), 1) } function Lb(a, b) { a = q(a); return b || a.getHours() || a.getMinutes() ? C(a, 1) : Ga(a) } function mb(a) { a.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function () { return false }) } var ya = o.fullCalendar = {}, Oa = ya.views = {}, Va = {
//        defaultView: "month", aspectRatio: 1.35, header: { left: "title", center: "", right: "today prev,next" }, weekends: true, allDayDefault: true, lazyFetching: true, startParam: "start", endParam: "end",
//        titleFormat: { month: "MMMM yyyy", week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}", day: "dddd, MMM d, yyyy" }, columnFormat: { month: "ddd", week: "ddd M/d", day: "dddd M/d" }, timeFormat: { "": "h(:mm)t" }, isRTL: false, firstDay: 0, monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], buttonText: { prev: "&nbsp;&#9668;&nbsp;", next: "&nbsp;&#9658;&nbsp;", prevYear: "&nbsp;&lt;&lt;&nbsp;", nextYear: "&nbsp;&gt;&gt;&nbsp;", today: "today", month: "month", week: "week", day: "day" }, theme: false, buttonIcons: { prev: "circle-triangle-w", next: "circle-triangle-e" }, unselectAuto: true, dropAccept: "*"
//    }, Mb = {
//        header: { left: "next,prev today", center: "", right: "title" }, buttonText: {
//            prev: "&nbsp;&#9658;&nbsp;", next: "&nbsp;&#9668;&nbsp;", prevYear: "&nbsp;&gt;&gt;&nbsp;",
//            nextYear: "&nbsp;&lt;&lt;&nbsp;"
//        }, buttonIcons: { prev: "circle-triangle-e", next: "circle-triangle-w" }
//    }, Db = ya.setDefaults = function (a) { o.extend(true, Va, a) }; o.fn.fullCalendar = function (a) {
//        if (typeof a == "string") { var b = Array.prototype.slice.call(arguments, 1), f; this.each(function () { var n = o.data(this, "fullCalendar"); if (n) if (n = n[a]) { n = n.apply(this, b); if (f === K) f = n } }); if (f !== K) return f; return this } var c = a.eventSources || []; delete a.eventSources; if (a.events) { c.push(a.events); delete a.events } c.unshift([]); a = o.extend(true,
//        {}, Va, a.isRTL || a.isRTL === K && Va.isRTL ? Mb : {}, a); var g = a.theme ? "ui" : "fc"; this.each(function () {
//            function n(e) {
//                if (e != Aa) {
//                    N++; t(); var j = x, r; if (j) { if (j.eventsChanged) { M(); j.eventDirty = j.eventsChanged = false } j.beforeHide && j.beforeHide(); gb(R, R.height()); j.element.hide() } else gb(R, 1); R.css("overflow", "hidden"); if (U[e]) (x = U[e]).element.show(); else x = U[e] = ya.views[e](r = wa = o("<div class='fc-view fc-view-" + e + "' style='position:absolute'/>").appendTo(R), a, e); if ($) {
//                        $.find("div.fc-button-" + Aa).removeClass(g + "-state-active");
//                        $.find("div.fc-button-" + e).addClass(g + "-state-active")
//                    } Aa = e; k(); R.css("overflow", ""); j && gb(R, 1); !r && x.afterShow && x.afterShow(); N--
//                }
//            } function k(e) {
//                if (y()) {
//                    N++; t(); va === K && ga(); if (!x.start || e || L < x.start || L >= x.end) { x.render(L, e || 0); X(true); !la || !a.lazyFetching || x.visStart < la || x.visEnd > A ? Q() : x.renderEvents(P) } else if (x.sizeDirty || x.eventsDirty || !a.lazyFetching) { x.clearEvents(); x.sizeDirty && X(); a.lazyFetching ? x.renderEvents(P) : Q() } ka = ra.outerWidth(); x.sizeDirty = false; x.eventsDirty = false; if ($) {
//                        $.find("h2.fc-header-title").html(x.title);
//                        e = new Date; e >= x.start && e < x.end ? $.find("div.fc-button-today").addClass(g + "-state-disabled") : $.find("div.fc-button-today").removeClass(g + "-state-disabled")
//                    } N--; x.trigger("viewDisplay", O)
//                }
//            } function y() { return O.offsetWidth !== 0 } function w() { return o("body")[0].offsetWidth !== 0 } function t() { x && x.unselect() } function H() { M(); if (y()) { x.clearEvents(); x.renderEvents(P); x.eventsDirty = false } } function M() { o.each(U, function () { this.eventsDirty = true }) } function sa() {
//                G(); if (y()) {
//                    ga(); X(); t(); x.rerenderEvents(); x.sizeDirty =
//                    false
//                }
//            } function G() { o.each(U, function () { this.sizeDirty = true }) } function fa(e) { P = []; la = q(x.visStart); A = q(x.visEnd); for (var j = c.length, r = function () { --j || e && e(P) }, s = 0; s < c.length; s++) D(c[s], r) } function D(e, j) {
//                var r = x.name, s = q(L), I = function (J) { if (r == x.name && +s == +L && o.inArray(e, c) != -1) { for (var W = 0; W < J.length; W++) { Ia(J[W], a); J[W].source = e } P = P.concat(J); j && j(J) } }, E = function (J) { I(J); ma() }; if (typeof e == "string") {
//                    var B = {}; B[a.startParam] = Math.round(la.getTime() / 1E3); B[a.endParam] = Math.round(A.getTime() / 1E3);
//                    if (a.cacheParam) B[a.cacheParam] = (new Date).getTime(); ha(); o.ajax({ url: e, dataType: "json", data: B, cache: a.cacheParam || false, success: E })
//                } else if (o.isFunction(e)) { ha(); e(q(la), q(A), E) } else I(e)
//            } function Q() { fa(function (e) { x.renderEvents(e) }) } function ha() { aa++ || x.trigger("loading", O, true) } function ma() { --aa || x.trigger("loading", O, false) } function pa(e) {
//                if (e) {
//                    var j = o("<tr/>"); o.each(e.split(" "), function (r) {
//                        r > 0 && j.append("<td><span class='fc-header-space'/></td>"); var s; o.each(this.split(","), function (I,
//                        E) {
//                            if (E == "title") { j.append("<td><h2 class='fc-header-title'>&nbsp;</h2></td>"); s && s.addClass(g + "-corner-right"); s = null } else {
//                                var B; if (Z[E]) B = Z[E]; else if (Oa[E]) B = function () { J.removeClass(g + "-state-hover"); n(E) }; if (B) {
//                                    s && s.addClass(g + "-no-right"); var J; I = a.theme ? hb(a.buttonIcons, E) : null; var W = hb(a.buttonText, E); if (I) J = o("<div class='fc-button-" + E + " ui-state-default'><a><span class='ui-icon ui-icon-" + I + "'/></a></div>"); else if (W) J = o("<div class='fc-button-" + E + " " + g + "-state-default'><a><span>" + W + "</span></a></div>");
//                                    if (J) { J.click(function () { J.hasClass(g + "-state-disabled") || B() }).mousedown(function () { J.not("." + g + "-state-active").not("." + g + "-state-disabled").addClass(g + "-state-down") }).mouseup(function () { J.removeClass(g + "-state-down") }).hover(function () { J.not("." + g + "-state-active").not("." + g + "-state-disabled").addClass(g + "-state-hover") }, function () { J.removeClass(g + "-state-hover").removeClass(g + "-state-down") }).appendTo(o("<td/>").appendTo(j)); s ? s.addClass(g + "-no-right") : J.addClass(g + "-corner-left"); s = J }
//                                }
//                            }
//                        }); s &&
//                        s.addClass(g + "-corner-right")
//                    }); return o("<table/>").append(j)
//                }
//            } function ga() { va = a.contentHeight ? a.contentHeight : a.height ? a.height - ($ ? $.height() : 0) - bb(R[0]) : Math.round(R.width() / Math.max(a.aspectRatio, 0.5)) } function X(e) { N++; x.setHeight(va, e); if (wa) { wa.css("position", "relative"); wa = null } x.setWidth(R.width(), e); N-- } function ca() { if (!N) if (x.start) { var e = ++Fa; setTimeout(function () { if (e == Fa && !N && y()) if (ka != (ka = ra.outerWidth())) { N++; sa(); x.trigger("windowResize", O); N-- } }, 200) } else ua() } function ua() {
//                setTimeout(function () {
//                    !x.start &&
//                    w() && k()
//                }, 0)
//            } var O = this, ra = o(O).addClass("fc"), ka, R = o("<div class='fc-content " + g + "-widget-content' style='position:relative'/>").prependTo(O), va, Fa = 0, N = 0, L = new Date, Aa, x, U = {}, wa; a.isRTL && ra.addClass("fc-rtl"); a.theme && ra.addClass("ui-widget"); Cb(L, a.year, a.month, a.date); var P = [], la, A, aa = 0, Z = {
//                render: function () { ga(); G(); M(); k() }, changeView: n, getView: function () { return x }, getDate: function () { return L }, option: function (e, j) {
//                    if (j === K) return a[e]; if (e == "height" || e == "contentHeight" || e == "aspectRatio") {
//                        a[e] =
//                        j; sa()
//                    }
//                }, destroy: function () { o(window).unbind("resize", ca); $ && $.remove(); R.remove(); o.removeData(O, "fullCalendar") }, prev: function () { k(-1) }, next: function () { k(1) }, prevYear: function () { db(L, -1); k() }, nextYear: function () { db(L, 1); k() }, today: function () { L = new Date; k() }, gotoDate: function (e, j, r) { if (typeof e == "object") L = q(e); else Cb(L, e, j, r); k() }, incrementDate: function (e, j, r) { e !== K && db(L, e); j !== K && eb(L, j); r !== K && C(L, r); k() }, updateEvent: function (e) {
//                    var j, r = P.length, s, I = e.start - e._start, E = e.end ? e.end - (e._end || x.defaultEventEnd(e)) :
//                    0; for (j = 0; j < r; j++) { s = P[j]; if (s._id == e._id && s != e) { s.start = new Date(+s.start + I); s.end = e.end ? s.end ? new Date(+s.end + E) : new Date(+x.defaultEventEnd(s) + E) : null; s.title = e.title; s.url = e.url; s.allDay = e.allDay; s.className = e.className; s.editable = e.editable; Ia(s, a) } } Ia(e, a); H()
//                }, renderEvent: function (e, j) { Ia(e, a); if (!e.source) { if (j) (e.source = c[0]).push(e); P.push(e) } H() }, removeEvents: function (e) {
//                    if (e) {
//                        if (!o.isFunction(e)) { var j = e + ""; e = function (s) { return s._id == j } } P = o.grep(P, e, true); for (r = 0; r < c.length; r++) if (typeof c[r] ==
//                        "object") c[r] = o.grep(c[r], e, true)
//                    } else { P = []; for (var r = 0; r < c.length; r++) if (typeof c[r] == "object") c[r] = [] } H()
//                }, clientEvents: function (e) { if (o.isFunction(e)) return o.grep(P, e); else if (e) { e += ""; return o.grep(P, function (j) { return j._id == e }) } return P }, rerenderEvents: H, addEventSource: function (e) { c.push(e); D(e, H) }, removeEventSource: function (e) { c = o.grep(c, function (j) { return j != e }); P = o.grep(P, function (j) { return j.source != e }); H() }, refetchEvents: function () { fa(H) }, select: function (e, j, r) {
//                    x.select(e, j, r === K ? true :
//                    r)
//                }, unselect: function () { x.unselect() }
//            }; o.data(this, "fullCalendar", Z); var $, ia = a.header; if (ia) $ = o("<table class='fc-header'/>").append(o("<tr/>").append(o("<td class='fc-header-left'/>").append(pa(ia.left))).append(o("<td class='fc-header-center'/>").append(pa(ia.center))).append(o("<td class='fc-header-right'/>").append(pa(ia.right)))).prependTo(ra); o(window).resize(ca); if (a.droppable) {
//                var m; o(document).bind("dragstart", function (e, j) {
//                    var r = e.target, s = o(r); if (!s.parents(".fc").length) {
//                        var I = a.dropAccept;
//                        if (o.isFunction(I) ? I.call(r, s) : s.is(I)) { m = r; x.dragStart(m, e, j) }
//                    }
//                }).bind("dragstop", function (e, j) { if (m) { x.dragStop(m, e, j); m = null } })
//            } n(a.defaultView); w() || ua()
//        }); return this
//    }; var Eb = 0; Db({ weekMode: "fixed" }); Oa.month = function (a, b, f) {
//        return new Wa(a, b, {
//            render: function (c, g) {
//                if (g) { eb(c, g); c.setDate(1) } c = this.start = q(c, true); c.setDate(1); this.end = eb(q(c), 1); var n = this.visStart = q(c); g = this.visEnd = q(this.end); var k = b.weekends ? 0 : 1; if (k) { da(n); da(g, -1, true) } C(n, -((n.getDay() - Math.max(b.firstDay, k) + 7) % 7)); C(g,
//                (7 - g.getDay() + Math.max(b.firstDay, k)) % 7); n = Math.round((g - n) / (Bb * 7)); if (b.weekMode == "fixed") { C(g, (6 - n) * 7); n = 6 } this.title = oa(c, this.option("titleFormat"), b); this.renderGrid(n, b.weekends ? 7 : 5, this.option("columnFormat"), true)
//            }
//        }, f)
//    }; Oa.basicWeek = function (a, b, f) {
//        return new Wa(a, b, {
//            render: function (c, g) {
//                g && C(c, g * 7); c = this.visStart = q(this.start = C(q(c), -((c.getDay() - b.firstDay + 7) % 7))); g = this.visEnd = q(this.end = C(q(c), 7)); if (!b.weekends) { da(c); da(g, -1, true) } this.title = Ha(c, C(q(g), -1), this.option("titleFormat"),
//                b); this.renderGrid(1, b.weekends ? 7 : 5, this.option("columnFormat"), false)
//            }
//        }, f)
//    }; Oa.basicDay = function (a, b, f) { return new Wa(a, b, { render: function (c, g) { if (g) { C(c, g); b.weekends || da(c, g < 0 ? -1 : 1) } this.title = oa(c, this.option("titleFormat"), b); this.start = this.visStart = q(c, true); this.end = this.visEnd = C(q(this.start), 1); this.renderGrid(1, 1, this.option("columnFormat"), false) } }, f) }; var Xa; Db({
//        allDaySlot: true, allDayText: "all-day", firstHour: 6, slotMinutes: 30, defaultEventMinutes: 120, axisFormat: "h(:mm)tt", timeFormat: { agenda: "h:mm{ - h:mm}" },
//        dragOpacity: { agenda: 0.5 }, minTime: 0, maxTime: 24
//    }); Oa.agendaWeek = function (a, b, f) { return new ub(a, b, { render: function (c, g) { g && C(c, g * 7); c = this.visStart = q(this.start = C(q(c), -((c.getDay() - b.firstDay + 7) % 7))); g = this.visEnd = q(this.end = C(q(c), 7)); if (!b.weekends) { da(c); da(g, -1, true) } this.title = Ha(c, C(q(g), -1), this.option("titleFormat"), b); this.renderAgenda(b.weekends ? 7 : 5, this.option("columnFormat")) } }, f) }; Oa.agendaDay = function (a, b, f) {
//        return new ub(a, b, {
//            render: function (c, g) {
//                if (g) {
//                    C(c, g); b.weekends || da(c, g < 0 ? -1 :
//                    1)
//                } this.title = oa(c, this.option("titleFormat"), b); this.start = this.visStart = q(c, true); this.end = this.visEnd = C(q(this.start), 1); this.renderAgenda(1, this.option("columnFormat"))
//            }
//        }, f)
//    }; var lb = {
//        init: function (a, b) { this.element = a; this.options = b; this.eventsByID = {}; this.eventElements = []; this.eventElementsByID = {}; this.usedOverlays = []; this.unusedOverlays = [] }, trigger: function (a, b) { if (this.options[a]) return this.options[a].apply(b || this, Array.prototype.slice.call(arguments, 2).concat([this])) }, eventEnd: function (a) {
//            return a.end ?
//            q(a.end) : this.defaultEventEnd(a)
//        }, reportEvents: function (a) { var b, f = a.length, c, g = this.eventsByID = {}; for (b = 0; b < f; b++) { c = a[b]; if (g[c._id]) g[c._id].push(c); else g[c._id] = [c] } }, reportEventElement: function (a, b) { this.eventElements.push(b); var f = this.eventElementsByID; if (f[a._id]) f[a._id].push(b); else f[a._id] = [b] }, _clearEvents: function () { this.eventElements = []; this.eventElementsByID = {} }, showEvents: function (a, b) { this._eee(a, b, "show") }, hideEvents: function (a, b) { this._eee(a, b, "hide") }, _eee: function (a, b, f) {
//            a =
//            this.eventElementsByID[a._id]; var c, g = a.length; for (c = 0; c < g; c++) a[c][0] != b[0] && a[c][f]()
//        }, eventDrop: function (a, b, f, c, g, n, k) { var y = this, w = b.allDay, t = b._id; y.moveEvents(y.eventsByID[t], f, c, g); y.trigger("eventDrop", a, b, f, c, g, function () { y.moveEvents(y.eventsByID[t], -f, -c, w); y.rerenderEvents() }, n, k); y.eventsChanged = true; y.rerenderEvents(t) }, eventResize: function (a, b, f, c, g, n) {
//            var k = this, y = b._id; k.elongateEvents(k.eventsByID[y], f, c); k.trigger("eventResize", a, b, f, c, function () {
//                k.elongateEvents(k.eventsByID[y],
//                -f, -c); k.rerenderEvents()
//            }, g, n); k.eventsChanged = true; k.rerenderEvents(y)
//        }, moveEvents: function (a, b, f, c) { f = f || 0; for (var g, n = a.length, k = 0; k < n; k++) { g = a[k]; if (c !== K) g.allDay = c; ba(C(g.start, b, true), f); if (g.end) g.end = ba(C(g.end, b, true), f); Ia(g, this.options) } }, elongateEvents: function (a, b, f) { f = f || 0; for (var c, g = a.length, n = 0; n < g; n++) { c = a[n]; c.end = ba(C(this.eventEnd(c), b, true), f); Ia(c, this.options) } }, renderOverlay: function (a, b) {
//            var f = this.unusedOverlays.shift(); f || (f = o("<div class='fc-cell-overlay' style='position:absolute;z-index:3'/>"));
//            f[0].parentNode != b[0] && f.appendTo(b); this.usedOverlays.push(f.css(a).show()); return f
//        }, clearOverlays: function () { for (var a; a = this.usedOverlays.shift() ;) this.unusedOverlays.push(a.hide().unbind()) }, resizableDayEvent: function (a, b, f) {
//            var c = this; if (!c.options.disableResizing && b.resizable) b.resizable({
//                handles: c.options.isRTL ? { w: "div.ui-resizable-w" } : { e: "div.ui-resizable-e" }, grid: f, minWidth: f / 2, containment: c.element.parent().parent(), start: function (g, n) {
//                    b.css("z-index", 9); c.hideEvents(a, b); c.trigger("eventResizeStart",
//                    this, a, g, n)
//                }, stop: function (g, n) { c.trigger("eventResizeStop", this, a, g, n); var k = Math.round((b.width() - n.originalSize.width) / f); if (k) c.eventResize(this, a, k, 0, g, n); else { b.css("z-index", 8); c.showEvents(a, b) } }
//            })
//        }, eventElementHandlers: function (a, b) { var f = this; b.click(function (c) { if (!b.hasClass("ui-draggable-dragging") && !b.hasClass("ui-resizable-resizing")) return f.trigger("eventClick", this, a, c) }).hover(function (c) { f.trigger("eventMouseover", this, a, c) }, function (c) { f.trigger("eventMouseout", this, a, c) }) }, option: function (a,
//        b) { a = this.options[a]; if (typeof a == "object") return hb(a, b || this.name); return a }, sliceSegs: function (a, b, f, c) { var g = [], n, k = a.length, y, w, t, H, M; for (n = 0; n < k; n++) { y = a[n]; w = y.start; t = b[n]; if (t > f && w < c) { if (w < f) { w = q(f); H = false } else { w = w; H = true } if (t > c) { t = q(c); M = false } else { t = t; M = true } g.push({ event: y, start: w, end: t, isStart: H, isEnd: M, msLength: t - w }) } } return g.sort(Ib) }
//    }, Bb = 864E5, Jb = 36E5, Hb = 6E4; ya.addDays = C; ya.cloneDate = q; var ib = ya.parseDate = function (a) {
//        if (typeof a == "object") return a; if (typeof a == "number") return new Date(a *
//        1E3); if (typeof a == "string") { if (a.match(/^\d+$/)) return new Date(parseInt(a) * 1E3); return Nb(a, true) || (a ? new Date(a) : null) } return null
//    }, Nb = ya.parseISO8601 = function (a, b) {
//        a = a.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?$/); if (!a) return null; var f = new Date(a[1], 0, 1), c = new Date(a[1], 0, 1, 9, 0), g = 0; if (a[3]) { f.setMonth(a[3] - 1); c.setMonth(a[3] - 1) } if (a[5]) { f.setDate(a[5]); c.setDate(a[5]) } fb(f, c); a[7] && f.setHours(a[7]);
//        a[8] && f.setMinutes(a[8]); a[10] && f.setSeconds(a[10]); a[12] && f.setMilliseconds(Number("0." + a[12]) * 1E3); fb(f, c); if (!b) { if (a[14]) { g = Number(a[16]) * 60 + Number(a[17]); g *= a[15] == "-" ? 1 : -1 } g -= f.getTimezoneOffset() } return new Date(+f + g * 60 * 1E3)
//    }, wb = ya.parseTime = function (a) {
//        if (typeof a == "number") return a * 60; if (typeof a == "object") return a.getHours() * 60 + a.getMinutes(); if (a = a.match(/(\d+)(?::(\d+))?\s*(\w+)?/)) {
//            var b = parseInt(a[1]); if (a[3]) { b %= 12; if (a[3].toLowerCase().charAt(0) == "p") b += 12 } return b * 60 + (a[2] ? parseInt(a[2]) :
//            0)
//        }
//    }, oa = ya.formatDate = function (a, b, f) { return Ha(a, null, b, f) }, Ha = ya.formatDates = function (a, b, f, c) {
//        c = c || Va; var g = a, n = b, k, y = f.length, w, t, H, M = ""; for (k = 0; k < y; k++) {
//            w = f.charAt(k); if (w == "'") for (t = k + 1; t < y; t++) { if (f.charAt(t) == "'") { if (g) { M += t == k + 1 ? "'" : f.substring(k + 1, t); k = t } break } } else if (w == "(") for (t = k + 1; t < y; t++) { if (f.charAt(t) == ")") { k = oa(g, f.substring(k + 1, t), c); if (parseInt(k.replace(/\D/, ""))) M += k; k = t; break } } else if (w == "[") for (t = k + 1; t < y; t++) {
//                if (f.charAt(t) == "]") {
//                    w = f.substring(k + 1, t); k = oa(g, w, c); if (k != oa(n,
//                    w, c)) M += k; k = t; break
//                }
//            } else if (w == "{") { g = b; n = a } else if (w == "}") { g = a; n = b } else { for (t = y; t > k; t--) if (H = Ob[f.substring(k, t)]) { if (g) M += H(g, c); k = t - 1; break } if (t == k) if (g) M += w }
//        } return M
//    }, Ob = {
//        s: function (a) { return a.getSeconds() }, ss: function (a) { return Na(a.getSeconds()) }, m: function (a) { return a.getMinutes() }, mm: function (a) { return Na(a.getMinutes()) }, h: function (a) { return a.getHours() % 12 || 12 }, hh: function (a) { return Na(a.getHours() % 12 || 12) }, H: function (a) { return a.getHours() }, HH: function (a) { return Na(a.getHours()) }, d: function (a) { return a.getDate() },
//        dd: function (a) { return Na(a.getDate()) }, ddd: function (a, b) { return b.dayNamesShort[a.getDay()] }, dddd: function (a, b) { return b.dayNames[a.getDay()] }, M: function (a) { return a.getMonth() + 1 }, MM: function (a) { return Na(a.getMonth() + 1) }, MMM: function (a, b) { return b.monthNamesShort[a.getMonth()] }, MMMM: function (a, b) { return b.monthNames[a.getMonth()] }, yy: function (a) { return (a.getFullYear() + "").substring(2) }, yyyy: function (a) { return a.getFullYear() }, t: function (a) { return a.getHours() < 12 ? "a" : "p" }, tt: function (a) {
//            return a.getHours() <
//            12 ? "am" : "pm"
//        }, T: function (a) { return a.getHours() < 12 ? "A" : "P" }, TT: function (a) { return a.getHours() < 12 ? "AM" : "PM" }, u: function (a) { return oa(a, "yyyy-MM-dd'T'HH:mm:ss'Z'") }, S: function (a) { a = a.getDate(); if (a > 10 && a < 20) return "th"; return ["st", "nd", "rd"][a % 10 - 1] || "th" }
//    }, za = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
//})(jQuery);

//-----------------------------------------------
//jqDnR.js
//-----------------------------------------
(function ($) {
    $.fn.jqDrag = function (h) { return i(this, h, 'd'); }; $.fn.jqResize = function (h) { return i(this, h, 'r'); }; $.jqDnR = { dnr: {}, e: 0, drag: function (v) { if (M.k == 'd') E.css({ left: M.X + v.pageX - M.pX, top: M.Y + v.pageY - M.pY }); else E.css({ width: Math.max(v.pageX - M.pX + M.W, 0), height: Math.max(v.pageY - M.pY + M.H, 0) }); return false; }, stop: function () { E.css('opacity', M.o); $().unbind('mousemove', J.drag).unbind('mouseup', J.stop); } }; var J = $.jqDnR, M = J.dnr, E = J.e, i = function (e, h, k) {
        return e.each(function () {
            h = (h) ? $(h, e) : e; h.bind('mousedown', { e: e, k: k }, function (v) {
                var d = v.data, p = {}; E = d.e; if (E.css('position') != 'relative') { try { E.position(p); } catch (e) { } }
                M = { X: p.left || f('left') || 0, Y: p.top || f('top') || 0, W: f('width') || E[0].scrollWidth || 0, H: f('height') || E[0].scrollHeight || 0, pX: v.pageX, pY: v.pageY, k: d.k, o: E.css('opacity') }; E.css({ opacity: 0.8 }); $().mousemove($.jqDnR.drag).mouseup($.jqDnR.stop); return false;
            });
        });
    }, f = function (k) { return parseInt(E.css(k)) || false; };
})(jQuery);
//-----------------------------------------------
//jqModal.js
//-----------------------------------------
var jqmZ = 3000;
(function ($) {
    $.fn.jqm = function (o) {
        var p = {
            overlay: 50,
            overlayClass: 'jqmOverlay',
            closeClass: 'jqmClose',
            trigger: '.jqModal',
            pageContainer: '.PageContainer',
            iframeContents: F,
            html: F,
            closeHTML: F,
            image: F,
            ajax: F,
            ajaxText: '',
            ajaxMethod: '',
            addRoundCorners: false,
            htmlBackgroundColor: '#ffffff',
            target: F,
            modal: F,
            toTop: F,
            onShow: F,
            onHide: F,
            onLoad: F,
            width: 400,
            height: 400,
            keepWide: F,
            fullscreen: F,
            innerWidthOffset: 0,
            innerHeightOffset: 0,
            originalFilters: F,
            filterTarget: F
        };
        return this.each(function () {
            if (this._jqm) return H[this._jqm].c = $.extend({}, H[this._jqm].c, o); s++; this._jqm = s;
            H[s] = { c: $.extend(p, $.jqm.params, o), a: F, w: $(this).addClass('jqmID' + s), s: s };
            if (p.trigger) $(this).jqmAddTrigger(p.trigger);
        });
    };

    $.fn.jqmAddClose = function (e) { return hs(this, e, 'jqmHide'); };
    $.fn.jqmAddTrigger = function (e) { return hs(this, e, 'jqmShow'); };
    $.fn.jqmShow = function (t) { return this.each(function () { t = t || window.event; $.jqm.open(this._jqm, t); $("embed").css("visibility", "hidden"); }); };
    $.fn.jqmHide = function (t) { return this.each(function () { t = t || window.event; $.jqm.close(this._jqm, t); $("embed").css("visibility", "visible"); }); };

    $.jqm = {
        hash: {},
        open: function (s, t) {
            var h = H[s], c = h.c, cc = '.' + c.closeClass, z = (parseInt(h.w.css('z-index'))), z = (z > 0) ? z : jqmZ, o = $('<div></div>').css({ height: '100%', width: '100%', position: 'fixed', left: 0, top: 0, 'z-index': z - 1, opacity: c.overlay / 100 }); if (h.a) return F; h.t = t; h.a = true; h.w.css('z-index', z);
            jqmZ = jqmZ + 2;
            h.w.css("width", c.width);
            h.w.css("height", c.height);
            var hL = (jQuery(window).innerWidth() - c.width) / 2; if (hL < 0) hL = 0;
            var hT = (jQuery(window).innerHeight() - c.height) / 2; if (hT < 0) hT = 0;
            h.w.css("left", hL);
            h.w.css("top", hT);
            if (c.modal) { if (!A[0]) L('bind'); A.push(s); }
            else if (c.overlay > 0) h.w.jqmAddClose(o);
            else o = F;

            h.o = (o) ? o.addClass(c.overlayClass).prependTo('body') : F;
            if (ie6) { $('html,body').css({ height: '100%', width: '100%' }); if (o) { o = o.css({ position: 'absolute' })[0]; for (var y in { Top: 1, Left: 1 }) o.style.setExpression(y.toLowerCase(), "(_=(document.documentElement.scroll" + y + " || document.body.scroll" + y + "))+'px'"); } }
            if (c.html) {
                var r = c.target || h.w, u = c.html, r = (typeof r == 'string') ? $(r, h.w) : $(r), u = (u.substr(0, 1) == '@') ? $(t).attr(u.substring(1)) : u;

                var newW = 0; var newH = 0;
                newW = c.width;//-c.innerWidthOffset;
                newH = c.height;//-c.innerHeightOffset;
                if (c.fullscreen) { newW = jQuery(window).innerWidth() - 40; newH = jQuery(window).innerHeight() - 40; }

                if (newH > (jQuery(window).innerHeight() - 40)) newH = jQuery(window).innerHeight() - 40;
                if (newW < r.innerWidth() && r.innerWidth() < jQuery(window).innerWidth()) newW = r.innerWidth() - 40;
                if (newW > jQuery(window).innerWidth()) newW = jQuery(c.pageContainer).width();//jQuery(window).innerWidth() - 20;
                if (newH == 0) newH = jQuery(window).innerHeight() - 40;
                if (newW == 0) newW = jQuery(c.pageContainer).width() - 40;//jQuery(window).innerWidth() - 20;
                if (c.keepWide) {
                    var ratio = 16 / 9;
                    if ((newW / newH) > ratio) {
                        newW = newH * ratio;
                    }
                }
                var tempW = newW; tempH = newH;
                if (!k2.helpers.is_ie) { newW += 30; newH += 30; }
                if (newW > 0) {
                    var hL = (jQuery(window).innerWidth() - tempW) / 2; if (hL < 0) hL = 0;
                    h.w.animate({ width: newW, left: hL }, 0);
                    r.animate({ width: newW }, 0);
                }
                if (newH > 0) {
                    var hT = (jQuery(window).innerHeight() - tempH) / 2; if (hT < 0) hT = 0;
                    h.w.animate({ height: newH, top: hT }, 0);
                    r.animate({ height: newH }, 0);
                }
                if (!k2.helpers.is_ie) { newW -= 30; newH -= 30; r.animate({ height: newH, width: newW }, 25); }
                r.html(u);
                r.css({ "text-align": "left", "vertical-align": "top"});//, "opacity": "0" });
                var addClose = ((r.html().indexOf("jqmClose") > -1) ? false : true);
                if (c.addRoundCorners == "true") {
                    r.html("<div class='Round_TopLeft'>&nbsp;</div><div class='" + ((addClose) ? "Round_TopRightClose jqmClose" : "Round_TopRight") + "'>&nbsp;</div><div class='Round_BottomLeft'>&nbsp;</div><div class='Round_BottomRight'>&nbsp;</div><div class='Round_MiddleLeft'>&nbsp;</div><div class='Round_MiddleRight'>&nbsp;</div><div class='Round_TopMiddle'>&nbsp;</div><div class='Round_BottomMiddle'>&nbsp;</div><div class='Round_Body' style='overflow-y:auto;'>" + r.html() + "</div>");
                } else {
                    r.html("<div class='TopLeft'>&nbsp;</div><div class='" + ((addClose) ? "TopRightClose jqmClose" : "TopRight") + "'><span>&nbsp;</span></div><div class='BottomLeft'>&nbsp;</div><div class='BottomRight'>&nbsp;</div><div class='MiddleLeft'>&nbsp;</div><div class='MiddleRight'>&nbsp;</div><div class='TopMiddle'>&nbsp;</div><div class='BottomMiddle'>&nbsp;</div><div class='PopupBody' style='overflow-y:auto;'>" + r.html() + "</div>");
                    //r.html("<div style='background:#ffffff;overflow-y:auto;'><div class='TopRightClose jqmClose'></div>" + r.html() +"</div>");    
                }
                //if ($.browser.msie) r.css("position", "absolute");
                //if ($.browser.msie && parseInt($.browser.version, 10) != 7) r.css("position", "absolute");
                if (k2.helpers.is_ie) r.css("position", "absolute");
                //r.animate({ opacity: 1 }, 500);
                if (c.onLoad) c.onLoad.call(this, h); if (cc) h.w.jqmAddClose($(cc, h.w)); //e(h); 


                //                r.css("width", c.width - c.innerWidthOffset); r.css("height", c.height - c.innerHeightOffset); r.css("overflow", "auto"); r.css("display", "block");
                //                r.html(u); 
                //                r.css({"text-align":"left", "vertical-align":"top"});
                //                if (c.addRoundCorners) {
                //                    r.html("<div class='Round_TopLeft'>&nbsp;</div><div class='Round_TopRightClose jqmClose'>&nbsp;</div><div class='Round_BottomLeft'>&nbsp;</div><div class='Round_BottomRight'>&nbsp;</div><div class='Round_MiddleLeft'>&nbsp;</div><div class='Round_MiddleRight'>&nbsp;</div><div class='Round_TopMiddle'>&nbsp;</div><div class='Round_BottomMiddle'>&nbsp;</div><div class='Round_Body' style='overflow-y:auto;'>" + r.html() + "</div>");
                //                } else {
                //                    r.html("<div style='background:"+c.htmlBackgroundColor+";overflow-y:auto;'>" + r.html() +"</div>");    
                //                }
                //                if (c.onLoad) c.onLoad.call(this, h); if (cc) h.w.jqmAddClose($(cc, h.w)); e(h);
            }
            if (c.image) {
                var r = c.target || h.w, u = "<img id='_ImagePopupSrc' class='jqmClose' src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;' border='0'/>", r = (typeof r == 'string') ? $(r, h.w) : $(r), u = (u.substr(0, 1) == '@') ? $(t).attr(u.substring(1)) : u;
                //change this to one line moron
                r.css("width", c.width + c.innerWidthOffset); r.css("height", c.height + c.innerHeightOffset); r.css("overflow", "hidden"); r.css("display", "block"); r.css("cursor", "pointer");
                r.addClass("jqmClose");
                r.html(u); if (c.onLoad) c.onLoad.call(this, h); if (cc) h.w.jqmAddClose($(cc, h.w)); e(h);
                jQuery("#_ImagePopupSrc").each(function (e) {
                    $(this).bind('load readystatechange', function (e) {
                        var currentImg = $(this);
                        if (this.complete || (this.readyState == 'complete' && e.type == 'readystatechange')) {
                            var newImg = new Image();

                            newImg.onload = function () {
                                var newW = newImg.width;
                                var newH = newImg.height;
                                currentImg.attr("src", c.image);
                                if (!k2.helpers.is_ie) { newW += 30; newH += 30; }
                                if (newW > 0) {
                                    var hL = (jQuery(window).innerWidth() - newW) / 2; if (hL < 0) hL = 0;
                                    h.w.animate({ width: newW, left: hL }, 0);
                                    r.animate({ width: newW }, 0);
                                }
                                if (newH > 0) {
                                    var hT = $(document).scrollTop();
                                    newH = newH + hT;
                                    h.w.animate({ height: newH, top: hT }, 0);
                                    r.animate({ height: newH }, 0);
                                }
                                if (!k2.helpers.is_ie) { newW -= 30; newH -= 30; r.animate({ height: newH, width: newW }, 25); }
                                r.css({ "text-align": "left", "vertical-align": "top", "opacity": "0" });

                                var addClose = ((r.html().indexOf("jqmClose") > -1) ? false : true);
                                if (c.addRoundCorners == "true") {
                                    r.html("<div class='Round_TopLeft'>&nbsp;</div><div class='" + ((addClose) ? "Round_TopRightClose jqmClose" : "Round_TopRight") + "'>&nbsp;</div><div class='Round_BottomLeft'>&nbsp;</div><div class='Round_BottomRight'>&nbsp;</div><div class='Round_MiddleLeft'>&nbsp;</div><div class='Round_MiddleRight'>&nbsp;</div><div class='Round_TopMiddle'>&nbsp;</div><div class='Round_BottomMiddle'>&nbsp;</div><div class='Round_Body' style='overflow-y:auto;'>" + r.html() + "</div>");
                                } else {
                                    r.html("<div class='TopLeft'>&nbsp;</div><div class='" + ((addClose) ? "TopRightClose jqmClose" : "TopRight") + "'>&nbsp;</div><div class='BottomLeft'>&nbsp;</div><div class='BottomRight'>&nbsp;</div><div class='MiddleLeft'>&nbsp;</div><div class='MiddleRight'>&nbsp;</div><div class='TopMiddle'>&nbsp;</div><div class='BottomMiddle'>&nbsp;</div><div class='PopupBody' style='overflow-y:auto;'>" + r.html() + "</div>");
                                }
                                jQuery(".jqmWindow").css({ "position": "absolute" });
                                jQuery(".PopupBody").css({ "overflow": "hidden" });
                            }
                            newImg.src = c.image;
                            //if ($.browser.msie && parseInt($.browser.version, 10) != 7) r.css("position", "absolute");
                            if (k2.helpers.is_ie) r.css("position", "absolute");
                            r.animate({ opacity: 1 }, 500);
                        }
                    });
                });
            }
            if (c.ajax) {
                var r = c.target || h.w, u = c.ajax, r = (typeof r == 'string') ? $(r, h.w) : $(r), u = (u.substr(0, 1) == '@') ? $(t).attr(u.substring(1)) : u;
                //comment next line out change overflow-y to hidden
                //r.css("width", c.width - c.innerWidthOffset); r.css("height", c.height - c.innerHeightOffset); r.css("display", "block");
                r.css({ "overflow-y": "hidden", "overflow-x": "hidden" });
                switch (c.ajaxMethod.toLowerCase()) {
                    case "json":
                        //r.html(u);
                        var postData = "";
                        if (u.length > 1500) {
                            var uSplit = u.split('?');
                            u = uSplit[0];
                            postData = uSplit[1].replace('?', '&');
                        }

                        $.post(u, postData,
                             function (data) {
                                 if (data.length == 0) {
                                     r.html("No data was returned");
                                 } else if (data.length == 1) {
                                     if (data[0].Error != "" && data[0].Error != null && data[0].Error != undefined && data[0].Error != "null") { r.html(data[0].Error); } else { r.html(data[0].HTML); }
                                     //if (data[0].AdditionalContents != "") c.iframeContents = data[0].AdditionalContents;
                                 } else {
                                     r.html("");
                                     for (var i = 0; i < data.length; i++) {
                                         if (!IsEmptyOrNull(data[i].Error)) { r.html(r.html() + data[i].Error); }
                                         else if (!IsEmptyOrNull(data[i].HTML)) { r.html(r.html() + data[i].HTML); }
                                     }
                                 }
                                 var newW = 0; var newH = 0;
                                 try { newW = data[0].Width; } catch (e) { newW = 0; } try { newH = data[0].Height; } catch (e) { newH = 0; }
                                 if (isNaN(newW)) newW = c.width;
                                 if (isNaN(newH)) newH = c.height;
                                 //if (newH < r.innerHeight() && r.innerHeight() < jQuery(window).innerHeight()) newH = r.innerHeight() + 40;
                                 if (c.fullscreen) { newW = jQuery(window).innerWidth() - 50; newH = jQuery(window).innerHeight() - 50; }

                                 if (newH > (jQuery(window).innerHeight() - 40)) newH = jQuery(window).innerHeight() - 40;
                                 if (newW < r.innerWidth() && r.innerWidth() < jQuery(window).innerWidth()) newW = r.innerWidth();
                                 if (newW > jQuery(window).innerWidth()) newW = jQuery(c.pageContainer).width();//jQuery(window).innerWidth() - 20;
                                 if (newH == 0) newH = jQuery(window).innerHeight() - 40;
                                 if (newW == 0) newW = jQuery(c.pageContainer).width();//jQuery(window).innerWidth() - 20;
                                 var tempW = newW; tempH = newH;
                                 if (!k2.helpers.is_ie) { newW += 30; newH += 30; }
                                 if (newW > 0) {
                                     var hL = (jQuery(window).innerWidth() - tempW) / 2; if (hL < 0) hL = 0;
                                     h.w.animate({ width: newW, left: hL }, 0);
                                     r.animate({ width: newW }, 0);
                                 }
                                 if (newH > 0) {
                                     var hT = (jQuery(window).innerHeight() - tempH) / 2; if (hT < 0) hT = 0;
                                     h.w.animate({ height: newH, top: hT }, 0);
                                     r.animate({ height: newH }, 0);
                                 }

                                 if (!k2.helpers.is_ie) { newW -= 30; newH -= 30; r.animate({ height: newH, width: newW }, 25); }
                                 
                                 r.css({ "text-align": "left", "vertical-align": "top","opacity":"0" });
                                 var addClose = ((r.html().indexOf("jqmClose") > -1) ? false : true);
                                 if (c.addRoundCorners == "true") {
                                     r.html("<div class='Round_TopLeft'>&nbsp;</div><div class='" + ((addClose) ? "Round_TopRightClose jqmClose" : "Round_TopRight") + "'>&nbsp;</div><div class='Round_BottomLeft'>&nbsp;</div><div class='Round_BottomRight'>&nbsp;</div><div class='Round_MiddleLeft'>&nbsp;</div><div class='Round_MiddleRight'>&nbsp;</div><div class='Round_TopMiddle'>&nbsp;</div><div class='Round_BottomMiddle'>&nbsp;</div><div class='Round_Body' style='overflow-y:auto;'>" + r.html() + "</div>");
                                 } else {
                                     r.html("<div class='TopLeft'>&nbsp;</div><div class='" + ((addClose) ? "TopRightClose jqmClose" : "TopRight") + "'>&nbsp;</div><div class='BottomLeft'>&nbsp;</div><div class='BottomRight'>&nbsp;</div><div class='MiddleLeft'>&nbsp;</div><div class='MiddleRight'>&nbsp;</div><div class='TopMiddle'>&nbsp;</div><div class='BottomMiddle'>&nbsp;</div><div class='PopupBody' style='overflow-y:auto;'>" + r.html() + "</div>");
                                     //r.html("<div style='background:#ffffff;overflow-y:auto;'><div class='TopRightClose jqmClose'></div>" + r.html() +"</div>");    
                                 }
                                 //if ($.browser.msie) r.css("position", "absolute");
                                 //if ($.browser.msie && parseInt($.browser.version, 10) != 7) r.css("position", "absolute");
                                 if (k2.helpers.is_ie) r.css("position", "absolute");
                                 r.animate({ opacity: 1 }, 500);
                                 if (c.onLoad) c.onLoad.call(this, h); if (cc) h.w.jqmAddClose($(cc, h.w)); //e(h); 
                             }
                             , "json");
                        break;
                    default:
                        r.html(c.ajaxText).load(u, function () { if (c.onLoad) c.onLoad.call(this, h); if (cc) h.w.jqmAddClose($(cc, h.w)); e(h); });
                        break;
                }
            }
            else if (cc) h.w.jqmAddClose($(cc, h.w));
            if (c.toTop && h.o) h.w.before('<span id="jqmP' + h.w[0]._jqm + '"></span>').insertAfter(h.o);
            (c.onShow) ? c.onShow(h) : h.w.show(); e(h); return F;
        },
        close: function (s) {
            var h = H[s]; if (!h.a) return F; h.a = F;
            jqmZ = jqmZ - 2;
            if (A[0]) { A.pop(); if (!A[0]) L('unbind'); }
            if (h.c.toTop && h.o) { $('#jqmP' + h.w[0]._jqm).after(h.w).remove(); }
            if (h.c.onHide) h.c.onHide(h); else { h.w.hide(); if (h.o) h.o.remove(); } return F;
        },
        params: {}
    };
    var s = 0, H = $.jqm.hash, A = [], ie6 = navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequest, F = false,
i = $('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({ opacity: 0 }),
e = function (h) { if (ie6) if (h.o) h.o.html('<p style="width:100%;height:100%"/>').prepend(i); else if (!$('iframe.jqm', h.w)[0]) h.w.prepend(i); f(h); },
f = function (h) { try { $(':input:visible', h.w)[0].focus(); } catch (_) { } },
L = function (t) { $()[t]("keypress", m)[t]("keydown", m)[t]("mousedown", m); },
m = function (e) { var h = H[A[A.length - 1]], r = (!$(e.target).parents('.jqmID' + h.s)[0]); if (r) f(h); return !r; },
hs = function (w, t, c) {
    return w.each(function () {
        var s = this._jqm; $(t).each(function () {
            if (!this[c]) { this[c] = []; $(this).click(function () { for (var i in { jqmShow: 1, jqmHide: 1 }) for (var s in this[i]) if (H[this[i][s]]) H[this[i][s]].w[i](this); return F; }); } this[c].push(s);
        });
    });
};
})(jQuery);
//-----------------------------------------------
//doTimeout
//-----------------------------------------------
(function ($) { var a = {}, c = "doTimeout", d = Array.prototype.slice; $[c] = function () { return b.apply(window, [0].concat(d.call(arguments))) }; $.fn[c] = function () { var f = d.call(arguments), e = b.apply(this, [c + f[0]].concat(f)); return typeof f[0] === "number" || typeof f[1] === "number" ? this : e }; function b(l) { var m = this, h, k = {}, g = l ? $.fn : $, n = arguments, i = 4, f = n[1], j = n[2], p = n[3]; if (typeof f !== "string") { i--; f = l = 0; j = n[1]; p = n[2] } if (l) { h = m.eq(0); h.data(l, k = h.data(l) || {}) } else { if (f) { k = a[f] || (a[f] = {}) } } k.id && clearTimeout(k.id); delete k.id; function e() { if (l) { h.removeData(l) } else { if (f) { delete a[f] } } } function o() { k.id = setTimeout(function () { k.fn() }, j) } if (p) { k.fn = function (q) { if (typeof p === "string") { p = g[p] } p.apply(m, d.call(n, i)) === true && !q ? o() : e() }; o() } else { if (k.fn) { j === undefined ? e() : k.fn(j === false); return true } else { e() } } } })(jQuery);
//-----------------------------------------------
//jquery.xmldom-1.0.min.js
//-----------------------------------------------
(function (a) { if (window.DOMParser == undefined && window.ActiveXObject) { DOMParser = function () { }; DOMParser.prototype.parseFromString = function (c) { var b = new ActiveXObject("Microsoft.XMLDOM"); b.async = "false"; b.loadXML(c); return b } } a.xmlDOM = function (b, h) { try { var d = (new DOMParser()).parseFromString(b, "text/xml"); if (a.isXMLDoc(d)) { var c = a("parsererror", d); if (c.length == 1) { throw ("Error: " + a(d).text()) } } else { throw ("Unable to parse XML") } } catch (f) { var g = (f.name == undefined ? f : f.name + ": " + f.message); if (a.isFunction(h)) { h(g) } else { a(document).trigger("xmlParseError", [g]) } return a([]) } return a(d) } })(jQuery);
//-----------------------------------------------
//jquery.xml.js
//-----------------------------------------
jQuery.fn.xml = function (all) {
    var s = ""; if (this.length)
        (((typeof all != 'undefined') && all) ? this : jQuery(this[0]).contents()).each(function () { s += window.ActiveXObject ? this.xml : (new XMLSerializer()).serializeToString(this); }); return s;
};

/*
* rwdImageMaps jQuery plugin v1.4
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2012 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*/
(function (a) { a.fn.rwdImageMaps = function () { var d = this, c = parseFloat(a.fn.jquery); var b = function () { d.each(function () { if (typeof (a(this).attr("usemap")) == "undefined") { return } var f = this, e = a(f); a("<img />").load(function () { var o, k, i = "width", n = "height"; if (c < 1.6) { o = f.getAttribute(i), k = f.getAttribute(n) } else { o = e.attr(i), k = e.attr(n) } if (!o || !k) { var p = new Image(); p.src = e.attr("src"); if (!o) { o = p.width } if (!k) { k = p.height } } var g = e.width() / 100, l = e.height() / 100, j = e.attr("usemap").replace("#", ""), m = "coords"; a('map[name="' + j + '"]').find("area").each(function () { var s = a(this); if (!s.data(m)) { s.data(m, s.attr(m)) } var r = s.data(m).split(","), q = new Array(r.length); for (var h = 0; h < q.length; ++h) { if (h % 2 === 0) { q[h] = parseInt(((r[h] / o) * 100) * g) } else { q[h] = parseInt(((r[h] / k) * 100) * l) } } s.attr(m, q.toString()) }) }).attr("src", e.attr("src")) }) }; a(window).resize(b).trigger("resize"); return this } })(jQuery);

/*! waitForImages jQuery Plugin - v1.4.1 - 2012-10-12
* https://github.com/alexanderdickson/waitForImages
* Copyright (c) 2012 Alex Dickson; Licensed MIT */
(function (e) { var t = "waitForImages"; e.waitForImages = { hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage"] }, e.expr[":"].uncached = function (t) { if (!e(t).is('img[src!=""]')) return !1; var n = new Image; return n.src = t.src, !n.complete }, e.fn.waitForImages = function (n, r, i) { var s = 0, o = 0; e.isPlainObject(arguments[0]) && (n = arguments[0].finished, r = arguments[0].each, i = arguments[0].waitForAll), n = n || e.noop, r = r || e.noop, i = !!i; if (!e.isFunction(n) || !e.isFunction(r)) throw new TypeError("An invalid callback was supplied."); return this.each(function () { var u = e(this), a = [], f = e.waitForImages.hasImageProperties || [], l = /url\(\s*(['"]?)(.*?)\1\s*\)/g; i ? u.find("*").andSelf().each(function () { var t = e(this); t.is("img:uncached") && a.push({ src: t.attr("src"), element: t[0] }), e.each(f, function (e, n) { var r = t.css(n), i; if (!r) return !0; while (i = l.exec(r)) a.push({ src: i[2], element: t[0] }) }) }) : u.find("img:uncached").each(function () { a.push({ src: this.src, element: this }) }), s = a.length, o = 0, s === 0 && n.call(u[0]), e.each(a, function (i, a) { var f = new Image; e(f).bind("load." + t + " error." + t, function (e) { o++, r.call(a.element, o, s, e.type == "load"); if (o == s) return n.call(u[0]), !1 }), f.src = a.src }) }) } })(jQuery);

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
//(function ($, e, b) { var c = "hashchange", h = document, f, g = $.event.special, i = h.documentMode, d = "on" + c in e && (i === b || i > 7); function a(j) { j = j || location.href; return "#" + j.replace(/^[^#]*#?(.*)$/, "$1") } $.fn[c] = function (j) { return j ? this.bind(c, j) : this.trigger(c) }; $.fn[c].delay = 50; g[c] = $.extend(g[c], { setup: function () { if (d) { return false } $(f.start) }, teardown: function () { if (d) { return false } $(f.stop) } }); f = (function () { var j = {}, p, m = a(), k = function (q) { return q }, l = k, o = k; j.start = function () { p || n() }; j.stop = function () { p && clearTimeout(p); p = b }; function n() { var r = a(), q = o(m); if (r !== m) { l(m = r, q); $(e).trigger(c) } else { if (q !== m) { location.href = location.href.replace(/#.*/, "") + q } } p = setTimeout(n, $.fn[c].delay) } $.browser.msie && !d && (function () { var q, r; j.start = function () { if (!q) { r = $.fn[c].src; r = r && r + a(); q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () { r || l(a()); n() }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow; h.onpropertychange = function () { try { if (event.propertyName === "title") { q.document.title = h.title } } catch (s) { } } } }; j.stop = k; o = function () { return a(q.location.href) }; l = function (v, s) { var u = q.document, t = $.fn[c].domain; if (v !== s) { u.title = h.title; u.open(); t && u.write('<script>document.domain="' + t + '"<\/script>'); u.close(); q.location.hash = v } } })(); return j })() })(jQuery, this);

/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 */
//(function () { function t(e, t) { return [].slice.call((t || document).querySelectorAll(e)) } if (!window.addEventListener) return; var e = window.StyleFix = { link: function (t) { try { if (t.rel !== "stylesheet" || t.hasAttribute("data-noprefix")) return } catch (n) { return } var r = t.href || t.getAttribute("data-href"), i = r.replace(/[^\/]+$/, ""), s = (/^[a-z]{3,10}:/.exec(i) || [""])[0], o = (/^[a-z]{3,10}:\/\/[^\/]+/.exec(i) || [""])[0], u = /^([^?]*)\??/.exec(r)[1], a = t.parentNode, f = new XMLHttpRequest, l; f.onreadystatechange = function () { f.readyState === 4 && l() }, l = function () { var n = f.responseText; if (n && t.parentNode && (!f.status || f.status < 400 || f.status > 600)) { n = e.fix(n, !0, t); if (i) { n = n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi, function (e, t, n) { return /^([a-z]{3,10}:|#)/i.test(n) ? e : /^\/\//.test(n) ? 'url("' + s + n + '")' : /^\//.test(n) ? 'url("' + o + n + '")' : /^\?/.test(n) ? 'url("' + u + n + '")' : 'url("' + i + n + '")' }); var r = i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$1"); n = n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)" + r, "gi"), "$1") } var l = document.createElement("style"); l.textContent = n, l.media = t.media, l.disabled = t.disabled, l.setAttribute("data-href", t.getAttribute("href")), a.insertBefore(l, t), a.removeChild(t), l.media = t.media } }; try { f.open("GET", r), f.send(null) } catch (n) { typeof XDomainRequest != "undefined" && (f = new XDomainRequest, f.onerror = f.onprogress = function () { }, f.onload = l, f.open("GET", r), f.send(null)) } t.setAttribute("data-inprogress", "") }, styleElement: function (t) { if (t.hasAttribute("data-noprefix")) return; var n = t.disabled; t.textContent = e.fix(t.textContent, !0, t), t.disabled = n }, styleAttribute: function (t) { var n = t.getAttribute("style"); n = e.fix(n, !1, t), t.setAttribute("style", n) }, process: function () { t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link), t("style").forEach(StyleFix.styleElement), t("[style]").forEach(StyleFix.styleAttribute) }, register: function (t, n) { (e.fixers = e.fixers || []).splice(n === undefined ? e.fixers.length : n, 0, t) }, fix: function (t, n, r) { for (var i = 0; i < e.fixers.length; i++) t = e.fixers[i](t, n, r) || t; return t }, camelCase: function (e) { return e.replace(/-([a-z])/g, function (e, t) { return t.toUpperCase() }).replace("-", "") }, deCamelCase: function (e) { return e.replace(/[A-Z]/g, function (e) { return "-" + e.toLowerCase() }) } }; (function () { setTimeout(function () { t('link[rel="stylesheet"]').forEach(StyleFix.link) }, 10), document.addEventListener("DOMContentLoaded", StyleFix.process, !1) })() })(), function (e) { function t(e, t, r, i, s) { e = n[e]; if (e.length) { var o = RegExp(t + "(" + e.join("|") + ")" + r, "gi"); s = s.replace(o, i) } return s } if (!window.StyleFix || !window.getComputedStyle) return; var n = window.PrefixFree = { prefixCSS: function (e, r, i) { var s = n.prefix; n.functions.indexOf("linear-gradient") > -1 && (e = e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig, function (e, t, n, r) { return t + (n || "") + "linear-gradient(" + (90 - r) + "deg" })), e = t("functions", "(\\s|:|,)", "\\s*\\(", "$1" + s + "$2(", e), e = t("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + s + "$2$3", e), e = t("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + s + "$2:", e); if (n.properties.length) { var o = RegExp("\\b(" + n.properties.join("|") + ")(?!:)", "gi"); e = t("valueProperties", "\\b", ":(.+?);", function (e) { return e.replace(o, s + "$1") }, e) } return r && (e = t("selectors", "", "\\b", n.prefixSelector, e), e = t("atrules", "@", "\\b", "@" + s + "$1", e)), e = e.replace(RegExp("-" + s, "g"), "-"), e = e.replace(/-\*-(?=[a-z]+)/gi, n.prefix), e }, property: function (e) { return (n.properties.indexOf(e) ? n.prefix : "") + e }, value: function (e, r) { return e = t("functions", "(^|\\s|,)", "\\s*\\(", "$1" + n.prefix + "$2(", e), e = t("keywords", "(^|\\s)", "(\\s|$)", "$1" + n.prefix + "$2$3", e), e }, prefixSelector: function (e) { return e.replace(/^:{1,2}/, function (e) { return e + n.prefix }) }, prefixProperty: function (e, t) { var r = n.prefix + e; return t ? StyleFix.camelCase(r) : r } }; (function () { var e = {}, t = [], r = {}, i = getComputedStyle(document.documentElement, null), s = document.createElement("div").style, o = function (n) { if (n.charAt(0) === "-") { t.push(n); var r = n.split("-"), i = r[1]; e[i] = ++e[i] || 1; while (r.length > 3) { r.pop(); var s = r.join("-"); u(s) && t.indexOf(s) === -1 && t.push(s) } } }, u = function (e) { return StyleFix.camelCase(e) in s }; if (i.length > 0) for (var a = 0; a < i.length; a++) o(i[a]); else for (var f in i) o(StyleFix.deCamelCase(f)); var l = { uses: 0 }; for (var c in e) { var h = e[c]; l.uses < h && (l = { prefix: c, uses: h }) } n.prefix = "-" + l.prefix + "-", n.Prefix = StyleFix.camelCase(n.prefix), n.properties = []; for (var a = 0; a < t.length; a++) { var f = t[a]; if (f.indexOf(n.prefix) === 0) { var p = f.slice(n.prefix.length); u(p) || n.properties.push(p) } } n.Prefix == "Ms" && !("transform" in s) && !("MsTransform" in s) && "msTransform" in s && n.properties.push("transform", "transform-origin"), n.properties.sort() })(), function () { function i(e, t) { return r[t] = "", r[t] = e, !!r[t] } var e = { "linear-gradient": { property: "backgroundImage", params: "red, teal" }, calc: { property: "width", params: "1px + 5%" }, element: { property: "backgroundImage", params: "#foo" }, "cross-fade": { property: "backgroundImage", params: "url(a.png), url(b.png), 50%" } }; e["repeating-linear-gradient"] = e["repeating-radial-gradient"] = e["radial-gradient"] = e["linear-gradient"]; var t = { initial: "color", "zoom-in": "cursor", "zoom-out": "cursor", box: "display", flexbox: "display", "inline-flexbox": "display", flex: "display", "inline-flex": "display", grid: "display", "inline-grid": "display", "min-content": "width" }; n.functions = [], n.keywords = []; var r = document.createElement("div").style; for (var s in e) { var o = e[s], u = o.property, a = s + "(" + o.params + ")"; !i(a, u) && i(n.prefix + a, u) && n.functions.push(s) } for (var f in t) { var u = t[f]; !i(f, u) && i(n.prefix + f, u) && n.keywords.push(f) } }(), function () { function s(e) { return i.textContent = e + "{}", !!i.sheet.cssRules.length } var t = { ":read-only": null, ":read-write": null, ":any-link": null, "::selection": null }, r = { keyframes: "name", viewport: null, document: 'regexp(".")' }; n.selectors = [], n.atrules = []; var i = e.appendChild(document.createElement("style")); for (var o in t) { var u = o + (t[o] ? "(" + t[o] + ")" : ""); !s(u) && s(n.prefixSelector(u)) && n.selectors.push(o) } for (var a in r) { var u = a + " " + (r[a] || ""); !s("@" + u) && s("@" + n.prefix + u) && n.atrules.push(a) } e.removeChild(i) }(), n.valueProperties = ["transition", "transition-property"], e.className += " " + n.prefix, StyleFix.register(n.prefixCSS) }(document.documentElement);

/**
 * Copyright (c) 2009 Sergiy Kovalchuk (serg472@gmail.com)
 * 
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *  
 * Following code is based on Element.mask() implementation from ExtJS framework (http://extjs.com/)
 *
 */
; (function ($) {

    /**
	 * Displays loading mask over selected element(s). Accepts both single and multiple selectors.
	 *
	 * @param label Text message that will be displayed on top of the mask besides a spinner (optional). 
	 * 				If not provided only mask will be displayed without a label or a spinner.  	
	 * @param delay Delay in milliseconds before element is masked (optional). If unmask() is called 
	 *              before the delay times out, no mask is displayed. This can be used to prevent unnecessary 
	 *              mask display for quick processes.   	
	 */
    $.fn.mask = function (label, delay) {
        $(this).each(function () {
            if (delay !== undefined && delay > 0) {
                var element = $(this);
                element.data("_mask_timeout", setTimeout(function () { $.maskElement(element, label) }, delay));
            } else {
                $.maskElement($(this), label);
            }
        });
    };

    /**
	 * Removes mask from the element(s). Accepts both single and multiple selectors.
	 */
    $.fn.unmask = function () {
        $(this).each(function () {
            $.unmaskElement($(this));
        });
    };

    /**
	 * Checks if a single element is masked. Returns false if mask is delayed or not displayed. 
	 */
    $.fn.isMasked = function () {
        return this.hasClass("masked");
    };

    $.maskElement = function (element, label) {

        //if this element has delayed mask scheduled then remove it and display the new one
        if (element.data("_mask_timeout") !== undefined) {
            clearTimeout(element.data("_mask_timeout"));
            element.removeData("_mask_timeout");
        }

        if (element.isMasked()) {
            $.unmaskElement(element);
        }

        if (element.css("position") == "static") {
            element.addClass("masked-relative");
        }

        element.addClass("masked");
        var maskDiv = $('<div class="loadmask"></div>');

        //auto height fix for IE
        if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
            maskDiv.height(element.height() + parseInt(element.css("padding-top")) + parseInt(element.css("padding-bottom")));
            maskDiv.width(element.width() + parseInt(element.css("padding-left")) + parseInt(element.css("padding-right")));
        }

        //fix for z-index bug with selects in IE6
        if (navigator.userAgent.toLowerCase().indexOf("msie 6") > -1) {
            element.find("select").addClass("masked-hidden");
        }

        element.append(maskDiv);

        if (label !== undefined) {
            var maskMsgDiv = $('<div class="loadmask-msg" style="display:none;"></div>');
            maskMsgDiv.append('<div>' + label + '</div>');
            element.append(maskMsgDiv);

            //calculate center position
            //maskMsgDiv.css("top", Math.round(element.height() / 2 - (maskMsgDiv.height() - parseInt(maskMsgDiv.css("padding-top")) - parseInt(maskMsgDiv.css("padding-bottom"))) / 2) + "px");
            maskMsgDiv.css("top", "50px");
            maskMsgDiv.css("left", Math.round(element.width() / 2 - (maskMsgDiv.width() - parseInt(maskMsgDiv.css("padding-left")) - parseInt(maskMsgDiv.css("padding-right"))) / 2) + "px");

            maskMsgDiv.show();
        }

    };

    $.unmaskElement = function (element) {
        //if this element has delayed mask scheduled then remove it
        if (element.data("_mask_timeout") !== undefined) {
            clearTimeout(element.data("_mask_timeout"));
            element.removeData("_mask_timeout");
        }

        element.find(".loadmask-msg,.loadmask").remove();
        element.removeClass("masked");
        element.removeClass("masked-relative");
        element.find("select").removeClass("masked-hidden");
    };

})(jQuery);

//ensure.js
(function(){

window.ensure = function( data, callback, scope )
{    
    if( typeof jQuery == "undefined" && typeof Sys == "undefined" && typeof Prototype == "undefined" )
        return alert("jQuery, Microsoft ASP.NET AJAX or Prototype library not found. One must be present for ensure to work");
        
    // There's a test criteria which when false, the associated components must be loaded. But if true, 
    // no need to load the components
    if( typeof data.test != "undefined" )
    {
        var test = function() { return data.test };
        
        if( typeof data.test == "string" )
        {
            test = function() 
            { 
                // If there's no such Javascript variable and there's no such DOM element with ID then
                // the test fails. If any exists, then test succeeds
                return !(eval( "typeof " + data.test ) == "undefined" 
                    && document.getElementById(data.test) == null); 
            }
        }    
        else if( typeof data.test == "function" )      
        {
            test = data.test;
        }
        
        // Now we have test prepared, time to execute the test and see if it returns null, undefined or false in any 
        // scenario. If it does, then load the specified javascript/html/css    
        if( test() === false || typeof test() == "undefined" || test() == null ) 
            new ensureExecutor(data, callback, scope);
        // Test succeeded! Just fire the callback
        else
            callback();
    }
    else
    {
        // No test specified. So, load necessary javascript/html/css and execute the callback
        new ensureExecutor(data, callback, scope);
    }
}

// ensureExecutor is the main class that does the job of ensure.
window.ensureExecutor = function(data, callback, scope)
{
    this.data = this.clone(data);
    this.callback = (typeof scope == "undefined" || null == scope ? callback : this.delegate(callback, scope));
    this.loadStack = [];
    
    if( data.js && data.js.constructor != Array ) this.data.js = [data.js];
    if( data.html && data.html.constructor != Array ) this.data.html = [data.html];
    if( data.css && data.css.constructor != Array ) this.data.css = [data.css];
    
    if( typeof data.js == "undefined" ) this.data.js = [];
    if( typeof data.html == "undefined" ) this.data.html = [];
    if( typeof data.css == "undefined" ) this.data.css = [];
    
    this.init();
    this.load();
}

window.ensureExecutor.prototype = {
    init : function()
    {
        // Fetch Javascript using Framework specific library
        if( typeof jQuery != "undefined" )
        {
            this.getJS = HttpLibrary.loadJavascript_jQuery;
            this.httpGet = HttpLibrary.httpGet_jQuery;
        }
        else if( typeof Prototype != "undefined" )
        {   
            this.getJS = HttpLibrary.loadJavascript_Prototype;
            this.httpGet = HttpLibrary.httpGet_Prototype; 
        }
        else if( typeof Sys != "undefined" )
        {
            this.getJS = HttpLibrary.loadJavascript_MSAJAX;
            this.httpGet = HttpLibrary.httpGet_MSAJAX;
        }
        else
        {
            throw "jQuery, Prototype or MS AJAX framework not found";
        }        
    },
    getJS : function(data)
    {
        // abstract function to get Javascript and execute it
    },
    httpGet : function(url, callback)
    {
        // abstract function to make HTTP GET call
    },    
    load : function()
    {
        this.loadJavascripts( this.delegate( function() { 
            this.loadCSS( this.delegate( function() { 
                this.loadHtml( this.delegate( function() { 
                    this.callback() 
                } ) ) 
            } ) ) 
        } ) );        
    },
    loadJavascripts : function(complete)
    {
        var scriptsToLoad = this.data.js.length;
        if( 0 === scriptsToLoad ) return complete();
        
        this.forEach(this.data.js, function(href)
        {
            if( HttpLibrary.isUrlLoaded(href) || this.isTagLoaded('script', 'src', href) )
            {
                scriptsToLoad --;
            }
            else
            {
                this.getJS({
                    url:        href, 
                    success:    this.delegate(function(content)
                                {
                                    scriptsToLoad --; 
                                    HttpLibrary.registerUrl(href);
                                }), 
                    error:      this.delegate(function(msg)
                                {
                                    scriptsToLoad --; 
                                    if(typeof this.data.error == "function") this.data.error(href, msg);
                                })
                });
            }            
        });
        
        // wait until all the external scripts are downloaded
        this.until({ 
            test:       function() { return scriptsToLoad === 0; }, 
            delay:      50,
            callback:   this.delegate(function()
            {
                complete();
            })
        });
    },    
    loadCSS : function(complete)
    {
        if( 0 === this.data.css.length ) return complete();
        
        var head = HttpLibrary.getHead();
        this.forEach(this.data.css, function(href)
        {
            if( HttpLibrary.isUrlLoaded(href) || this.isTagLoaded('link', 'href', href) )
            {
                // Do nothing
            }
            else
            {            
                var self = this;
                try
                {   
                    (function(href, head)
                    {                             
                        var link = document.createElement('link');
                        link.setAttribute("href", href);
                        link.setAttribute("rel", "Stylesheet");
                        link.setAttribute("type", "text/css");
                        head.appendChild(link);
                    
                        HttpLibrary.registerUrl(href);
                    }).apply(window, [href, head]);
                }
                catch(e)
                {
                    if(typeof self.data.error == "function") self.data.error(href, e.message);
                }                
            }
        });
        
        complete();
    },
    loadHtml : function(complete)
    {
        var htmlToDownload = this.data.html.length;
        if( 0 === htmlToDownload ) return complete();
        
        this.forEach(this.data.html, function(href)
        {
            if( HttpLibrary.isUrlLoaded(href) )
            {
                htmlToDownload --;
            }
            else
            {
                this.httpGet({
                    url:        href, 
                    success:    this.delegate(function(content)
                                {
                                    htmlToDownload --; 
                                    HttpLibrary.registerUrl(href);
                                    
                                    var parent = (this.data.parent || document.body.appendChild(document.createElement("div")));
                                    if( typeof parent == "string" ) parent = document.getElementById(parent);
                                    parent.innerHTML = content;
                                }), 
                    error:      this.delegate(function(msg)
                                {
                                    htmlToDownload --; 
                                    if(typeof this.data.error == "function") this.data.error(href, msg);
                                })
                });
            }            
        });
        
        // wait until all the external scripts are downloaded
        this.until({ 
            test:       function() { return htmlToDownload === 0; }, 
            delay:      50,
            callback:   this.delegate(function()
            {                
                complete();
            })
        });
    },
    clone : function(obj)
    {
        var cloned = {};
        for( var p in obj )
        {
            var x = obj[p];
                
            if( typeof x == "object" )
            {
                if( x.constructor == Array )
                {
                    var a = [];
                    for( var i = 0; i < x.length; i ++ ) a.push(x[i]);
                    cloned[p] = a;
                }
                else
                {
                    cloned[p] = this.clone(x);
                }
            }
            else
                cloned[p] = x;
        }
        
        return cloned;
    },
    forEach : function(arr, callback)
    {
        var self = this;
        for( var i = 0; i < arr.length; i ++ )
            callback.apply(self, [arr[i]]);
    },
    delegate : function( func, obj )
    {
        var context = obj || this;
        return function() { func.apply(context, arguments); }
    },
    until : function(o /* o = { test: function(){...}, delay:100, callback: function(){...} } */)
    {
        if( o.test() === true ) o.callback();
        else window.setTimeout( this.delegate( function() { this.until(o); } ), o.delay || 50);
    },
    isTagLoaded : function(tagName, attName, value)
    {
        // Create a temporary tag to see what value browser eventually 
        // gives to the attribute after doing necessary encoding
        var tag = document.createElement(tagName);
        tag[attName] = value;
        var tagFound = false;
        var tags = document.getElementsByTagName(tagName);
        this.forEach(tags, function(t) 
        { 
            if( tag[attName] === t[attName] ) { tagFound = true; return false } 
        });
        return tagFound;
    }
}

var userAgent = navigator.userAgent.toLowerCase();

// HttpLibrary is a cross browser, cross framework library to perform common operations
// like HTTP GET, injecting script into DOM, keeping track of loaded url etc. It provides
// implementations for various frameworks including jQuery, MSAJAX or Prototype
var HttpLibrary = {
    browser : {
	    version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
	    safari: /webkit/.test( userAgent ),
	    opera: /opera/.test( userAgent ),
	    msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	    mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
    },
    loadedUrls : {},
    
    isUrlLoaded : function(url)
    {
        return HttpLibrary.loadedUrls[url] === true;
    },
    unregisterUrl : function(url)
    {
        HttpLibrary.loadedUrls[url] = false;
    },
    registerUrl : function(url)
    {
        HttpLibrary.loadedUrls[url] = true;
    },
    
    createScriptTag : function(url, success, error)
    {
        var scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", url);
        scriptTag.onload = scriptTag.onreadystatechange = function()
        {
            if ( (!this.readyState || 
					this.readyState == "loaded" || this.readyState == "complete") ) {
				success();
			}
		};
        scriptTag.onerror = function()
        {
            error(data.url + " failed to load");
        };
	    var head = HttpLibrary.getHead();
        head.appendChild(scriptTag);
    },
    getHead : function()
    {
        return document.getElementsByTagName("head")[0] || document.documentElement
    },
    globalEval : function(data)
    {
        var script = document.createElement("script");
        script.type = "text/javascript";
		if ( HttpLibrary.browser.msie )
			script.text = data;
		else
			script.appendChild( document.createTextNode( data ) );

        var head = HttpLibrary.getHead();
		head.appendChild( script );
		//head.removeChild( script );
    },
    loadJavascript_jQuery : function(data)
    {
        if( HttpLibrary.browser.safari )
        {
           return jQuery.ajax({
			    type:       "GET",
			    url:        data.url,
			    data:       null,
			    success:    function(content)
			                {
			                    HttpLibrary.globalEval(content);
			                    data.success();
			                },
			    error:      function(xml, status, e) 
                            { 
                                if( xml && xml.responseText )
                                    data.error(xml.responseText);
                                else
                                    data.error(url +'\n' + e.message);
                            },
			    dataType: "html"
		    });
        }
        else
        {
            HttpLibrary.createScriptTag(data.url, data.success, data.error);
        }
    },    
    loadJavascript_MSAJAX : function(data)
    {
        if( HttpLibrary.browser.safari )
        {
            var params = 
            { 
                url: data.url, 
                success: function(content)
                {
                    HttpLibrary.globalEval(content);
                    data.success(content);
                },
                error : data.error 
            };
            HttpLibrary.httpGet_MSAJAX(params);
        }
        else
        {
            HttpLibrary.createScriptTag(data.url, data.success, data.error);
        }
    },
    loadJavascript_Prototype : function(data)
    {
        if( HttpLibrary.browser.safari )
        {
            var params = 
            { 
                url: data.url, 
                success: function(content)
                {
                    HttpLibrary.globalEval(content);
                    data.success(content);
                },
                error : data.error 
            };
            HttpLibrary.httpGet_Prototype(params);
        }
        else
        {
            HttpLibrary.createScriptTag(data.url, data.success, data.error);
        }        
    },
    httpGet_jQuery : function(data)
    {
        return jQuery.ajax({
			type:       "GET",
			url:        data.url,
			data:       null,
			success:    data.success,
			error:      function(xml, status, e) 
                        { 
                            if( xml && xml.responseText )
                                data.error(xml.responseText);
                            else
                                data.error("Error occured while loading: " + url +'\n' + e.message);
                        },
			dataType: data.type || "html"
		});
    },
    httpGet_MSAJAX : function(data)
    {
        var _wRequest =  new Sys.Net.WebRequest();
        _wRequest.set_url(data.url);
        _wRequest.set_httpVerb("GET");
        _wRequest.add_completed(function (result) 
        {
            var errorMsg = "Failed to load:" + data.url;
            if (result.get_timedOut()) {
                errorMsg = "Timed out";
            }
            if (result.get_aborted()) {
                errorMsg = "Aborted";
            }
            
            if (result.get_responseAvailable()) data.success( result.get_responseData() );
            else data.error( errorMsg );
        });

        var executor = new Sys.Net.XMLHttpExecutor();
        _wRequest.set_executor(executor); 
        executor.executeRequest();
    },
    httpGet_Prototype : function(data)
    {
        new Ajax.Request(data.url, {
            method:     'get',
            evalJS:     false,  // Make sure prototype does not automatically evan scripts
            onSuccess:  function(transport, json)
                        {
                            data.success(transport.responseText || "");              
                        },
            onFailure : data.error
        });
    }
};

})();
$.fn.centerMe = function () {
    this.css('left', $(window).width() / 2 - $(this).width() / 2);
    this.css('top', $(window).height() / 2 - $(this).height() / 2);
};

/* 
 * JQuery CSS Rotate property using CSS3 Transformations
 * Copyright (c) 2011 Jakub Jankiewicz  <http://jcubic.pl>
 * licensed under the LGPL Version 3 license.
 * http://www.gnu.org/licenses/lgpl.html
 */
(function ($) {
    function getTransformProperty(element) {
        var properties = ['transform', 'WebkitTransform',
                          'MozTransform', 'msTransform',
                          'OTransform'];
        var p;
        while (p = properties.shift()) {
            if (element.style[p] !== undefined) {
                return p;
            }
        }
        return false;
    }
    $.cssHooks['rotate'] = {
        get: function (elem, computed, extra) {
            var property = getTransformProperty(elem);
            if (property) {
                return elem.style[property].replace(/.*rotate\((.*)deg\).*/, '$1');
            } else {
                return '';
            }
        },
        set: function (elem, value) {
            var property = getTransformProperty(elem);
            if (property) {
                value = parseInt(value);
                $(elem).data('rotatation', value);
                if (value == 0) {
                    elem.style[property] = '';
                } else {
                    elem.style[property] = 'rotate(' + value % 360 + 'deg)';
                }
            } else {
                return '';
            }
        }
    };
    $.fx.step['rotate'] = function (fx) {
        $.cssHooks['rotate'].set(fx.elem, fx.now);
    };
})(jQuery);


/***********************BLAS************************************************/
//!function (a, b, c) { var d = window.matchMedia; "undefined" != typeof module && module.exports ? module.exports = c(d) : "function" == typeof define && define.amd ? define(function () { return b[a] = c(d) }) : b[a] = c(d) }("enquire", this, function (a) { "use strict"; function b(a, b) { var c, d = 0, e = a.length; for (d; e > d && (c = b(a[d], d), c !== !1) ; d++); } function c(a) { return "[object Array]" === Object.prototype.toString.apply(a) } function d(a) { return "function" == typeof a } function e(a) { this.options = a, !a.deferSetup && this.setup() } function f(b, c) { this.query = b, this.isUnconditional = c, this.handlers = [], this.mql = a(b); var d = this; this.listener = function (a) { d.mql = a, d.assess() }, this.mql.addListener(this.listener) } function g() { if (!a) throw new Error("matchMedia not present, legacy browsers require a polyfill"); this.queries = {}, this.browserIsIncapable = !a("only all").matches } return e.prototype = { setup: function () { this.options.setup && this.options.setup(), this.initialised = !0 }, on: function () { !this.initialised && this.setup(), this.options.match && this.options.match() }, off: function () { this.options.unmatch && this.options.unmatch() }, destroy: function () { this.options.destroy ? this.options.destroy() : this.off() }, equals: function (a) { return this.options === a || this.options.match === a } }, f.prototype = { addHandler: function (a) { var b = new e(a); this.handlers.push(b), this.matches() && b.on() }, removeHandler: function (a) { var c = this.handlers; b(c, function (b, d) { return b.equals(a) ? (b.destroy(), !c.splice(d, 1)) : void 0 }) }, matches: function () { return this.mql.matches || this.isUnconditional }, clear: function () { b(this.handlers, function (a) { a.destroy() }), this.mql.removeListener(this.listener), this.handlers.length = 0 }, assess: function () { var a = this.matches() ? "on" : "off"; b(this.handlers, function (b) { b[a]() }) } }, g.prototype = { register: function (a, e, g) { var h = this.queries, i = g && this.browserIsIncapable; return h[a] || (h[a] = new f(a, i)), d(e) && (e = { match: e }), c(e) || (e = [e]), b(e, function (b) { d(b) && (b = { match: b }), h[a].addHandler(b) }), this }, unregister: function (a, b) { var c = this.queries[a]; return c && (b ? c.removeHandler(b) : (c.clear(), delete this.queries[a])), this } }, new g });

function toggleMenu() {
    $('#wrapper').toggleClass("menu-active");
    $('.main-nav').toggleClass("active");
    $('body').toggleClass("no-scroll");
}

$(document).ready(function () {
    //Check for Active Trials
    if (_userStatus != "_Guest" && location.host.toLocaleLowerCase() == "www.k2.com") {
        var trialURL = GetCookie("K2TrialURL");
        if (IsEmptyOrNull(trialURL)) {
            //Get Trials
            var postData = "";
            $.post("/k2trynowv2/GetMyTrials?ValidTrials=FULL_K2_TRIAL,K2 blackpearl", postData,
                function (data) {
                    if (data.length > 0) {
                        for (var x = 0; x < data.length; x++) {
                            if (data[x].VMInstanceID > 0) {
                                trialURL = "http://www.k2.com/trials/blackpearl";
                            } else {
                                if (IsEmptyOrNull(trialURL)) trialURL = "http://www.k2.com/try-k2";
                            }
                        }
                        //Set Trial URL Cookie
                        SetCookie("K2TrialURL", trialURL, 0, "/", "k2.com", false);
                        SetTrialDashboardMenu(trialURL);
                    } else { }
                }
            , "json");
        } else {
            SetTrialDashboardMenu(trialURL);
        }
    }
    function SetTrialDashboardMenu(url) {
        $("nav.topnav ul li:last-child a").addClass("right-border");
        $("nav.topnav ul").append("<li><a href='" + url + "'>Trial Dashboard</a></li>");
    }

    $(".active .top-level").click(function () { $(this).parent().toggleClass('is-mobile-disabled'); });
    $(".is-mobile-disabled").click(function () { if ($("body").hasClass("is-mobile")) {$(this).children(".submenu").toggleClass("show-for-small"); }});
    //this line is NEW
    $(".close-banner").click(function () { $('body').removeClass("banner"); $('.top-banner').hide(); });

    $(window).scroll(function () {
        var topPos;
        if ($('.banner').length)
            topPos = 415;
        else
            topPos = 37;

        if ($(this).scrollTop() > topPos) {
            $('header').addClass("headroom--not-top");
            $('body').addClass("pinned-header ");
            $('.WhiteSite .right-fixed-buttons').addClass("fixed");
        }
        else {
            $('header').removeClass("headroom--not-top");
            $('body').removeClass("pinned-header ");
            $('.WhiteSite .right-fixed-buttons').removeClass("fixed");
        }
    });

    $(".mobile-menu, .top-mobile .close").click(function () {
        toggleMenu();
    });

    $(".search-icon, .btn-close-search-bar").click(function () {
        $('.search-box').toggleClass("active");
        $(".search-box input").focus();
        var body = $("html, body");
        body.animate({ scrollTop: 0 }, '500', 'swing', function () {

        });
    });

    //enquire.register("screen and (max-width:769px)", {
    //    match: function () {
    //        $(".top-level").click(function () {
    //            $(this).parent().toggleClass('is-mobile-disabled');

    //        });
    //        $("body").addClass('is-mobile');

    //    },
    //    unmatch: function () {
    //        $("body").removeClass('is-mobile');
    //    },
    //    setup: function () { },
    //    deferSetup: true,
    //    destroy: function () { }
    //});
});
/***********************END BLAS********************************************/


/**********************Mike_Common.js*****************************************/
jQuery.support.cors = true;
//Global Variables
var publicID = -1; try { publicID = _publicid || getQuerystring("id"); } catch (e) { publicID = -1; }
//Obsolete
var languageID = 1;
//New language Handling
var languageCode = "en"; try { languageCode = getQuerystring("languageCode") || _languageCode; } catch (e) { languageCode = "en"; }
var persistentQSItems = ["source", "test","version","timers" ];

function addListener(element, event, listener, bubble) { if (element.addEventListener) { if (typeof (bubble) == "undefined") { bubble = false; } element.addEventListener(event, listener, bubble); } else if (this.attachEvent) { element.attachEvent("on" + event, listener); } }
function removeListener(element, event, listener, bubble) { if (element.removeEventListener) { if (typeof (bubble) == "undefined") { bubble = false; } element.removeEventListener(event, listener, bubble); } else if (this.detachEvent) { element.detachEvent("on" + event, listener); } }
function getQuerystring(key, default_) { if (default_ == null) default_ = ""; key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]"); var regex = new RegExp("[\\?&]" + key + "=([^&#]*)", "i"); var qs = regex.exec(window.location.href); if (qs == null) { return default_; } else { return qs[1]; } }
function replaceQueryString(url, param, value) { var re = new RegExp("([?|&])" + param + "=.*?(&|$)", "i"); if (url.match(re)) return url.replace(re, '$1' + param + "=" + value + '$2'); else return url + ((url.indexOf('?')==-1)?'?':'&') + param + "=" + value; }
function SetCookie(name, value, expires, path, domain, secure) { var today = new Date(); today.setTime(today.getTime()); if (expires) expires = expires * 1000 * 60 * 60 * 24; var expires_date = new Date(today.getTime() + (expires)); document.cookie = name + "=" + value + ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ((secure) ? ";secure" : ""); }
function GetCookie(name) { var nameEQ = name + "="; var ca = document.cookie.split(';'); for (var i = 0; i < ca.length; i++) { var c = ca[i]; while (c.charAt(0) == ' ') c = c.substring(1, c.length); if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length); } return null; }
function GetParentRecursive(obj, IDContains) { if (obj.id == IDContains) { return true; } else { try { return GetParentRecursive(obj.parentNode, IDContains); } catch (e) { return false; } } }
function isMobile() { var index = navigator.appVersion.indexOf("Mobile"); if ($('.hide-for-small:visible').length <= 0) return (index > -1); }
function inCompatibilityMode() { return false;}//var index = navigator.appVersion.indexOf("compatible;"); var index2 = navigator.appVersion.indexOf("MSIE"); if (index > -1 && index2 > -1) { return true; } else { return false; }}
function TrackK2Com(eventCat, eventAction, eventLabel, fakeURL) {
    var postData = "&LogRecordView=true&PageURL=" + location.href + "&PrimaryURL=" + fakeURL + "&EventCat=" + eventCat + "&EventAction=" + eventAction + "&EventLabel=" + eventLabel;
    var url = "/forms/submit.xml";
    $.post(url, postData, function (data) { });
}
function TrackGoogleEvent(eventCat, eventAction, eventLabel) { try { _gaq.push(['_trackEvent', eventCat, eventAction, eventLabel]); } catch (e) { } }
function TrackGooglePage(url) { try { _gaq.push(['_trackPageview', url]); } catch (e) { } }
function TrackEloquaPage(url) { /*_elqQ.push(['elqSetSiteId', '876']); _elqQ.push(['elqTrackPageView', url]);*/ }
function TrackAll(eventCat, eventAction, eventLabel, fakeURL) { TrackGoogleEvent(eventCat, eventAction, eventLabel); if (!IsEmptyOrNull(fakeURL)) { TrackGooglePage(fakeURL); } TrackK2Com(eventCat, eventAction,eventLabel, fakeURL);}
var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, timezoneClip = /[^-+\dA-Z]/g, pad = function (val, len) { val = String(val); len = len || 2; while (val.length < len) val = "0" + val; return val; }; return function (date, mask, utc) {
        var dF = dateFormat; if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) { mask = date; date = undefined; }
        date = date ? new Date(date) : new Date; if (isNaN(date)) throw SyntaxError("invalid date"); mask = String(dF.masks[mask] || mask || dF.masks["default"]); if (mask.slice(0, 4) == "UTC:") { mask = mask.slice(4); utc = true; }
        var _ = utc ? "getUTC" : "get", d = date[_ + "Date"](), D = date[_ + "Day"](), m = date[_ + "Month"](), y = date[_ + "FullYear"](), H = date[_ + "Hours"](), M = date[_ + "Minutes"](), s = date[_ + "Seconds"](), L = date[_ + "Milliseconds"](), o = utc ? 0 : date.getTimezoneOffset(), flags = { d: d, dd: pad(d), ddd: dF.i18n.dayNames[D], dddd: dF.i18n.dayNames[D + 7], m: m + 1, mm: pad(m + 1), mmm: dF.i18n.monthNames[m], mmmm: dF.i18n.monthNames[m + 12], yy: String(y).slice(2), yyyy: y, h: H % 12 || 12, hh: pad(H % 12 || 12), H: H, HH: pad(H), M: M, MM: pad(M), s: s, ss: pad(s), l: pad(L, 3), L: pad(L > 99 ? Math.round(L / 10) : L), t: H < 12 ? "a" : "p", tt: H < 12 ? "am" : "pm", T: H < 12 ? "A" : "P", TT: H < 12 ? "AM" : "PM", Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""), o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4), S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10] }; return mask.replace(token, function ($0) { return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1); });
    };
}(); dateFormat.masks = { "default": "ddd mmm dd yyyy HH:MM:ss", shortDate: "m/d/yy", mediumDate: "mmm d, yyyy", longDate: "mmmm d, yyyy", fullDate: "dddd, mmmm d, yyyy", shortTime: "h:MM TT", mediumTime: "h:MM:ss TT", longTime: "h:MM:ss TT Z", isoDate: "yyyy-mm-dd", isoTime: "HH:MM:ss", isoDateTime: "yyyy-mm-dd'T'HH:MM:ss", isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'" }; dateFormat.i18n = { dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }; Date.prototype.format = function (mask, utc) { return dateFormat(this, mask, utc); };
var END_OF_INPUT = -1;
var base64Chars = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/');
var reverseBase64Chars = new Array();
for (var i = 0; i < base64Chars.length; i++) { reverseBase64Chars[base64Chars[i]] = i; }
var base64Str;
var base64Count;
function setBase64Str(str) { base64Str = str; base64Count = 0; }
function readBase64() { if (!base64Str) return END_OF_INPUT; if (base64Count >= base64Str.length) return END_OF_INPUT; var c = base64Str.charCodeAt(base64Count) & 0xff; base64Count++; return c; }
function encodeBase64(str) { setBase64Str(str); var result = ''; var inBuffer = new Array(3); var lineCount = 0; var done = false; while (!done && (inBuffer[0] = readBase64()) != END_OF_INPUT) { inBuffer[1] = readBase64(); inBuffer[2] = readBase64(); result += (base64Chars[inBuffer[0] >> 2]); if (inBuffer[1] != END_OF_INPUT) { result += (base64Chars[((inBuffer[0] << 4) & 0x30) | (inBuffer[1] >> 4)]); if (inBuffer[2] != END_OF_INPUT) { result += (base64Chars[((inBuffer[1] << 2) & 0x3c) | (inBuffer[2] >> 6)]); result += (base64Chars[inBuffer[2] & 0x3F]); } else { result += (base64Chars[((inBuffer[1] << 2) & 0x3c)]); result += ('='); done = true; } } else { result += (base64Chars[((inBuffer[0] << 4) & 0x30)]); result += ('='); result += ('='); done = true; } lineCount += 4; if (lineCount >= 76) { result += ('\n'); lineCount = 0; } } return result; }
function readReverseBase64() { if (!base64Str) return END_OF_INPUT; while (true) { if (base64Count >= base64Str.length) return END_OF_INPUT; var nextCharacter = base64Str.charAt(base64Count); base64Count++; if (reverseBase64Chars[nextCharacter]) { return reverseBase64Chars[nextCharacter]; } if (nextCharacter == 'A') return 0; } return END_OF_INPUT; }
function ntos(n) { n = n.toString(16); if (n.length == 1) n = "0" + n; n = "%" + n; return unescape(n); }
function decodeBase64(str) { setBase64Str(str); var result = ""; var inBuffer = new Array(4); var done = false; while (!done && (inBuffer[0] = readReverseBase64()) != END_OF_INPUT && (inBuffer[1] = readReverseBase64()) != END_OF_INPUT) { inBuffer[2] = readReverseBase64(); inBuffer[3] = readReverseBase64(); result += ntos((((inBuffer[0] << 2) & 0xff) | inBuffer[1] >> 4)); if (inBuffer[2] != END_OF_INPUT) { result += ntos((((inBuffer[1] << 4) & 0xff) | inBuffer[2] >> 2)); if (inBuffer[3] != END_OF_INPUT) { result += ntos((((inBuffer[2] << 6) & 0xff) | inBuffer[3])); } else { done = true; } } else { done = true; } } return result; }
function capitaliseFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
function parseJsonDate(jsonDate, format) { if (format == undefined) { format = ""; } offset = new Date().getTimezoneOffset() * 60000; var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate); if (parts[2] == undefined) { parts[2] = 0; } if (parts[3] == undefined) { parts[3] = 0; } return new Date(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000).format(format); }
function positionInfo(object) { var p_elm = object; this.getElementLeft = getElementLeft; function getElementLeft() { var x = 0; var elm; if (typeof (p_elm) == "object") { elm = p_elm; } else { elm = document.getElementById(p_elm); } while (elm != null) { if (elm.style.position == 'relative') { break; } else { x += elm.offsetLeft; elm = elm.offsetParent; } } return parseInt(x); } this.getElementWidth = getElementWidth; function getElementWidth() { var elm; if (typeof (p_elm) == "object") { elm = p_elm; } else { elm = document.getElementById(p_elm); } return parseInt(elm.offsetWidth); } this.getElementRight = getElementRight; function getElementRight() { return getElementLeft(p_elm) + getElementWidth(p_elm); } this.getElementTop = getElementTop; function getElementTop() { var y = 0; var elm; if (typeof (p_elm) == "object") { elm = p_elm; } else { elm = document.getElementById(p_elm); } while (elm != null) { if (elm.style.position == 'relative') { break; } else { y += elm.offsetTop; elm = elm.offsetParent; } } return parseInt(y); } this.getElementHeight = getElementHeight; function getElementHeight() { var elm; if (typeof (p_elm) == "object") { elm = p_elm; } else { elm = document.getElementById(p_elm); } return parseInt(elm.offsetHeight); } this.getElementBottom = getElementBottom; function getElementBottom() { return getElementTop(p_elm) + getElementHeight(p_elm); } }
function stringToBoolean (string){ switch(string.toLowerCase()){ case "true": case "yes": case "1": return true; case "false": case "no": case "0": case null: return false; default: return Boolean(string); } }
function GetRootDomain() { var url = location.hostname; url = url.split('.'); var domain = url.pop(); domain = url.pop() + '.' + domain; return domain; }


function SetupRows() { jQuery("._AlternatingRows:odd").each(function (e) { $(this).addClass("alternatingRow"); /*$(this).css("background-color", "#dddddd");*/ }); }
function SetupLists() {
    SetupRows();
    SetupVideos();
}
function TweetThis(url, title) {
    var hashtags = "";
    if (title.indexOf("#") > -1) {
        var titleSplit = title.split("#");
        title = titleSplit[0];
        for (var i = 1; i < titleSplit.length; i++) {
            hashtags += ((hashtags == "") ? "" : ",") + titleSplit[i];
        }
    }
    var tweetURL = "https://twitter.com/share?text=" + title + "&url=" + url + "&via=K2onK2&hashtags="+hashtags;
    window.open(tweetURL, "Twitter", "height=400, width=400,toolbar=no,titlebar=no");
    TrackAll("SocialMedia", "Twitter", url, tweetURL);
}
function FBShare(url, title, summary) {
    var fbShareURL = "http://www.facebook.com/sharer.php?s=100&p[url]=" + url + "&p[title]=" + title + "&p[summary]=" + summary;
    window.open(fbShareURL, "FaceBook", "height=400, width=400,toolbar=no,titlebar=no");
    TrackAll("SocialMedia", "Facebook", url, fbShareURL);
}
function LinkedInShare(url, title, summary) {
    var linkedInShareURL = "http://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + title + "&summary=" + summary + "&source=";
    window.open(linkedInShareURL, "linkedIn", "height=400, width=615,toolbar=no,titlebar=no");
    TrackAll("SocialMedia", "LinkedIn", url, linkedInShareURL);
}
function GooglePlusShare(url) {
    var googlePlusURL = "https://plus.google.com/share?url=" + encodeURIComponent(url);
    window.open(googlePlusURL, "GooglePlus", "height=400, width=400,toolbar=no,titlebar=no");
    TrackAll("SocialMedia", "GooglePlus", url, googlePlusURL);
}


function SetupPaging() {
    jQuery("._SearchClearFilter").click(function (e) {
        e.preventDefault();
        ExecuteSearch(e.target + "&z=" + Math.random());
    });
    jQuery("._SearchPage").click(function (e) {
        e.preventDefault();
        ExecuteSearch(e.target + "&z=" + Math.random());
    });
    SetupLists();
}
SetupVideos();
function SetupVideos() {
    jQuery("div._videoplaceholder").each(function (e) {
        try {
            var videoDiv = $(this);
            videoDiv.html("Loading Video...");
            var width = 0; var height = 0;
            //            try { width = videoDiv.attr("width"); } catch (e) { width = 0; }
            //            try { height = videoDiv.attr("height"); } catch (e) { height = 0; }
            var ratio = 16 / 9;
            width = videoDiv.parent().width();
            height = width / ratio;
            var url = videoDiv.attr("target");
            if (url.indexOf("/get") == -1) { url += "/getjson"; } else { url += "json"; }
            var postData = "";
            if (width > 0 && height > 0) postData = "&width=" + width + "&height=" + height;
            $.post(url, postData,
			    function (data) {
			        if (data.length > 0) {
			            if (data[0].Error != "" && data[0].Error != null && data[0].Error != "null") {
			                videoDiv.replaceWith(data[0].Error);
			            } else {
			                var embedCode = data[0].HTML;
			                embedCode = embedCode.replace("GETWIDTH", width).replace("GETHEIGHT", height);
			                if (embedCode.indexOf("vidyard_") > -1) {
			                    videoDiv.attr("id", "vidyard_" + data[0].VideoID);
			                    videoDiv.html(embedCode);
			                } else {
			                    videoDiv.replaceWith(data[0].HTML);
			                }
			                TrackAll("Video View", "/videos/" + data[0].VideoID, data[0].Title, "");
			            }
			        } else { videoDiv.replaceWith("An unknown error occurred"); }
			    }
            , "json");

        } catch (e) { }
    });

}
function FakeCheckBox_Click(obj, ddid, objValue) {
    try {
        var dd = document.getElementById(ddid);
        var showControls = "";
        try { showControls = dd.getAttribute("onchange"); } catch (e) { }
        var cssName = obj.className;
        cssName = ((cssName.indexOf("_On") > -1) ? cssName.replace("_On", "_Off") : cssName.replace("_Off", "_On"));
        obj.className = cssName;
        var optionOn = ((cssName.indexOf("_On") > -1) ? true : false);
        for (var x = 0; x < dd.options.length; x++) {
            if (dd.options[x].value == objValue) { dd.options[x].selected = optionOn; SetupDropDown($("#" + ddid)); break; }
        }
        if (showControls != "") eval(showControls.replace("this", "dd"));
    } catch (e) { }
}

function actualdownload(src) {
    $("#downloadFrame").remove();
    if (1 == 1 || !isMobile()) {
        var existingToken = "";
        var dlTokenIndex = src.indexOf("dltoken");
        if ( dlTokenIndex > -1) {existingToken = src.substr(dlTokenIndex + 8, src.indexOf('&') - dlTokenIndex-8);}
        var token = existingToken || new Date().getTime();
        if (IsEmptyOrNull(existingToken)) {
            if (src.indexOf("?") > -1) { src += "&"; } else { src += "?"; } src += "dltoken=" + token;
            SetCookie("DL_" + token, "Validate", 0, "/", "k2.com", false);
        }
        jQuery("#AjaxMessage_Body").html("<div id='AjaxMessage_Contents' class='MessageBox Note'>Your download should begin shortly.</div>");
        var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
        jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
        var $iframe = $('<iframe id="downloadFrame" src="' + src + '" width="100%" style="display:none;"></iframe>');
        $('body').append($iframe);
        
        var fileDownloadCheckTimer;
        fileDownloadCheckTimer = window.setInterval(function () {
            var temp = location.host.split('.').reverse();
            var root_domain = temp[1] + '.' + temp[0];
            var cookieValue = GetCookie("DL_" + token);
            switch (cookieValue) {
                case "eula":
                    var eula = $('#downloadFrame').contents().find('._EULA').html();
                    $("#AjaxMessage_Contents").html(eula);// + "<div style='text-align:center;'><a href='javascript:jQuery(\"#AjaxMessage\").jqmHide();'>Close</a></div>");
                    var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 60;
                    var newW = jQuery("#AjaxMessage_Contents").innerWidth() + 250;
                    
                    var windowH = $(window).innerHeight();
                    var windowW = $(window).innerWidth();
                    if (newH > windowH) newH = windowH - 10;
                    if (newW > windowW) newW = windowW - 10;
                    jQuery("#AjaxMessage_Contents div.eulatext").height(newH - 100);
                    jQuery("#AjaxMessage_Contents div.eulabutton").height(40);
                    var newTop = ((windowH - newH) / 2);
                    var newLeft = ((windowW - newW) / 2);
                    jQuery("#AjaxMessage_Body").animate({ height: newH, width:newW}, 500);
                    jQuery("#AjaxMessage_Body").parent().animate({ height: newH, width:newW, top: newTop, left: newLeft }, 500);
                    window.clearInterval(fileDownloadCheckTimer);
                    SetCookie("DL_" + token, "", -1, "/", root_domain, false);
                    $("._DLAccept").on("click", function (e) {
                        e.preventDefault();
                        SetCookie("DL_" + token, "Accept", 0, "/", root_domain, false);
                        var targetSrc = $(this).attr("target");
                        actualdownload(targetSrc);
                        try {
                            var postData = "";
                            var cleanedSrc = targetSrc.substring(0, targetSrc.indexOf("?"));
                            $.post(cleanedSrc + "_gettitle", postData,
                                function (data) {
                                    try { if (data.indexOf("<") == -1 || data.indexOf("domain.js")>-1) { TrackAll("Download - Accepted EULA", cleanedSrc, data, cleanedSrc); } } catch (e) { }
                                }
                            );
                        } catch (e) { }
                    });
                    break;
                case "started":
                case "done":
                    window.clearInterval(fileDownloadCheckTimer);
                    SetCookie("DL_" + token, "", -1, "/", root_domain, false);
                    jQuery("#AjaxMessage").jqmHide();
                    break;
                case "nomaint":
                    var nomaint = $('#downloadFrame').contents().find('._NOMAINT').html();
                    $("#AjaxMessage_Contents").html(nomaint);// + "<div style='text-align:center;'><a href='javascript:jQuery(\"#AjaxMessage\").jqmHide();'>Close</a></div>");
                    var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 60;
                    var newW = jQuery("#AjaxMessage_Contents").innerWidth() + 250;

                    var windowH = $(window).innerHeight();
                    var windowW = $(window).innerWidth();
                    if (newH > windowH) newH = windowH - 10;
                    if (newW > windowW) newW = windowW - 10;
                    jQuery("#AjaxMessage_Contents div.nomainttext").height(newH - 100);
                    jQuery("#AjaxMessage_Contents div.nomaintbutton").height(40);
                    var newTop = ((windowH - newH) / 2);
                    var newLeft = ((windowW - newW) / 2);
                    jQuery("#AjaxMessage_Body").animate({ height: newH, width: newW }, 500);
                    jQuery("#AjaxMessage_Body").parent().animate({ height: newH, width: newW, top: newTop, left: newLeft }, 500);
                    window.clearInterval(fileDownloadCheckTimer);
                    try {
                        var postData = "";
                        $.post(src + "_gettitle", postData,
                            function (data) {
                                try { if (data.indexOf("<") == -1 || data.indexOf("domain.js") > -1) { TrackAll("Expired Maintenance", src, data, src); } } catch (e) { }
                            }
                        );
                    } catch (e) { }
                    $("._ContactCAM").on("click", function (e) {
                        location.href = $(this).attr("target");
                    });

                    break;
                case "error":
                    var errors = $('#downloadFrame').contents().find('._ErrorMsg').html();
                    $("#AjaxMessage_Contents").toggleClass("Error Note");
                    $("#AjaxMessage_Contents").html(errors + "<div style='text-align:center;'><a href='javascript:jQuery(\"#AjaxMessage\").jqmHide();'>Close</a></div>");
                    var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
                    jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
                    window.clearInterval(fileDownloadCheckTimer);
                    SetCookie("DL_" + token, "", -1, "/", root_domain, false);
                    break;
                default:
                    if (src.indexOf("connect.rdp") > -1) {
                        window.clearInterval(fileDownloadCheckTimer);
                        SetCookie("DL_" + token, "", -1, "/", root_domain, false);
                        jQuery("#AjaxMessage").jqmHide();
                    }
                    break;
            }
        }, 1000);
    } else {
        jQuery("#AjaxMessage").jqmHide();
        location.href = src;
    }
}
function download(src) {
    jQuery("#jqmContainers").append(GetPopupWindow("AjaxMessage"));
    jQuery("#AjaxMessage").jqm({ onHide: closeAndKill, html: "", ajax: "", ajaxText: "", overlay: 65, modal: true, width: 300, height: 200, innerWidthOffset: 40, innerHeightOffset: 40, target: '#AjaxMessage_Body' });
    jQuery("#AjaxMessage").jqmShow();
    jQuery("#AjaxMessage_Body").html("<img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/>");
    if (src.indexOf("/files/") == -1) { actualdownload(src); }
    else {
        var postData = "";
        $.post(src + "_gettitle", postData,
		    function (data) {
		        try { if (data.indexOf("<") == -1 || data.indexOf("domain.js") > -1) { TrackAll("Download Click", src, data, src); } } catch (e) { }
		        actualdownload(src);
		    }
        );
    }
}
//$("._RestartDownload").die("click");
//$("._RestartDownload").live("click", function (e) {
$(".PageContainer").off("click", "._RestartDownload");
$(".PageContainer").on("click", "._RestartDownload", function (e) {
    e.preventDefault();
    download($(this).attr("href"));
});
var closeAndKill = function (hash) { enable_scroll(); try { hash.w.remove(); } catch (e) { } try { hash.o.remove(); } catch (e) { } };
var CloseAllPopups = function () { enable_scroll(); jQuery("#jqmContainers").children().each(function (e) { try { if ($(this).attr("class").indexOf("jqmWindow") > -1) { $(this).jqmHide(); } else { $(this).remove(); } } catch (e) { } }); };

var UnderMaintenance = function () { var underMaint = false; try { underMaint == _SiteMaintenance; } catch (e) { underMaint = false; } if (underMaint == true) { CreatePopup("SiteMaintenanceWindow", "<div style='text-align:center;' class='FormErrorMessage'>The login feature has been disabled while maintenance is performed.<br/>Please try your again later.<div>", 600, 400, "", true); } return underMaint; }

//REWRITE
function GetPopupWindow(id, cssClass) {
    if (cssClass == undefined) cssClass = "RoundCornersPopupNew";
    if (jQuery("#jqmContainers").children("#" + id).length > 0) {
        try { jQuery("#jqmContainers").children("#" + id).jqmHide(); } catch (e) { }
        jQuery("#jqmContainers").children("#" + id).remove();
    }
    try { jQuery("#" + id).remove(); } catch (e) { }
    output = "<div id='" + id + "' class='jqmWindow'><div class='" + cssClass + "' id='" + id + "_Body' style='text-align:center;vertical-align:middle;width:100%;height:100%;'><img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/></div></div>";
    return output;
}
//END REWRITE
function GetRelativeVideoURL(url) { url = String(url); var videoPathIndex = url.indexOf('/videos/'); if (videoPathIndex > 0) url = url.substring(videoPathIndex); return url; }
var IsEmptyOrNull = function (s) { if (s == null || s == "null" || s == undefined || s == "undefined" || s == "" || s == "scnull") { return true; } else { return false; } }
var originalHiddenQS = "";
var RebuildQS = function (currentPostData, additionalIgnore) {
    var qs = location.search.substring(1); var newQS = "";
    var hiddenQS = ""; try { hiddenQS = $("#_QSHIDDEN").val(); } catch (e) { }
    var fullHash = window.location.hash;
    if (!IsEmptyOrNull(hiddenQS)) {
        if (fullHash.indexOf("#!/") == 0 || fullHash.indexOf("#/") == 0) {
            if (IsEmptyOrNull(originalHiddenQS)) originalHiddenQS = hiddenQS;
            hashSections = fullHash.replace("#!/", "").replace("#/", "").split("/");
            var matches = hiddenQS.match(/{[0-9]}/gi);
            for (var i = 0; i < matches.length; i++) {
                try {
                    var index = Number(matches[i].replace("{", "").replace("}", ""));
                    if (index<hashSections.length) hiddenQS = hiddenQS.replace(matches[i], hashSections[index]);
                } catch (e) { }
            }
        }
        qs += hiddenQS;
    }
    var qsSplit = qs.split("&");
    var ignoreQSItems = "";
    var currentPostDataItems = currentPostData.split("&");
    for (var x = 0; x < currentPostDataItems.length; x++) {
        if (!IsEmptyOrNull(currentPostDataItems[x])) {
            var nameVal = currentPostDataItems[x].split("=");
            if (!IsEmptyOrNull(nameVal[0])) { if (!IsEmptyOrNull(ignoreQSItems)) { ignoreQSItems += ","; } ignoreQSItems += nameVal[0]; }
        }
    }
    if (!IsEmptyOrNull(additionalIgnore)) ignoreQSItems += "," + additionalIgnore;
    var ignoreSplit = ignoreQSItems.split(","); for (var x = 0; x < qsSplit.length; x++) { var idValue = qsSplit[x].split("="); var ignore = false; for (var i = 0; i < ignoreSplit.length; i++) { if (idValue[0].toLowerCase() == ignoreSplit[i].toLowerCase()) { ignore = true; break; } } if (!ignore) newQS += "&" + qsSplit[x]; } return newQS;
}
var RebuildHash = function() {
    hashChangeEnabled = false;
    var hashArray = new Array($("*[hashIndex]").length);
    $("*[hashIndex]").each(function (e) {
        switch ($(this).prop('tagName').toUpperCase()) {
            case "SELECT":
                hashArray[$(this).attr("hashIndex")] = $(this).children(":selected").text();
                break;
            default:
                break;
        }
    });
    var newHash = "#!/" + hashArray.join('/');
    window.location.hash = newHash;
}
//MAY NOT NEED
var UpdateUnpublishedURLs = function () {
    if (getQuerystring("version") == "unpublished") {
        $("a").each(function (e) {
            var href = $(this).attr("href");
            if (href.indexOf("version=") == -1) {
                if (href.indexOf("?") > -1) {
                    href += "&version=unpublished";
                } else {
                    href += "?version=unpublished";
                }
                $(this).attr("href", href);
            }
        });
    }
}
$(document).ready(function () {
    //Check if CompatibilityMode
    if (inCompatibilityMode()) {
        $("body").append("<div class='IECompatibilityMode' title='Click to hide'><div class='MessageBox Warning'><div class='MessageBoxText'>Internet Explorer is set to compatibility mode. Some features of K2.com may not function fully in compatibility mode.</div></div></div>");
        $("body").on("click", ".IECompatibilityMode", function (e) {
            $(this).hide();
        });
    }
    //Add Language Options If Needed
    $("._LanguageOptions").each(function (e) {
        var currentLanguage = $("#CurrentLang").val(); if (IsEmptyOrNull(currentLanguage)) currentLanguage = currentLanguage;
        var publishedLangs = $("#PublishedLangs").val(); if (IsEmptyOrNull(publishedLangs)) publishedLangs = currentLanguage;
        var unpublishedLangs = $("#UnPublishedLangs").val();
        var langCookieVal = GetCookie("K2LangPref");
        var langCookieArray = langCookieVal.split('&');
        var browserLang = ""; var langPref = "";
        for (var x = 0; x < langCookieArray.length; x++) {
            var langCookieKeyValue = langCookieArray[x].split('=');
            var key = langCookieKeyValue[0];
            var keyVal = langCookieKeyValue[1];
            switch (key.toLowerCase()) {
                case "browserlang":
                    browserLang = keyVal;
                    break;
                case "langpref":
                    langPref = keyVal;
                    break;
            }
        }
        var availLangCount = 1;
        try { availLangCount = langs.split(',').length; } catch (e) { availLangCount = 1; }
        //if ((langPref != currentLanguage && publishedLangs != currentLanguage) || getQuerystring("mode")=="edit") {
        if ((langPref != currentLanguage && publishedLangs != currentLanguage) || (getQuerystring("mode") == "edit" && availLangCount > 1)) {
            $(this).append("<div class='MessageBox Note row TopMargin30'><div class='_LanguageListTitle'>This page is available in the following languages:</div>" + MakeLanguagePrefLink(publishedLangs) + "</div>");
        }
        $("._LangOption").click(function (e) {
            var className = $(this).prop("class").replace("_LangOption ", "");
            var qsParamVal = "";
            var qsParamKey = "";
            var newURL = location.href;
            if (className.indexOf("_SwitchLang_") > -1) { qsParamKey = "lang"; qsParam = className.replace("_SwitchLang_", ""); }
            else if (className.indexOf("_SetPreferedLang_") > -1) { qsParamKey = "langpref"; qsParam = className.replace("_SetPreferedLang_", ""); newURL = replaceQueryString(newURL, "lang", qsParam); }
            newURL = replaceQueryString(newURL, qsParamKey, qsParam);
            location.href = newURL;
        });
    });
    function MakeLanguagePrefLink(langs) {
        var langsList = "";
        if (langs.indexOf('en') > -1) langs = "en," + langs.replace("en","").replace(",,",",");
        var langArray = langs.split(',');
        for (var x = 0; x < langArray.length; x++) {
            langsList += "<div class='_LanguageList'><span class='_LangOption _SwitchLang_" + langArray[x] + "'></span> <span class='_LangOption _SetPreferedLang_" + langArray[x] + "'></span></div>";
        }
        return langsList;
    }
    $("._EnableDisabledFields").click(function (e) {
        e.preventDefault();
        $("[allowenable='true']").removeAttr('disabled');
        $(this).hide();
    });
    $.each($("div[matchheight], section[matchheight], iframe[matchheight]"), function (e) {
        $(this).height($($(this).attr("matchheight")).height());
    });

    //Adjust H1 font size to fit.
    var initialHeaderfontSize = "";
    $(".page-header").find("h1").each(function (e) {
        var h1Width = $(this).width();
        var parentWidth = $(this).parents("div").width();
        if (parentWidth < h1Width) {
            var ratio = parentWidth / h1Width;
            var initialHeaderfontSize = $(this).css('font-size').replace("px", "");
            var newFontSize = (initialHeaderfontSize * ratio) - 6;
            $(this).css('font-size', newFontSize + "px");
        }
    });
    if ($('.hide-for-small:visible').length <= 0) {
        $("body").addClass('is-mobile');
    } else { $("body").removeClass('is-mobile'); }

    $(window).resize(function (e) {
        if (!k2.helpers.is_mobile()) {
            $.each($("div[matchheight], section[matchheight], iframe[matchheight]"), function (e) {
                $(this).height($($(this).attr("matchheight")).height());
            });
        }
        $(".page-header").find("h1").each(function (e) {
            var h1Width = $(this).width();
            var parentWidth = $(this).parents("div").width();
            if (parentWidth < h1Width) {
                var ratio = parentWidth / h1Width;
                var newFontSize = (initialHeaderfontSize * ratio) - 6;
                $(this).css('font-size', newFontSize + "px");
            }
        });
        if ($('.hide-for-small:visible').length <= 0) {
            $("body").addClass('is-mobile');
        } else { $("body").removeClass('is-mobile'); }

        //video popup Resizing

        var videoWindow = $("#VideoPopup");
        if (videoWindow.is(":visible")) {
            var videoW = videoWindow.width(); var videoH = videoWindow.height();
            var maxW = 1350;
            var maxH = 790;
            var windowW = $(window).width()-10; var windowH = $(window).height()-10;
            var ratio = videoW / videoH;
            var updateVideoWindow = false;
            if (windowW > maxW) windowW = maxW;
            if (windowH > maxH) windowH = maxH;
            var scale = 1.0;
            while (videoH > windowH || videoW > windowW || videoH < maxH || videoW < maxW) {
                scale = scale - .05;
                videoH = maxH * scale;
                videoW = maxW * scale;
                if ((videoH >= maxH && videoW >= maxW) && (videoH < windowH && videoW < windowW)) break;
                if (videoH < windowH && videoW < windowW) break;
                if (videoW < 250 || videoH < 187.5) break;
            }

            //videoW = windowW - 10; videoH = videoW / ratio;
            ////is Video Height small enough to fit?
            //if (videoH > windowH - 10) {
            //    videoH = windowH - 10; videoW = videoH * ratio;
            //    // is Video Width small enough to fit?
            //    if (videoW > windowW - 10) {

            //    }
            //}

            $("#VideoPopup").width(videoW).height(videoH);
            $("#VideoPopup").children("div:first").width(videoW - 30).height(videoH - 30);
            $("#VideoPopup").centerMe();
        }
    });
    //var termsChanged = GetCookie("K2TermsChanged");
    //if (termsChanged == "true") {
    //    var url = "/forms/form_termsofuse.xml";
    //    var targetClass = "K2V5DefaultPopup";
    //    var fullScreen = false;
    //    var addRoundCorners = false;
    //    try {
    //        jQuery("#jqmContainers").append(GetPopupWindow("TermsOfUseForm", targetClass));
    //        jQuery("#TermsOfUseForm").jqm({ onHide: closeAndKill, ajax: url, ajaxText: "<img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/>", ajaxMethod: "json", addRoundCorners: addRoundCorners, fullscreen: fullScreen, overlay: 92, modal: true, innerWidthOffset: 40, innerHeightOffset: 40, target: '#TermsOfUseForm_Body', onLoad: SetupFormPreventReturn });
    //        jQuery("#TermsOfUseForm").jqmShow();
    //    } catch (e) { alert(e.message); }


    //    //jQuery("#jqmContainers").append(GetPopupWindow("TermsOfUserForm", 'RoundCornersPopupNew'));
    //    //jQuery("#TermsOfUserForm").jqm({ onHide: closeAndKill, ajax: url, ajaxText: "<img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>", ajaxMethod: "json", addRoundCorners: true, overlay: 92, modal: true, innerWidthOffset: 40, innerHeightOffset: 40, target: '#TermsOfUserForm_Body', onLoad: SetupForm }); jQuery("#TermsOfUserForm").jqmShow();
    //}
    var loadFormCheck = getQuerystring("showform", "");
    if (!IsEmptyOrNull(loadFormCheck)) {
        var url = "/forms/form_" + loadFormCheck + ".xml";
        jQuery("#jqmContainers").append(GetPopupWindow("InlineForm", 'K2V5DefaultPopup'));
        jQuery("#InlineForm").jqm({ onHide: closeAndKill, ajax: url, ajaxText: "<img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/>", ajaxMethod: "json", addRoundCorners: true, overlay: 65, modal: false, innerWidthOffset: 40, innerHeightOffset: 40, target: '#InlineForm_Body', onLoad: SetupForm });
        jQuery("#InlineForm").jqmShow();
    }
    var trackPageCheck = getQuerystring("Source", "");
    if (!IsEmptyOrNull(trackPageCheck)) {
        var user = _userName || "Not logged in";
        TrackGoogleEvent(trackPageCheck + ' Link', location.href, user);
        var postData = "&LogToEloqua=SocialMediaTracking&elqCustomerGUID=" + GetCookie("EloquaCustID") + "&Source=" + trackPageCheck + "&Location=" + window.location + "&UserName=" + user;
        try { postData += "&publicID=" + _publicid; } catch (e) { }
        postData += "&ReferringPage=" + document.referrer;
        $.post("/forms/submit.xml?z=" + Math.random(), postData,
                function (data) { }
            , "json");
    }
});

var hashChangeEnabled = true;
$(window).on('hashchange', function (e) {
    if (hashChangeEnabled) {
        //$("#Body_richtext_Title_Title").append("<div>hashchange -- Enabled</div>");
        if (window.location.hash.indexOf("#!/") > -1 || window.location.hash.indexOf("#/") > -1) {
            $("#_QSHIDDEN").val(originalHiddenQS);
            $.each(jQuery("._LinkedListControls"), function (e) {
                GenerateLinkedListControls($(this), true);
            });
            if (window.location.hash.indexOf("#!/") > -1) {
                $.each($("._ContentList"), function (e) {
                    GenerateContentList($(this));
                });
            }
        }
    } else {
        //$("#Body_richtext_Title_Title").append("<div>hashchange -- disabled</div>");
        hashChangeEnabled = true;
        //$("#Body_richtext_Title_Title").append("<div>HashChangeEnabled Set to True</div>");
    }
});
try {
    if (document.referrer.indexOf("portal.k2.com") != -1) {
        jQuery(".hide-if-portal-referrer").hide();
    }
} catch (e) { }
$.each(jQuery("._LinkedListControls"), function (e) {
    GenerateLinkedListControls($(this), false);
});

function GenerateLinkedListControls(targetSection, ignoreHashUpdate) {
    try {
        //var targetSection = $(this);
        //targetSection.html("<div class='row'><div class='columns twleve'><img src='/img/loader/K2comV5/darkbg/snake-32x32.gif' style='height:32px !important; width:32px !important;'/></div></div>");
        //targetSection.html("<div class='row'><div class='columns twleve'><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/></div></div>");
        //removed spinner completely
        //if (IsEmptyOrNull(targetSection.html())) {
        //    //targetSection.html("<div class='row'><div class='columns twleve'><img src='/img/loader/K2comV5/lightbg/arrow-32x32.gif' style='height:32px !important; width:32px !important;'/></div></div>");
        //    //targetSection.html("<div style='min-height:150px;'> </div>");
        //    //targetSection.mask("Loading Results");
        //} else {
        //    //targetSection.css({ 'position': 'relative' });
        //    //targetSection.append("<div style='position:absolute;top:0px;right:0px;'><img src='/img/loader/K2ComV5/lightbg/arrow-32x32.gif' style='height:32px !important; width:32px !important;'/></div>");
        //    //targetSection.mask("Loading Results");
        //}

        var url = targetSection.attr("target");
        if (!IsEmptyOrNull(url)) {
            url += ((url.indexOf('?') > -1) ? "&" : "?") + "z=" + Math.random();
            var action = "getlinkedlistcontrolsjson";
            if (!IsEmptyOrNull($(this).attr("action"))) action = $(this).attr("action");
            var postData = "&action=" + action + "&id=" + publicID + "&langid=" + languageID + "&col=" + targetSection.attr("col") + "&targetid=" + targetSection.attr("id");
            postData += RebuildQS(postData);
            //Need to add back the query string options that could be passed in.
            $.post(url, postData,
                function (data) {
                    if (data.length > 0) {
                        if (data[0].Error != "" && data[0].Error != null && data[0].Error != "null") {
                            targetSection.html(data[0].Error);
                        } else {
                            targetSection.html(data[0].HTML);
                            /****************LINKED LISTS******************/
                            targetSection.find("._LinkedListGroupFilterOptions").each(function (e) {
                                SetupLinkedListOptions($(this));
                            });
                            targetSection.find("._LinkedListFilterOptions").each(function (e) {
                                SetupLinkedListOptions($(this));
                            });
                            ExecuteLinkedListFilters(ignoreHashUpdate);
                            /****************END LINKED LISTS******************/

                        }
                    } else { targetSection.html("No results found"); }
                }
            , "json");
        } else { targetSection.html(""); }
    } catch (e) { }
}


$.each(jQuery("._ContentList"), function (e) {
    GenerateContentList($(this));
});

function GenerateContentList(targetSection) {
    try {
        //targetSection.html("<div class='row'><div class='columns twleve'><img src='/img/loader/K2comV5/darkbg/snake-32x32.gif' style='height:32px !important; width:32px !important;'/></div></div>");
        //targetSection.html("<div class='row'><div class='columns twleve'><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/></div></div>");
        if (IsEmptyOrNull(targetSection.html())) {
            //targetSection.html("<div class='row'><div class='columns twleve'><img src='/img/loader/K2comV5/lightbg/arrow-32x32.gif' style='height:32px !important; width:32px !important;'/></div></div>");
            targetSection.html("<div style='min-height:150px;'> </div>");
            targetSection.mask(targetSection.attr("loading_msg"));
        } else {
            //targetSection.css({ 'position': 'relative' });
            //targetSection.append("<div style='position:absolute;top:0px;right:" + targetSection.css("paddingRight") + ";'><img src='/img/loader/K2ComV5/lightbg/arrow-32x32.gif' style='height:32px !important; width:32px !important;'/></div>");
            targetSection.mask(targetSection.attr("loading_msg"));
        }
        var url = targetSection.attr("target");
        if (!IsEmptyOrNull(url)) {
            url += ((url.indexOf('?') > -1) ? "&" : "?") + "z=" + Math.random();
            var action = "getcontentlistfromrecordfield";
            if (!IsEmptyOrNull(targetSection.attr("action"))) action = targetSection.attr("action");
            var postData = "&action=" + action + "&id=" + publicID + "&langid=" + languageID + "&col=" + targetSection.attr("col") + "&targetid=" + targetSection.attr("id");
            if (!IsEmptyOrNull(targetSection.attr("file"))) postData += "&configfile=" + targetSection.attr("file");
            var linkedFilters = targetSection.attr("LinkedFilter");
            if (!IsEmptyOrNull(linkedFilters)) { postData += "&filters=" + linkedFilters.replace(/&/gi, "%26").replace(/=/gi, "%3D"); }
            postData += RebuildQS(postData);
            if (window.location.hash.indexOf("#!/") > -1) postData += "&prefilter=" + window.location.hash;
            //Need to add back the query string options that could be passed in.
            $.post(url, postData,
                function (data) {
                    if (data.length > 0) {
                        if (data[0].Error != "" && data[0].Error != null && data[0].Error != "null") {
                            targetSection.html(data[0].Error);
                        } else {
                            targetSection.html(data[0].HTML);
                            //targetSection.find(".mask").remove();
                            try {
                                var currentTotal = $("._totalResults").html();
                                var currentResults = $("._currentTotal").html();
                                if (Number(currentTotal) == -1) { jQuery("._totalResults").parents(".filters").hide(); }
                                if (currentTotal != currentResults) {
                                    jQuery("._totalResults").parent().append("<span style='cursor:pointer;padding-left:15px;text-decoration:none;font-weight:bold;' class='_FilterBoxFilterOptionsReset'>Reset Filters</span>");
                                    $("._FilterBoxFilterOptionsReset").click(function (e) {
                                        $("._FilterBoxFilterOptions").val("");
                                        GetFilterBoxChanges($(this).parent().next().find("._FilterBoxFilterOptions:first"));
                                    });
                                }

                            } catch (e) { alert(e.message); }
                            SetupFancyDD();
                            SetupLists();
                        }
                    } else { targetSection.html("No results found"); }
                }
            , "json");
        } else { targetSection.html(""); }
    } catch (e) { }
}
function SetupLinkedListOptions(obj) {
    var linkedToFilterID = obj.attr("linkedTo");
    var linkedFromFilterID = obj.attr("id");
    try {
        var newLabel = obj.find(":selected").text();
        $(".label_" + linkedFromFilterID).html(newLabel);
        var newTitle="";
        $("._newttitle").each(function(e) {if(!IsEmptyOrNull(newTitle)){newTitle+=" ";} newTitle += $(this).html();});
        document.title = newTitle;
    } catch (e) { }
    if (!obj.is(":visible")) return;
    if (!IsEmptyOrNull(linkedToFilterID)) {
        var linkedFromFilterValue = obj.val();
        //Clear drop down
        $("#" + linkedToFilterID).empty();
        //get total options from master matching linked from value.
        var visibleCount = $("#" + linkedToFilterID + "_master").find("option[" + linkedFromFilterID + "='" + linkedFromFilterValue + "']").length;
        //add matching values to visible drop down
        $("#" + linkedToFilterID).append($("#" + linkedToFilterID + "_master").find("option[" + linkedFromFilterID + "='" + linkedFromFilterValue + "']").clone());
        if (visibleCount <= 0) { $("#" + linkedToFilterID).attr("disabled", "disabled"); } else { $("#" + linkedToFilterID).removeAttr("disabled"); }

        try {
            var newLabel = $("#" + linkedToFilterID).find(":selected").text();
            $(".label_" + linkedToFilterID).html(newLabel);
            var newTitle = "";
            $("._newttitle").each(function (e) { if (!IsEmptyOrNull(newTitle)) { newTitle += " "; } newTitle += $(this).html(); });
            document.title = newTitle;
        } catch (e) { }

    }
    obj.off("change").on("change", function (e) {
        SetupLinkedListOptions($(this));
        //$("#Body_richtext_Title_Title").append("<div>Dropdown on change</div>");
        ExecuteLinkedListFilters(false);
    });

}
function ExecuteLinkedListFilters(ignoreUpdateHash) {
    if (ignoreUpdateHash == undefined) ignoreUpdateHash = false;
    var filterParams = "";
    var groupFilterParams = "";
    var newHash = "";
    $("._LinkedListFilterGroup").each(function () {
        var parentGroup = $(this);
        var targetGroup = parentGroup.attr("targetGroup");
        $("#" + targetGroup).prop("selectedIndex", -1);
        var groupFilter = "";
        parentGroup.find("._LinkedListGroupFilterOptions").each(function (e) {
            if (!IsEmptyOrNull(groupFilter)) groupFilter += " ";
            //alert($(this).attr("id") + " -- " + $(this).find(":selected").text() + " -- " + $(this).find(":selected").val());
            if ($(this).attr("useText").toLowerCase() == "true") { groupFilter += $(this).children(":selected").text(); } else { groupFilter += $(this).children(":selected").val(); }
            if (IsEmptyOrNull(newHash)) newHash += "!";
            newHash += "/" + $(this).children(":selected").text();
        });
        groupFilter = groupFilter.replace(/ undefined/gi, "");
        //Find the item matching the targetGroupd drop down...
        $("#" + targetGroup + " option").each(function (e) {
            if ($(this).html() == groupFilter) { $(this).attr("selected", "selected"); }
        });
        //$("#" + targetGroup + " option:contains(" + groupFilter + ")").attr("selected", "selected");
        if ($("#" + targetGroup).prop("selectedIndex") != -1) { groupFilterParams += "&" + $("#" + targetGroup).attr("internalField") + "=" + $("#" + targetGroup).val(); }
    });

    $("._LinkedListFilterOptions").each(function () {
        if ($(this).prop("selectedIndex") != -1) filterParams += "&" + $(this).attr("internalField") + "=" + $(this).val();
    });

    TrackAll("Linked Lists", location.href.trim(location.href.indexOf('#')) , newHash.replace("!", ""), "");

    if (!IsEmptyOrNull(filterParams)) {
        if (!ignoreUpdateHash) { /*$("#Body_richtext_Title_Title").append("<div>HashChangeEnabled Set to False</div>"); */hashChangeEnabled = false; RebuildHash();}
        $("._LinkedList").each(function (e) {
            $(this).attr("LinkedFilter", filterParams);
            //$(this).html("<div class='row'><div class='columns twleve'><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/></div></div>");
            GenerateContentList($(this));
        });
    }
}

function GetContentList(url, containerID) { var popupId = containerID || "ContentList"; jQuery("#jqmContainers").append(GetPopupWindow(popupId, "K2V5DefaultAdminPopup")); jQuery("#" + popupId).jqm({ onHide: closeAndKill, ajax: url, ajaxText: "<img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>", ajaxMethod: "json", overlay: 65, modal: false, innerWidthOffset: 40, innerHeightOffset: 40, target: '#' + popupId + '_Body', onLoad: SetupLists }); jQuery("#" + popupId + "").jqmShow(); }
$("._ContentList").on("swipeleft", ".pager", function (event, data) {
    event.stopImmediatePropagation();
    $(this).find(".page.active").next().click();
});
$("._ContentList").on("swiperight", ".pager", function (event, data) {
    event.stopImmediatePropagation();
    $(this).find(".page.active").prev().click();
});
$("._ContentList").on("click", "._ContentListPaging", function (e) {
    e.preventDefault();
    if (!IsEmptyOrNull($(this).parents(".jqmWindow").attr("id"))) {
        GetContentList($(this).attr("target"), $(this).parents(".jqmWindow").attr("id"));
    } else {
        var targetid = $(this).attr("targetid");
        if (!IsEmptyOrNull(targetid)) {
            var targetURL = $(this).attr("target").split("?");
            var targetSection = $("#" + targetid);
            $('html, body').animate({ scrollTop: targetSection.offset().top - 75 }, 1000);
            if (targetSection.find("._LoaderPlaceHolder").html() != undefined) {
                targetSection.mask("Loading Results");
            } else {
                targetSection.mask("Loading Results");
            }
            var url = targetURL[0];
            if (!IsEmptyOrNull(url)) {
                url += ((url.indexOf('?') > -1) ? "&" : "?") + "z=" + Math.random();
                var postData = targetURL[1];
                postData += RebuildQS(postData, "DefaultFilters");
                $.post(url, postData,
            function (data) {
                if (data.length > 0) {
                    if (data[0].Error != "" && data[0].Error != null && data[0].Error != "null") {
                        targetSection.html(data[0].Error);
                    } else {
                        targetSection.html(data[0].HTML);
                        SetupLists();
                    }
                } else { targetSection.html("No results found"); }
                try { targetSection.find("._LoaderPlaceHolder").html(""); } catch (e) { }
            }
        , "json");
            }
        }
    }
});

//jQuery('._FileControl, a[href*="ile.ashx"], a[href*="/files/"]').live("click", function (e) {
$("body").on("click", '._FileControl, a[href*="ile.ashx"], a[href*="/files/"]', function (e) { ExecuteFileControl(e, $(this)); });
//$('a[href*="ile.ashx"], a[href*="/files/"]').on("click", function (e) { ExecuteFileControl(e, $(this)); });
function ExecuteFileControl(e, obj) {
    if (getQuerystring("mode") != "edit") {
        if (obj.attr("href").indexOf("dltoken") == -1) {
            e.preventDefault();
            var adWordsURL = "";
            try { adWordsURL = obj.attr("adwordsurl"); } catch (e) { adWordsURL = ""; }
            var adWordsContent = "";
            if (!IsEmptyOrNull(adWordsURL)) {
                adWordsContent = "<img height='1' width='1' style='border-style:none;' alt='' src='" + adWordsURL + "'/>";
                $("body").append(adWordsContent);
            }
            var target = obj.attr("href");
            //TrackGooglePage(target);
            //TrackAll("Download Click", target, "", target);
            var internalID = obj.attr("internal_ID");
            if (internalID != "" && internalID != undefined) target += "/" + internalID;
            var postData = "";
            download(target);
        } else { jQuery("#AjaxMessage").jqmHide(); }
    }
}
//What is this?
//$(".StopLink").live("click", function (e) { e.preventDefault(); });
$(".PageContainer").on("click", ".StopLink", function (e) { e.preventDefault(); });


var persistentQS = "";
for (var x = 0; x < persistentQSItems.length; x++) {
    var qsValue = getQuerystring(persistentQSItems[x], "");
    if (!IsEmptyOrNull(qsValue)) { if (!IsEmptyOrNull(persistentQS)) { persistentQS += "&"; } persistentQS += persistentQSItems[x] + "=" + qsValue; }
}
$('a').each(function () {
    try {
        if (!IsEmptyOrNull(persistentQS) && !$(this).hasClass("_IgnorePQS")) {
            var href = $(this).attr('href');
            if (href.toLowerCase().indexOf("javascript:") == -1 && href.toLowerCase().indexOf("#") == -1 && href.toLowerCase().indexOf("/files/") == -1) {
                href += (href.match(/\?/gi) ? '&' : '?') + persistentQS;
                $(this).attr('href', href);
            }
        }
    } catch (e) { }
});
var hash = window.location.hash;
if (!IsEmptyOrNull(hash)) {
    var hashParts = hash.split("=");
    if (hashParts[0].toLowerCase() == "#tracksearch") {
        window.location.hash = "";
        TrackK2Com("Search", "Result Clicked", hashParts[1], location.href.replace("#",""));
    }
}

/************************K2ComV5_Mike***************************************/
try {
    jQuery("._AccountLinks").css("display", "block");
    switch (_userStatus) {
        case "offline":
            jQuery("._RegisterLink").parent().css("display", "none");
            jQuery("._LogoutLink").parent().css("display", "none");
            jQuery("._LoginLink").attr("href") = "/login";
            jQuery("._LoginLink").html("Log In currently disabled");
            jQuery("._LoginLink2").attr("href") = "/login";
            jQuery("._LoginLink2").html("Login disabled");
            break;
        case "_RegisteredUser":
        case "_ValidatedUser":
            jQuery("._RegisterLink").parent().css("display", "none");
            jQuery("._LoginLink").attr("href", loginServer + "/profile");
            jQuery("._LoginLink").attr("target", "/forms/form_myaccount.xml");
            jQuery("._LoginLink").html(_firstName + "'s Account");
            jQuery("._LoginLink2").attr("href", loginServer + "/profile");
            jQuery("._LoginLink2").html("My Account");
            jQuery("._LoginLink2").attr("target", "/forms/form_myaccount.xml");
            jQuery("._LogoutLink").attr("href", loginServer + "/logout");
            break;
        default:
            jQuery("._RegisterLink").parent().css("display", "inline-block");
            jQuery("._RegisterLink").attr("href", loginServer + "/register");
            jQuery("._RegisterLink").attr("target", "/forms/form_register.xml");
            jQuery("._LoginLink").attr("href", loginServer);
            jQuery("._LoginLink").attr("target", "/forms/form_signin.xml");
            jQuery("._LoginLink").html("Log In");
            jQuery("._LoginLink2").attr("href", loginServer);
            jQuery("._LoginLink2").html("Log In");
            jQuery("._LoginLink2").attr("target", "/forms/form_signin.xml");
            jQuery("._LogoutLink").parent().css("display", "none");
            break;
    }
} catch (Exception) { }


//Global Class Action Functions
jQuery("._FBLike").each(function (e) {
    var url = encodeURIComponent(location.href) + "&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=verdana&amp;height=21";
    var fbLikeIFrame = "<iframe src=\"http://www.facebook.com/plugins/like.php?href=" + url + "\" frameborder=\"0\" style=\"border: none; overflow: hidden; width: 100px; height: 21px;\"></iframe>";
    $(this).html(fbLikeIFrame);
});
var tweetCodeCount = 0;
jQuery("._Tweet").each(function (e) {
    var hashTag = $(this).attr("target");
    if (!IsEmptyOrNull(hashTag)) { hashTag = "data-hashtags=\"" + hashTag + "\""; } else { hashTag = ""; }
    var tweetCode = "<a class=\"twitter-share-button\" data-via=\"k2onk2\" " + hashTag + " href=\"https://twitter.com/share\">Tweet</a>";
    if (tweetCodeCount == 0) { tweetCode += '<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>'; tweetCodeCount++; }
    $(this).html(tweetCode);
});

jQuery("._CurrentYear").each(function (e) { var d = new Date(); $(this).html(d.getFullYear()); });

jQuery("._ExpandImage").css({ 'cursor': 'pointer' });
jQuery("._ExpandImage").each(function (e) {
    var fullimg = $(this).attr("target");
    if (IsEmptyOrNull(fullimg)) fullimg = $(this).attr("src").replace("_thumbnail", "");
    var t = $(this).position().top - 5;
    var l = $(this).position().left;
    $(this).before("<div class='_ExpandButton' target='" + fullimg + "' style='background:url(/img/Shell/expand.png); background-repeat:no-repeat;background-position:left top; padding:0px;margin:0px;width:20px;height:20px;cursor:pointer;position:absolute;left:" + l + "px;top:" + t + "px;'>&nbsp;</div>");
    $(this).css("padding-left", "5px");
});
jQuery("._ExpandImageTopRight").css({ 'cursor': 'pointer' });
jQuery("._ExpandImageTopRight").each(function (e) {
    var fullimg = $(this).attr("target");
    var obj = $(this);
    if (IsEmptyOrNull(fullimg)) fullimg = $(this).attr("src").replace("_thumbnail", "");
    $(this).parent().waitForImages(function () {
        var t = obj.position().top - 10;
        var l = obj.width() - 10;
        obj.before("<div class='_ExpandButton' target='" + fullimg + "' style='background:url(/img/Shell/open-image.png); background-repeat:no-repeat;background-position:left top; padding:0px;margin:0px;width:24px;height:24px;cursor:pointer;position:absolute;left:" + l + "px;top:" + t + "px;'>&nbsp;</div>");
        obj.css("padding-right", "5px");
    });

});
jQuery("._ExpandImage2").css({ 'cursor': 'pointer' });
//jQuery("._ExpandImage, ._ExpandButton").live("click", function (e) {
$(".PageContainer").on("click", "._ExpandImage, ._ExpandButton", function (e) {
    var fullimg = $(this).attr("target");
    if (IsEmptyOrNull(fullimg)) fullimg = $(this).attr("src").replace("_thumbnail", "");
    jQuery("#jqmContainers").append(GetPopupWindow("ImagePopup"));
    jQuery("#ImagePopup").jqm({ onHide: closeAndKill, image: fullimg, ajax: "", ajaxText: "", overlay: 65, modal: false, innerWidthOffset: 40, innerHeightOffset: 40, target: '#ImagePopup_Body' });
    jQuery("#ImagePopup").jqmShow();
    try { mainCarousel.stop(); } catch (e) { }
});
//jQuery("._ExpandImage2").live("click", function (e) {
$(".PageContainer").on("click", "._ExpandImage2", function (e) {
    disable_scroll();
    var fullimg = $(this).attr("target");
    if (IsEmptyOrNull(fullimg)) fullimg = $(this).attr("src").replace("_thumbnail", "");
    var newImg = new Image();
    newImg.onload = function () {
        var newW = newImg.width;
        var newH = newImg.height;
        jQuery("#jqmContainers").append(GetPopupWindow("VideoPopup", "K2V5VideoPopup"));
        jQuery("#VideoPopup").jqm({ onHide: closeAndKill, html: "<div class='row'><div class='columns twelve' style='text-align:center;'><img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/></div></div>", overlay: 65, addRoundCorners: false, modal: false, width: newW, height: newH, keepWide: false, innerWidthOffset: 0, innerHeightOffset: 0, target: '#VideoPopup_Body' });
        jQuery("#VideoPopup").jqmShow();
        //alert(newW + ", " + newH + " -- " + $("#VideoPopup_Body").width() + ", " + $("#VideoPopup_Body").height());
        var sourceID = jQuery("#VideoPopup_Body").children(".PopupBody");
        sourceID.html("<img id='popup_image' src='" + fullimg + "' style='width:100%;margin-left:0px !important' alt='image'/>");
        if ($("#popup_image").height() > $("#VideoPopup_Body").height()) { $("#popup_image").height($("#VideoPopup_Body").height()); }
        sourceID.css({ "overflow": "hidden" });
        jQuery("#VideoPopup").children().css({ "background": "#ffffff" });
        jQuery("#VideoPopup_Body").height($("#popup_image").height() + 40);
        jQuery("#VideoPopup_Body").width($("#popup_image").width() + 40);
        //alert($("#popup_image").width() + ", " + $("#popup_image").height() + " -- " + newW + ", " + newH + " -- " + $("#VideoPopup_Body").width() + ", " + $("#VideoPopup_Body").height());
    }
    newImg.src = fullimg;
})



//Global Click Functions
//jQuery(".EmbedYouTube").live("click", function () {
$(".PageContainer").on("click", ".EmbedYouTube", function () {
    var div = this.parentNode;
    var adWordsURL = ""; var videoTitle = "unknown";
    try { adWordsURL = $(this).attr("adwordsurl"); } catch (e) { adWordsURL = ""; }
    try { videoTitle = $(this).attr("videotitle"); } catch (e) { videoTitle = "unknown"; }
    var adwordsEmbed = "";
    var videoURL = "/videos/" + this.id + "/getyoutube";
    if (!IsEmptyOrNull($(this).attr("target"))) videoURL = $(this).attr("target");
    TrackAll("Video View", GetRelativeVideoURL(videoURL), videoTitle, GetRelativeVideoURL(videoURL));
    if (adWordsURL != "") adwordsEmbed = "<img height='1' width='1' style='border-style:none;' alt='' src='" + adWordsURL + "'/>";
    $(div).replaceWith("<iframe width='" + div.style.width + "' height='" + div.style.height + "' src='http://www.youtube.com/embed/" + this.id + "?rel=0&autoplay=1' frameborder='0' allowfullscreen></iframe>" + adwordsEmbed); return false;
});

jQuery("._ExpandVideo").css({ 'cursor': 'pointer' });
//jQuery("._ExpandVideo").live("click", function (e) {
$(".PageContainer").on("click", "._ExpandVideo", function (e) {
    e.preventDefault();
    var fullurl = $(this).attr("href"); var originalURL = $(this).attr("href");
    var popupURL = "";
    if (!IsEmptyOrNull($(this).attr("popuptarget"))) fullurl = $(this).attr("popuptarget");
    var adWordsURL = "";
    try { adWordsURL = $(this).attr("adwordsurl"); } catch (e) { adWordsURL = ""; }
    try { enable_scroll(); } catch (e) { }
    var dims = "";
    var vHeight = 0; var vWidth = 0;
    vHeight = $(this).attr("vheight");
    vWidth = $(this).attr("vwidth");
    if (Number(vHeight) > 0 && Number(vWidth) > 0) {
        dims = "&height=" + vHeight + "&width=" + vWidth;
    } else { dims = "&height=480&width=854"; vHeight = 760; vWidth = 1320; }
    //Temp fix -- not sure what I changed, but video popup was sizing too large initially.  
    dims = "&height=480&width=854"; vHeight = 720; vWidth = 1280;

    jQuery("#jqmContainers").append(GetPopupWindow("VideoPopup", "K2V5VideoPopup"));
    //jQuery("#VideoPopup").jqm({ onHide: closeAndKill, ajax: GetRelativeVideoURL(fullurl) + "/getjson?autoplay=true" + dims, ajaxText: "<img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>", ajaxMethod: "json", overlay: 65, addRoundCorners: false, modal: false, width: vWidth, height: vHeight, innerWidthOffset: 40, innerHeightOffset: 40, target: '#VideoPopup_Body' });
    jQuery("#VideoPopup").jqm({ onHide: closeAndKill, html: "<div class='row'><div class='columns twelve' style='text-align:center;'><img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/></div></div>", overlay: 65, addRoundCorners: false, modal: false, width: vWidth, height: vHeight, keepWide: true, innerWidthOffset: 40, innerHeightOffset: 40, target: '#VideoPopup_Body' });
    if (!isMobile()) jQuery("#VideoPopup").jqmShow();
    var sourceID = jQuery("#VideoPopup_Body").children(".PopupBody");
    dims = "&height=" + sourceID.height() + "&width=" + sourceID.width();
    var postData = "";
    var h = sourceID.height();// - 40;
    var w = sourceID.width();// - 40;
    $.post(GetRelativeVideoURL(fullurl) + "/getjson?autoplay=true" + dims, postData,
            function (data) {
                if (data.length > 0) {
                    if (!IsEmptyOrNull(data[0].Error)) {
                        sourceID.html(data[0].Error);
                        jQuery("#VideoPopup").css({ "background": "#ffffff" });
                    } else {
                        var embedCode = data[0].HTML;
                        if (!isMobile()) {
                            embedCode = embedCode.replace("GETWIDTH", w).replace("GETHEIGHT", h);
                            if (embedCode.indexOf("vidyard_") > -1) sourceID.attr("id", "vidyard_" + data[0].VideoID);
                            sourceID.html(embedCode);
                            sourceID.css({ "overflow": "hidden" });
                            jQuery("#VideoPopup").children().css({ "background": "#ffffff" });
                            TrackAll("Video View", GetRelativeVideoURL(fullurl), data[0].Title, GetRelativeVideoURL(fullurl));
                        } else {
                            TrackAll("Video View", GetRelativeVideoURL(fullurl), data[0].Title, GetRelativeVideoURL(fullurl));
                            try { jQuery("#VideoPopup").jqmHide(); } catch (e) {  }
                            if (embedCode.indexOf("vidyard_") > -1) {
                                location.href = "//play.vidyard.com/" + data[0].VideoID + ".html?autoplay=1";
                            } else if (embedCode.indexOf("viddler") > -1) {
                                location.href = "//www.viddler.com/embed/" + data[0].VideoID + "/?f=1&autoplay=1&player=simple";
                            } else {
                                location.href = "//www.youtube.com/embed/" + data[0].VideoID + "?autoplay=1";
                            }
                            //location.href = fullurl;
                        }
                    }
                } else { sourceID.html("Could not load video"); }
            }
            , "json");
    if (!IsEmptyOrNull(adWordsURL)) { $("#VideoPopup_Body").append("<img height='1' width='1' style='border-style:none;' alt='' src='" + adWordsURL + "'/>"); }
    try { mainCarousel.stop(); } catch (e) { }
});

jQuery("._PopupHTML, ._PopupRoundHTML").css({ 'cursor': 'pointer' });
//jQuery("._PopupHTML,._PopupRoundHTML").live("click", function (e) {
$(".PageContainer").on("click", "._PopupHTML,._PopupRoundHTML", function (e) {
    e.preventDefault();
    var h = $(this).attr("pheight") || 500;
    var w = $(this).attr("pwidth") || 975;
    var pID = $(this).attr("target");
    var pHTML = $("#" + pID).html();
    var cssName = $(this).attr("class");
    if (cssName.indexOf("_PopupRoundHTML") > -1) {
        jQuery("#jqmContainers").append(GetPopupWindow("HTMLPopup"));
    } else {
        jQuery("#jqmContainers").append("<div class='jqmWindow' style='background:transparent;' id='HTMLPopup'><div id='HTMLPopup_Body' style='background:transparent;cursor:pointer;' class='jqmClose'></div></div>");
    }
    jQuery("#HTMLPopup").jqm({ onHide: closeAndKill, html: pHTML, ajaxText: "<img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/>", ajaxMethod: "json", addRoundCorners: false, htmlBackgroundColor: 'transparent', overlay: 65, modal: false, width: w, height: h, innerWidthOffset: 40, innerHeightOffset: 40, target: '#HTMLPopup_Body' });
    jQuery("#HTMLPopup").jqmShow();
});

//Search Functions
jQuery("._SiteSearch").focus(function (e) {
    $(this).select();
});
jQuery("._SiteSearch").keyup(function (e) {
    if (e.keyCode == 13) {
        var searchval = CleanSearchTerms($(this).val());
        //var searchScope = ""; try { searchScope = $("#"+ this.attr("id") + "_scopes").val(); } catch (e) { }
        //var newURL = "/search?filters=%26search%3D" + searchval;
        var newURL = "/search?q=" + searchval;
        //if (!IsEmptyOrNull(searchScope)) newURL += "&initialscope=" + searchScope
        var searchFilters = ""; try { searchFilters = $("#" + $(this).attr("id") + "_filters").val(); } catch (e) { }
        if (!IsEmptyOrNull(searchFilters)) newURL += "&f=" + searchFilters;
        location.href = newURL;
    }
});
jQuery("._SiteSearchButton").click(function (e) {
    var buttonID = $(this).attr("id");
    var searchBoxID = buttonID.replace("_button", "");
    var scopeBoxID = buttonID.replace("_button", "_scopes");
    var filterBoxID = buttonID.replace("_button", "_filters");
    var searchval = CleanSearchTerms($("#" + searchBoxID).val());
    var searchScope = ""; try { searchScope = $("#" + scopeBoxID).val(); } catch (e) { }
    var searchFilters = ""; try { searchFilters = $("#" + filterBoxID).val(); } catch (e) { }
    //var newURL = "/search?filters=%26search%3D" + searchval;
    var newURL = "/search?q=" + searchval;
    if (!IsEmptyOrNull(searchScope)) newURL += "&initialscope=" + searchScope
    if (!IsEmptyOrNull(searchFilters)) newURL += "&f=" + searchFilters;
    location.href = newURL;
});
function CleanURL(url, removeQSItems) {
    //TODO -- write this function
    return url;
}
function CleanSearchTerms(q) {
    var regExp = new RegExp(/[&+]/gi);
    var terms = q.replace(regExp, "AND");
    return terms;
}
jQuery("._RevealClose").click(function (e) { $(this).trigger('reveal:close'); });

$('img#wheel-image').each(function (e) {
    $(this).rwdImageMaps();
});
$("div.content-cta-link a, div.content-cta-green-link a").click(function (e) {
    if (IsEmptyOrNull($(this).attr("class")) && k2.helpers.is_ie()) {
        if ($(this).attr("href") != "#" && $(this).attr("href") != "") {
            var newWin = false; try { newWin = (($(this).attr("target") == "_blank") ? true : false); } catch (ex) { newWin = false; }
            if (newWin) { window.open($(this).attr("href")); } else { location.href = $(this).attr("href"); }
        }
    }
});

jQuery(document).ready(function () {
    var hash = window.location.hash;
    if (hash.indexOf("#click") > -1) { try { $(hash.replace("click", "")).trigger("click"); } catch (e) { } }

    $("._scrollTo").each(function (e) {
        if (hash == "#" + $(this).attr("key")) {
            $('html, body').animate({ scrollTop: $(this).offset().top - 50 }, 1000);
        }
    });
    $("._AnchorScroll").click(function (e) {
        e.preventDefault();
        var key = "";
        if (!IsEmptyOrNull($(this).attr("href"))) { key = $(this).attr("href").replace("#", ""); } else { key = $(this).attr("key"); }
        var scrollToTag = $("._scrollTo[key='" + key + "']");
        $('html, body').animate({ scrollTop: scrollToTag.offset().top - 50 }, 1000);
    });
});
/****************************K2Com_V5_Forms***********************************/
function disable_scroll() { $('body').addClass('stop-scrolling'); }
function enable_scroll() { $('body').removeClass('stop-scrolling'); }
function SetupFancyDD() {
    jQuery(".FancyDD").each(function (e) {
        $(this).show();
        $("#" + $(this).attr("id").replace("_FancyDD", "")).hide();
    });
}

//jQuery(".FancyDD .selector, .FancyDD .current").live("click", function (e) {
$("body").on("click", ".FancyDD .selector, .FancyDD .current", function (e) {
    e.preventDefault();
    var isOpen = $(this).parent().hasClass("open");
    //Close any open drop downs
    $(".FancyDD").removeClass("open");
    //open selected drop down
    if (!isOpen) $(this).parent().addClass("open");
});
//jQuery(".FancyDD ul li").live("click", function (e) {
$("body").on("click", ".FancyDD ul li", function (e) {
    //alert("TESTING!");
    e.preventDefault();
    var realDD = $("#" + $(this).parent().parent().attr("id").replace("_FancyDD", ""));
    realDD.val($(this).attr("val"));
    $(this).parent().parent().children("a[class='current']").html($(this).html());
    $(this).parent().parent().removeClass("open");
    if (realDD.hasClass("_FormInputDropDownOnChange")) {
        SetupDropDown(realDD);
    }
    GetFilterBoxChanges(realDD);
});

//jQuery("._CheckBoxDDTitle").live("click", function (e) {
$("body").on("click", "._CheckBoxDDTitle", function(e) {
    jQuery(this).next().toggleClass("Off");
    jQuery(this).toggleClass("_CheckBoxDDTitleOpen");
});

//jQuery("input, textarea").live("focus", function (e) {
$("body").on("focus", "input, textarea", function (e) {
    try { if (jQuery(this).val() == jQuery(this).attr("EmptyValue")) jQuery(this).val(""); } catch (e) { }
});

//jQuery("input, textarea").live("blur", function (e) {
$("body").on("blur", "input, textarea", function (e) {
    try {
        if (jQuery(this).val() == "") {
            $(this).addClass("FormFieldRequired");
            $(this).removeClass("FormFieldCompleted");
            if (jQuery(this).attr("addLabel") == "True") jQuery(this).val(jQuery(this).attr("EmptyValue"));
        }
    } catch (e) { }
});
//jQuery(".FormFieldRequired, .FormFieldCompleted").live("blur", function (e) {
$("body").on("blur", ".FormFieldRequired, .FormFieldCompleted", function (e) {
    if ($(this).val() == "" || $(this).val() == $(this).attr("EmptyValue") || $(this).val() == "(" + $(this).attr("EmptyValue") + ")") {
        $(this).addClass("FormFieldRequired");
        $(this).removeClass("FormFieldCompleted");
    } else {
        $(this).removeClass("FormFieldRequired");
        $(this).addClass("FormFieldCompleted");
    }

});

//jQuery(".FormButton").live("click", function (e) {
$("body").on("click", ".FormButton", function (e) {
    e.preventDefault();
    $("input[triggeredsubmit='true']").attr("triggeredsubmit", "false");
    $(this).attr("triggeredsubmit", "true");
    if ($(this).val() != "") {
        $(this).parents("form").attr("action", $(this).val())
    }
    $(this).submit();
    //$("._DynamicForm").submit();
});
function StartSpinner() {
    var img = $('._Spinner');
    var dir = 'up';
    function rotate(i) {
        //linear, swing
        s = 1000;
        img.animate({ rotate: '360' }, s, 'swing', function () {
            switch (dir) {
                case "down":
                    i = i - 10;
                    if (i < 70) dir = "up";
                    break;
                case "up":
                    i = i + 10;
                    if (i >= 100) dir = "down";
                    break;
            }
            rotate(i);
        });
    }
    rotate(0);
}
function UpdateDropDownField(postpath, postData, controlID) {
    $.post(postpath, postData,
			function (data) {
			    if (data.length > 0) {
			        if (data[0].Error != "" && data[0].Error != null && data[0].Error != "null") {
			            //jQuery("#AjaxMessage_Body").html();
			            jQuery("#jqmContainers").append(GetPopupWindow("AjaxMessage"));
			            jQuery("#AjaxMessage").jqm({ onHide: closeAndKill, html: "<div id='AjaxMessage_Contents'>" + data[0].Error + "</div>", ajax: "", ajaxText: "", overlay: 65, modal: false, width: 400, height: 400, innerWidthOffset: 40, innerHeightOffset: 40, target: '#AjaxMessage_Body' });
			            jQuery("#AjaxMessage").jqmShow();
			            var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
			            jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
			        } else {
			            jQuery("#" + controlID).children("option").remove();
			            var selectedValue = jQuery("#" + controlID).attr("defaultValue");
			            var fancyDD = $("#" + controlID + "_FancyDD");
			            var fancyDDUL = fancyDD.find("ul");
			            if (fancyDD.length > 0) { fancyDDUL.html(""); }
			            var keepHidden = false;
			            $.each(data, function (key, value) {
			                var selectedValueText = "";
			                if (value.ddOptionText == selectedValue || value.ddOptionValue == selectedValue) { selectedValueText = " selected='true'"; } else { selectedValueText = ""; }
			                if (data.length == 1 && value.ddOptionValue == "") keepHidden = true;
			                jQuery("#" + controlID).append($("<option" + selectedValueText + "></option>").val(value.ddOptionValue).html(value.ddOptionText));
			                if (fancyDD.length > 0) {
			                    if (selectedValueText != "") {/*TODO*/ }
			                    fancyDDUL.html(fancyDDUL.html() + "<li val='" + value.ddOptionValue + "'>" + value.ddOptionText + "</li>");
			                }
			            });
			            if (!keepHidden) {
			                if (fancyDD.length > 0) {
			                    fancyDD.removeClass("Off");
			                } else {
			                    jQuery("#" + controlID).css("display", "block");
			                }

			            }
			            //jQuery("#AjaxMessage").jqmHide();
			            jQuery("#" + controlID + "_loading").remove();
			        }
			    } else {
			        jQuery("#" + controlID + "_loading").remove();
			        //jQuery("#AjaxMessage").jqmHide();
			    }
			}
        , "json");
}

function SetupDropDowns() {
    jQuery("._FormInputDropDownOnChange").each(function (index) {
        SetupDropDown($(this));
    });
}
function SetupDropDown(obj) {
    var values = null;
    try {
        if (obj.val().indexOf('~') == -1) {
            values = (obj.val() + "~" + obj.val() + "~" + obj.val()).split('~');
        } else {
            values = obj.val().split('~');
        }
    } catch (e) { values = "~~"; }
    var controls = obj.attr("ShowControls").split(';');
    for (var x = 0; x < controls.length; x++) {
        controlDetails = controls[x].split(':');
        switch (controlDetails[2]) {
            case "select":
            case "selecthide":
                jQuery("#" + controlDetails[0]).children("option").each(function (index) {
                    var splitValues = $(this).val().split("~");
                    if (splitValues[0] == values[controlDetails[1]]) {
                        var fancyDD = $("#" + controlDetails[0] + "_FancyDD");
                        if (fancyDD.length > 0) {
                            fancyDD[0].css("display", ((controlDetails[2].toLowerCase() == "selecthide") ? "none" : "block"));
                        } else {
                            jQuery("#" + controlDetails[0]).css("display", ((controlDetails[2].toLowerCase() == "selecthide") ? "none" : "block"));
                        }
                        $(this).attr("selected", "selected");
                        return false;
                    }
                });
                break;
            case "supportticket":
            case "opportunityregistration":
                var emptyValue = ""; try { emptyValue = jQuery("#" + controlDetails[0]).attr("EmptyValue"); } catch (e) { emptyValue = ""; }
                var optionValueOrder = "";
                var optionTextOrder = "";
                var defaultValue = "";
                try { optionValueOrder = jQuery("#" + controlDetails[0]).attr("optionValueOrder"); } catch (e) { }
                try { optionTextOrder = jQuery("#" + controlDetails[0]).attr("optionTextOrder"); } catch (e) { }
                try { defaultValue = jQuery("#" + controlDetails[0]).attr("defaultvalue"); } catch (e) { }
                if (values[controlDetails[1]] != "") {
                    var postData = "&method=" + controlDetails[3] + "&EmptyValue=" + emptyValue + "&params=" + values[controlDetails[1]] + "&optionValueOrder=" + optionValueOrder + "&optionTextOrder=" + optionTextOrder + "&defaultValue=" + defaultValue;
                    //                        jQuery("#jqmContainers").append(GetPopupWindow("AjaxMessage"));
                    //                        jQuery("#AjaxMessage").jqm({ onHide: closeAndKill, html: "Retreiving Data<br><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>", ajax: "", ajaxText: "", overlay: 65, modal: false, width: 400, height: 400, innerWidthOffset: 40, innerHeightOffset: 40, target: '#AjaxMessage_Body' });
                    //                        jQuery("#AjaxMessage").jqmShow();
                    var controlID = controlDetails[0];
                    obj.parent().css({ "position": "relative" });
                    //var w = obj.width() + 16;
                    //var h = obj.position().top;
                    //obj.parent().append($("<span style='position:absolute;top:" + h + "px;left:" + w + "px;' id='" + controlID + "_loading'><img src='/img/loader/loader16.gif'/></span>"));
                    var w = obj.width() + 6;
                    var h = obj.position().top+6;
                    obj.parent().append($("<span style='position:absolute;top:" + h + "px;left:" + w + "px;' id='" + controlID + "_loading'><img class='_Spinner' src='/img/small-logo.png' style='width:16px;height:16px;'/></span>"));
                    StartSpinner();
                    var fancyDD = $("#" + controlID + "_FancyDD");
                    if (fancyDD.length > 0) { fancyDD.addClass("Off"); }
                    else { jQuery("#" + controlID).css("display", "none"); }
                    var postpath = "/forms/get" + controlDetails[2] + "data.xml?z=" + Math.random();
                    UpdateDropDownField(postpath, postData, controlID);

                }
                //try { GetFormDropDownValues("/forms/getopportunityregistrationdata.xml", "&method=" + controlDetails[3] + "&EmptyValue=" + empyValue + "&params=" + values[controlDetails[1]] + "&optionValueOrder=" + optionValueOrder + "&optionTextOrder=" + optionTextOrder, jQuery("#" + controlDetails[0]).id); } catch (e) { alert("here: " + e.message); }
                break;
            case "conditional":
                if (controlDetails[1].indexOf('!') == 0) {
                    //need to update this like below
                    jQuery("#" + controlDetails[0]).css("display", (("!" + obj.val()) != controlDetails[1]) ? "block" : "none");
                } else {
                    var valSplit = values;
                    var matchSplit = controlDetails[1].split("~");
                    var matched = false;
                    for (var valCount = 0; valCount < valSplit.length; valCount++) {
                        for (var matchCount = 0; matchCount < matchSplit.length; matchCount++) {
                            if (valSplit[valCount] == matchSplit[matchCount]) {
                                matched = true; break;
                            }
                            try { if (valSplit[valCount].indexOf(',') > -1) { if (valSplit[valCount].indexOf(matchSplit[matchCount]) > -1) matched = true; break; } } catch (e) { }
                            if (matched) break;
                        }
                    }
                        

                    jQuery("#" + controlDetails[0]).css("display", (matched) ? "block" : "none");
                }
                break;
        }
    }
    try { jQuery(selectedTab).click(); } catch (e) { }

}
//jQuery("._FormInputDropDownOnChange").live("change", function (e) {
$("body").on("change", "._FormInputDropDownOnChange", function (e) {
    SetupDropDown($(this));
});

//jQuery("._DynamicForm input").live("keyup", function (e) {
$("body").on("keyup", "._DynamicForm input", function (e) {
    if (e.which == 13) {
        $("input[triggeredsubmit='true']").attr("triggeredsubmit", "false");
        $(this).attr("triggeredsubmit", "true");
        $(this).parents("._DynamicForm").submit();
    } else {
        if ($(this).attr("EmptyValue") != $(this).val()) {
            $(this).removeClass("FormFieldRequired");
        }
    }
});
$("._DynamicForm_Page.start").each(function (e) {
    $(this).toggleClass("On Off");
    var buttonLabel = $(this).attr("ActionLabel");
    if (!IsEmptyOrNull(buttonLabel)) {
        var submitButton = $(this).parents("._DynamicForm").find(".submit-btn");
        submitButton.val(buttonLabel);
    }
});
//jQuery("._DynamicForm").die("submit");
//jQuery("._DynamicForm").live("submit", function (e) {
$(".PageContainer").off("submit", "._DynamicForm");
$("body").on("submit", "._DynamicForm", function (e) {
    e.preventDefault();
    var noPopup = isMobile();
    var isMultiPart = false;
    var hasProgressBar = false;
    var multiPartAction = "submit";
    if (!noPopup) noPopup = $(this).hasClass("showinline");
    var totalParts = $(this).find("._DynamicForm_Page").length;
    isMultiPart = ((totalParts > 0) ? true : false);
    var isBack = false;
    hasProgressBar = (($(this).find("._ProgressBarComplete").length > 0) ? true : false);
    var formElement = $(this);
    var msgID = "#" + $(this).attr("id") + "_msg";
    var formID = "#" + $(this).attr("id");
    jQuery(msgID).html("");

    //Add something to prevent multiple submissions
    var validateObj = $(this);
    if (isMultiPart) {
        validateObj = $("._DynamicForm_Page.On");
        if (e.target.className.indexOf("back-btn") > -1) {
            multiPartAction = validateObj.prev().attr("id");
            isBack = true;
        } else {
            if ($("._DynamicForm_Page").index(validateObj) + 1 == totalParts) { multiPartAction = "submit" } else { multiPartAction = validateObj.next().attr("id"); }
        }
    }
    var formErrors = "";
    if (!isBack) {
        formErrors = ValidateForm(validateObj);
    }

    jQuery("#jqmContainers").append(GetPopupWindow("AjaxMessage"));
    jQuery("#AjaxMessage").jqm({ onHide: closeAndKill, html: "", ajax: "", ajaxText: "", overlay: 65, modal: false, width: 400, height: 100, innerWidthOffset: 40, innerHeightOffset: 40, target: '#AjaxMessage_Body' });
    jQuery("#AjaxMessage").jqmShow();
    if (formErrors != "") {
        if (!noPopup) {
            formErrors += "<div style='width:100%;text-align:center;text-decoration:underline;cursor:pointer;' class='_DynamicFormClose' id='AjaxMessage_close'>Close</div>";
            //jQuery("#AjaxMessage_Body").html(MakePopup("<div id='AjaxMessage_Contents'>" + formErrors + "</div>", "AjaxMessage"));
            jQuery("#AjaxMessage_Body").html("<div id='AjaxMessage_Contents' class='MessageBox Error'>" + formErrors + "</div>");
            var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
            jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
        } else {
            jQuery("#AjaxMessage").jqmHide();
            if (!$(msgID).length) {
                //NEED TO ADD TO DOM
            }
            jQuery(msgID).html("<div class='row'><div class='MessageBox Error'>" + formErrors + "</div></div>");
        }
    } else if (multiPartAction.toLowerCase() != "submit") {
        validateObj.toggleClass("On Off");
        validateObj.fadeOut(0);
        var nextSection = $("#" + multiPartAction);
        nextSection.toggleClass("On Off");
        nextSection.fadeOut(0);
        nextSection.fadeIn(500);
        $("html,body").animate({ scrollTop: nextSection.offset().top - 64 }, 500);
        var buttonLabel = nextSection.attr("ActionLabel");
        var backLabel = nextSection.attr("PrevAcionLabel");
        if (!IsEmptyOrNull(buttonLabel)) {
            var submitButton = $(this).find(".submit-btn");
            var backButton = $(this).find(".back-btn");
            submitButton.val(buttonLabel);
            if (!IsEmptyOrNull(backLabel)) { backButton.val(backLabel); backButton.removeClass("Off").addClass("On"); } else { backButton.removeClass("On").addClass("Off"); }
            if (hasProgressBar) {
                var totalPages = $("._DynamicForm_Page").length;
                var progressBar = $(this).find("._ProgressBarComplete");
                var currentPage = $("._DynamicForm_Page").index(validateObj);
                if (isBack) { currentPage-- } else { currentPage++; }
                var newWidth = (currentPage / totalPages) * progressBar.parent().width();
                progressBar.animate({ width: newWidth }, 500);
            }
        }
        jQuery("#AjaxMessage").jqmHide();
    } else if (multiPartAction.toLowerCase() == "submit") {
        //POST Form
        if (hasProgressBar) {
            var totalPages = $("._DynamicForm_Page").length;
            var progressBar = $(this).find("._ProgressBarComplete");
            var newWidth = progressBar.parent().width();
            progressBar.animate({ width: newWidth }, 500);
        }
        var additionalPostData = ParseAdditonalPostNames($(this));
        var adwordsURLS = GetAdwords($(this));
        var action = $(this).attr("action");
        if (!IsEmptyOrNull(action)) {
            action = "&action=" + action;
        } else {
            var buttonValue = $("input:button[triggeredsubmit='true']").val();
            if (buttonValue == undefined) { buttonValue = $("input:button:first").val(); }
            action = "&action=" + buttonValue;
        }
        var serializedForm = $(this).serialize();
        if (IsEmptyOrNull(serializedForm)) serializedForm = $("form:first").serialize();
        var postData = serializedForm + action + additionalPostData + "&elqCustomerGUID=" + GetCookie("EloquaCustID");
        try { postData += "&publicID=" + _publicid; } catch (e) { }
        try { postData += "&RequireServerValidation=" + $(".RequireServerValidation").val(); } catch (e) { }
        postData += "&ReferringPage=" + encodeURIComponent(document.referrer) + "&CurrentPage=" + encodeURIComponent(window.location);
        //            var taskid = getQuerystring("taskid", null);
        //            if (!IsEmptyOrNull(taskid)) postData += "&LogToAction=" + taskid;
        var sourceType = getQuerystring("Source", "");
        try { if (IsEmptyOrNull(sourceType) && document.referrer.indexOf("adurl=") > -1) sourceType = "Online-Google"; } catch (e) { }
        try { if (IsEmptyOrNull(sourceType) && document.referrer.indexOf("gclid=") > -1) sourceType = "Online-Google"; } catch (e) { }
        try { if (!IsEmptyOrNull(sourceType)) postData += "&Source=" + sourceType; } catch (e) { }
        if (postData.toLowerCase().indexOf("&languagecode=") == -1) postData += "&languageCode=" + languageCode;
        var postURL = "";
        try { postURL = _loginServer; } catch (e) { postURL = ""; }
        var _eventCat = ""; var _eventLabel = ""; var _eventAction = ""; var _fakePage = "";
        try { _eventCat = $("input[id='EventCategory']", $(this)).val(); } catch (e) { }
        try { _eventLabel = $("input[id='EventLabel']", $(this)).val(); } catch (e) { }
        try { _eventAction = $("input[id='EventAction']", $(this)).val(); } catch (e) { }
        try { _fakePage = $("input[id='FakePage']", $(this)).val(); } catch (e) { }
        $.post(postURL + "/forms/submit.xml?z=" + Math.random(), postData,
			function (data) {
			    if (!IsEmptyOrNull(data[0].Error)) {
			        //jQuery("#AjaxMessage_Body").html(data[0].Error);
			        if (!noPopup) {
			            //jQuery("#AjaxMessage_Body").html(MakeRoundCornerPopup("<div id='AjaxMessage_Contents'>" + data[0].Error + "<div style='width:100%;text-align:center;text-decoration:underline;cursor:pointer;' class='_DynamicFormClose' id='AjaxMessage_close'>Close</div></div>", "AjaxMessage"));
			            if (data[0].Error.indexOf("MessageBox") > -1) {
			                jQuery("#AjaxMessage_Body").html("<div id='AjaxMessage_Contents' class=''>" + data[0].Error.replace("\"row\"","''").replace("'row'",'') + "</div>");
			            } else {
			                jQuery("#AjaxMessage_Body").html("<div id='AjaxMessage_Contents' class='MessageBox Error'>" + data[0].Error + "</div>");
			            }
			            var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
			            jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
			        } else {
			            jQuery("#AjaxMessage").jqmHide();
			            if (!$(msgID).length) {
			                //NEED TO ADD TO DOM
			            }
			            if (data[0].Error.indexOf("MessageBox") > -1) {
			                jQuery(msgID).html(data[0].Error);
			            } else {
			                jQuery(msgID).html("<div class='row'><div class='MessageBox Error'>" + data[0].Error + "</div></div>");
			            }
			        }
			    } else {
			        if (!IsEmptyOrNull(_eventCat)) TrackAll(_eventCat, _eventAction, _eventLabel, _fakePage);
			        if (!IsEmptyOrNull(data[0].RefreshPage)) {
			            location.reload(true);
			        } else if (!IsEmptyOrNull(data[0].HTML)) {
			            if (!noPopup) {
			                jQuery("#AjaxMessage_Body").html("<div id='AjaxMessage_Contents' class='MessageBox Loading'>" + data[0].HTML + "</div>");
			                var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
			                jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
			            } else {
			                jQuery(formID).html("<div class='row'><div class='MessageBox Loading'>" + data[0].HTML + "</div></div>");
			                jQuery("#AjaxMessage").jqmHide();
			            }
			        } else if (!IsEmptyOrNull(data[0].LoadPage)) {
			            if (isMultiPart) {
			                $.doTimeout(100, function () {
			                    location.href = data[0].LoadPage;
			                });
			            } else {
			                var confirmMsg = "Loading " + data[0].LoadPage + ".<br/>If you are not automatically redirected, <a href='" + data[0].LoadPage + "'>click here</a>.";//"Thank you, your submission has been received.";
			                if (!IsEmptyOrNull(data[0].Confirmation)) confirmMsg = data[0].Confirmation;
			                if (!noPopup) {
			                    //jQuery("#AjaxMessage_Body").html(MakeRoundCornerPopup("<div id='AjaxMessage_Contents'>Thank you, your submission has been received.</div>", "AjaxMessage"));
			                    jQuery("#AjaxMessage_Body").html("<div id='AjaxMessage_Contents' class='MessageBox Loading'>" + confirmMsg + "</div>");
			                    var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
			                    jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
			                } else {
			                    jQuery(formID).html("<div class='row'><div class='MessageBox Loading'>" + confirmMsg + "</div></div>");
			                    jQuery("#AjaxMessage").jqmHide();
			                }
			                $.doTimeout(1000, function () {
			                    location.href = data[0].LoadPage;
			                });
			            }
			        } else if (!IsEmptyOrNull(data[0].FormToLoad)) {
			            jQuery("#AjaxMessage").jqmHide();
			            var nextForm = ""; if (data[0].NextFormToLoad != null && data[0].NextFormToLoad != "" && data[0].NextFormToLoad != "null") { nextForm = "&OnSuccessLoadForm=" + data[0].NextFormToLoad; } else { nextForm = ""; }
			            var secondForm = data[0].FormToLoad.replace(".xml", "");
			            var passToNextForm = "";
			            if (data[0].PassToNextForm != "" && data[0].PassToNextForm != null && data[0].PassToNextForm != "null") passToNextForm = data[0].PassToNextForm;
			            //NEED TO ADD noPopup functionality here too!
			            var targetClass = "K2V5DefaultPopup";
			            jQuery("#jqmContainers").append(GetPopupWindow(secondForm, targetClass));

			            //jQuery("#jqmContainers").append(GetPopupWindow(secondForm));
			            jQuery("#" + secondForm).jqm({ onHide: closeAndKill, ajax: "/forms/" + data[0].FormToLoad + "?callingWindow=" + secondForm + nextForm + passToNextForm, ajaxText: "<img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/>", ajaxMethod: "json", overlay: 65, modal: false, innerWidthOffset: 40, innerHeightOffset: 40, target: "#" + secondForm + "_Body" });
			            jQuery("#" + secondForm).jqmShow();
			        } else if (!IsEmptyOrNull(data[0].Confirmation)) {
			            if (data[0].Confirmation.indexOf("reveal:") > -1) {
			                jQuery("#AjaxMessage").jqmHide();
			                $("#" + data[0].Confirmation.replace("reveal:", "")).reveal();
			                if (!IsEmptyOrNull(adwordsURLS)) { $("#" + data[0].Confirmation.replace("reveal:", "")).append(adwordsURLS); }
			            } else {
			                if (!noPopup) {
			                    //jQuery("#AjaxMessage_Body").html(MakeRoundCornerPopup("<div id='AjaxMessage_Contents'>" + data[0].Confirmation + adwordsURLS + "<div style='width:100%;text-align:center;text-decoration:underline;cursor:pointer;' class='_DynamicFormClose' id='AjaxMessage_close'>Close</div></div>", "AjaxMessage"));
			                    jQuery("#AjaxMessage_Body").html("<div id='AjaxMessage_Contents'>" + data[0].Confirmation + adwordsURLS + "<div style='width:100%;text-align:center;text-decoration:underline;cursor:pointer;' class='_DynamicFormClose' id='AjaxMessage_close'>Close</div></div>");
			                    var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
			                    jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
			                } else {
			                    //jQuery(formID).html(data[0].Confirmation + adwordsURLS);
			                    formElement.html(data[0].Confirmation + adwordsURLS);
			                    jQuery("#AjaxMessage").jqmHide();
			                }
			            }
			        } else {
			            jQuery("#AjaxMessage").jqmHide();
			            //do we need a default action???
			            if (noPopup) location.reload();
			        }
			        if (data[0].CloseWindow != "" && data[0].CloseWindow != null && data[0].CloseWindow != "null") {
			            var windowList = data[0].CloseWindow.split(",");
			            for (var x = 0; x < windowList.length; x++) jQuery("#" + windowList[x]).jqmHide();
			        }
			    }
			}, "json");
    }
});
//jQuery("._DynamicFormClose").live("click", function (e) { try { jQuery("#" + $(this).attr("id").replace("_close", "")).jqmHide(); } catch (e) { } });
$("body").on("click", "._DynamicFormClose", function (e) { try { jQuery("#" + $(this).attr("id").replace("_close", "")).jqmHide(); } catch (e) { } });

var GetAdwords = function (form) {
    var params = "";
    $("input:checkbox:checked", form).each(function (i) {
        var adwordsURL = $(this).attr("adwordsurl");
        if (!IsEmptyOrNull(adwordsURL)) {
            params += "<img height='1' width='1' style='border-style:none;' alt='' src='" + adwordsURL + "'/>";
        }
    });
    return params;
}
var ParseAdditonalPostNames = function (form) {
    var params = "";
    $(":input", form).each(function (i) {
        var obj = $(this);
        var postNames = obj.attr("postnames");
        if (postNames != undefined) {
            var itemValue = obj.val();
            var skip = false;
            if (obj.is(":checkbox")) { if (!obj.is(":checked")) { skip = true;}}
            if (!skip) {
                try { itemValueSplit = itemValue.split('~'); itemValue = itemValueSplit[0]; } catch (e) { }
                var postNamesSplit = postNames.split('~');
                for (var z = 0; z < postNamesSplit.length; z++) {
                    var postNameElementIDs = postNamesSplit[z].split(',');
                    for (var e = 0; e < postNameElementIDs.length; e++) {
                        switch (z) {
                            //case 0: params += "&" + postNameElementIDs[e] + "=" + escape(itemValue); break;
                            case 0: params += "&" + postNameElementIDs[e] + "=" + itemValue; break;
                            case 1: params += "&" + postNameElementIDs[e] + "=" + ((itemValue == "") ? "" : escape(jQuery("#" + obj.attr("id") + " option:selected").text())); break;
                        }
                    }
                }
            }
        }
    });
    return params;
};
var ValidateForm = function (form) {
    var errorMsg = "";
    var targetForm = $("input[triggeredsubmit='true']").attr("targetform");
    var submitButton = $("input[triggeredsubmit='true']");
    submitButton.prop("disabled", "disabled");
    submitButton.parent().append($("<span style='position:relative;left:-25px;' id='submit_loading'><img class='_Spinner' src='/img/small-logo.png' style='width:16px;height:16px;'/></span>"));
    StartSpinner();

    $(":input, textarea", form).each(function (i) {
        var obj = $(this);
        var formError = false;
        var fieldDisabled = false;
        var ignore = false;
        try { if (obj.attr("disabled") == "disabled" || obj.attr("disabled") == "true" || obj.attr("disabled") == true) { fieldDisabled = true; } } catch (e) { fieldDisabled = false; }
        try { var parentSection = obj.attr("parentSection"); if ($("#" + parentSection).css("display") == "none") fieldDisabled = true; } catch (e) { }
        if (obj.attr("targetform") != targetForm) ignore = true;
        if (!fieldDisabled && !ignore) {
            switch (this.type) {
                case "hidden":
                case "text":
                case "password":
                case "textarea":
                    if (obj.css("display") != "none" || this.type == "password") {
                        switch (obj.attr("requirefield")) {
                            case undefined:
                            case "undefined":
                            case "":
                            case "false":
                                if (obj.val() == obj.attr("EmptyValue") && this.type != "hidden") { obj.val(""); }
                                break;
                            case "true":
                                if (obj.val() == "" || obj.val() == obj.attr("EmptyValue")) {
                                    obj.addClass("FormInputError"); obj.removeClass("FormFieldRequired");
                                    if (!IsEmptyOrNull(obj.attr("EmptyValue"))) { errorMsg += obj.attr("EmptyValue") + " is required<br>"; }
                                    else { errorMsg += obj.attr("id") + " is required<br>"; }
                                    formError = true;
                                } else { if (formError == false) obj.removeClass("FormInputError"); }
                                break;
                            default:
                                var pattern = null;
                                var isValid = true;
                                var formatName = "";
                                var requiredValue = "";
                                var checkAdditionalField = "";
                                var checkAdditionalFieldMSG = "";
                                try { requiredValue = obj.attr("requirefield"); } catch (e) { requiredValue = ""; }
                                //If contains a separator, split and reassign requiredValue
                                if (requiredValue.indexOf('~') > -1) {
                                    var requiredValueSplit = requiredValue.split('~');
                                    requiredValue = requiredValueSplit[0];
                                    checkAdditionalField = requiredValueSplit[1];
                                    try { checkAdditionalFieldMSG = requiredValueSplit[2]; } catch (e) { checkAdditionalFieldMSG = "is not allowed"; }
                                    if (IsEmptyOrNull(checkAdditionalFieldMSG)) checkAdditionalFieldMSG = "is not allowed";

                                }
                                switch (requiredValue.toLowerCase()) {
                                    case "int":
                                        pattern = new RegExp(/^[1-9]+[0-9]*$/gi);
                                        formatName = " must contain only integers";
                                        break;
                                    case "decimal":
                                    case "number":
                                        pattern = new RegExp(/^([0-9]*|\d*\.\d{1}?\d*)$/gi);
                                        formatName = " must contain numbers and decimal points";
                                        break;
                                    case "email":
                                        pattern = new RegExp("^([a-zA-Z0-9_\\.\\-])+\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$", "gi");
                                        formatName = " must contain a valid email address";
                                        obj.parent().remove(".RequireServerValidation");
                                        obj.parent().append("<input type='hidden' class='RequireServerValidation' value='" + obj.prop("id") + "~email'/>");
                                        break;
                                    case "country-email":
                                        pattern = new RegExp("^([a-zA-Z0-9_\\.\\-])+\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$", "gi");
                                        formatName = " must contain a valid email address";
                                        //isValid = pattern.test(obj.val());
                                        var additionalFieldValue = $(checkAdditionalField).val();
                                        obj.parent().find(".RequireServerValidation").remove();
                                        obj.parent().append("<input type='hidden' class='RequireServerValidation' value='" + obj.prop("id") + "~country-email~" + additionalFieldValue + "'/>");
                                        //if (isValid) {
                                        //    //check if the country is india and revalidate
                                        //    //Temp hard coding domains
                                        //    var invalidDomains = "hotmail.com,gmail.com,yahoo.com,msn.com,qq.com,163.com,live.com,yahoo.fr,outlook.com,yahoo.co.in";
                                        //    var invalidDomainSplit = invalidDomains.split(',');
                                        //var additionalFieldValue = $(checkAdditionalField).val();
                                        //    switch (additionalFieldValue.toLowerCase()) {
                                        //        case "99~22~india":
                                        //        case "18~22~bangladesh":
                                        //        case "161~22~pakistan":
                                        //        case "198~22~sri lanka":
                                        //            for (var x = 0; x < invalidDomainSplit.length; x++) {
                                        //                if (obj.val().indexOf(invalidDomainSplit[x]) > -1) {
                                        //                    obj.addClass("FormInputError");
                                        //                    formatName = " " + obj.val() + " " + checkAdditionalFieldMSG;
                                        //                    //formatName = " " + checkAdditionalFieldMSG();
                                        //                    isValid = false;
                                        //                    break;
                                        //                } else { obj.removeClass("FormInputError"); }
                                        //            }
                                        //            break;
                                        //        default:
                                        //            break;
                                        //    }
                                        //}
                                        //pattern = null;
                                        break;
                                    case "recordfilename":
                                        formatName = " must contain only letters, numbers, periods (.), dashes (-) and slashes (/).  The following paths are not valid: /videos, /forms, /k2trynow, /files, /workflow, /wizards, /data, /licenses, /content.";
                                        var invalidPaths = /(\/videos\/.*)|(\/forms\/.*)|(\/k2trynow\/.*)|(\/files\/.*)|(\/workflow\/.*)|(\/wizards\/.*)|(\/data\/.*)|(\/sso\/.*)|(\/spssearch\/.*)|(\/licenses\/.*)|(\/content\/.*)/gi.test(obj.val());
                                        var validChars = /[a-z.0-9\-\/_]/gi.test(obj.val());
                                        var endsWith = /.*(\.aspx)$/gi.test(obj.val());
                                        var startsWith = /^\/.*/gi.test(obj.val());
                                        if (startsWith) { obj.val(obj.val().substring(1)); }
                                        if (endsWith) { obj.val(obj.val().replace(".aspx", "")); }
                                        //if (startsWith && endsWith) { isValid = false; formatName = ": the filename cannot start with a / AND end with .aspx"; }
                                        //if (!startsWith && !endsWith) { isValid = false; formatName = ": the filename must start with a / OR end with .aspx"; }
                                        if (invalidPaths) { isValid = false; formatName = ": The following paths are not valid: /videos, /forms, /k2trynow, /files, /workflow, /wizards, /data, /licenses, /content, /sso, /spssearch."; }
                                        if (!validChars) { isValid = false; formatName = ": Only the following characters are valid: letters, numbers, periods (.), dashes (-), slashes (/) and underscores (_)."; }
                                        if (IsEmptyOrNull(obj.val()) || obj.val()==obj.attr("emptyvalue")) { isValid = false; formatName = " is required."; }
                                        //if (obj.val().indexOf('&') > -1) { isValid = false; formatName = " cannot contain an &."; }
                                        //if ((startsWith && !endsWith && !invalidPaths && obj.val().indexOf('&') == -1 && !IsEmptyOrNull(obj.val())) || (endsWith && !startsWith && !invalidPaths && obj.val().indexOf('&') == -1 && !IsEmptyOrNull(obj.val()))) { isValid = true; }
                                        //pattern = new RegExp("^[\/\w\.\/\-_\s]*", "gi");
                                        pattern = null;
                                        break;
                                    case "filename":
                                        //pattern = new RegExp(/^[\/\w\.\/\-_\s]*\b$/gi);
                                        pattern = new RegExp("^[\/\w\.\/\-_\s]*", "gi");
                                        formatName = " must contain only letters, numbers, periods (.), dashes (-), slashes (/) and underscores (_) and spaces.";
                                        break;
                                    case "lettersnumbers":
                                        pattern = new RegExp(/^([A-Za-z0-9]*)$/gi);
                                        formatName = " must contain only letters and numbers.";
                                        break;
                                    case "dateonly":
                                        pattern = new RegExp(/^(0?[1-9]|1[012])[-\/](0?[1-9]|[12][0-9]|3[01])[-\/]([2]?[0]?[0-9][0-9])$/gi);
                                        formatName = "must contain a valid date in the format of MM/DD/YYYY";
                                        break;
                                    default:
                                        pattern = new RegExp(obj.attr("requirefield"), "gi");
                                        break;
                                }
                                if (pattern != null) isValid = pattern.test(obj.val());
                                if (!isValid) {
                                    obj.addClass("FormInputError"); obj.removeClass("FormFieldRequired");
                                    if (formatName == "") {
                                        errorMsg += obj.attr("EmptyValue") + " does not match the required format<br/>";
                                    } else {
                                        //alert(obj.attr("id"));
                                        errorMsg += obj.attr("EmptyValue") + formatName + "<br/>";
                                    }
                                    formError = true;
                                } else { if (formError == false) obj.removeClass("FormInputError"); }
                                break;
                        }
                        //Min Length
                        try {
                            if (Number(obj.attr("min")) != NaN && Number(obj.attr("min")) > 0 && obj.attr("min") != undefined) {
                                if (obj.val().length < Number(obj.attr("min"))) {
                                    obj.addClass("FormInputError"); obj.removeClass("FormFieldRequired");
                                    errorMsg += obj.attr("EmptyValue") + " must be at least " + obj.attr("min") + " characters<br>";
                                    formError = true;
                                } else { if (formError == false) obj.removeClass("FormInputError"); }
                            }
                        } catch (e) { }
                        //Max Length
                        try {
                            if (Number(obj.attr("max")) != NaN && Number(obj.attr("max")) > 0 && obj.attr("max") != undefined) {
                                if (obj.val().length > Number(obj.attr("max"))) {
                                    obj.addClass("FormInputError"); obj.removeClass("FormFieldRequired");
                                    errorMsg += obj.attr("EmptyValue") + " must be less than " + obj.attr("max") + " characters<br>";
                                    formError = true;
                                } else { if (formError == false) obj.removeClass("FormInputError"); }
                            }
                        } catch (e) { }
                        //Matches another control
                        try {
                            var matchID = obj.attr("match");
                            if (matchID != "" && matchID != null && matchID != undefined && matchID != "undefined") {
                                var matchValue = "";
                                if (matchID.indexOf("!domain:") == 0) {
                                    matchID = matchID.replace("!domain:", "");
                                    try {
                                        matchValue = jQuery("#" + matchID).val().split("@");
                                        var objValue = obj.val().split("@");
                                        if (objValue[1] == matchValue[1]) {
                                            obj.addClass("FormInputError"); obj.removeClass("FormFieldRequired");
                                            errorMsg += obj.attr("EmptyValue") + " domain cannot match " + jQuery("#" + matchID).attr("EmptyValue") + " domain<br>";
                                            formError = true;
                                        } else { if (formError == false) obj.removeClass("FormInputError"); }
                                    } catch (e) { if (formError == false) obj.removeClass("FormInputError"); }
                                }
                                else if (matchID.indexOf("!") == 0) {
                                    matchID = matchID.replace("!", "");
                                    matchValue = jQuery("#" + matchID).val();
                                    if (obj.val() == matchValue) {
                                        obj.addClass("FormInputError"); obj.removeClass("FormFieldRequired");
                                        errorMsg += obj.attr("EmptyValue") + " cannot match " + jQuery("#" + matchID).attr("EmptyValue") + "<br>";
                                        formError = true;
                                    } else { if (formError == false) obj.removeClass("FormInputError"); }
                                } else {
                                    matchValue = jQuery("#" + matchID).val();
                                    if (obj.val() != matchValue) {
                                        obj.addClass("FormInputError"); obj.removeClass("FormFieldRequired");
                                        errorMsg += obj.attr("EmptyValue") + " does not match " + jQuery("#" + matchID).attr("EmptyValue") + "<br>";
                                        formError = true;
                                    } else { if (formError == false) obj.removeClass("FormInputError"); }
                                }
                            }
                        } catch (e) { }
                    }
                    break;
                case "select-one":
                    try {
                        if (obj.css("display") != "none") {
                            var ddRequiredValue = "false";
                            try { ddRequiredValue = obj.attr("requirefield") } catch (e) { ddRequiredValue = ""; }
                            if ((ddRequiredValue == "true" || ddRequiredValue.indexOf("india-special") > -1) && (obj.val() == "" || obj.val() == obj.attr("EmptyValue"))) {
                                obj.addClass("FormInputError"); obj.removeClass("FormFieldRequired");
                                var fieldName = obj.attr("EmptyValue"); if (IsEmptyOrNull(fieldName)) fieldName = obj.attr("id");
                                errorMsg += fieldName + " is required<br>";
                            } else { obj.removeClass("FormInputError"); }

 
                            
                        } else {
                            //fix for fancy dd
                            var fancyDD = $("#" + obj.attr("id") + "_FancyDD");
                            if (!fancyDD.hasClass("Off")) {
                                if (fancyDD.length > 0) {
                                    if (obj.attr("requirefield") == "true" && (obj.val() == "" || obj.val() == obj.attr("EmptyValue"))) {
                                        fancyDD.addClass("FormInputError"); obj.removeClass("FormFieldRequired");
                                        var fieldName = obj.attr("EmptyValue"); if (IsEmptyOrNull(fieldName)) fieldName = obj.attr("id");
                                        errorMsg += fieldName + " is required<br>";
                                    } else { fancyDD.removeClass("FormInputError"); }
                                }
                            }
                        }
                    } catch (e) { }
                    break;
                case "select-multiple":
                    try {
                        if (obj.attr("requirefield") == "true" && IsEmptyOrNull(obj.val())) {
                            obj.siblings().addClass("FormInputError"); obj.removeClass("FormFieldRequired");
                            var fieldName = obj.attr("EmptyValue"); if (IsEmptyOrNull(fieldName)) fieldName = obj.attr("id");
                            errorMsg += fieldName + " is required<br>";
                        } else { obj.siblings().removeClass("FormInputError"); }
                    } catch (e) { alert(e.message); }
                    break;
                case "checkbox":
                    if (obj.css("display") != "none") {
                        if (obj.attr("requirefield") == "true" && !obj.is(':checked')) {
                            obj.addClass("FormInputError"); obj.removeClass("FormFieldRequired");
                            var fieldName = obj.attr("EmptyValue"); if (IsEmptyOrNull(fieldName)) fieldName = obj.attr("id");
                            errorMsg += fieldName + " is required<br>";
                            formError = true;
                        } else { if (formError == false) obj.removeClass("FormInputError"); }
                    }
                    break;
                default:
                    //alert(this.type);
                    break;
            }
        }
    });
    $("#submit_loading").remove();
    submitButton.removeProp("disabled");
    if (errorMsg.length > 0) {
        $(":input, textarea", form).each(function (i) {
            var obj = $(this);
            var ignore = false;
            var addLabel = false;
            if (obj.attr("targetform") != targetForm) ignore = true;
            var fieldDisabled = false;
            try { if (obj.attr("addlabel") == "true" || obj.attr("addlabel") == true) { addLabel = true; } } catch (e) { addLabel = false; }
            try { if (obj.attr("disabled") == "disabled" || obj.attr("disabled") == "true" || obj.attr("disabled") == true) { fieldDisabled = true; } } catch (e) { fieldDisabled = false; }
            if (!fieldDisabled && !ignore && addLabel) {
                switch (this.type) {
                    case "hidden":
                    case "text":
                    case "password":
                    case "textarea":
                        try { if (obj.val() == "") obj.val(obj.attr("EmptyValue")); } catch (e) { }
                        break;
                }
            }
        });

    }
    return errorMsg;
};

jQuery("._RevealOkButton").click(function (e) {
    $(this).trigger('reveal:close');
    var reload = $(this).attr("reload");
    var refresh = $(this).attr("refresh");
    var redirect = $(this).attr("redirect");
    var currLocation = location.href;
    if (!IsEmptyOrNull(reload)) {
        if (reload == "true") {
            location.reload();
        } else {
            var reloadItems = reload.split("&");
            var currURLParts = currLocation.split("?");
            var currQS = ""; var newURL = ""; var currQSItems = "";
            try { newURL = currURLParts[0]; } catch (e) { newURL = currLocation; }
            try { currQS = currURLParts[1]; } catch (e) { currQS = ""; }
            try { currQSItems = currQS.split("&"); } catch (e) { }
            var currQSItemsLength = 0;
            try { currQSItemsLength = currQSItems.length; } catch (e) { currQSItemsLength = 0; }
            if (currQSItemsLength == 0) {
                for (var y = 0; y < reloadItems.length; y++) {
                    if (IsEmptyOrNull(reloadItems[y])) continue;
                    var newItemValueSplit = reloadItems[y].split("=");
                    newURL += ((newURL.indexOf("?") == -1) ? "?" : "&") + newItemValueSplit[0] + "=" + newItemValueSplit[1];
                }
            } else {
                for (var x = 0; x < currQSItems.length; x++) {
                    var currItemValueSplit = currQSItems[x].split("=");
                    var replaceCurrItem = false;
                    for (var y = 0; y < reloadItems.length; y++) {
                        if (IsEmptyOrNull(reloadItems[y])) continue;
                        var newItemValueSplit = reloadItems[y].split("=");
                        if (newItemValueSplit[0] == currItemValueSplit[0]) {
                            replaceCurrItem = true;
                            newURL += ((newURL.indexOf("?") == -1) ? "?" : "&") + newItemValueSplit[0] + "=" + newItemValueSplit[1];
                        }
                    }
                    if (!replaceCurrItem) {
                        newURL += ((newURL.indexOf("?") == -1) ? "?" : "&") + currItemValueSplit[0] + "=" + currItemValueSplit[1];
                    }
                }
            }
            location.href = newURL;
        }
    } else if (!IsEmptyOrNull(refresh)) {
        location.reload();
    } else if (!IsEmptyOrNull(redirect)) {
        location.href = redirect;
    }
});

//jQuery("._InlineForm").live("click", function (e, optionalTarget) {
$(".PageContainer").on("click", "._InlineForm", function (e, optionalTarget) {
    if ($(this).attr("target").indexOf("contactus") > -1) { location.href = "/contact-us"; }
    else { PopupForm($(this), e, optionalTarget); }
});
function PopupForm(obj, e, optionalTarget) {
    try { if (obj.attr("target").indexOf("contactus") > -1) { location.href = "/contact-us"; return; } } catch (e) { }
    var noPopup = isMobile();
    var preventReturn = obj.hasClass("_PreventEnter");
    disable_scroll();
    if ($(window).width() < $(".PageContainer").width()) {
        if (!IsEmptyOrNull(obj.children("a:first").attr("href"))) noPopup = true;
    }
    if (IsEmptyOrNull(obj.children("a:first").attr("href"))) noPopup = false;
    if (!noPopup) {
        e.preventDefault(); if (UnderMaintenance()) return false;
        var url = (optionalTarget != undefined) ? optionalTarget : obj.attr("target"); url += ((url.indexOf("?") > -1) ? "&" : "?") + "callingWindow=InlineForm";
        //Form loads inline
        if (!IsEmptyOrNull(obj.attr("sourceid"))) {
            var sourceID = jQuery("#" + $(this).attr("sourceid"));
            sourceID.html("<img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/>");
            var targetURL = url.split("?");
            var postURL = targetURL[0];
            var postData = targetURL[1].replace("?", "&");
            $.post(postURL, postData,
                    function (data) {
                        if (data.length > 0) {
                            if (!IsEmptyOrNull(data[0].Error)) {
                                sourceID.html(data[0].Error);
                                //_gaq.push(['_trackEvent', 'Forms', 'Open Form Failure', postURL]);
                            } else if (!IsEmptyOrNull(data[0].LoadPage)) {
                                location.href = data[0].LoadPage;
                            } else if (!IsEmptyOrNull(data[0].RefreshPage)) {
                                location.reload();
                            } else {
                                sourceID.html(data[0].HTML);
                                if (preventReturn) {
                                    sourceID.on("keypress", function (evt) {
                                        //alert("Key Press: " + evt.which);
                                        if (evt.which == 13) {
                                            return false;
                                            var $targ = $(evt.target);

                                            if (!$targ.is("textarea") && !$targ.is(":button,:submit")) {
                                                var focusNext = false;
                                                $(this).find(":input:visible:not([disabled],[readonly]), a").each(function () {
                                                    if (this === e.target) {
                                                        focusNext = true;
                                                    }
                                                    else if (focusNext) {
                                                        $(this).focus();
                                                        return false;
                                                    }
                                                });

                                                return false;
                                            }
                                        }
                                    });
                                }
                                //SetupLists();
                                SetupForm();
                                //_gaq.push(['_trackEvent', 'Forms', 'Open Form Success', postURL]);
                                //_gaq.push(['_trackPageview', postURL]);
                            }
                        } else { sourceID.html("No results found"); }
                    }
                , "json");
        } else {
            var targetClass = obj.attr("targetClass") || "K2V5DefaultPopup";
            var fullScreen = obj.attr("fullscreen") || false;
            var addRoundCorners = obj.attr("addRoundCorners") || false;
            jQuery("#jqmContainers").append(GetPopupWindow("InlineForm", targetClass));
            //jQuery("#jqmContainers").append($("<div id='InlineForm' class='jqmWindow' style='text-align:center;vertical-align:middle;'><div class='RoundCornersPopupNew' id='InlineForm_Body'><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/></div></div>"));
            if (preventReturn) {
                jQuery("#InlineForm").jqm({ onHide: closeAndKill, ajax: url, ajaxText: "<img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/>", ajaxMethod: "json", addRoundCorners: addRoundCorners, fullscreen: fullScreen, overlay: 65, modal: false, innerWidthOffset: 40, innerHeightOffset: 40, target: '#InlineForm_Body', onLoad: SetupFormPreventReturn }); jQuery("#InlineForm").jqmShow();
            } else {
                jQuery("#InlineForm").jqm({ onHide: closeAndKill, ajax: url, ajaxText: "<img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/>", ajaxMethod: "json", addRoundCorners: addRoundCorners, fullscreen: fullScreen, overlay: 65, modal: false, innerWidthOffset: 40, innerHeightOffset: 40, target: '#InlineForm_Body', onLoad: SetupForm }); jQuery("#InlineForm").jqmShow();
            }
            //_gaq.push(['_trackEvent', 'Forms', 'Open Form Success', url]);
            //_gaq.push(['_trackPageview', url]);
        }
    } else {
        ShowMaskedWaiting();
        location.href = obj.attr("href");
    }
}

$("._InsertForm").on("click", function (e) {
    e.preventDefault();
    var formSection = $($(this).attr("target"));
    //$(this).html("<img src='/img/loader/K2ComV5/lightbg/arrow-64x64.gif' style='height:32px !important; width:32px !important;'/>");
    var spinnerIcon = $(this).attr("loadingicon");
    if (IsEmptyOrNull(spinnerIcon)) {
        var loadingText = $(this).attr("loadingtext");
        if (IsEmptyOrNull(loadingText)) loadingText = "Loading...";
        $(this).html(loadingText);
    } else {
        var spinnerWidth = $(this).height();
        if ($(this).width() < spinnerWidth) spinnerWidth = $(this).width();
        $(this).html("<div style='width:" + spinnerWidth + "px;height:" + spinnerWidth + "px;margin:auto;'><img class='_Spinner' src='" + spinnerIcon + "' style='width:100%;height:100%;'/></div>");
        StartSpinner();
    }
    RenderForm(formSection);
    $("html,body").animate({ scrollTop: formSection.offset().top - 64 }, 500);
});

$("._FormControl").each(function (e) {
    RenderForm($(this));
});
function RenderForm(sourceID) {
    var url = sourceID.attr("target");
    var turnOffSection = sourceID.attr("turnoff");
    var replacingSection = false;
    if (IsEmptyOrNull(turnOffSection)) {
        sourceID.html("<img src='/img/loader/K2ComV5/lightbg/arrow-64x64.gif' style='height:64px !important; width:64px !important;'/>");
    } else { replacingSection = true; }
    var targetURL = url.split("?");
    var postURL = targetURL[0];
    var postData = "";
    try { postData = targetURL[1].replace("?", "&"); } catch (e) { }
    try { postData += "&redirectTo=" + getQuerystring("ReturnURL", ""); } catch (e) { }
    try {
        $.post(postURL, postData,
            function (data) {
                if (data.length > 0) {
                    if (!IsEmptyOrNull(data[0].Error)) {
                        sourceID.html(data[0].Error);
                        //_gaq.push(['_trackEvent', 'Forms', 'Open Form Failure', postURL]);
                    } else if (!IsEmptyOrNull(data[0].LoadPage)) {
                        location.href = data[0].LoadPage;
                    } else if (!IsEmptyOrNull(data[0].RefreshPage)) {
                        location.reload();
                    } else {
                        if (replacingSection) sourceID.fadeOut(0);
                        sourceID.html(data[0].HTML.replace("<form", "<div").replace("</form", "</div"));
                        try { if ("#" + sourceID.parent().attr("id") + "_Contents" == selectedTab) sourceID.parent().parent().animate({ height: sourceID.parent().height() }, "slow"); } catch (e) { }
                        try { sourceID.find("div[target*='" + $("#defaultAction").val() + "']").show(); } catch (e) { alert(e); }
                        SetupForm();
                        //                        SetupLists();
                        sourceID.children("._AlternatingRows:odd").each(function (e) { $(this).addClass("alternatingRow"); });
                        //                        _gaq.push(['_trackEvent', 'Forms', 'Open Form Success', postURL]);
                        //                        _gaq.push(['_trackPageview', postURL]);
                        $("._autosubmitform").click();

                        $("._DynamicForm_Page.start").each(function (e) {
                            $(this).toggleClass("On Off");
                            var buttonLabel = $(this).attr("ActionLabel");
                            if (!IsEmptyOrNull(buttonLabel)) {
                                var submitButton = $(this).parents("._DynamicForm").find(".submit-btn");
                                submitButton.val(buttonLabel);
                            }
                        });
                        if (replacingSection) sourceID.fadeIn(500);
                    }
                } else { sourceID.html("Could not load form"); }
                if (replacingSection) $(turnOffSection).hide();
            }
            , "json");
    } catch (e) {
    }

}

var _FilterBoxChange = null;
function GetFilterBoxChanges(obj) {
    var filterBoxRoot = obj.parents("._filterbox");
    var originalFilters = filterBoxRoot.attr("originalfilters");
    var filterTarget = filterBoxRoot.attr("filterTarget");
    var filterOptions = filterBoxRoot.find("._FilterBoxFilterOptions");
    var new_filters = "";
    filterOptions.each(function (evt) {
        var internalField = $(this).attr("internalfield");
        if (!IsEmptyOrNull($(this).val())) new_filters += "%26" + internalField + "%3D" + $(this).val();
    });
    var postData = "&filters=" + new_filters;
    if (!IsEmptyOrNull(originalFilters)) postData += "&originalFilters=" + originalFilters;
    postData += "&ignoreLiveFilterBox=true";

    if (_FilterBoxChange == null) {
        _FilterBoxChange = setTimeout(function () { ExecuteFilterBoxFilters(filterTarget, postData, obj) }, 1000);
    } else {
        clearTimeout(_FilterBoxChange);
        _FilterBoxChange = null;
        _FilterBoxChange = setTimeout(function () { ExecuteFilterBoxFilters(filterTarget, postData, obj) }, 1000);
    }
}
//jQuery("._filterbox .FancyDD ul li").live("click", function (e) {
$(".PageContainer").on("click", "._filterbox .FancyDD ul li", function (e) {
    e.preventDefault();
    //GetFilterBoxChanges($(this));
});

//jQuery("._FilterBoxFilterOptions").live("change", function (e) {
$("body").on("change", "._FilterBoxFilterOptions", function (e) {
    e.preventDefault();
    GetFilterBoxChanges($(this));
});
//jQuery("._FilterBoxFilterOptions").live("keyup", function (e) {
$("body").on("keyup", "._FilterBoxFilterOptions", function (e) {
    e.preventDefault();
    if (e.keyCode == '13') GetFilterBoxChanges($(this));
});

function decode(encodedVal) { return decodeURIComponent(encodedVal.replace(/\+/g, " ")); }
$("._SearchResults").each(function (e) {var initialScope = getQuerystring("initialscope", "");LoadSearch($(this), getQuerystring("q", ""), 0, initialScope,false); });
function LoadSearch(targetObj, terms, start, initialScope, ignoreDefaults) {
    if (!IsEmptyOrNull(terms)) terms = decode(terms);
    var resultsSection; var filterSection; var pagingSection;
    var searchConfig = "search/default.xml";
    var forcedFilters = "";
    try { searchConfig = targetObj.attr("config"); } catch (e) { searchConfig = "search/default.xml"; }
    try { forcedFilters = targetObj.attr("forcedfilters"); } catch (e) { forcedFilters = ""; }
    $('html, body').animate({ scrollTop: targetObj.offset().top - 75 }, 1000);
    try { if (terms != $("._searchTerms").val() && !IsEmptyOrNull($("._searchTerms").val())) terms = $("._searchTerms").val(); } catch (e) { }
    if (targetObj.children("._FilterSection").length <= 0) { targetObj.append("<div class='_FilterSection'></div>"); }
    if (targetObj.children("._ResultsSection").length <= 0) { targetObj.append("<div class='_ResultsSection'></div>"); }
    if (targetObj.children("._PagingSection").length <= 0) { targetObj.append("<div class='_PagingSection'></div>"); }
    resultsSection = targetObj.find("._ResultsSection");
    filterSection = targetObj.find("._FilterSection");
    pagingSection = targetObj.find("._PagingSection");
    //targetObj.css({ "opacity": ".5" });
    if (resultsSection.children().length > 0) {
        //if (filterSection.find("._LoaderPlaceHolder").html() != undefined) {
        //filterSection.find("._LoaderPlaceHolder").html("<img src='/img/loader/K2ComV5/darkbg/arrow-drk-32x32.gif' style='height:32px !important; width:32px !important;'/>");
        resultsSection.mask("Loading Results");
        filterSection.find(".DefaultFormElement").prop("disabled", "disabled");
        filterSection.find("input:checkbox").prop("disabled", "disabled");
    } else {
        resultsSection.html("<div style='min-height:350px;'> </div>");
        resultsSection.mask("Loading Results");
        filterSection.find(".DefaultFormElement").prop("disabled", "disabled");
        filterSection.find("input:checkbox").prop("disabled", "disabled");
        //resultsSection.html("<div style='background:#e2e2e2;'><div class='row' style='text-align:center;padding:20px;'><img src='/img/loader/K2ComV5/lightbg/arrow-64x64.gif' style='height:64px !important; width:64px !important;'/></div></div><div class='row' style='min-height:300px;'></div>");
        //resultsSection.html("<div style='background:#e2e2e2;'><div class='row' style='text-align:center;padding:20px;'><div class='loading'><span></span><span></span><br/><span></span><span></span></div></div></div><div class='row' style='min-height:300px;'></div>");
    }


    var url = "/spssearch?&z=" + Math.random();
    var filters = ""; var scope = "";
    var eventCat = "Search";
    var eventAction = "Execute Search";
    var eventLabel = terms;
    var isRefined = false;
    var changeScope = false;
    if (IsEmptyOrNull(forcedFilters)) {
        if (filterSection.children().length > 0) {
            filterSection.find("._searchRefiner").each(function (e) {
                if ($(this).is(":checkbox")) {
                    if ($(this).prop("checked")) {
                        isRefined = true;
                        filters += $(this).val();
                    }
                } else {
                    filters += $(this).val();
                    if (!IsEmptyOrNull($(this).val())) {
                        isRefined = true;
                        eventLabel += " " + $(this).attr("refiner") + ":" + $(this).find("option:selected").text();
                    }
                }
            });
        } else {
            filters = getQuerystring("f", "");
        }
    } else { filters = forcedFilters; }
    filterSection.find("._searchScope").each(function (e) {
        scope += $(this).val();
        if (!IsEmptyOrNull($(this).val()) && initialScope != scope) {
            changeScope = true;
            eventLabel += " Scope:" + $(this).find("option:selected").text();
        }
    });
    if (!IsEmptyOrNull(initialScope)) scope = initialScope;
    if (start > 0) { eventAction = "Changed Page"; eventLabel += " Start:" + start; }
    else if (isRefined) { eventAction = "Refine Search"; }
    else if (changeScope) { eventAction = "Changed Scope"; }
    else { eventAction = "Execute Search"; }
    var postData = "&q=" + terms + "&f=" + filters + "&start=" + start + "&scope=" + scope + "&c="+searchConfig+"&ignoreDefaults="+ignoreDefaults;
    //alert(postData);
    $.post(url, postData,
            function (data) {
                if (data.length > 0) {
                    //targetObj.css({ "opacity": "1.0" });

                    if (data[0].Error != "" && data[0].Error != null && data[0].Error != "null") {
                        resultsSection.html(data[0].Error);
                    } else {
                        filterSection.html(data[0].FilterUpdates);
                        if (!IsEmptyOrNull(forcedFilters)) { filterSection.children("._AdvancedSearch").hide(); resultsSection.width('auto'); }
                        resultsSection.html(data[0].HTML);
                        filterSection.children(".DefaultFormElement").removeAttr("disabled");
                        resultsSection.removeClass("mask");
                        pagingSection.html(data[0].Paging);
                    }
                    $.each($("div[matchheight], section[matchheight], iframe[matchheight]"), function (e) {
                        $(this).height($($(this).attr("matchheight")).height());
                    });
                    $(".filter label.twisty").click(function (e) {
                        $(this).toggleClass("closed open");
                        $(this).parent().children(".twistychild").toggleClass("closed");
                        $(this).parent().children(".executeFilters").toggleClass("closed");
                        if ($(this).parent().find("._searchRefiner:checked").length > 0) {
                            $(this).parent().children(".clearFilterSection").toggleClass("closed");
                        }
                    });
                    $("._searchRefiner").change(function (e) {
                        if ($(this).parent().parent().parent().find("._searchRefiner:checked").length > 0) {
                            $(this).parent().parent().parent().find("._searchClearButton").removeClass("closed");
                        } else {
                            $(this).parent().parent().parent().find("._searchClearButton").addClass("closed");
                        }
                        if (!$(this).hasClass("_noauto")) {
                            LoadSearch(targetObj, terms, 0, $("._searchScope").val(), true);
                        }
                    });
                    $("._searchScope").change(function (e) {
                        LoadSearch(targetObj, terms, 0,'',true);
                    });
                    $("._SearchResultsPaging").click(function (e) {
                        LoadSearch(targetObj, terms, $(this).attr("target"),'',true);
                    });
                    $("._resetSearchFilters").click(function (e) {
                        $("._searchRefiner").val("");
                        LoadSearch(targetObj, terms, $(this).attr("target"),false);
                    });
                    (!IsEmptyOrNull(filters)) ? $("._resetSearchFilters").show() : $("._resetSearchFilters").hide();
                    $("._searchTerms").val(terms);
                    $("._searchTerms").keyup(function (e) {
                        if (e.keyCode == '13') { e.preventDefault(); LoadSearch(targetObj, $(this).val(), 0, $("._searchScope").val(),false); }
                        if (e.keyCode == '222') { e.preventDefault(); $(this).val($(this).val().replace("'", "’")); }
                    });
                    $("._searchTermsButton").click(function (e) {
                        e.preventDefault(); LoadSearch(targetObj, $("._searchTerms").val(), 0, $("._searchScope").val(),false);
                    });
                    $("._searchClearButton").click(function (e) {
                        e.preventDefault();
                        $(this).parent().find("input:checkbox").prop("checked", "");
                        LoadSearch(targetObj, $("._searchTerms").val(), 0, $("._searchScope").val(), false);
                    });
                    $("._SearchResult").click(function (e) {
                        //e.preventDefault();
                        ////TrackK2Com("Search", "Result Clicked", $(this).attr("href"), $(this).attr("href"));
                        //var url = $(this).attr("href");
                        //url = url + "#tracksearch=" + terms;
                        //location.href = url;
                    });
                    $("._SearchResultDownload").click(function (e) {
                        TrackK2Com("Search", "Download Clicked", $(this).attr("href"), $(this).attr("href"));
                    });
                    $("._SearchResultVideo").click(function (e) {
                        TrackK2Com("Search", "Video Played", $(this).attr("href"), $(this).attr("href"));
                    });
                }
            }
        , "json");
    TrackK2Com(eventCat, eventAction, eventLabel, location.href);
}
function ExecuteFilterBoxFilters(filterTarget, postData, triggerFilter) {
    _FilterBoxChange = null;
    var triggerFilterID = ""; var triggerFieldSQLField = "";
    try { triggerFilterID = triggerFilter.attr("id"); } catch (ex) { }
    try { triggerFilterSQLField = triggerFilter.attr("internalfield"); } catch (ex) { }
    //Get Filter Columns
    var filterColumnIDs = ""; var filterColumnSQLFields = ""; var hashUpdate = ""; var orderBy = "";
    //triggerFilter.parent().parent().find("._FilterBoxFilterOptions").each(function (e) {
    triggerFilter.parents("._filterbox").find("._FilterBoxFilterOptions").each(function (e) {
        if (!IsEmptyOrNull(filterColumnIDs)) filterColumnIDs += "~";
        if (!IsEmptyOrNull(filterColumnSQLFields)) filterColumnSQLFields += "~";
        filterColumnIDs += $(this).attr("id");
        filterColumnSQLFields += $(this).attr("internalfield");
        var selectedFilterText = $(this).children(":selected").text().replace(/ *\([^)]*\) */g, "");
        if (IsEmptyOrNull(selectedFilterText) && !IsEmptyOrNull($(this).val())) selectedFilterText = $(this).val();
        hashUpdate += "/" + selectedFilterText;
        try { $("." + filterColumnSQLFields).html(selectedFilterText); } catch (e) { }
        var columnOrder="";
        try { columnOrder = $(this).children(":selected").attr("sortBy"); } catch (e) { }
        if (!IsEmptyOrNull(columnOrder)) {
            if (!IsEmptyOrNull(orderBy)) orderBy += ",";
            orderBy += columnOrder;
        }
    });
    if (!IsEmptyOrNull(orderBy)) {
        postData += (!IsEmptyOrNull(postData)) ? "&" : "?";
        postData += "SortBy=" + orderBy;
    }


    hashChangeEnabled = false;
    window.location.hash = "!" + hashUpdate;
    if (!IsEmptyOrNull(filterColumnIDs)) {
        postData += (!IsEmptyOrNull(postData)) ? "&" : "?";
        postData += "FilterIDs=" + filterColumnIDs + "&FilterSQLFields=" + filterColumnSQLFields;
    }
    //Get Triggered Filter Column
    if (!IsEmptyOrNull(triggerFilterID)) {
        postData += (!IsEmptyOrNull(postData)) ? "&" : "?";
        postData += "TriggerFilterID=" + triggerFilterID + "&TriggerSQLField=" + triggerFilterSQLField;
    }

    //$("#" + filterTarget).html("<div class='row'><div class='columns twelve'><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/></div></div>");
    //$("#" + filterTarget).css({ 'position': 'relative' });
    //$("#" + filterTarget).append("<div style='position:absolute;top:0px;right:0px;'><img src='/img/loader/K2ComV5/lightbg/arrow-32x32.gif' style='height:32px !important; width:32px !important;'/></div>");
    var targetSection = $("#" + filterTarget).parents("._ContentList");
    if (targetSection.find("._LoaderPlaceHolder").html() != undefined) {
        //targetSection.find("._LoaderPlaceHolder").html("<img src='/img/loader/K2ComV5/lightbg/arrow-32x32.gif' style='height:32px !important; width:32px !important;'/>");
        $("#" + filterTarget).mask("Loading Results");
    } else {
        //targetSection.css({ 'position': 'relative' });
        //targetSection.append("<div style='position:absolute;top:0px;right:" + targetSection.css("paddingRight") + "px;'><img src='/img/loader/K2ComV5/lightbg/arrow-32x32.gif' style='height:32px !important; width:32px !important;'/></div>");
        $("#" + filterTarget).mask("Loading Results");
    }


    $.post("/data/get.xml?z=" + Math.random(), postData,
                    function (data) {
                        if (_FilterBoxChange != null) { return; }
                        if (data.length > 0) {
                            if (data[0].Error != "" && data[0].Error != null && data[0].Error != "null") {
                                jQuery("#" + filterTarget).html(data[0].Error);
                            } else {
                                jQuery("#" + filterTarget).html(data[0].HTML);
                                var currentTotal = jQuery("#" + filterTarget).find("._currentTotal").html();
                                if (currentTotal == "-1") currentTotal = "0";
                                var totalResultsSection = jQuery("#" + filterTarget).parent().find("._totalResults");
                                totalResultsSection.siblings("._FilterBoxFilterOptionsReset").remove();
                                var totalResults = totalResultsSection.html();
                                try { jQuery("#" + filterTarget).parent().find("._filterTotal").html(((currentTotal == totalResults) ? "" : currentTotal + " of ")); } catch (ex) { }
                                if (currentTotal != totalResults) {
                                    totalResultsSection.parent().append("<span style='cursor:pointer;padding-left:15px;text-decoration:none;font-weight:bold;' class='_FilterBoxFilterOptionsReset'>Reset Filters</span>");
                                    $("._FilterBoxFilterOptionsReset").click(function (e) {
                                        $("._FilterBoxFilterOptions").val("");
                                        GetFilterBoxChanges(triggerFilter);
                                    });
                                }
                                if (!IsEmptyOrNull(data[0].FilterUpdates)) {
                                    triggerFilter.parent().parent().find("._FilterBoxFilterOptions").each(function (e) {
                                        //if (triggerFilterID != $(this).attr("id")) {
                                        var selectedVal = $(this).val();
                                        if (k2.helpers.is_ie) {
                                            var filterUpdateString = data[0].FilterUpdates;
                                            var startSlice = filterUpdateString.indexOf("<" + $(this).attr("id") + ">") + $(this).attr("id").length + 2;
                                            var endSlice = filterUpdateString.indexOf("</" + $(this).attr("id") + ">");
                                            var updatedFilters = filterUpdateString.slice(startSlice, endSlice);
                                            $(this).html("<option value=''>(ALL)</option>" + updatedFilters);
                                        } else {
                                            var xmlDoc = $.parseXML("<root>" + data[0].FilterUpdates + "</root>");
                                            $(this).html("<option value=''>(ALL)</option>" + $(xmlDoc).find($(this).attr("id")).xml());
                                        }
                                        if (!IsEmptyOrNull(selectedVal)) $(this).val(selectedVal);
                                        //}
                                    });
                                }
                                //                                SetupLists();
                                //                                AddDirectLinkToContentList(jQuery("#" + filterTarget));
                            }
                        } else { jQuery("#" + filterTarget).html("No results found"); }
                        try { targetSection.find("._LoaderPlaceHolder").html(""); } catch (e) { }
                    }
                , "json");
}

//K2Com v4 Live Filters -- Still works in V5
//jQuery("._LiveFilterShowHide").live("click", function (e) {
$("body").on("click", "._LiveFilterShowHide", function (e) {
    $(this).toggleClass("ShowPlus ShowMinus");
    var html = $(this).html();
    if (html.indexOf("More") > -1) { $(this).html("Show Less"); } else { $(this).html("Show More"); }
    $(this).parents("._LiveFilterSection").children(":not(div .On)").toggleClass("Off");
});
var _LiveFilterChange = null;
//jQuery("._LiveFilterOption").live("click keyup", function (e) {
$("._LinkedList, ._ContentList").on("click keyup", "._LiveFilterOption", function (e) {
    if (e.keyCode == '13') { e.preventDefault(); }
    if (($(this).attr("internalField") == 'search') && e.type == "click" && IsEmptyOrNull($(this).val())) {
        //Do nothing for now.
    }
    else if (IsEmptyOrNull($(this).attr("internalField")) && $(this).hasClass("FakeCheckBox_On")) {
        //Do nothing for now.
    } else {
        if (IsEmptyOrNull($(this).attr("internalField"))) {
            //Turn off all checkbox filters
            $(this).parents("._LiveFilters").children("._LiveFilterSection").find(".FakeCheckBox_On[LiveFilterGroup='" + $(this).attr("LiveFilterGroup") + "']").toggleClass("FakeCheckBox_Off FakeCheckBox_On");
        } else {
            $(this).parents("._LiveFilters").children("._LiveFilterSection").find("._LiveFilterOptionAll[LiveFilterGroup='" + $(this).attr("LiveFilterGroup") + "']").each(function (e) {
                if (!$(this).hasClass("FakeCheckBox_Off")) $(this).toggleClass("FakeCheckBox_Off");
                if ($(this).hasClass("FakeCheckBox_On")) $(this).toggleClass("FakeCheckBox_On");
            });
        }
        if (($(this).attr("internalField") == 'search') && !IsEmptyOrNull($(this).val())) { if ($(this).hasClass("FakeCheckBox_Off")) { $(this).toggleClass("FakeCheckBox_Off FakeCheckBox_On"); } }
        else if (($(this).attr("internalField") == 'search') && IsEmptyOrNull($(this).val())) { if ($(this).hasClass("FakeCheckBox_On")) { $(this).toggleClass("FakeCheckBox_Off FakeCheckBox_On"); } }
        else { $(this).toggleClass("FakeCheckBox_Off FakeCheckBox_On"); }
        var filterTarget = $(this).parents("._LiveFilters").attr("filterTarget");
        //alert(filterTarget);
        var originalFilters = $(this).parents("._LiveFilters").attr("originalFilters");
        var linkedFilters = "";
        try { linkedFilters = $(this).parents("._LinkedList").attr("LinkedFilter").replace(/&/gi, "%26").replace(/=/gi, "%3D"); } catch (e) { linkedFilters = "";}
        originalFilters = originalFilters.replace(linkedFilters, "");
        var liveFilterCollection = {};
        $(this).parents("._LiveFilters").children("._LiveFilterSection").find(".FakeCheckBox_On").each(function (e) {
            var currentValue = "";
            var internalField = $(this).attr("internalField");
            if (!IsEmptyOrNull(internalField)) {
                if (!IsEmptyOrNull(liveFilterCollection[internalField])) currentValue = liveFilterCollection[internalField];
                if (!IsEmptyOrNull(currentValue)) { currentValue += ";" } // else { currentValue = internalField + "="; }
                if (internalField == 'search') { currentValue = $(this).val(); } else { currentValue += $(this).attr("filterValue"); }
                liveFilterCollection[internalField] = currentValue;
            }
        });
        var postData = "";
        for (var key in liveFilterCollection) {
            postData += "%26" + key + "%3D" + liveFilterCollection[key];
        }
        if (!IsEmptyOrNull(linkedFilters)) { postData += linkedFilters.replace(/&/gi, "%26").replace(/=/gi, "%3D"); }
        if (!IsEmptyOrNull(postData)) {
            postData = "&filters=" + postData;
        } else {
            //Make sure All Channels is selected
            $(this).parents("._LiveFilters").children("._LiveFilterSection").find("._LiveFilterOptionAll").each(function (e) {
                if ($(this).hasClass("FakeCheckBox_Off")) $(this).toggleClass("FakeCheckBox_Off");
                if (!$(this).hasClass("FakeCheckBox_On")) $(this).toggleClass("FakeCheckBox_On");
            });
        }
        if (!IsEmptyOrNull(originalFilters)) postData += "&originalFilters=" + originalFilters;
        postData += "&ignoreLiveFilterBox=true";

        if (_LiveFilterChange == null) {
            _LiveFilterChange = setTimeout(function () { ExecuteLiveFilters(filterTarget, postData) }, 1000);
        } else {
            clearTimeout(_LiveFilterChange);
            _LiveFilterChange = null;
            _LiveFilterChange = setTimeout(function () { ExecuteLiveFilters(filterTarget, postData) }, 1000);
        }
    }
});
function ExecuteLiveFilters(filterTarget, postData) {
    _LiveFilterChange = null;
    //$("#" + filterTarget).html("<img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>");
    $("#" + filterTarget).parent().css({ 'position': 'relative' });
    //$("#" + filterTarget).parent().append("<div class='_Loading' style='position:absolute;top:0px;right:0px;'><img src='/img/loader/K2ComV5/lightbg/arrow-32x32.gif' style='height:32px !important; width:32px !important;'/></div>");
    $("#" + filterTarget).mask("Loading Results");
    $.post("/data/get.xml?z=" + Math.random(), postData,
                    function (data) {
                        if (_LiveFilterChange != null) { return; }
                        if (data.length > 0) {
                            if (data[0].Error != "" && data[0].Error != null && data[0].Error != "null") {
                                jQuery("#" + filterTarget).html(data[0].Error);
                            } else {
                                jQuery("#" + filterTarget).html(data[0].HTML);
                                var currentTotal = jQuery("#" + filterTarget).find("._currentTotal").html();
                                if (currentTotal == "-1") currentTotal = "0";
                                var totalResultsSection = jQuery("#" + filterTarget).parent().find("._totalResults");
                                var totalResults = totalResultsSection.html();
                                try { jQuery("#" + filterTarget).parent().find("._filterTotal").html(((currentTotal == totalResults) ? "" : currentTotal + " of ")); } catch (ex) { }
                                //                                SetupLists();
                                //                                AddDirectLinkToContentList(jQuery("#" + filterTarget));
                            }
                        } else { jQuery("#" + filterTarget).html("No results found"); }
                        $("#" + filterTarget).parent().find("._Loading").remove();
                    }
                , "json");
}

//I think this is from the original filterbox....  not the K2ComV5 Filterbox....
//jQuery("._FilterBox").die("click");
//jQuery("._FilterBox").live("click", function (e, optionalTarget) {
$(".PageContainer").off("click", "._FilterBox");
$(".PageContainer").on("click", "._FilterBox", function (e, optionalTarget) {
    e.preventDefault(); if (UnderMaintenance()) return false; var url = (optionalTarget != undefined) ? optionalTarget : $(this).attr("target"); url += ((url.indexOf("?") > -1) ? "&" : "?") + "callingWindow=FilterBox"; jQuery("#jqmContainers").append(GetPopupWindow("FilterBox")); jQuery("#FilterBox").jqm({ filterTarget: $(this).parent().attr("id"), originalFilters: $(this).attr("originalFilters"), onHide: closeAndKill, ajax: url, ajaxText: "<img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/>", ajaxMethod: "json", overlay: 65, modal: false, innerWidthOffset: 40, innerHeightOffset: 40, target: '#FilterBox_Body', onLoad: AddSubmitButton }); jQuery("#FilterBox").jqmShow();
});

function AddSubmitButton(h) {
    //    •w: (jQuery object) The dialog element
    //    •c: (object) The config object (dialog's parameters)
    //    •o: (jQuery object) The overlay
    //    •t: (DOM object) The triggering element
    var popupFilterBox = h.w.parent().find("._FilterBox");
    var originalFilters = popupFilterBox.attr("originalFilters") || h.c.originalFilters;
    h.w.find("table").after("<div><input type='button' class='FormButton2 _FilterBoxFilterButton' target='/data/get.xml' value='Filter Results'/></div>");
    jQuery("._FilterBoxFilterButton").click(function (e) {
        e.preventDefault(); if (UnderMaintenance()) return false;
        var url = $(this).attr("target");
        var filterSplit = originalFilters.split('&');
        var foundFilters = false;
        for (var x = 0; x < filterSplit.length; x++) {
            var nameValue = filterSplit[x].split('=');
            var QSChar = "&"; if (url.indexOf('?') == -1) QSChar = "?";
            switch (nameValue[0].toLowerCase()) {
                case "start":
                case "originalFilters":
                    break;
                case "filters":
                    foundFilters = true;
                    url += QSChar + filterSplit[x];
                    jQuery("#FilterBox").find("._HtmlFormElement").each(function (e) {
                        var filterField = $(this).attr("filterfield");
                        var filterVal = $(this).val();
                        if (!IsEmptyOrNull(filterVal)) {
                            var additionalCondition = "";
                            if (String(filterVal).indexOf("!") > -1) { filterVal = String(filterVal).replace("!", ""); additionalCondition = "!"; }
                            if (String(filterVal).toLocaleLowerCase() == "null" && IsEmptyOrNull(additionalCondition)) additionalCondition = "%3D";
                            url += "%26" + filterField + additionalCondition + "%3D" + String(filterVal).replace(",", ";");
                        }
                    });
                    url += "&originalFilters=" + nameValue[1];
                    break;
                default:
                    if (!IsEmptyOrNull(filterSplit[x])) url += QSChar + filterSplit[x];
                    break;
            }
        }
        if (!foundFilters) {
            url += QSChar + "filters=";
            jQuery("#FilterBox").find("._HtmlFormElement").each(function (e) {
                var filterField = $(this).attr("filterfield");
                var filterVal = $(this).val();
                if (!IsEmptyOrNull(filterVal)) {
                    var additionalCondition = "";
                    if (String(filterVal).indexOf("!") > -1) { filterVal = String(filterVal).replace("!", ""); additionalCondition = "!"; }
                    if (String(filterVal).toLocaleLowerCase() == "null" && IsEmptyOrNull(additionalCondition)) additionalCondition = "%3D";
                    url += "%26" + filterField + additionalCondition + "%3D" + String(filterVal).replace(",", ";");
                }
            });
            url += "&originalFilters=";
        }

        jQuery("#FilterBox").jqmHide();
        if (h.c.filterTarget != false) {
            jQuery("#" + h.c.filterTarget).html("<img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/>");
            var targetURL = url.split("?");
            var postURL = targetURL[0];
            var postData = targetURL[1].replace("?", "&");
            $.post(postURL, postData,
                    function (data) {
                        if (data.length > 0) {
                            if (data[0].Error != "" && data[0].Error != null && data[0].Error != "null") {
                                jQuery("#" + h.c.filterTarget).html(data[0].Error);
                            } else {
                                jQuery("#" + h.c.filterTarget).html(data[0].HTML);
                                //                                SetupLists();
                            }
                        } else { jQuery("#" + h.c.filterTarget).html("No results found"); }
                    }
                , "json");
        } else {
            jQuery("#jqmContainers").append(GetPopupWindow("InlineForm")); jQuery("#InlineForm").jqm({ onHide: closeAndKill, ajax: url, ajaxText: "<img src='/img/loader/K2ComV5/darkbg/arrow-drk-64x64.gif' style='height:64px !important; width:64px !important;'/>", ajaxMethod: "json", overlay: 65, modal: false, innerWidthOffset: 40, innerHeightOffset: 40, target: '#InlineForm_Body', onLoad: SetupForm }); jQuery("#InlineForm").jqmShow();
        }
    });
    //<span class='_InlineForm' target='/data/get.xml?xmlDoc=file:/GetContentList/BreadCrumbCategoryRecordList.xml&action=getcontentlistjson&Filters=%26Text10%3D0160%26siteid%3D%3D1'>Events</span
}
//$("._ShowHideMetaTags").live("click", function (e) {
$(".PageContainer").on("click","._ShowHideMetaTags", function (e) {
    $(this).parent().parent().children("._OptionListItem").removeClass("Off");
    $(this).parent().hide();
});
function SetupFormPreventReturn() {
    SetupForm();
    jQuery("#jqmContainers").off("keypress");
    jQuery("#jqmContainers").on("keypress", function (evt) {
        var $targ = $(evt.target);
        if (evt.which == 13 && !$targ.is("textarea")) return false;
    });
}

function SetupForm() {
    jQuery("#jqmContainers").off("keypress");
    $(":file").makeAsyncUploader({ upload_url: "/files/uploadpost", flash_url: '/scripts/jquery/swfupload.swf', button_image_url: '/scripts/jquery/blankButton.png', file_size_limit: "1024 MB", disableDuringUpload: "#FormButton" }); SetupRows(); SetupADPicker();
    SetupDropDowns();
    SetupFancyDD();
    FixPopupHorizontalScroll();
    SetupADSearcher();
    $("input[cqs]").each(function (e) {
        $(this).val(getQuerystring($(this).attr("cqs"), ""));
    });
    var _eventCat = ""; var _eventLabel = ""; var _eventAction = ""; var _fakePage = "";
    try { _eventCat = $("input[id='OpenEventCategory']").val(); } catch (e) { }
    try { _eventLabel = $("input[id='OpenEventLabel']").val(); } catch (e) { }
    try { _eventAction = $("input[id='OpenEventAction']").val(); } catch (e) { }
    try { _fakePage = $("input[id='OpenFakePage']").val(); } catch (e) { }
    if (!IsEmptyOrNull(_eventCat)) TrackAll(_eventCat, _eventAction, _eventLabel, _fakePage);
    //    SetupLists();
}

function FixPopupHorizontalScroll() {
    var obj = jQuery("#jqmContainers").children(":first");
    //Delay fix until window is ready.
    if (obj.is(':animated')) {
        $.doTimeout('FixPopup', 250, function () {
            FixPopupHorizontalScroll();
        });
    } else {
        var popupSection = obj.find(".PopupBody");
        var scrollWidth = obj.width() - popupSection.width();
        if (scrollWidth < 60) popupSection.css({ "overflow-x": "hidden" });
    }
}

function SetupADPicker() {
    jQuery("._ADPicker").focus(function (e) {
        var adpickerHTML = "<div class='GreenSubHead' style='width:98%;text-align:left;padding:5px;border-bottom:solid 1px #4d4d4d;'>Search: <input type='textbox' id='ADPicker_Search'> <input id='ADPicker_SearchButton' type='button' value='Search' class='FormButton2'></div><table><tr><td class='GreenSubHead' style='width:175px;text-align:center;'>Results</td><td style='width:50px;'>&nbsp;</td><td class='GreenSubHead' style='width:175px;text-align:center;'>Selected Users</td></tr><tr><td style='width:175px;text-align:center;'><select id='ADPicker_Results' size='10' multiple='multiple'></select></td><td><input type='button' class='FormButton2' style='width:125px;cursor:hand;' value='Add --&gt;' id='ADPicker_AddButton'/><br><br><input type='button' class='FormButton2' style='width:125px;cursor:hand;' value='&lt;-- Remove' id='ADPicker_RemoveButton'/></td><td style='width:175px;text-align:center;'><select multiple='multiple' id='ADPicker_NewResults' size='10'></select></td></tr></table><div style='padding:5px;'><input class='FormButton2' style='width:125px;cursor:hand;' type='button' id='ADPicker_CloseButton' value='Close'/></div>"
        jQuery("#jqmContainers").append(GetPopupWindow("ADPicker"));
        jQuery("#ADPicker").jqm({ onHide: closeAndKill, html: adpickerHTML, ajax: "", ajaxText: "", overlay: 65, modal: false, width: 975, height: 600, innerWidthOffset: 40, innerHeightOffset: 40, target: '#ADPicker_Body', onLoad: SetupADPickerFunctions });
        jQuery("#ADPicker").jqmShow();
    });
}
function SetupADSearcher() {
    var _ADSearchPressing;
    $("._ADSearchResult").off("click");
    $("._ADSearchResult").on("click", function (e) { RemoveADUser($(this), $("._ADSearch").attr("id"), $("._ADSearch").attr("ResultsTextArea"), $("._ADSearch").attr("ResultsFormat")); });
    $("._ADSearch").on("focus", function (e) {
        $("._ADSearchResultBox").remove();
    });
    $("._ADSearch").on("keyup", function (e) {
        $("._ADSearchResultBox").remove();
        var obj = $(this);
        var delay = 1000;
        if (e.keyCode == 13) { e.preventDefault; delay = 0; }
        if (obj.val().length > 2) {
            if (_ADSearchPressing) {
                clearTimeout(_ADSearchPressing);
                _ADSearchPressing = setTimeout(function () { ADSearch(obj.val(), obj.attr("id"), obj.attr("ResultsTextArea"), obj.attr("ResultsFormat")) }, delay);
            } else {
                _ADSearchPressing = setTimeout(function () { ADSearch(obj.val(), obj.attr("id"), obj.attr("ResultsTextArea"), obj.attr("ResultsFormat")) }, delay);
            }
        }
    });
    var ADSearch = function (searchFor, searchBoxID, resultsBoxID, resultsFormat) {
        $("._ADSearchResultBox").remove();
        var postData = "&q=" + searchFor;
        $("#" + searchBoxID).parent().append($("<span style='position:absolute;top:9px;right:13px' id='" + searchBoxID + "_loading'><img src='/img/loader/loader16.gif'/></span>"));
        $.post("/forms/adsearch.xml", postData,
            function (data) {
                if (data.length > 0) {
                    if (data.length == 1)
                    {
                        AddADUser(data[0], searchBoxID, resultsBoxID, resultsFormat);
                    }
                    else
                    {
                        var resultsBox = "<div class='_ADSearchResultBox' style='position:absolute;top:32px;background-color:#4d4d4d;color:#f2f2f2;width:91%;z-index:1;'>";
                        for (var x = 0; x < data.length; x++) {
                            resultsBox += "<div class='_ADSearchResultOption' index='"+x+"' style='cursor:pointer;'>" + data[x].name + "</div>";
                        }
                        resultsBox += "</div>";
                        $("#" + searchBoxID).after(resultsBox);
                        $("._ADSearchResultOption").off("click");
                        $("._ADSearchResultOption").on("click", function (e) {
                            AddADUser(data[Number($(this).attr("index"))], searchBoxID, resultsBoxID, resultsFormat);
                            $("._ADSearchResultBox").remove();
                        });
                    }
                    $("#" + searchBoxID + "_loading").remove();
                }
            }
        , "json");
    }
    var AddADUser = function(userObj, searchBoxID, resultsTextArea, resultsFormat) {
        $("#" + searchBoxID).after("<div style='cursor:pointer;height:24px;' class='" + searchBoxID + "_result _ADSearchResult' email='" + userObj.email + "' account='" + userObj.account + "'>" + userObj.name + "<div style='cursor:pointer;width:23px;height:23px;position:absolute;right:5px;' class='sprite dark-x'></div></div>");
        $("#" + searchBoxID).val("");
        $("#RouteTo").val("");
        $("." + searchBoxID + "_result").click(function (e) {
            RemoveADUser($(this), searchBoxID, resultsTextArea, resultsFormat);
        });
        $("."+searchBoxID+"_result").each(function (e) {
            if (!IsEmptyOrNull($("#" + resultsTextArea).val())) $("#" + resultsTextArea).val($("#" + resultsTextArea).val() + "\n");
            $("#" + resultsTextArea).val($("#" + resultsTextArea).val() + $(this).attr("email") + "," + $(this).attr("account"));
        });
    }
    var RemoveADUser = function (userObj, searchBoxID, resultsTextArea, resultsFormat) {
        userObj.remove();
        $("#" + resultsTextArea).val("");
        $("." + searchBoxID + "_result").each(function (e) {
            if (!IsEmptyOrNull($("#" + resultsTextArea).val())) $("#" + resultsTextArea).val($("#" + resultsTextArea).val() + "\n");
            $("#" + resultsTextArea).val($("#" + resultsTextArea).val() + $(this).attr("email") + "," + $(this).attr("account"));
        });

    }
}

function FocusFirstField() { jQuery("#jqmContainers").find("input[type='text']:first").focus(); }
/**************************K2Com_V5_OnlineTrials*************************************/
jQuery("._OnlineTrials").each(function (e) {
    //Get Status Field
    var trialStatusElem = $(this).find("._TrialStatus");
    var trialDetailsSection = $(this).find("._TrialDetails");
    trialStatusElem.html("<img src='/img/k2comv5/preloader.gif' class='preloader' />");

    //Remove All Contents from page
    $("._TrialDescriptions").hide();
    $(".trial-setup").hide();
    $(".setup-trial-box").hide();
    $(".completion-times").hide();


    var isAgent = function (ua_types) {
        var uagent = navigator.userAgent.toLowerCase();
        var is_agent = false;

        if (typeof (ua_types) == 'string') {
            is_agent = !(uagent.indexOf(ua_types) == -1)
        }
        else if (typeof (ua_types) == 'object') {
            for (var type in ua_types) {
                is_agent = is_agent || !(uagent.indexOf(ua_types[type]) == -1);
                if (is_agent) {
                    break;
                }
            }
        }

        return is_agent;
    };

    var ismobile = isAgent(['ipad', 'iphone', 'ipod', 'android', 'mobile']);

    if (!ismobile) {
        //Get Signed In Status
        switch (_userStatus) {
            case "_Guest":
            case "":
                trialStatusElem.html("<span class='_InlineForm' targetclass='K2V5DefaultPopup' addroundcorners='false' target='/forms/form_signin.xml'>Please Sign In</span> or <span class='_InlineForm' targetclass='K2V5DefaultPopup' addroundcorners='false' target='/forms/form_register.xml'>Register</span>");
                $("._NotSignedIn").show();
                $(".setup-trial-box").show();
                $(".notes").show();
                break;
            case "_RegisteredUser":
                trialStatusElem.html("Please Validate Your Account");
                $("._SignedIn_NotValidated").show();
                $(".setup-trial-box").show();
                $(".notes").show();
                break;
            case "_ValidatedUser":
                GetMyTrials();
                break;
        }
    } else {
        $("._MobileBrowser").show();
        trialStatusElem.html("Please switch to a desktop browser");
        TrackAll("Try Now", "Mobile Browser Access Prevented", _userName, "");
    }

    $("._RequestTrialLink").click(function (e) {
        e.preventDefault();
        var activeLabel = $(this).find(".On");
        if (activeLabel.hasClass("Request")) {
            PopupForm($(this), e, undefined);
        } else if (activeLabel.hasClass("Expired")) {
            $('#Expired-Trial').reveal();
        } else if (activeLabel.hasClass("Existing")) {
            var regExp = new RegExp("[&\?]page=triallist", "gi");
            var selectedItem = $(this).attr("class").replace("content-cta-green-link ", "").replace("_RequestTrialLink", "").replace("_LINK", "");
            var newURL = location.href.replace(regExp, "");
            newURL += ((newURL.indexOf("?") > -1) ? "&" : "?") + "page=" + selectedItem;
            location.href = newURL;
        }
    });

    function GetMyTrials() {
        var filename = "/k2trynowv2/GetMyTrials";
        var validTrials = ""; try { validTrials = $("#_ValidTrials").val(); } catch (e) { validTrials = ""; }
        try { if (!IsEmptyOrNull(validTrials)) validTrials += ","; if (validTrials == undefined) validTrials = "ALL"; } catch (e) { }
        var postData = "&ValidTrials=" + validTrials;
        $.post(filename, postData,
            function (data) {
                if (data.length == 0) {
                    //No Trials
                    trialStatusElem.html("Request Free Trial Access");
                    $("._SignedIn_NoTrials").show();
                    $(".setup-trial-box").show();
                    $(".notes").show();
                } else if (!IsEmptyOrNull(data[0].Error)) {
                    //Show Error
                    alert("An error occurred: " + data[0].Error);
                } else {
                    $(".setup-trial-box").show();
                    //loop through each trial
                    var currentDate = new Date();
                    var totalTrials = 0;
                    var expiredTrials = 0;
                    var controlPanelSelectHTML = "<option value=''>Select a Trial</option>";
                    for (var i = 0; i < data.length; i++) {
                        var trialName = data[i].TrialName;
                        if (validTrials != "ALL") {
                            var validTrialNames = validTrials.split(",");
                            var allowTrial=false;
                            for (var t = 0; t < validTrialNames.length;t++) {
                                if (trialName.indexOf(validTrialNames[t]) >-1) { allowTrial = true; }
                            }
                            if (!allowTrial) continue;
                        }
                        //if (validTrials.indexOf(trialName + ",") == -1 && validTrials != "ALL") continue;
                        var dateString = data[i].ExpireDate;
                        var expireDate = new Date(parseInt(dateString.replace(/\/Date\((\d+)\)\//, '$1')));
                        var trialClassName = trialName.replace(/ /gi, "_").toUpperCase();
                        if (!IsEmptyOrNull(trialClassName)) {
                            var awsSPS = ((IsEmptyOrNull(data[i].SPSSite)) ? "AWS" : "SPS");
                            totalTrials++;
                            try { $("." + trialClassName).show(); } catch (e) { }
                            if (expireDate < currentDate) {
                                try { $("." + trialClassName).find(".text").removeClass("On").addClass("Off"); } catch (e) { }
                                try { $("." + trialClassName).find(".Expired").toggleClass("On Off"); } catch (e) { }
                                expiredTrials++;
                                controlPanelSelectHTML += "<option trialtype='" + awsSPS + "' trialid='" + data[i].ID + "' value='" + i + "' expired='true' status='" + data[i].Status + "'>" + trialName.replace(/_/gi, " ") + " -- Expired</option>";
                            } else if (expireDate > currentDate) {
                                try { $("." + trialClassName).find(".text").removeClass("On").addClass("Off"); } catch (e) { }
                                try { $("." + trialClassName).find(".Existing").toggleClass("On Off"); } catch (e) { }
                                controlPanelSelectHTML += "<option trialtype='" + awsSPS + "' trialid='" + data[i].ID + "' value='" + i + "' expired='false' status='" + data[i].Status + "'>" + trialName.replace(/_/gi, " ") + "</option>";
                            } else {
                                controlPanelSelectHTML += "<option trialtype='" + awsSPS + "' trialid='" + data[i].ID + "' value='" + i + "' expired='false' status='" + data[i].Status + "'>" + trialName.replace(/_/gi, " ") + "</option>";
                            }
                        }
                    }
                    $("#_ControlPanelTrials").html(controlPanelSelectHTML);

                    switch (getQuerystring("page", "")) {
                        case "triallist":
                            trialStatusElem.html("Request Free Trial Access");
                            $("._SignedIn_NoTrials").show();
                            $(".setup-trial-box").show();
                            $(".notes").show();
                            break;
                        case "checkstatus":
                        case "creating":
                            trialStatusElem.html("Processing Trial Request");
                            $("._SignedIn_Creating").show();
                            $(".setup-trial-box").show();
                            $(".notes").show();
                            $("#_ControlPanelTrials").val($("#_ControlPanelTrials").children("option[status='creating']:first").val());
                            if (IsEmptyOrNull($("#_ControlPanelTrials").val())) {
                                $("._SignedIn_Creating").hide();
                                $("#_ControlPanelTrials").val($("#_ControlPanelTrials").children("option[expired='false']:first").val());
                            }
                            SwitchTrials();
                            break;
                        default:
                            if (expiredTrials >= totalTrials) {
                                trialStatusElem.html("Request Free Trial Access");
                                $("._SignedIn_NoTrials").show();
                                $(".setup-trial-box").show();
                                $(".notes").show();
                            } else if (!IsEmptyOrNull(getQuerystring("page", ""))) {
                                var requestedTrial = getQuerystring("page", "");
                                $("#_ControlPanelTrials option").each(function (e) {
                                    if ($(this).text().replace(/ /gi, "_").toUpperCase() == requestedTrial.replace(/ /gi, "_").toUpperCase()) {
                                        $("#_ControlPanelTrials").val($(this).val());
                                    }
                                });
                                SwitchTrials();
                            } else if ((totalTrials - expiredTrials) == 1 && totalTrials > 0) {
                                $("#_ControlPanelTrials").val($("#_ControlPanelTrials").children("option[expired='false']:first").val());
                                SwitchTrials();
                            } else {
                                trialStatusElem.html("Select a Trial to Launch");
                                $(".completion-times").hide();
                                $("._TrialDescriptions").hide();
                                $("._SignedIn_MultipleTrialsActive").show();
                                //SwitchTrials();
                            }
                            break;
                    }
                }

                function SwitchTrials() {
                    $.doTimeout('statuscheck');
                    $("._Trial").hide();
                    $("._ControlPanel").hide();
                    $("._TrialDescriptions").hide();
                    $("._TrialInfo").hide();
                    $(".trial-setup").hide();
                    if ($("#_ControlPanelTrials").children().length > 2) $("._SignedIn_MultipleTrialsActive").show();
                    trialStatusElem.html("Select a Trial to Launch");
                    $(".completion-times").hide();
                    //$("#_ControlPanelTrials").show();
                    if (IsEmptyOrNull($("#_ControlPanelTrials").val())) return;

                    var selectedTrialClassName = $("#_ControlPanelTrials option:selected").text().replace(/ /gi, "_").replace("_--_Expired", "").toUpperCase();
                    var selectedTrial = data[$("#_ControlPanelTrials").val()];
                    $("._TrialNotSelected").hide();
                    $("." + selectedTrialClassName).show();
                    $("._SignedIn_HasActiveTrials").show();
                    $("." + selectedTrialClassName.toUpperCase() + "_LINK").hide();
                    $("._ControlPanel").show();
                    $("._ControlPanelOptions").html(selectedTrial.HTML);
                    var awsSPS = ((IsEmptyOrNull(selectedTrial.SPSSite)) ? "AWS" : "SPS");
                    switch ($("#_ControlPanelTrials option:selected").attr("status").toLowerCase()) {
                        case "creating":
                            trialStatusElem.html("Processing Trial Request");
                            $("._SignedIn_Creating").show();
                            $(".notes").show();
                            $.doTimeout('statuscheck', 5000, function () {
                                trialStatusElem.html("Updating Status");
                                UpdateTrialStatusCreating(selectedTrial.ID, selectedTrial.TrialName, "|running|stopped|pending approval|", awsSPS);
                            });
                            break;
                        case "pending":
                        case "pending approval":
                            trialStatusElem.html("Pending Approval");
                            $("._SignedIn_Creating").show();
                            $(".notes").show();
                            $.doTimeout('statuscheck', 0, function () {
                                trialStatusElem.html("Updating Status");
                                UpdateTrialStatusCreating(selectedTrial.ID, selectedTrial.TrialName, "|running|stopped|pending approval|", awsSPS);
                            });
                            break;
                        case "pending extension approval":
                        default:
                            $(".completion-times").hide();
                            $("._TrialInfo").show();
                            break;
                    }
                    $("._TrialUser").html(selectedTrial.SPSUser);
                    trialStatusElem.html(selectedTrial.Status);
                    $("._TrialPassword").html(selectedTrial.SPSPass);
                    var trialExpireDateString = selectedTrial.ExpireDate;
                    var trialExpireDate = new Date(parseInt(trialExpireDateString.replace(/\/Date\((\d+)\)\//, '$1')));
                    $("._TrialExpires").html(dateFormat(trialExpireDate, "m/d/yy"));
                }

                function UpdateTrialStatusCreating(trialID, trialname, expectedstatus, trialSource) {
                    //Get latest status for current ID
                    var postData = "&TrialType=" + trialSource + "&TrialID=" + trialID;
                    var filename = "/k2trynowv2/GetSingleTrial";
                    $.post(filename, postData,
                        function (data) {
                            if (data.length == 0) {
                                //No Trial Found  Do Something!?
                            } else if (!IsEmptyOrNull(data[0].Error)) {
                                //Show Error
                                alert("An error occurred: " + data[0].Error);
                            } else {
                                var currentStatus = data[0].Status.toLowerCase();
                                if (expectedstatus.indexOf("|" + currentStatus + "|") > -1) {
                                    $("._ControlPanelOptions").html(data[0].HTML);
                                    switch (currentStatus) {
                                        case "pending approval":
                                            trialStatusElem.html("Pending Approval");
                                            $(".completion-times").hide();
                                            $(".trial-setup").hide();
                                            $(".notes").show();
                                            $("._SignedIn_PendingApproval").show();
                                            break;
                                        default:
                                            trialStatusElem.html("Set-up Complete");
                                            $("._SignedIn_Creating").hide();
                                            $("._SignedIn_Ready").show();
                                            $("._TrialConnect").mouseover(function (e) {
                                                $(".trial-setup._SignedIn_Ready").hide();
                                                $("._TrialInfo").show();
                                            });
                                            $("._TrialConnect").mouseout(function (e) {
                                                $(".trial-setup._SignedIn_Ready").show();
                                                $("._TrialInfo").hide();
                                            });
                                            $("._TrialConnect").click(function (e) {
                                                e.preventDefault();
                                                $("._TrialConnect").each(function (evt) {
                                                    try {
                                                        if ($(this).hasClass("_TrialControlPanelAction")) {
                                                            var trialInfo = $("#_ControlPanelTrials option:selected");
                                                            var trialID = trialInfo.attr("trialid");
                                                            var trialType = trialInfo.attr("trialtype");
                                                            $("._ControlPanelUpdating").show();
                                                            $("._ControlPanelOptions").hide();
                                                            UpdateTrialStatusActionClicked(trialID, "connect", trialType, "CheckStatus");

                                                        }
                                                    } catch (e) { }
                                                    try {
                                                        if (!IsEmptyOrNull($(this).children("a").attr("href")) && $(this).children("a").attr("href") != "#") {
                                                            window.open($(this).children("a").attr("href"), "OnlineTrial");
                                                        }
                                                    } catch (e) { }
                                                });
                                            });
                                            break;
                                    }
                                } else {
                                    SwitchTrials();
                                }

                            }
                        }
                        , "json");

                }
                function UpdateTrialStatusActionClicked(trialID, expectedstatus, trialSource, action) {
                    $.doTimeout('statuscheck');
                    var postData = "&TrialType=" + trialSource + "&TrialID=" + trialID + "&ExpectedStatus=" + expectedstatus;
                    var filename = "/k2trynowv2/" + action;
                    $.post(filename, postData,
                        function (data) {
                            if (data.length == 0) {
                                //No Trial Found  Do Something!?
                            } else if (!IsEmptyOrNull(data[0].Error)) {
                                //Show Error
                                alert("An error occurred: " + data[0].Error);
                            } else {
                                switch (expectedstatus) {
                                    case "connect":
                                        var errmsg = "";
                                        if (data[0].Status == "running") { download("/k2trynowv2/connect.rdp?TrialType=" + trialSource + "&TrialID=" + trialID); }
                                        else {
                                            errmsg = "<div class='MessageBox Error'>Your machine is no longer running, please start your machine.</div>";
                                        }
                                        $("._ControlPanelOptions").show();
                                        $("._ControlPanelUpdating").hide();
                                        $("._ControlPanelOptions").html(errmsg + data[0].HTML);
                                        trialStatusElem.html(data[0].Status);
                                        break;
                                    case "cancel":
                                        trialStatusElem.html("Cancelling Trial");
                                        $.doTimeout('statuscheck', 30000, function () {
                                            trialStatusElem.html("Updating Status");
                                            UpdateTrialStatusActionClicked(trialID, "cancelstatus", trialSource, "CheckStatus");
                                        });
                                        break;
                                    case "extendstatus":
                                    case "cancelstatus":
                                        $("._ControlPanelOptions").show();
                                        $("._ControlPanelUpdating").hide();
                                        $("._ControlPanelOptions").html(data[0].HTML);
                                        trialStatusElem.html(data[0].Status);
                                        var trialExpireDateString = data[0].ExpireDate;
                                        var trialExpireDate = new Date(parseInt(trialExpireDateString.replace(/\/Date\((\d+)\)\//, '$1')));
                                        $("._TrialExpires").html(dateFormat(trialExpireDate, "m/d/yy"));
                                        break;
                                    case "extend":
                                        $.doTimeout('statuscheck', 5000, function () {
                                            trialStatusElem.html("Updating Status");
                                            UpdateTrialStatusActionClicked(trialID, "extendstatus", trialSource, "CheckStatus");
                                        });
                                        break;
                                    default:
                                        var currentStatus = data[0].Status.toLowerCase();
                                        trialStatusElem.html(currentStatus);
                                        if (expectedstatus.toLowerCase() == currentStatus) {
                                            $("._ControlPanelOptions").show();
                                            $("._ControlPanelUpdating").hide();
                                            $("._ControlPanelOptions").html(data[0].HTML);
                                            switch (currentStatus) {
                                                case "running":
                                                    trialStatusElem.html("Running");
                                                    break;
                                                case "stopped":
                                                    trialStatusElem.html("Stopped");
                                                    break;
                                                default:
                                                    break;
                                            }
                                        } else {
                                            $.doTimeout('statuscheck', 5000, function () {
                                                trialStatusElem.html("Updating Status");
                                                UpdateTrialStatusActionClicked(trialID, expectedstatus, trialSource, "CheckStatus");
                                            });

                                        }
                                        break;
                                }

                            }
                        }
                        , "json");
                }

                $("#_ControlPanelTrials").change(function (e) {
                    e.preventDefault();
                    SwitchTrials();

                });

                //$("._TrialControlPanelAction").die("click");
                //$("._TrialControlPanelAction").live("click", function (e) {
                $(".PageContainer").off("click", "._TrialControlPanelAction");
                $(".PageContainer").on("click", "._TrialControlPanelAction", function (e) {
                    e.preventDefault();
                    var trialInfo = $("#_ControlPanelTrials option:selected");
                    var trialID = trialInfo.attr("trialid");
                    var trialType = trialInfo.attr("trialtype");

                    var actionType = "";
                    if ($(this).hasClass("_TrialConnect")) actionType = "connect.rdp";
                    if ($(this).hasClass("_TrialStartup")) actionType = "startup";
                    if ($(this).hasClass("_TrialShutdown")) actionType = "shutdown";
                    if ($(this).hasClass("_TrialExtend")) actionType = "extend";
                    if ($(this).hasClass("_TrialCancel")) actionType = "cancel";
                    if ($(this).hasClass("_TrialContact")) actionType = "contact";

                    switch (actionType) {
                        case "connect.rdp":
                            $("._ControlPanelUpdating").show();
                            $("._ControlPanelOptions").hide();
                            UpdateTrialStatusActionClicked(trialID, "connect", trialType, "CheckStatus");
                            break;
                        case "startup":
                            $("._ControlPanelUpdating").show();
                            $("._ControlPanelOptions").hide();
                            UpdateTrialStatusActionClicked(trialID, "running", trialType, actionType);
                            break;
                        case "shutdown":
                            $("._ControlPanelUpdating").show();
                            $("._ControlPanelOptions").hide();
                            UpdateTrialStatusActionClicked(trialID, "stopped", trialType, actionType);
                            break;
                        case "extend":
                            $("._ControlPanelUpdating").show();
                            $("._ControlPanelOptions").hide();
                            UpdateTrialStatusActionClicked(trialID, "extend", trialType, actionType);
                            break;
                        case "cancel":
                            $("#ConfirmCancel-Trial").reveal();
                            $("._ConfirmCancelTrial").click(function (e) {
                                $("._ControlPanelUpdating").show();
                                $("._ControlPanelOptions").hide();
                                $("#ConfirmCancel-Trial").trigger('reveal:close');
                                UpdateTrialStatusActionClicked(trialID, "cancel", trialType, actionType);
                            });
                            break;
                        case "contact":
                            PopupForm($(this), e);
                            break;
                        default:
                            break;
                    }
                });


            }
        , "json");
    }
});
jQuery("._OnlineTrialsList").each(function (e) {
    GetTrialList($(this),true);
});

function GetTrialList(obj,useDefaults) {
    var html = "";
    var filename = obj.attr("target");
    var defaults = "";
    if (useDefaults) try { defaults = obj.attr("defaults"); } catch (e) { }
    var templateSection = obj.attr("template");
    var displayTemplate = "";
    if (IsEmptyOrNull(templateSection)) {
        displayTemplate = "<div class='row' style='border-bottom:solid 1px #4d4d4d;padding-bottom:8px;padding-top:8px;padding-left:0px !important;;padding-right:0px !important;;margin:0px !important;'><div class='columns four'><b>Email:</b> {UserEmail}<br/><b>Name:</b> {firstname} {lastname}<br/><b>Company:</b> {company}<br/><b>Created:</b> {createdate}<br/><b>Expires:</b> {expiredate}<br/><b>Extensions:</b> {trialextensions}</div><div class='columns four'><b>Trial Name:</b> {TrialName}<br/><b>Trial Login:</b> {login}<br/><b>Trial Password:</b> {password}<br/>{additionallinks}<b>Trial Status:</b> {status}</div><div class='columns four' style='padding:0px !important'>{Controls}</div></div>";
    } else {
        displayTemplate = $(templateSection).html();
    }
    var showExpired = false; var showRunning = true; var showStopped = false; var showPending = true; var showPublic = true; var showAll = true; var showPartner = true; var showTraining = true; var showAzure = true; var showAWS = true; var showSPS = true;
    var search = "";
    showExpired = $("#_K2NowListFilter_ShowExpired").is(":checked");
    showRunning = $("#_K2NowListFilter_ShowRunning").is(":checked");
    showStopped = $("#_K2NowListFilter_ShowStopped").is(":checked");
    showPending = $("#_K2NowListFilter_ShowPending").is(":checked");
    showPublic = $("#_K2NowListFilter_ShowPublic").is(":checked");
    showTraining = $("#_K2NowListFilter_ShowTraining").is(":checked");
    showAll = $("#_K2NowListFilter_ShowK2Field").is(":checked");
    showPartner = $("#_K2NowListFilter_ShowPartners").is(":checked");
    showAWS = $("#_K2NowListFilter_ShowAWS").is(":checked");
    showAzure = $("#_K2NowListFilter_ShowAzure").is(":checked");
    showSPS = $("#_K2NowListFilter_ShowSPS").is(":checked");
    search = jQuery("._K2NowListSearch").val();
    var hash = window.location.hash;
    if (!IsEmptyOrNull(hash)) {
        var hashParts = hash.split("=");
        if (hashParts[0].toLowerCase() == "#key") {
            search = hashParts[1]; showExpired = true; showRunning = true; showStopped = true; showPending = true; showPublic = true; showPartner = true; showTraining = true; showAll = true; showAzure = true; showAWS = true; showSPS = true;
            window.location.hash = "";
        }
    }
    obj.html("<img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>");

    var postData = "&ShowExpired=" + showExpired + "&ShowRunning=" + showRunning + "&ShowStopped=" + showStopped + "&ShowPending=" + showPending + "&ShowPublic=" + showPublic + "&ShowPartners=" + showPartner + "&ShowTraining=" + showTraining + "&ShowK2Field=" + showAll + "&ShowAzure=" + showAzure + "&ShowAWS=" + showAWS + "&ShowSPS=" + showSPS;
    if (IsEmptyOrNull(hash) && !IsEmptyOrNull(defaults)) { postData = defaults; }
    if (!IsEmptyOrNull(search)) postData += "&search=" + search;
    if (!IsEmptyOrNull(getQuerystring("instanceid", ""))) postData += "&instanceid=" + getQuerystring("instanceid", "");

    $.post(filename, postData,
            function (data) {
                var regExp = new RegExp(/{(.*?)}/gi);
                for (var x = 0; x < data.length; x++) {
                    if (data[x].TrialName == "filters") {
                        html += data[x].HTML;
                    } else {
                        var createDate = new Date(parseInt(data[x].CreateDate.replace(/\/Date\((\d+)\)\//, '$1'))); var createDateFormated = "n/a"; try { createDateFormated = dateFormat(createDate, "m/d/yy h:MM TT"); } catch (e) { }
                        var expireDate = new Date(parseInt(data[x].ExpireDate.replace(/\/Date\((\d+)\)\//, '$1'))); var expireDateFormated = "n/a"; try { expireDateFormated = dateFormat(expireDate, "m/d/yy h:MM TT"); } catch (e) { }
                        var lastRunning= new Date(parseInt(data[x].LastRunning.replace(/\/Date\((\d+)\)\//, '$1'))); var lastRunningDateFormated = "n/a"; try { lastRunningDateFormated = dateFormat(lastRunning, "m/d/yy h:MM TT"); } catch (e) { }
                        var itemHTML = displayTemplate;
                        var matches = itemHTML.match(regExp);
                        for (var i = 0; i < matches.length; i++) {
                            try {
                                var newValue = "";
                                var trialType = "AWS";
                                if (!IsEmptyOrNull(data[x].SPSSite)) trialType = "SPS";
                                if (!IsEmptyOrNull(data[x].RequestedBy)) trialType = "AZURE";
                                switch (matches[i].replace("{", "").replace("}", "").toLowerCase()) {
                                    case "controls":
                                        try { newValue = data[x].HTML.replace("class='_ControlPanel'", "class='_ListControlPanel' id='trial_" + data[x].ID + "' trialtype='" + trialType + "'"); } catch (e) { newValue = data[x].HTML;}
                                        break;
                                    case "useremail": case "email": newValue = data[x].UserEmail; break;
                                    case "additionallinks": newValue = data[x].AdditionalLinks; break;
                                    case "createdate": newValue = createDateFormated; break;
                                    case "expiredate": newValue = expireDateFormated; break;
                                    case "lastrunning": newValue = lastRunningDateFormated; break;
                                    case "publicip": newValue = data[x].PublicIP; break;
                                    case "login": newValue = data[x].SPSUser; break;
                                    case "password": newValue = data[x].SPSPass; break;
                                    case "trialextensions": newValue = data[x].TrialExtensions; break;
                                    case "status": newValue = "<span class='_TrialStatus'>" + data[x].Status + "</span>"; break;
                                    case "trialname": newValue = data[x].TrialName; break;
                                    case "company": newValue = data[x].UserCompany; break;
                                    case "firstname": newValue = data[x].UserFirstName; break;
                                    case "lastname": newValue = data[x].UserLastName; break;
                                    case "department": newValue = data[x].Department; break;
                                }
                                if (IsEmptyOrNull(newValue)) newValue = "";
                                itemHTML = itemHTML.replace(matches[i], newValue);
                            } catch (e) { }
                        }
                        try { $(".status-title").find("._TrialStatus").html(data[0].Status); } catch (e) { }
                        html += itemHTML;


                        //html += "<div class='row' style='border-bottom:solid 1px #4d4d4d;padding-bottom:8px;padding-top:8px;padding-left:0px !important;;padding-right:0px !important;;margin:0px !important;'>";
                        //html += "<div class='columns four'>" + data[x].UserEmail + "<br/>";
                        //if (!IsEmptyOrNull(data[x].UserFirstName)) html += "<b>NAME:</b> " + data[x].UserFirstName + " " + data[x].UserLastName + "<br/><b>COMPANY:</b> " + data[x].UserCompany + "<br/>";
                        //html += "<b>Created:</b> " + createDateFormated + "<br/><b>Expires:</b> <span class='_TrialExpires'>" + expireDateFormated + "</span><br/><b>Extensions:</b> <span class='_TrialExtensions'>" + data[x].TrialExtensions + "</span></div>";
                        //html += "<div class='columns four'><b>Trial Name:</b> " + data[x].TrialName;
                        //if (!IsEmptyOrNull(data[x].SPSUser)) html += "<br/><b>User:</b> " + data[x].SPSUser + "<br/><b>Password:</b> " + data[x].SPSPass;
                        //if (!IsEmptyOrNull(data[x].AdditionalLinks)) html += data[x].AdditionalLinks;
                        //html += "<br/><b>Status:</b> <span class='_TrialStatus'>" + data[x].Status + "</span></div>";
                        //html += "<div class='columns four' style='padding:0px !important'>";
                        //var trialType = "AWS";
                        //if (!IsEmptyOrNull(data[x].SPSSite)) trialType = "SPS";
                        //if (!IsEmptyOrNull(data[x].RequestedBy)) trialType = "AZURE";
                        //try { html += data[x].HTML.replace("class='_ControlPanel'", "class='_ListControlPanel' id='trial_" + data[x].ID + "' trialtype='" + trialType + "'"); } catch (e) { }
                        //html += "</div>";
                        //html += "</div>";
                    }
                }
                if (data.length == 0) {
                    var noResults = $(templateSection + "_NoResults").html();
                    html += noResults;
                }
                obj.html(html);
                //jQuery("._TrialContact").hide();

                //$("._TrialControlPanelAction").die("click");
                //$("._TrialControlPanelAction").live("click", function (e) {
                $(".PageContainer").off("click", "._TrialControlPanelAction");
                $(".PageContainer").on("click", "._TrialControlPanelAction", function (e) {
                    e.preventDefault();
                    var trialInfo = $(this).parent();
                    var trialID = trialInfo.attr("id").replace("trial_", "");
                    var trialType = trialInfo.attr("trialtype");
                    var expectedStatus = $(this).attr("expectedStatus");
                    var actionType = "";
                    if ($(this).hasClass("_TrialConnect")) actionType = "connect.rdp";
                    if ($(this).hasClass("_TrialConnectAzure")) actionType = "connectazure.rdp";
                    if ($(this).hasClass("_TrialStartup")) actionType = "startup";
                    if ($(this).hasClass("_TrialReregister")) actionType = "reregister";
                    if ($(this).hasClass("_TrialShutdown")) actionType = "shutdown";
                    if ($(this).hasClass("_TrialExtend")) actionType = "extend";
                    if ($(this).hasClass("_TrialCancel")) actionType = "cancel";
                    if ($(this).hasClass("_TrialContact")) actionType = "contact";
                    if ($(this).hasClass("_TrialDownload")) actionType = "download";

                    switch (actionType.toLowerCase()) {
                        case "contact":
                            //do nothing
                            break;
                        default:
                            trialInfo.children("._TrialControlPanelAction, ._TrialSPSLink").hide();
                            trialInfo.append("<img class='_Loading' src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>");
                            break;
                    }

                    switch (actionType) {
                        case "connectazure.rdp":
                        case "connect.rdp":
                            //UpdateTrialStatusActionClicked(trialID, "connect", trialType, "CheckStatus", trialInfo);
                            UpdateTrialStatusActionClicked(trialID, expectedStatus, trialType, "CheckStatus", trialInfo);
                            break;
                        case "startupazure":
                            //UpdateTrialStatusActionClicked(trialID, "started", trialType, actionType, trialInfo);
                            UpdateTrialStatusActionClicked(trialID, expectedStatus, trialType, actionType, trialInfo);
                            break;
                        case "reregister":
                            UpdateTrialStatusActionClicked(trialID, expectedStatus, trialType, actionType, trialInfo);
                            break;
                        case "shutdownazure":
                            //UpdateTrialStatusActionClicked(trialID, "stopped", trialType, actionType, trialInfo);
                            UpdateTrialStatusActionClicked(trialID, expectedStatus, trialType, actionType, trialInfo);
                            break;
                        case "startup":
                            //UpdateTrialStatusActionClicked(trialID, "running", trialType, actionType, trialInfo);
                            UpdateTrialStatusActionClicked(trialID, expectedStatus, trialType, actionType, trialInfo);
                            break;
                        case "shutdown":
                            //UpdateTrialStatusActionClicked(trialID, "stopped", trialType, actionType, trialInfo);
                            UpdateTrialStatusActionClicked(trialID, expectedStatus, trialType, actionType, trialInfo);
                            break;
                        case "extend":
                            //UpdateTrialStatusActionClicked(trialID, "extend", trialType, actionType, trialInfo);
                            UpdateTrialStatusActionClicked(trialID, expectedStatus, trialType, actionType, trialInfo);
                            break;
                        case "cancel":
                            var verifyCancel = confirm("Are you sure you want to cancel this trial?");
                            if (verifyCancel) {
                                //UpdateTrialStatusActionClicked(trialID, "cancel", trialType, actionType, trialInfo);
                                UpdateTrialStatusActionClicked(trialID, expectedStatus, trialType, actionType, trialInfo);
                            } else {
                                trialInfo.children("._TrialControlPanelAction, ._TrialSPSLink").show();
                                trialInfo.children().remove("._Loading");
                            }
                            break;
                        case "download":
                            //Log this somewhere??
                            location.href = $(this).children("a").prop("href");
                            trialInfo.children("._TrialControlPanelAction, ._TrialSPSLink").show();
                            trialInfo.children().remove("._Loading");
                            break;
                        case "contact":
                            PopupForm($(this), e);
                            break;
                        default:
                            break;
                    }
                    //jQuery("._TrialContact").hide();

                });

                function UpdateTrialStatusActionClicked(trialID, expectedstatus, trialSource, action, trialInfo) {
                    $.doTimeout('statuscheck_' + trialID);
                    var actionsParent = trialInfo.parent();
                    var trialDetailsRow = actionsParent.parent();
                    var postData = "&TrialType=" + trialSource + "&TrialID=" + trialID + "&ExpectedStatus=" + expectedstatus;
                    var filename = "/k2trynowv2/" + action;
                    try { actionsParent.find(".MessageBox.Warning").remove(); } catch (e) { }
                    $.post(filename, postData,
                        function (data) {
                            if (data.length == 0) {
                                //No Trial Found  Do Something!?
                            } else if (!IsEmptyOrNull(data[0].Error)) {
                                //Show Error
                                alert("An error occurred: " + data[0].Error);
                            } else {
                                var expireDate = ""; try { expireDate = new Date(parseInt(data[0].ExpireDate.replace(/\/Date\((\d+)\)\//, '$1'))); } catch (e) { } var expireDateFormated = "n/a"; try { expireDateFormated = dateFormat(expireDate, "m/d/yy h:MM TT"); } catch (e) { }

                                switch (expectedstatus) {
                                    case "connect":
                                        var errmsg = "";
                                        if (data[0].Status == "running" || (data[0].Status=="Started" && trialSource=="AZURE")) { download("/k2trynowv2/connect.rdp?TrialType=" + trialSource + "&TrialID=" + trialID); }
                                        else {
                                            errmsg = "<div class='MessageBox Warning'>Your machine is no longer running, please start your machine.</div>";
                                        }
                                        trialInfo.remove();
                                        if (!IsEmptyOrNull(errmsg)) actionsParent.append(errmsg);
                                        try { actionsParent.append(data[0].HTML.replace("class='_ControlPanel'", "class='_ListControlPanel' id='trial_" + data[0].ID + "' trialtype='" + trialSource + "'")); } catch (e) { }
                                        break;
                                    case "cancel":
                                        trialInfo.remove("._Loading");
                                        trialDetailsRow.find("._TrialStatus").html("Cancelling Trial");
                                        try { $(".status-title").find("._TrialStatus").html("Cancelling Trial"); } catch (e) { }
                                        //trialInfo.append("<img class='_Loading' src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>");
                                        $.doTimeout('statuscheck_' + trialID, 30000, function () {
                                            trialInfo.remove("._Loading");
                                            trialDetailsRow.find("._TrialStatus").html("Checking Status");
                                            try { $(".status-title").find("._TrialStatus").html("Checking Status"); } catch (e) { }
                                            UpdateTrialStatusActionClicked(trialID, "cancelstatus", trialSource, "CheckStatus", trialInfo);
                                        });
                                        break;
                                    case "extendstatus":
                                    case "cancelstatus":
                                        trialInfo.remove();
                                        //if (!IsEmptyOrNull(errmsg)) actionsParent.append(errmsg);
                                        try { actionsParent.append(data[0].HTML.replace("class='_ControlPanel'", "class='_ListControlPanel' id='trial_" + data[0].ID + "' trialtype='" + trialSource + "'")); } catch (e) { }
                                        try { trialDetailsRow.find("._TrialStatus").html(data[0].Status); } catch (e) { }
                                        try { trialDetailsRow.find("._TrialExpires").html(expireDateFormated); } catch (e) { }
                                        try { trialDetailsRow.find("._TrialExtensions").html(data[0].TrialExtensions); } catch (e) { }
                                        break;
                                    case "extend":
                                        trialInfo.remove("._Loading");
                                        trialDetailsRow.find("._TrialStatus").html("Extending Trial");
                                        $.doTimeout('statuscheck_' + trialID, 5000, function () {
                                            trialInfo.remove("._Loading");
                                            trialDetailsRow.find("._TrialStatus").html("Checking Status");
                                            try { $(".status-title").find("._TrialStatus").html("Checking Status"); } catch (e) { }
                                            UpdateTrialStatusActionClicked(trialID, "extendstatus", trialSource, "CheckStatus", trialInfo);
                                        });
                                        break;
                                    default:
                                        var currentStatus = data[0].Status.toLowerCase();
                                        if (expectedstatus.toLowerCase() == currentStatus) {
                                            switch (trialType.toLowerCase()) {
                                                case "azure":
                                                    var delayTime = 0;
                                                    if (expectedstatus.toLowerCase() == "started") {
                                                        trialDetailsRow.find("._TrialStatus").html("Initializing");
                                                        try { $(".status-title").find("._TrialStatus").html("Initializing"); } catch (e) { }
                                                        CountDownTimer(0, 238, trialDetailsRow, trialID);
                                                        delayTime = 240000;
                                                    }
                                                    $.doTimeout('warmup_' + trialID, delayTime, function () {
                                                        $.doTimeout('warmuppercent_' + trialID);
                                                        trialDetailsRow.find("._TrialStatus").html(currentStatus);
                                                        try { $(".status-title").find("._TrialStatus").html(currentStatus); } catch (e) { }
                                                        trialInfo.children("._TrialControlPanelAction, ._TrialSPSLink").show();
                                                        trialInfo.remove();
                                                        try { actionsParent.append(data[0].HTML.replace("class='_ControlPanel'", "class='_ListControlPanel' id='trial_" + data[0].ID + "' trialtype='" + trialSource + "'")); } catch (e) { }
                                                        try { trialDetailsRow.find("._TrialStatus").html(data[0].Status); } catch (e) { }
                                                        try { $(".status-title").find("._TrialStatus").html(data[0].Status); } catch (e) { }
                                                        try { trialDetailsRow.find("._TrialExpires").html(expireDateFormated); } catch (e) { }
                                                        try { trialDetailsRow.find("._TrialExtensions").html(data[0].TrialExtensions); } catch (e) { }
                                                    });
                                                    break;
                                                default:
                                                    trialDetailsRow.find("._TrialStatus").html(currentStatus);
                                                    try { $(".status-title").find("._TrialStatus").html(currentStatus); } catch (e) { }
                                                    trialInfo.children("._TrialControlPanelAction, ._TrialSPSLink").show();
                                                    trialInfo.remove();
                                                    try { actionsParent.append(data[0].HTML.replace("class='_ControlPanel'", "class='_ListControlPanel' id='trial_" + data[0].ID + "' trialtype='" + trialSource + "'")); } catch (e) { }
                                                    try { trialDetailsRow.find("._TrialStatus").html(data[0].Status); } catch (e) { }
                                                    try { $(".status-title").find("._TrialStatus").html(data[0].Status); } catch (e) { }
                                                    try { trialDetailsRow.find("._TrialExpires").html(expireDateFormated); } catch (e) { }
                                                    try { trialDetailsRow.find("._TrialExtensions").html(data[0].TrialExtensions); } catch (e) { }
                                                    break;
                                            }
                                        } else {
                                            trialDetailsRow.find("._TrialStatus").html(currentStatus);
                                            try { $(".status-title").find("._TrialStatus").html(currentStatus); } catch (e) { }
                                            $.doTimeout('statuscheck_' +trialID, 5000, function () {
                                                trialDetailsRow.find("._TrialStatus").html("Updating Status");
                                                try { $(".status-title").find("._TrialStatus").html("Updating Status"); } catch (e) { }
                                                UpdateTrialStatusActionClicked(trialID, expectedstatus, trialSource, "CheckStatus", trialInfo);
                                            });

                                        }
                                        break;
                                }
                                //jQuery("._TrialContact").hide();
                            }
                        }
                        , "json");
                }
                function CountDownTimer(secondsPast, totalSeconds, row, trialID) {
                    if (secondsPast < totalSeconds) {
                        $.doTimeout('warmuppercent_' +trialID, 2000, function () {
                            secondsPast += 2;
                            var percentDone = Math.round((secondsPast / totalSeconds)*100)
                            row.find("._TrialStatus").html("Initializing " + percentDone + "%");
                            try { $(".status-title").find("._TrialStatus").html("Initializing " + percentDone + "%"); } catch (e) { }
                            CountDownTimer(secondsPast, totalSeconds, row);
                        });
                    }
                }

                jQuery("._K2NowListFilterButton").click(function (e) {
                    GetTrialList(obj,false);
                });

            }
           , "json");
}
/****************************K2Com_V5_OnlineTrials_Old***********************************/
//******************SharePoint Trial Functionality********************//
jQuery("._K2NowSPS").each(function (e) {
    var obj = $(this);
    GetK2NowSPS(obj);
});
function GetK2NowSPSStatus(currentStatus, expectedStatus, obj) {
    $("._K2NowStatus").html("Checking status <img src='/img/loader/loader16.gif'/>");
    var filename = "/K2TryNow/spsget";
    var postData = "&RequestedTrialName=" + obj.attr("target");
    var newStatus = currentStatus;
    $.post(filename, postData,
                function (data) {
                    if (!IsEmptyOrNull(data.Status)) { newStatus = data.Status; }
                    if (newStatus == "connecting") {
                    } else if (newStatus == expectedStatus || newStatus == "terminated" || newStatus == "Pending Approval") {
                        GetK2NowSPS(obj);
                    } else {
                        $("._K2NowStatus").html(capitaliseFirstLetter(newStatus) + " <img src='/img/loader/loader16.gif'/>");
                        $.doTimeout(10000, function () {
                            GetK2NowSPSStatus(currentStatus, expectedStatus, obj);
                        });
                    }
                }
            , "json");
}
function GetK2NowSPS(obj) {
    obj.html("<div style='width:100%;text-align:center;'><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/></div>");
    obj.parent().parent().height(75);
    var filename = "/K2TryNow/spsget";
    var trialName = obj.attr("target");
    var postData = "";
    if (getQuerystring("creating", "false") == "true") postData = "&creating=true";
    if (!IsEmptyOrNull(trialName)) postData += "&RequestedTrialName=" + trialName;
    $.post(filename, postData,
            function (data) {
                if (!IsEmptyOrNull(data.Error)) {
                    obj.html("<div style='font-weigh:bold;'>" + data.Error + "</div>");
                } else if (!IsEmptyOrNull(data.HTML)) {
                    obj.html(data.HTML);
                } else {
                    var expireDate;
                    var outputHTML = "";
                    var currentStatus = "";
                    var extendSN = "";
                    if (!IsEmptyOrNull(data.Status)) { currentStatus = data.Status; }
                    if (!IsEmptyOrNull(data.SN)) { extendSN = data.SN; }
                    switch (currentStatus.toLowerCase()) {
                        case "running":
                        case "pending extension approval":
                            outputHTML += "<div class='_K2NowActions'><a href='" + data.SPSSite + "' style='text-decoration:none;' target='_blank'><div class='LeftPad5 _K2NowConnectSPS' style='position:relative;float:left;width:32%;cursor:pointer;'></div></a>";
                            if (!IsEmptyOrNull(extendSN)) {
                                outputHTML += "<div class='LeftPad5 _K2NowExtendSPS' style='position:relative;float:left;width:32%;cursor:pointer;' target='/K2TryNow/spsextend'></div>";
                                outputHTML += "<div class='LeftPad5 _K2NowCancelSPS' style='position:relative;float:left;width:32%;cursor:pointer;' target='/K2TryNow/spscancel'></div>";
                            }
                            outputHTML += "</div><div style='clear:both;' class='_K2NowDividerSPS'></div>";
                            break;
                        case "creating":
                            break;
                        case "pending":
                        case "expired":
                        case "terminated":
                            break;
                    }
                }
                if (!IsEmptyOrNull(data.SPSUser)) {
                    outputHTML += "<div style='height:55px;padding-top:5px;'>";
                    outputHTML += "<div style='width:175px;position:relative;float:left;'><div class='SubHead' style='font-size:10px;line-height:14px;'>TRIAL USER</div><div class='_K2NowExpireDate' style='font-size:10px;line-height:14px;'>" + data.SPSUser + "</div></div>";
                }
                if (!IsEmptyOrNull(data.ExpireDate)) {
                    var dateString = data.ExpireDate; expireDate = new Date(parseInt(dateString.replace(/\/Date\((\d+)\)\//, '$1')));
                    if (!isNaN(expireDate)) outputHTML += "<div style='width:200px;position:relative;float:left;'><div class='SubHead' style='font-size:10px;line-height:14px;'>TRIAL EXPIRES</div><div class='_K2NowExpireDate' style='font-size:10px;line-height:14px;'>" + expireDate + "</div></div><div style='clear:both;'></div>";
                }
                if (!IsEmptyOrNull(data.SPSPass)) {
                    outputHTML += "<div style='padding-top:5px;width:175px;position:relative;float:left;'><div class='SubHead' style='font-size:10px;line-height:14px;'>TRIAL PASSWORD</div><div class='_K2NowExpireDate' style='font-size:10px;line-height:14px;'>" + data.SPSPass + "</div></div>";
                }
                if (!IsEmptyOrNull(data.Status)) { outputHTML += "<div style='padding-top:5px;width:200px;position:relative;float:left;'><div class='SubHead' style='font-size:10px;line-height:14px;'>TRIAL STATUS</div><div class='_K2NowStatus' style='font-size:10px;line-height:14px;'>" + capitaliseFirstLetter(data.Status) + "</div></div>"; currentStatus = data.Status; }
                if (!IsEmptyOrNull(data.SPSUser)) outputHTML += "</div>";
                obj.html(outputHTML);
                obj.parent().parent().height(obj.height() + 50);

                if (currentStatus == "creating" || currentStatus == "Pending Approval") {
                    $.doTimeout(1000, function () {
                        GetK2NowSPSStatus(currentStatus, "running", obj);
                    });
                }
                $("._K2NowExtendSPS").click(function (e) {
                    var target = $(this).attr("target");
                    jQuery("#jqmContainers").append(GetPopupWindow("AjaxMessage"));
                    jQuery("#AjaxMessage").jqm({ onHide: closeAndKill, html: "", ajax: "", ajaxText: "", overlay: 65, modal: false, width: 300, height: 200, innerWidthOffset: 40, innerHeightOffset: 40, target: '#AjaxMessage_Body' });
                    jQuery("#AjaxMessage").jqmShow();
                    $.post(target, postData,
                            function (data) {
                                var newMsg = "";
                                if (data.Error.indexOf("ERROR") > -1) { newMsg = "An error ocurred extending your trial.<br><br><a href='javascript:CloseAllPopups();'>Close</a>"; }
                                else if (data.Error.indexOf("APPROVAL") > -1) { newMsg = "Your trial extension request has been sent for approval.<br><br><a href='javascript:CloseAllPopups();'>Close</a>"; }
                                if (IsEmptyOrNull(newMsg)) {
                                    jQuery("#AjaxMessage").jqmHide();
                                } else {
                                    jQuery("#AjaxMessage_Body").html(MakeRoundCornerPopup("<div id='AjaxMessage_Contents'>" + newMsg + "</div>", "AjaxMessage"));
                                    var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
                                    jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
                                }
                                //try { _gaq.push(['_trackEvent', 'SharePoint Trial', 'Trial Extension', _userName]); } catch (e) { }
                                TrackGoogleEvent('SharePoint Trial', 'Trial Extension', _userName);
                                GetK2NowSPS(obj);
                            }
                        , "json");

                });
                $("._K2NowCancelSPS").click(function (e) {
                    var target = $(this).attr("target");
                    var cancelHTML = "<div><div class='SubHead' style='font-size:24px;font-weight:normal;padding-bottom:10px;'>Cancel Trial</div><div>Are you sure you want to cancel this trial? If you choose to cancel, your trial will expire immediately and all related data will be removed.</div><br/><br/><div><input type='button' class='FormButton _K2NowCancelNo' value='Do NOT cancel trial' onclick='CloseAllPopups();'>&nbsp;<input type='button' class='FormButton _K2NowCancelYes' value='Cancel my trial'></div></div>";
                    canelHTML = MakeRoundCornerPopup(cancelHTML, "AjaxMessage")
                    jQuery("#jqmContainers").append(GetPopupWindow("AjaxMessage"));
                    jQuery("#AjaxMessage").jqm({ onHide: closeAndKill, html: cancelHTML, ajax: "", ajaxText: "", overlay: 65, modal: false, width: 400, height: 250, innerWidthOffset: 40, innerHeightOffset: 40, target: '#AjaxMessage_Body' });
                    jQuery("#AjaxMessage").jqmShow();

                    $("._K2NowCancelYes").click(function (e) {
                        e.preventDefault();
                        jQuery("#jqmContainers").append(GetPopupWindow("CancelYesMessage"));
                        jQuery("#CancelYesMessage").jqm({ onHide: closeAndKill, html: "", ajax: "", ajaxText: "", overlay: 65, modal: false, width: 300, height: 200, innerWidthOffset: 40, innerHeightOffset: 40, target: '#CancelYesMessage_Body' });
                        jQuery("#CancelYesMessage").jqmShow();
                        $.post(target, postData,
                                function (data) {
                                    jQuery("#CancelYesMessage").jqmHide();
                                    var newMsg = "";
                                    if (data.Error.indexOf("ERROR") > -1) { newMsg = "An error ocurred cancelling your trial.<br/><br/><b>If your trial started prior to 5/24/2011, <span class='_K2NowManualCancel' style='cursor:pointer;text-decoration:underline;' target='/K2TryNow/cancel2'>please click here to cancel your trial</span>.</b><br/><br/<br/><a href='javascript:CloseAllPopups();'>Close</a>"; }
                                    else { newMsg = "Your trial has been cancelled.<br><br><a href='javascript:CloseAllPopups();'>Close</a>"; }
                                    if (IsEmptyOrNull(newMsg)) {
                                        jQuery("#AjaxMessage").jqmHide();
                                    } else {
                                        jQuery("#AjaxMessage_Body").html(MakeRoundCornerPopup("<div id='AjaxMessage_Contents'>" + newMsg + "</div>", "AjaxMessage"));
                                        var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
                                        jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
                                    }
                                    //try { _gaq.push(['_trackEvent', 'SharePoint Trial', 'Trial Cancel', _userName]); } catch (e) { }
                                    TrackGoogleEvent('SharePoint Trial', 'Trial Cancel', _userName);
                                    $.doTimeout(1500, function () {
                                        GetK2NowSPS(obj);
                                    });
                                }
                            , "json");

                    });
                });
            }
            , "json");
}
//******************End SharePoint Trial Functionality********************//
//******************Amazon Trial Functionality********************//
jQuery("._K2Now").each(function (e) {
    var obj = $(this);
    GetK2Now(obj);
});
var statusCycleCount = 0;
function GetK2NowStatus(currentStatus, expectedStatus, obj) {
    $("._K2NowStatus").html("Checking status <img src='/img/loader/loader16.gif'/>");
    var filename = "/K2TryNow/";
    var postData = "&RequestedTrialName=" + obj.attr("target");
    var newStatus = currentStatus;
    $.post(filename, postData,
                function (data) {
                    if (!IsEmptyOrNull(data.Status)) { newStatus = data.Status; }
                    if (newStatus == "connecting") {
                    } else if (newStatus.toLowerCase() == expectedStatus.toLowerCase() || newStatus.toLowerCase() == "terminated" || newStatus.toLowerCase() == "pending approval") {
                        if (newStatus == "running" && getQuerystring("creating", "false") != "true") {
                            $("._K2NowStatus").html("Initializing SharePoint <span id='_SPSInitTime'>0</span>%<img src='/img/loader/loader16.gif'/>");
                            $.doTimeout(1800, function () {
                                var initdone = Number($("._K2NowStatus").children("#_SPSInitTime").html());
                                initdone++;
                                $("._K2NowStatus").children("#_SPSInitTime").html(initdone);
                                if (initdone >= 100) { GetK2Now(obj); return false; }
                                return true;
                            });
                        } else {
                            if (statusCycleCount < 3) {
                                $.doTimeout(6000, function () {
                                    statusCycleCount++;
                                    GetK2Now(obj);
                                });
                            } else {
                                $("._K2NowStatus").html("Your trial is pending approval.  You will receive an email when it is ready for use.");
                                obj.parent().parent().height(125);
                            }

                        }
                    } else {
                        $("._K2NowStatus").html(capitaliseFirstLetter(newStatus) + " <img src='/img/loader/loader16.gif'/>");
                        $.doTimeout(10000, function () {
                            GetK2NowStatus(currentStatus, expectedStatus, obj);
                        });
                    }
                }
            , "json");

}
function GetK2Now(obj) {
    obj.html("<div style='width:100%;text-align:center;'><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/></div>");
    obj.parent().parent().height(75);
    var filename = "/K2TryNow/";
    var trialName = obj.attr("target");
    var trialForm = obj.attr("formname");
    var postData = "";
    if (getQuerystring("creating", "false") == "true") postData = "&creating=true";
    if (!IsEmptyOrNull(trialName)) postData += "&RequestedTrialName=" + trialName;
    if (!IsEmptyOrNull(trialForm)) postData += "&RequestedTrialForm=" + trialForm;
    $.post(filename, postData,
            function (data) {
                if (!IsEmptyOrNull(data.Error)) {
                    obj.html("<div style='font-weigh:bold;'>" + data.Error + "</div>");
                } else if (!IsEmptyOrNull(data.HTML)) {
                    obj.html(data.HTML);
                } else {
                    var expireDate;
                    var outputHTML = "";
                    var instanceKey = "";
                    var currentStatus = "";
                    var extendSN = "";

                    if (!IsEmptyOrNull(data.InstanceKey)) { instanceKey = data.InstanceKey; }
                    if (!IsEmptyOrNull(data.Status)) { currentStatus = data.Status; }
                    if (!IsEmptyOrNull(data.SN)) { extendSN = data.SN; }
                    if (!IsEmptyOrNull(instanceKey)) {
                        switch (currentStatus.toLowerCase()) {
                            case "running":
                            case "pending extension approval":
                                outputHTML += "<div class='_K2NowActions'><div class='LeftPad5 _K2NowConnect' style='width:100%;cursor:pointer;' target='/K2TryNow/connect.rdp' expectedStatus=''>&nbsp;</div>";
                                outputHTML += "<div class='LeftPad5 _K2NowAction _K2NowStop' style='width:100%;cursor:pointer;' target='/K2TryNow/shutdown' expectedStatus='stopped'>&nbsp;</div>";
                                if (!IsEmptyOrNull(extendSN)) {
                                    outputHTML += "<div class='LeftPad5 _K2NowExtend' style='width:100%;cursor:pointer;' target='/K2TryNow/extend'>&nbsp;</div>";
                                    outputHTML += "<div class='LeftPad5 _K2NowCancel' style='width:100%;cursor:pointer;' target='/K2TryNow/cancel'>&nbsp;</div>";
                                }
                                outputHTML += "</div>";
                                break;
                            case "stopped":
                                outputHTML += "<div class='_K2NowActions'><div class='LeftPad5 _K2NowAction _K2NowStart' style='width:100%;cursor:pointer;' target='/K2TryNow/start' expectedStatus='running'>&nbsp;</div>";
                                if (!IsEmptyOrNull(extendSN)) {
                                    outputHTML += "<div class='LeftPad5 _K2NowExtend' style='width:100%;cursor:pointer;' target='/K2TryNow/extend'>&nbsp;</div>";
                                    outputHTML += "<div class='LeftPad5 _K2NowCancel' style='width:100%;cursor:pointer;' target='/K2TryNow/cancel'>&nbsp;</div>";
                                }
                                outputHTML += "</div>";
                                break;
                            case "pending":
                            case "shutting-down":
                            case "terminated":
                            case "stopping":
                                break;
                        }
                    }

                    if (!IsEmptyOrNull(data.ExpireDate)) {
                        var dateString = data.ExpireDate; expireDate = new Date(parseInt(dateString.replace(/\/Date\((\d+)\)\//, '$1')));
                        if (!isNaN(expireDate)) outputHTML += "<div class='SubHead' style='padding-top:5px;'>Expires</div><div class='LeftPad5 _K2NowExpireDate'>" + expireDate + "</div>";
                    }
                    if (!IsEmptyOrNull(data.Status)) { outputHTML += "<div class='SubHead'>Machine Status</div><div class='LeftPad5 _K2NowStatus'>" + capitaliseFirstLetter(data.Status) + "</div>"; currentStatus = data.Status; }
                    obj.html(outputHTML);
                    obj.parent().parent().height(obj.height() + 50);
                    if (currentStatus == "creating" || currentStatus == "pending" || currentStatus == "Pending Approval") {
                        $.doTimeout(1000, function () {
                            GetK2NowStatus(currentStatus, "running", obj);
                        });
                    }
                    if (currentStatus == "stopping" || currentStatus == "shutting-down") {
                        $.doTimeout(1000, function () {
                            GetK2NowStatus(currentStatus, "stopped", obj);
                        });
                    }
                    $("._K2NowRefresh").css({ "display": "none", "cursor": "pointer", "position": "absolute", "right": "5px", "top": "0px" });
                    $("._K2NowRefresh").click(function (e) {
                        $(this).parent().next().html("");
                        GetK2Now($(this).parent().next());
                    });
                    $("._K2NowAction").click(function (e) {
                        //Clear Actions
                        $("._K2NowActions").html("");
                        $("._K2NowStatus").html($("._K2NowStatus").html() + " <img src='/img/loader/loader16.gif'/>");
                        var target = $(this).attr("target");
                        //try { _gaq.push(['_trackEvent', 'K2 Online Trial ' + target.replace('/K2TryNow/', ''), target, _userName]); } catch (e) { }
                        TrackGoogleEvent('K2 Online Trial ' + target.replace('/K2TryNow/', ''), target, _userName);
                        var expectedStatus = $(this).attr("expectedStatus");
                        $.post(target, postData,
                            function () {
                                $.doTimeout(5000, function () {
                                    GetK2NowStatus(currentStatus, expectedStatus, obj);
                                });

                            }
                        , "json");
                    });
                    $("._K2NowExtend").click(function (e) {
                        var target = $(this).attr("target");
                        jQuery("#jqmContainers").append(GetPopupWindow("AjaxMessage"));
                        jQuery("#AjaxMessage").jqm({ onHide: closeAndKill, html: "Submitting extension request<br><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>", ajax: "", ajaxText: "", overlay: 65, modal: false, width: 300, height: 200, innerWidthOffset: 40, innerHeightOffset: 40, target: '#AjaxMessage_Body' });
                        jQuery("#AjaxMessage").jqmShow();
                        $.post(target, postData,
                            function (data) {
                                var newMsg = "";
                                if (data.Error.indexOf("ERROR") > -1) { newMsg = "An error ocurred extending your trial.<br><br><a href='javascript:CloseAllPopups();'>Close</a>"; }
                                else if (data.Error.indexOf("APPROVAL") > -1) { newMsg = "Your trial extension request has been sent for approval.<br><br><a href='javascript:CloseAllPopups();'>Close</a>"; }
                                if (IsEmptyOrNull(newMsg)) {
                                    jQuery("#AjaxMessage").jqmHide();
                                } else {
                                    jQuery("#AjaxMessage_Body").html(MakeRoundCornerPopup("<div id='AjaxMessage_Contents'>" + newMsg + "</div>", "AjaxMessage"));
                                    var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
                                    jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
                                }
                                //try { _gaq.push(['_trackEvent', 'K2 Online Trial', 'Trial Extension', _userName]); } catch (e) { }
                                TrackGoogleEvent('K2 Online Trial', 'Trial Extension', _userName);
                                GetK2Now(obj);
                            }
                        , "json");

                    });
                    $("._K2NowCancel").click(function (e) {
                        var target = $(this).attr("target");
                        var cancelHTML = "<div><div class='SubHead' style='font-size:24px;font-weight:normal;padding-bottom:10px;'>Cancel Trial</div><div>Are you sure you want to cancel this trial? If you choose to cancel, your trial will expire immediately and all related data will be removed.</div><br/><br/><div><input type='button' class='FormButton _K2NowCancelNo' value='Do NOT cancel trial'>&nbsp;<input type='button' class='FormButton _K2NowCancelYes' value='Cancel my trial'></div></div>";
                        jQuery("#jqmContainers").append(GetPopupWindow("AjaxMessage"));
                        jQuery("#AjaxMessage").jqm({ onHide: closeAndKill, html: cancelHTML, ajax: "", ajaxText: "", overlay: 65, modal: false, width: 400, height: 250, innerWidthOffset: 40, innerHeightOffset: 40, target: '#AjaxMessage_Body' });
                        jQuery("#AjaxMessage").jqmShow();

                        $("._K2NowCancelYes").click(function (e) {
                            jQuery("#jqmContainers").append(GetPopupWindow("CancelYesMessage"));
                            jQuery("#CancelYesMessage").jqm({ onHide: closeAndKill, html: "Submitting cancel request<br><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>", ajax: "", ajaxText: "", overlay: 65, modal: false, width: 300, height: 200, innerWidthOffset: 40, innerHeightOffset: 40, target: '#CancelYesMessage_Body' });
                            jQuery("#CancelYesMessage").jqmShow();
                            $.post(target, postData,
                                function (data) {
                                    jQuery("#CancelYesMessage").jqmHide();
                                    var newMsg = "";
                                    if (data.Error.indexOf("ERROR") > -1) { newMsg = "An error ocurred cancelling your trial.<br/><br/><b>If your trial started prior to 5/24/2011, <span class='_K2NowManualCancel' style='cursor:pointer;text-decoration:underline;' target='/K2TryNow/cancel2'>please click here to cancel your trial</span>.</b><br/><br/<br/><a href='javascript:CloseAllPopups();'>Close</a>"; }
                                    else { newMsg = "Your trial has been cancelled.<br><br><a href='javascript:CloseAllPopups();'>Close</a>"; }
                                    if (IsEmptyOrNull(newMsg)) {
                                        jQuery("#AjaxMessage").jqmHide();
                                    } else {
                                        jQuery("#AjaxMessage_Body").html(MakeRoundCornerPopup("<div id='AjaxMessage_Contents'>" + newMsg + "</div>", "AjaxMessage"));
                                        var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
                                        jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
                                    }
                                    //try { _gaq.push(['_trackEvent', 'K2 Online Trial', 'Trial Cancel', _userName]); } catch (e) { }
                                    TrackGoogleEvent('K2 Online Trial', 'Trial Cancel', _userName);
                                    $.doTimeout(1500, function () {
                                        GetK2Now(obj);
                                    });

                                }
                            , "json");

                        });
                        $("._K2NowCancelNo").click(function (e) {
                            CloseAllPopups();
                            GetK2Now(obj);
                        });

                    });
                    $("._K2NowConnect").click(function (e) {
                        //var obj = $(this);
                        var target = $(this).attr("target") + "?RequestedTrialName=" + trialName;
                        download(target);
                        //if (!IsEmptyOrNull(errors)) GetK2Now(obj);
                        //try { _gaq.push(['_trackEvent', 'K2 Online Trial', 'Trial Connect', _userName]); } catch (e) { }
                        TrackGoogleEvent('K2 Online Trial', 'Trial Connect', _userName);
                        //window.open(target);
                    });
                }
            }
        , "json");
}

//jQuery("._K2NowListSearch").live("keydown", function (event) { if (event.keyCode == '13') event.preventDefault(); });
$(".PageContainer").on("keydown", "._K2NowListSearch", function (event) { if (event.keyCode == '13') event.preventDefault(); });
jQuery("._K2NowList").each(function (e) {
    var obj = $(this);
    GetK2NowList(obj);
});
jQuery("._K2NowStats").each(function (e) {
    var obj = $(this);
    GetK2NowStats(obj);
});
function GetK2NowStats(obj) {

}
function GetK2NowList(obj) {
    var html = "";
    var filename = obj.attr("target");
    var showExpired = true; var showRunning = true; var showStopped = true; var showPending = true; var showPublic = true; var showPartner = true; var showTraining = true; var showAWS = true; var showSPS = true;
    var search = "";
    showExpired = $("#_K2NowListFilter_ShowExpired").is(":checked");
    showRunning = $("#_K2NowListFilter_ShowRunning").is(":checked");
    showStopped = $("#_K2NowListFilter_ShowStopped").is(":checked");
    showPending = $("#_K2NowListFilter_ShowPending").is(":checked");
    showPublic = $("#_K2NowListFilter_ShowPublic").is(":checked");
    showTraining = $("#_K2NowListFilter_ShowTraining").is(":checked");
    showPartner = $("#_K2NowListFilter_ShowPartners").is(":checked");
    showAWS = $("#_K2NowListFilter_ShowAWS").is(":checked");
    showSPS = $("#_K2NowListFilter_ShowSPS").is(":checked");
    if ($("#_K2NowListFilter_ShowAll").is(":checked")) { showExpired = true; showRunning = true; showStopped = true; showPending = true; }
    if (!showExpired && !showStopped && !showPending) showRunning = true;
    search = jQuery("._K2NowListSearch").val();
    var hash = window.location.hash;
    if (!IsEmptyOrNull(hash)) {
        var hashParts = hash.split("=");
        if (hashParts[0].toLowerCase() == "#key") {
            search = hashParts[1]; showExpired = true; showRunning = true; showStopped = true; showPending = true; showPublic = true; showPartner = true; showTraining = true; showAWS = true; showSPS = true;
            window.location.hash = "";
        }
    }
    obj.html("<img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>");
    var postData = "&ShowExpired=" + showExpired + "&ShowRunning=" + showRunning + "&ShowStopped=" + showStopped + "&ShowPending=" + showPending + "&ShowPublic=" + showPublic + "&ShowPartners=" + showPartner + "&ShowTraining=" + showTraining + " &ShowAWS=" + showAWS + "&ShowSPS=" + showSPS;
    if (!IsEmptyOrNull(search)) postData += "&search=" + search;
    if (!IsEmptyOrNull(getQuerystring("instanceid", ""))) postData += "&instanceid=" + getQuerystring("instanceid", "");
    $.post(filename, postData,
            function (data) {
                html += "<table width='100%'>";
                var displayColumns;
                var totalColumns = 2;
                for (var x = 0; x < data.length; x++) {
                    if (x == 0) { displayColumns = data[x].DisplayColumns.split("~"); totalColumns += displayColumns.length; }
                    if (!IsEmptyOrNull(data[x].HTML)) { html += "<tr><td colspan='" + totalColumns + "'>" + data[x].HTML + " </td></tr>"; }
                    if (x == 0) {
                        html += "<tr class='_AlternatingRows'>";
                        for (var i = 0; i < displayColumns.length; i++) {
                            html += "<th>" + displayColumns[i].split(":")[0] + "</th>";
                        }
                        html += "<th>Status</th><th width='200px'>Actions</th></tr>";
                        //html += "<th>User Details</th><th>Instance Key</th><th>Trial Name</th><th>Expires</th><th>Last Accessed</th><th>Status</th><th width='200px'>Actions</th></tr>";
                    }
                    if (!IsEmptyOrNull(data[x].Error)) { html += "<tr><td colspan='" + totalColumns + "' class='Warning'>" + data[x].Error + "</td></tr>"; }
                    else {
                        try {
                            var actions = "";
                            var instanceKey = data[x].InstanceKey;
                            if (!IsEmptyOrNull(instanceKey)) {
                                actions += BuildActionsAWS(data[x], instanceKey);
                            } else if (!IsEmptyOrNull(data[x].SPSSite)) {
                                actions += BuildActionsSPS(data[x]);
                            }
                            html += "<tr class='_AlternatingRows'>";
                            for (var i = 0; i < displayColumns.length; i++) {
                                switch (displayColumns[i].split(":")[1].toLowerCase()) {
                                    case "trialname":
                                        if (IsEmptyOrNull(data[x].SPSSite)) {
                                            html += "<td class='_K2NowControlPanelCell' style='border:solid 1px #ffffff;'><span class='_K2NowHistory' target='/K2TryNow/awsinstancehistory?instanceKey=" + data[x].InstanceKey + "'>" + eval("data[" + x + "]." + displayColumns[i].split(":")[1]) + "</span></td>";
                                        } else {
                                            var spsUserSplit = data[x].SPSUser.split('\\');
                                            html += "<td class='_K2NowControlPanelCell' style=''>" + eval("data[" + x + "]." + displayColumns[i].split(":")[1]);
                                            if (data[x].Status != "expired" && data[x].Status != "removed") html += "<br/>User: " + data[x].SPSUser + "<br/>Password: " + data[x].SPSPass;
                                            html += "</td>";
                                        }
                                        break;
                                    case "userdetails":
                                        var siteName = "Public";
                                        switch (data[x].SiteID) { case 3: siteName = "Partners"; break; case 4: siteName = "Training"; break; default: siteName = "Public"; }
                                        html += "<td class='_K2NowControlPanelCell' style='width:150px;overflow:hidden;'>" + data[x].UserCompany + "<br/>" + data[x].UserFirstName + " " + data[x].UserLastName + "<br/>" + data[x].UserEmail + "<br/>Site: " + siteName + "</td>";
                                        break;
                                    case "trialdetails":
                                        var expireDateString = data[x].ExpireDate; var expireDateValue = new Date(parseInt(expireDateString.replace(/\/Date\((\d+)\)\//, '$1')));
                                        var createDateString = data[x].CreateDate; var createDateValue = new Date(parseInt(createDateString.replace(/\/Date\((\d+)\)\//, '$1')));
                                        var lastAccessedDateString = data[x].LastAccessed; var lastAccessedDateValue = new Date(parseInt(lastAccessedDateString.replace(/\/Date\((\d+)\)\//, '$1')));
                                        if (IsEmptyOrNull(data[x].SPSSite)) {
                                            html += "<td class='_K2NowControlPanelCell' style='width:170px;'>Key: " + data[x].InstanceKey + "<br/>Name: <span class='_K2NowHistory' target='/K2TryNow/awsinstancehistory?instanceKey=" + data[x].InstanceKey + "'>" + data[x].TrialName + "</span><br/>Started: " + dateFormat(createDateValue, "m/d/yy h:MM TT") + " <br/>Expires: " + dateFormat(expireDateValue, "m/d/yy h:MM TT") + "<br/>Accessed: " + dateFormat(lastAccessedDateValue, "m/d/yy h:MM TT") + "</td>";
                                        } else {
                                            html += "<td class='_K2NowControlPanelCell' style='width:170px;'>Site: <a href='" + data[x].SPSSite + "' target='_blank'>Open</a><br/>User: " + data[x].SPSUser + "<br/>Password: " + data[x].SPSPass + "<br/>Name: " + data[x].TrialName + "<br/>Started: " + dateFormat(createDateValue, "m/d/yy h:MM TT") + " <br/>Expires: " + dateFormat(expireDateValue, "m/d/yy h:MM TT") + "<br/>Accessed: " + dateFormat(lastAccessedDateValue, "m/d/yy h:MM TT") + "</td>";
                                        }
                                        break;
                                    case "instancedates":
                                        //Expires:ExpireDate~Last Access:LastAccessed
                                        var expireDateString = data[x].ExpireDate; var expireDateValue = new Date(parseInt(expireDateString.replace(/\/Date\((\d+)\)\//, '$1')));
                                        var createDateString = data[x].CreateDate; var createDateValue = new Date(parseInt(createDateString.replace(/\/Date\((\d+)\)\//, '$1')));
                                        var lastAccessedDateString = data[x].LastAccessed; var lastAccessedDateValue = new Date(parseInt(lastAccessedDateString.replace(/\/Date\((\d+)\)\//, '$1')));
                                        html += "<td class='_K2NowControlPanelCell' style=''>Started: " + dateFormat(createDateValue, "m/d/yy h:MM TT") + " <br/>Expires: " + dateFormat(expireDateValue, "m/d/yy h:MM TT") + "<br/>Accessed: " + dateFormat(lastAccessedDateValue, "m/d/yy h:MM TT") + "</td>";
                                        break;
                                    case "owners":
                                        var tsOwner = data[x].TS; var bdmOwner = data[x].BDM; var notes = data[x].Notes;
                                        if (IsEmptyOrNull(tsOwner)) tsOwner = "Take Ownership"; if (IsEmptyOrNull(bdmOwner)) bdmOwner = "Take Ownership"; if (IsEmptyOrNull(notes)) notes = "Add Notes";
                                        if (IsEmptyOrNull(data[x].SPSSite)) {
                                            html += "<td class='_K2NowControlPanelCell' style='width:150px;overflow:hidden;'><div>TS: <span class='_K2NowOwner' target='/K2TryNow/tsOwnerAWS?instanceKey=" + data[x].InstanceKey + "''>" + tsOwner + "</span></div><div>BDM: <span class='_K2NowOwner' target='/K2TryNow/bdmOwnerAWS?instanceKey=" + data[x].InstanceKey + "'>" + bdmOwner + "</span></div><div>NOTES:<div class='_K2NowNotes' style='max-height:60px;overflow:scroll-y;' target='/K2TryNow/addNotesAWS?instanceKey=" + data[x].InstanceKey + "'>" + notes + "</div></div></td>";
                                        } else {
                                            var spsUserSplit = data[x].SPSUser.split('\\');
                                            html += "<td class='_K2NowControlPanelCell' style='width:150px;overflow:hidden;'><div>TS: <span class='_K2NowOwner' target='/K2TryNow/tsOwnerSPS?spsuser=" + spsUserSplit[1] + "''>" + tsOwner + "</span></div><div>BDM: <span class='_K2NowOwner' target='/K2TryNow/bdmOwnerSPS?spsuser=" + spsUserSplit[1] + "'>" + bdmOwner + "</span></div><div>NOTES:<div class='_K2NowNotes' style='max-height:60px;overflow:scroll-y;' target='/K2TryNow/addNotesSPS?spsuser=" + spsUserSplit[1] + "'>" + notes + "</div></div></td>";
                                        }
                                        break;
                                    case "expiredate":
                                    case "lastaccessed":
                                        var dateString = eval("data[" + x + "]." + displayColumns[i].split(":")[1]);
                                        var dateValue = new Date(parseInt(dateString.replace(/\/Date\((\d+)\)\//, '$1')));
                                        html += "<td class='_K2NowControlPanelCell' style=''>" + dateFormat(dateValue, "m/d/yy h:MM TT") + "</td>";
                                        break;
                                    default:
                                        html += "<td class='_K2NowControlPanelCell' style=''>" + eval("data[" + x + "]." + displayColumns[i].split(":")[1]) + "</td>";
                                        break;
                                }

                            }
                            html += "<td class='_K2NowStatus _K2NowControlPanelCell' style='width:100px;overflow:hidden;'>" + data[x].Status + "</td><td class='_K2NowControlPanelCell' style='width:175px;overflow:hidden;'>" + actions + "</div></td></tr>";
                        } catch (e) { }
                    }
                }
                html += "</table>";
                obj.html(html);

                obj.parent().parent().height(obj.height() + 50);
                SetupRows();
                //$("._K2NowOwner").die("click");
                //$("._K2NowOwner").live("click", function (e) {
                $(".PageContainer").off("click", "._K2NowOwner");
                $(".PageContainer").on("click", "._K2NowOwner", function (e) {
                    var url = $(this).attr("target");
                    jQuery("#jqmContainers").append(GetPopupWindow("K2NowOwner", 'RoundCornersPopupNew'));
                    jQuery("#K2NowOwner").jqm({ onHide: closeAndKill, ajax: url, ajaxText: "", ajaxMethod: "json", addRoundCorners: true, overlay: 65, modal: false, width: 325, height: 150, innerWidthOffset: 40, innerHeightOffset: 40, target: '#K2NowOwner_Body' });
                    jQuery("#K2NowOwner").jqmShow();
                    //$("._K2NowOwnerClaim").die("click");
                    //$("._K2NowOwnerClaim").live("click", function (e) {
                    $(".PageContainer").off("click", "._K2NowOwnerClaim");
                    $(".PageContainer").on("click", "._K2NowOwnerClaim", function (e) {
                        var claimurl = url.replace("Owner" + $(this).attr("target") + "?", "OwnerClaim" + $(this).attr("target") + "?");
                        jQuery("#K2NowOwner").jqmHide();
                        jQuery("#jqmContainers").append(GetPopupWindow("AjaxMessage"));
                        jQuery("#AjaxMessage").jqm({ onHide: closeAndKill, html: "", ajax: "", ajaxText: "", overlay: 65, modal: false, width: 300, height: 200, innerWidthOffset: 40, innerHeightOffset: 40, target: '#AjaxMessage_Body' });
                        jQuery("#AjaxMessage").jqmShow();
                        jQuery("#AjaxMessage_Body").html("<img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>");
                        $.post(claimurl, "",
                            function () {
                                $.doTimeout(500, function () {
                                    jQuery("#AjaxMessage").jqmHide();
                                    GetK2NowList(obj);
                                });
                            }
                        , "json");

                    });
                    //$("._K2NowOwnerCancel").die("click");
                    //$("._K2NowOwnerCancel").live("click", function (e) {
                    $(".PageContainer").off("click", "._K2NowOwnerCancel");
                    $(".PageContainer").on("click", "._K2NowOwnerCancel", function (e) {
                        CloseAllPopups();
                    });
                });
                //$("._K2NowNotes").die("click");
                //$("._K2NowNotes").live("click", function (e) {
                $(".PageContainer").off("click", "._K2NowNotes");
                $(".PageContainer").on("click", "._K2NowNotes", function (e) {
                    var url = $(this).attr("target");
                    jQuery("#jqmContainers").append(GetPopupWindow("K2NowNotes", 'RoundCornersPopupNew'));
                    jQuery("#K2NowNotes").jqm({ onHide: closeAndKill, ajax: url, ajaxText: "", ajaxMethod: "json", addRoundCorners: true, overlay: 65, modal: false, width: 600, height: 475, innerWidthOffset: 40, innerHeightOffset: 40, target: '#K2NowNotes_Body' });
                    jQuery("#K2NowNotes").jqmShow();
                    //$("._K2NowNotesSave").die("click");
                    //$("._K2NowNotesSave").live("click", function (e) {
                    $(".PageContainer").off("click", "._K2NowNotesSave");
                    $(".PageContainer").on("click", "._K2NowNotesSave", function (e) {
                        SaveNotes("Save", $(this).attr("target"));
                    });
                    //$("._K2NowNotesUpdate").die("click");
                    //$("._K2NowNotesUpdate").live("click", function (e) {
                    $(".PageContainer").off("click", "._K2NowNotesUpdate");
                    $(".PageContainer").on("click", "._K2NowNotesUpdate", function (e) {
                        SaveNotes("Update", $(this).attr("target"));
                    });
                    function SaveNotes(action, target) {
                        var notesURL = url.replace("Notes" + target + "?", "NotesSave" + target + "?");
                        var postData = "&Notes=" + encodeURIComponent(jQuery("#_K2NowAddNote").val()) + "&Type=" + action;
                        jQuery("#K2NowNotes").jqmHide();
                        jQuery("#jqmContainers").append(GetPopupWindow("AjaxMessage"));
                        jQuery("#AjaxMessage").jqm({ onHide: closeAndKill, html: "", ajax: "", ajaxText: "", overlay: 65, modal: false, width: 300, height: 200, innerWidthOffset: 40, innerHeightOffset: 40, target: '#AjaxMessage_Body' });
                        jQuery("#AjaxMessage").jqmShow();
                        jQuery("#AjaxMessage_Body").html("<img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>");
                        $.post(notesURL, postData,
                            function () {
                                $.doTimeout(500, function () {
                                    jQuery("#AjaxMessage").jqmHide();
                                    GetK2NowList(obj);
                                });
                            }
                        , "json");

                    }
                    //$("._K2NowNotesCancel").die("click");
                    //$("._K2NowNotesCancel").live("click", function (e) {
                    $(".PageContainer").off("click", "._K2NowNotesCancel");
                    $(".PageContainer").on("click", "._K2NowNotesCancel", function (e) {
                        CloseAllPopups();
                    });
                });
                $("._K2NowStatusCheck").each(function (e) {
                    GetStatus($(this).attr("currentstatus"), $(this).attr("expectedstatus"), $(this), $(this).parent(), $(this).parent().parent().parent().children("._K2NowStatus"), $(this).attr("instancekey"));
                });

                $("._K2NowHistory").click(function (e) {
                    var url = $(this).attr("target");
                    jQuery("#jqmContainers").append(GetPopupWindow("K2NowHistory", 'RoundCornersPopupNew'));
                    //jQuery("#jqmContainers").append($("<div id='InlineForm' class='jqmWindow' style='text-align:center;vertical-align:middle;'><div class='RoundCornersPopupNew' id='InlineForm_Body'><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/></div></div>"));
                    jQuery("#K2NowHistory").jqm({ onHide: closeAndKill, ajax: url, ajaxText: "", ajaxMethod: "json", addRoundCorners: true, overlay: 65, modal: false, width: 600, height: 600, innerWidthOffset: 40, innerHeightOffset: 40, target: '#K2NowHistory_Body' });
                    jQuery("#K2NowHistory").jqmShow();
                });

                //$("._K2NowConnect").die("click");
                //$("._K2NowConnect").live("click", function (e) {
                $(".PageContainer").off("click", "._K2NowConnect");
                $(".PageContainer").on("click","._K2NowConnect", function (e) {
                    var actionNode = $(this);
                    var actionsNode = actionNode.parent();
                    var statusNode = actionsNode.parent().parent().children("._K2NowStatus");
                    var instanceKey = $(this).attr("instancekey");
                    var target = $(this).attr("target")
                    download(target);
                    $.doTimeout(3000, function () {
                        GetStatus("", "", actionNode, actionsNode, statusNode, instanceKey);
                    });
                });
                //$("._K2NowAction").die("click");
                //$("._K2NowAction").live("click", function (e) {
                $(".PageContainer").off("click", "._K2NowAction");
                $(".PageContainer").on("click","._K2NowAction", function (e) {
                    //Post Action
                    var actionNode = $(this);
                    var actionsNode = actionNode.parent();
                    var statusNode = actionsNode.parent().parent().children("._K2NowStatus");
                    var currentStatus = statusNode.html();
                    actionsNode.html("<img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>");
                    statusNode.html(statusNode.html());
                    var target = actionNode.attr("target");
                    var instanceKey = actionNode.attr("instancekey");
                    var expectedStatus = actionNode.attr("expectedStatus");
                    $.post(target, "",
                            function () {
                                $.doTimeout(5000, function () {
                                    GetStatus(currentStatus, expectedStatus, actionNode, actionsNode, statusNode, instanceKey);
                                });
                            }
                        , "json");

                });
                //$("._K2NowExtend").die("click");
                //$("._K2NowExtend").live("click", function (e) {
                $(".PageContainer").off("click", "._K2NowExtend");
                $(".PageContainer").on("click", "._K2NowExtend", function (e) {
                    var target = $(this).attr("target");
                    var actionNode = $(this);
                    var actionsNode = actionNode.parent();
                    var statusNode = actionsNode.parent().parent().children("._K2NowStatus");
                    jQuery("#jqmContainers").append(GetPopupWindow("AjaxMessage"));
                    jQuery("#AjaxMessage").jqm({ onHide: closeAndKill, html: "Submitting extension request<br><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>", ajax: "", ajaxText: "", overlay: 65, modal: false, width: 300, height: 200, innerWidthOffset: 40, innerHeightOffset: 40, target: '#AjaxMessage_Body' });
                    jQuery("#AjaxMessage").jqmShow();
                    $.post(target, postData,
                    function (data) {
                        var newMsg = "";
                        if (data.Error.indexOf("ERROR") > -1) { newMsg = "An error ocurred extending your trial.<br><br><a href='javascript:CloseAllPopups();'>Close</a>"; }
                        else if (data.Error.indexOf("APPROVAL") > -1) { newMsg = "Your trial extension request has been sent for approval.<br><br><a href='javascript:CloseAllPopups();'>Close</a>"; }
                        if (IsEmptyOrNull(newMsg)) {
                            jQuery("#AjaxMessage").jqmHide();
                        } else {
                            jQuery("#AjaxMessage_Body").html(MakeRoundCornerPopup("<div id='AjaxMessage_Contents'>" + newMsg + "</div>", "AjaxMessage"));
                            var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
                            jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
                        }
                        //try { _gaq.push(['_trackEvent', 'K2 Online Trial', 'Trial Extension', _userName]); } catch (e) { }
                        TrackGoogleEvent('K2 Online Trial', 'Trial Extension', _userName);
                        GetK2NowList(jQuery("._K2NowList"));
                    }
                , "json");

                });
                //$("._K2NowCancel").die("click");
                //$("._K2NowCancel").live("click", function (e) {
                $(".PageContainer").off("click", "._K2NowCancel");
                $(".PageContainer").on("click", "._K2NowCancel", function (e) {
                    var target = $(this).attr("target");
                    var cancelHTML = "<div><div class='SubHead' style='font-size:24px;font-weight:normal;padding-bottom:10px;'>Cancel Trial</div><div>Are you sure you want to cancel this trial? If you choose to cancel, your trial will expire immediately and all related data will be removed.</div><br/><br/><div><input type='button' class='FormButton _K2NowCancelNo' value='Do NOT cancel trial'>&nbsp;<input type='button' class='FormButton _K2NowCancelYes' value='Cancel my trial'></div></div>";
                    jQuery("#jqmContainers").append(GetPopupWindow("AjaxMessage"));
                    jQuery("#AjaxMessage").jqm({ onHide: closeAndKill, html: cancelHTML, ajax: "", ajaxText: "", overlay: 65, modal: false, width: 400, height: 250, innerWidthOffset: 40, innerHeightOffset: 40, target: '#AjaxMessage_Body' });
                    jQuery("#AjaxMessage").jqmShow();

                    $("._K2NowCancelYes").click(function (e) {
                        jQuery("#jqmContainers").append(GetPopupWindow("CancelYesMessage"));
                        jQuery("#CancelYesMessage").jqm({ onHide: closeAndKill, html: "Submitting cancel request<br><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>", ajax: "", ajaxText: "", overlay: 65, modal: false, width: 300, height: 200, innerWidthOffset: 40, innerHeightOffset: 40, target: '#CancelYesMessage_Body' });
                        jQuery("#CancelYesMessage").jqmShow();
                        $.post(target, postData,
                        function (data) {
                            jQuery("#CancelYesMessage").jqmHide();
                            var newMsg = "";
                            if (data.Error.indexOf("ERROR") > -1) { newMsg = "An error ocurred cancelling your trial.<br/><br/><b>If your trial started prior to 5/24/2011, <span class='_K2NowManualCancel' style='cursor:pointer;text-decoration:underline;' target='/K2TryNow/cancel2'>please click here to cancel your trial</span>.</b><br/><br/<br/><a href='javascript:CloseAllPopups();'>Close</a>"; }
                            else { newMsg = "Your trial has been cancelled.<br><br><a href='javascript:CloseAllPopups();'>Close</a>"; }
                            if (IsEmptyOrNull(newMsg)) {
                                jQuery("#AjaxMessage").jqmHide();
                            } else {
                                jQuery("#AjaxMessage_Body").html(MakeRoundCornerPopup("<div id='AjaxMessage_Contents'>" + newMsg + "</div>", "AjaxMessage"));
                                var newH = jQuery("#AjaxMessage_Contents").innerHeight() + 40;
                                jQuery("#AjaxMessage_Body").animate({ height: newH }, 500);
                            }
                            //try { _gaq.push(['_trackEvent', 'K2 Online Trial', 'Trial Cancel', _userName]); } catch (e) { }
                            TrackGoogleEvent('K2 Online Trial', 'Trial Cancel', _userName);
                            $.doTimeout(1500, function () {
                                GetK2NowList(jQuery("._K2NowList"));
                            });

                        }
                    , "json");

                    });
                    $("._K2NowCancelNo").click(function (e) {
                        CloseAllPopups();
                        GetK2NowList(jQuery("._K2NowList"));
                    });

                });
                //jQuery("._K2NowReset").die("click");
                //jQuery("._K2NowReset").live("click", function (e) {
                jQuery(".PageContainer").off("click", "._K2NowReset");
                jQuery(".PageContainer").on("click", "._K2NowReset", function (e) {
                    e.preventDefault();
                    var target = $(this).attr("target");
                    var trialID = $(this).attr("trialID");
                    var smo = $(this).attr("smo");
                    var targetSection = $(this);
                    var postData = "&TrialID=" + trialID + "&SMO=" + smo;
                    targetSection.html("<img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>");
                    $.post(target, postData,
                        function (data) {
                            if (data.length > 0) {
                                if (data[0].Error != "" && data[0].Error != null && data[0].Error != "null") {
                                    targetSection.html(data[0].Error);
                                } else {
                                    targetSection.html(data[0].HTML);
                                    targetSection.removeClass("_AdminToolsResetTrial");
                                    SetupLists();
                                }
                            } else { targetSection.html("Opps! You appear to have have hit a bug! Sorry."); }
                        }
                    , "json");
                });


                function BuildActionsAWS(data, instanceKey) {
                    var actions = "";
                    if (IsEmptyOrNull(data.Status)) data.Status = "refresh";
                    switch (data.Status.toLowerCase()) {
                        case "starting":
                        case "pending":
                            actions += "<div class='_K2NowActions'><div class='_K2NowStatusCheck' currentstatus='" + data.Status + "' expectedstatus='running' instancekey='" + instanceKey + "'><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/></div></div>";
                            break;
                        case "stopping":
                        case "shutting-down":
                            actions += "<div class='_K2NowActions'><div class='_K2NowStatusCheck' currentstatus='" + data.Status + "' expectedstatus='stopped' instancekey='" + instanceKey + "'><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/></div></div>";
                            break;
                        case "running":
                        case "pending extension approval":
                            actions += "<div class='_K2NowActions'>";
                            actions += "<div class='LeftPad5 _K2NowConnect' style='width:100%;cursor:pointer;' instancekey='" + instanceKey + "' target='/K2TryNow/connect.rdp?instancekey=" + instanceKey + "' expectedStatus='' title='Connect as Administrator'>&nbsp;</div>";
                            if (data.CurrentUserEmail != data.UserEmail) actions += "<div class='LeftPad5 _K2NowConnect' style='width:100%;cursor:pointer;' instancekey='" + instanceKey + "' target='/K2TryNow/connect2.rdp?instancekey=" + instanceKey + "' expectedStatus='' title='Connect as K2Field'>&nbsp;</div>";
                            actions += "<div class='LeftPad5 _K2NowAction _K2NowStop' style='width:100%;cursor:pointer;' instancekey='" + instanceKey + "' target='/K2TryNow/shutdown?instancekey=" + instanceKey + "' expectedStatus='stopped'>&nbsp;</div>";
                            if (!IsEmptyOrNull(data.SN)) {
                                actions += "<div class='LeftPad5 _K2NowExtend' style='width:100%;cursor:pointer;' instancekey='" + instanceKey + "' target='/K2TryNow/extend?instancekey=" + instanceKey + "'>&nbsp;</div>";
                                actions += "<div class='LeftPad5 _K2NowCancel' style='width:100%;cursor:pointer;' instancekey='" + instanceKey + "' target='/K2TryNow/cancel?instancekey=" + instanceKey + "'>&nbsp;</div>";
                            }
                            actions += "</div>";
                            break;
                        case "stopped":
                            actions += "<div class='_K2NowActions'><div class='LeftPad5 _K2NowAction _K2NowStart' style='width:100%;cursor:pointer;' instancekey='" + instanceKey + "' target='/K2TryNow/start?instancekey=" + instanceKey + "' expectedStatus='running'>&nbsp;</div>";
                            if (!IsEmptyOrNull(data.SN)) {
                                actions += "<div class='LeftPad5 _K2NowExtend' style='width:100%;cursor:pointer;' instancekey='" + instanceKey + "' target='/K2TryNow/extend?instancekey=" + instanceKey + "'>&nbsp;</div>";
                                actions += "<div class='LeftPad5 _K2NowCancel' style='width:100%;cursor:pointer;' instancekey='" + instanceKey + "' target='/K2TryNow/cancel?instancekey=" + instanceKey + "'>&nbsp;</div>";
                            }
                            actions += "</div>";
                            break;
                        case "expired":
                            if (data.CurrentUserIsStaff) {
                                switch (data.TrialName) {
                                    case "blackpearl":
                                    case "blackpoint":
                                    case "k2forms":
                                        actions += "<div class='_K2NowActions'><div class='_K2NowReset' target='/admintools/ResetTrialAccess' trialID='" + data.ID + "' smo='c_K2Com_K2NowAWS' style='cursor:pointer;text-decoration:underline;'>Reset Trial Access</div></div>";
                                        break;
                                }
                            }
                            break;
                        case "refresh":
                            actions += "<div class=''>Please refresh page to get updated status.</div>";
                            break;
                    }
                    return actions;
                }
                function BuildActionsSPS(data) {
                    var actions = "";
                    switch (data.Status.toLowerCase()) {
                        case "running":
                        case "pending extension approval":
                            actions += "<div class='_K2NowActions'><a href='" + data.SPSSite + "' style='text-decoration:none;' target='_blank'><div class='LeftPad5 _K2NowConnect' style='width:100%;cursor:pointer;'></div></a>";
                            if (!IsEmptyOrNull(data.SN)) {
                                var spsUserSplit = data.SPSUser.split('\\');
                                actions += "<div class='LeftPad5 _K2NowExtend' style='width:100%;cursor:pointer;' spsuser='" + spsUserSplit[1] + "' target='/K2TryNow/spsextend?spsuser=" + spsUserSplit[1] + "'>&nbsp;</div>";
                                actions += "<div class='LeftPad5 _K2NowCancel' style='width:100%;cursor:pointer;' spsuser='" + spsUserSplit[1] + "' target='/K2TryNow/spscancel?spsuser=" + spsUserSplit[1] + "'>&nbsp;</div>";
                            }
                            actions += "</div>";
                            break;
                        case "expired":
                            if (data.CurrentUserIsStaff) {
                                switch (data.TrialName) {
                                    case "sharepoint":
                                        actions += "<div class='_K2NowActions'><div class='_K2NowReset' target='/admintools/ResetTrialAccess' trialID='" + data.ID + "' smo='c_K2Com_K2NowSPS' style='cursor:pointer;text-decoration:underline;'>Reset Trial Access</div></div>";
                                        break;
                                }
                            }
                            break;

                    }
                    return actions;
                }

                function GetStatus(currentStatus, expectedStatus, actionNode, actionsNode, statusNode, instanceKey) {
                    statusNode.html("Updating status");
                    var filename = "/K2TryNow/";
                    var newStatus = currentStatus;
                    var postData = "&instancekey=" + instanceKey;
                    $.post(filename, postData,
                    function (data) {
                        if (!IsEmptyOrNull(data.Status)) { newStatus = data.Status; }
                        if (newStatus == "connecting") {
                        } else if (newStatus.toLowerCase() == expectedStatus.toLowerCase() || newStatus.toLowerCase() == "terminated" || newStatus.toLowerCase() == "pending approval" || expectedStatus == "") {
                            var actions = "";
                            actions += BuildActionsAWS(data, instanceKey);
                            if (data.Status.toLowerCase() == "running" && expectedStatus != "") {
                                statusNode.html("Initializing SharePoint <span id='_SPSInitTime'>0</span>%<img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>");
                                $.doTimeout(1800, function () {
                                    var initdone = Number(statusNode.children("#_SPSInitTime").html());
                                    initdone++;
                                    statusNode.children("#_SPSInitTime").html(initdone);
                                    if (initdone >= 100) {
                                        actionsNode.html(actions);
                                        statusNode.html(capitaliseFirstLetter(data.Status));
                                        //Need to fix height after control panel changes status.
                                        return false;
                                    }
                                    return true;
                                });
                            } else {
                                actionsNode.html(actions);
                                statusNode.html(capitaliseFirstLetter(data.Status));
                            }
                        } else {
                            statusNode.html(capitaliseFirstLetter(newStatus));
                            $.doTimeout(5000, function () {
                                GetStatus(currentStatus, expectedStatus, actionNode, actionsNode, statusNode, instanceKey)
                            });
                        }
                    }
                , "json");
                }
                var _K2NowListSearchPressing;
                jQuery("._K2NowListFilter").change(function (e) {
                    var delay = 1000;
                    if (_K2NowListSearchPressing) {
                        clearTimeout(_K2NowListSearchPressing);
                        _K2NowListSearchPressing = setTimeout(K2NowListSearch, delay);
                    } else {
                        _K2NowListSearchPressing = setTimeout(K2NowListSearch, delay);
                    }
                });
                jQuery("._K2NowListSearch").keyup(function (e) {
                    var delay = 1000;
                    if (e.keyCode == 13) delay = 0;
                    if (_K2NowListSearchPressing) {
                        clearTimeout(_K2NowListSearchPressing);
                        _K2NowListSearchPressing = setTimeout(K2NowListSearch, delay);
                    } else {
                        _K2NowListSearchPressing = setTimeout(K2NowListSearch, delay);
                    }

                });
                function K2NowListSearch() {
                    GetK2NowList(obj);
                }
            }
           , "json");
}
//******************End Amazon Trial Functionality********************//
//jQuery("._TrialTracking").live("click", function (e) {
$(".PageContainer").on("click", "._TrialTracking", function (e) {
    e.preventDefault();
    var postData = "";
    var popup = false;
    try { popup = (($(this).attr("popup") == "yes") ? true : false); } catch (err) { }
    $("._AdminToolsInput").each(function (args) {
        postData += "&" + $(this).attr("id") + "=" + $(this).val();
    });
    var target = $(this).attr("target");
    var targetSectionOverride = $(this).attr("targetSection");
    var targetSection = $("._AdminToolsBody");
    if (targetSectionOverride != undefined) targetSection = $(targetSectionOverride);
    targetSection.html("<img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>");
    $.post(target, postData,
            function (data) {
                if (data.length > 0) {
                    if (data[0].Error != "" && data[0].Error != null && data[0].Error != "null") {
                        targetSection.html(data[0].Error);
                    } else {
                        targetSection.html(data[0].HTML);
                        SetupLists();
                    }
                } else { targetSection.html("An unknown error occurred."); }
            }
        , "json");
});


//Online trial Launching
jQuery('a[href*=".trial"], a[href*="/trials/"]').each(function (e) {
    $(this).click(function (e) {
        if (e.href.indexOf("page=") == 1) {
            e.preventDefault();
            var url = e.target;
            url += "&json=true";
            var postData = "";
            jQuery("#jqmContainers").append(GetPopupWindow("OnlineTrialWindow"));
            jQuery("#OnlineTrialWindow").jqm({ onHide: closeAndKill, html: "Launching Online Trial<br><img src='/img/k2comv5/preloader.gif' style='height:90px !important; width:90px !important;'/>", ajax: "", ajaxText: "", overlay: 65, modal: false, width: 400, height: 400, innerWidthOffset: 40, innerHeightOffset: 40, target: '#OnlineTrialWindow_Body' });
            jQuery("#OnlineTrialWindow").jqmShow();
            $.post(url, postData,
            function (data) {
                if (data.length > 0) {
                    if (!IsEmptyOrNull(data[0].Error)) jQuery("#OnlineTrialWindow_Body").html("<div>The online trial could not be started because of the following error:</div><div style='padding-left:20px;'>" + data[0].Error + "</div>");
                    if (!IsEmptyOrNull(data[0].LoadPage)) {
                        window.open(data[0].LoadPage, "OnlineTrial", "location=0,status=0,menubar=0,toolbar=0,directories=0,resizable=1,scrollbars=1,width=1024,height=768");
                        jQuery("#OnlineTrialWindow_Body").html("<div>Your online trial should have opened in a new window.</div><div style='padding-left:20px;'><a href='" + data[0].LoadPage + "' target='_blank'>Click here if the window does not open</a></div>");
                    }
                } else {
                    jQuery("#OnlineTrialWindow_Body").html("The online trial could not be started because of an unknown error");
                }
            }
        , "json");
        }
    });
});
//online help sizing
$(".HelpFrame").find("iframe").each(function (e) {
    var winHeight = $(window).height() - 150;
    $(this).height(winHeight);
    $('html, body').animate({
        scrollTop: $(this).parent().offset().top-75
    }, 500);
});

//        jQuery('iframe').each(function (e) {
//            $(this).height(500);
//            $(this).load(function () {
//                var winHeight = $(window).height() - 300;
//                if (winHeight < 400) winHeight = 400;
//                $(this).height(winHeight);
//            });
//        });
/***************************************************************/


//jQuery("._TimedAd").each(function (e) {
//    var obj = $(this);
//    var target = obj.attr("target");
//    var adNode = obj.children();
//    var adID = obj.attr("AdID");
//    var maskScreen = false;
//    var showTime = 1500;
//    var outterRoundClass = ""; var innerRoundClass = ""; var styleTags = "";
//    try { showTime = Number(adNode.attr("showtime")); } catch (e) { showTime = 1500; } if (IsEmptyOrNull(showTime)) showTime = 1500;
//    try { maskScreen = adNode.attr("maskscreen"); } catch (e) { maskScreen = false; } if (IsEmptyOrNull(maskScreen)) maskScreen = false;
//    try { outterRoundClass = adNode.attr("outterRoundClass"); } catch (e) { outterRoundClass = ""; } if (IsEmptyOrNull(outterRoundClass)) outterRoundClass = "";
//    try { innerRoundClass = adNode.attr("innerRoundClass"); } catch (e) { innerRoundClass = ""; } if (IsEmptyOrNull(innerRoundClass)) innerRoundClass = "";
//    try { styleTags = adNode.attr("style"); } catch (e) { styleTags = ""; } if (IsEmptyOrNull(styleTags)) styleTags = "";
//    var adNodeHTML = "";
//    //alert(adNodeHTML);
//    var w = adNode.width(); var outterW = w + 30;
//    var h = adNode.height(); var outterH = h + 40;
//    //alert(maskScreen);
//    if (maskScreen == "true") adNodeHTML += "<div class='jqmOverlay' style='height: 100%; width: 100%; position: fixed; left: 0px; top: 0px; z-index: 2999; opacity: 0.65;'></div>";
//    if (!IsEmptyOrNull(outterRoundClass)) adNodeHTML += "<table class='" + outterRoundClass + "' style='width:" + outterW + "px;height:" + outterH + "px;position:absolute;z-index:10000;'><tbody><tr><td class='Round_TopLeft'>&nbsp;</td><td class='Round_TopMiddle'>&nbsp;</td><td class='Round_TopRight'>&nbsp;</td></tr><tr><td class='Round_MiddleLeft'>&nbsp;</td><td class='Round_MiddleMiddle'>";
//    if (IsEmptyOrNull(innerRoundClass)) { adNodeHTML += "<div style='" + styleTags + "'>" + adNode.html() + "</div>"; }
//    else {
//        var extraCSS = ""; if (IsEmptyOrNull(outterRoundClass)) extraCSS = "position:absolute;z-index:10000;";
//        adNodeHTML += "<div class='" + innerRoundClass + "' style='" + styleTags + ";" + extraCSS + "'>" + adNode.html();
//        adNodeHTML += "<div class='Round_TopLeft' style=''>&nbsp;</div><div class='Round_TopRight' style=''>&nbsp;</div><div class='Round_BottomLeft' style=''>&nbsp;</div><div class='Round_BottomRight' style=''>&nbsp;</div><div class='Round_MiddleLeft' style='height:" + h + "px;'>&nbsp;</div><div class='Round_MiddleRight' style='height:" + h + "px;'>&nbsp;</div><div class='Round_TopMiddle' style='width:" + w + "px;'>&nbsp;</div><div class='Round_BottomMiddle' style='width:" + w + "px;'>&nbsp;</div>";
//        adNodeHTML += "<div style='position:absolute;bottom:10px;left:10px;'><input type='checkbox' id='_TimedAdDoNotShowAgain' value='" + adID + "'/> Do not this again</div>";
//        adNodeHTML += "<div style='position:absolute;bottom:10px;right:10px;cursor:pointer;'><span id='_TimedAdCloseNow' style='cursor:pointer;'>Close </span>(<span id='_TimedAdTimer'>" + Number(showTime / 1000) + "</span>)</div>";
//        adNodeHTML += "</div>";
//    }
//    if (!IsEmptyOrNull(outterRoundClass)) adNodeHTML += "</td><td class='Round_MiddleRight'>&nbsp;</td></tr><tr><td class='Round_BottomLeft'>&nbsp;</td><td class='Round_BottomMiddle'>&nbsp;</td><td class='Round_BottomRight'>&nbsp;</td></tr></tbody></table>";
//    var newNode = $(adNodeHTML);
//    $(target).prepend(newNode);

//    $.doTimeout(showTime, function () {
//        newNode.fadeOut(500);
//    });
//    $.doTimeout(1000, function () { CountDown(); });
//    function CountDown() {
//        var currentTime = Number($("#_TimedAdTimer").html());
//        currentTime = currentTime - 1;
//        $("#_TimedAdTimer").html(currentTime);
//        if (currentTime > 0) $.doTimeout(1000, function () { CountDown(); });
//    }
//    jQuery("#_TimedAdCloseNow").click(function (e) {
//        newNode.hide();
//    });
//});
//jQuery("#_TimedAdDoNotShowAgain").click(function (e) {
//    var targetAd = $(this).val();
//    var newCookieValue = "";
//    var allAds = GetCookie("K2Ads");
//    var adArray = allAds.split('&');
//    for (var x = 0; x < adArray.length; x++) {
//        var nameValue = adArray[x].split('=');
//        if (!IsEmptyOrNull(newCookieValue)) newCookieValue += "&";
//        if (nameValue[0] == targetAd) {
//            newCookieValue += targetAd + "=99999";
//        } else {
//            newCookieValue += adArray[x];
//        }
//    }
//    SetCookie("K2Ads", newCookieValue, 730, "/", "k2.com", false);
//});