/*!
 * jQuery++ - 1.0.1
 * http://jquerypp.com
 * Copyright (c) 2014 Bitovi
 * Mon, 12 May 2014 18:13:45 GMT
 * Licensed MIT
 * Download from: http://bitbuilder.herokuapp.com/jquerypp.custom.js?plugins=jquerypp%2Fevent%2Fresize&plugins=jquerypp%2Fevent%2Fswipe
 */
(function($) {

    // ## jquerypp/event/reverse/reverse.js
    var __m2 = (function($) {
        $.event.reverse = function(name, attributes) {
            var bound = $(),
                count = 0,
                dispatch = $.event.handle || $.event.dispatch;

            $.event.special[name] = {
                setup: function() {
                    // add and sort the resizers array
                    // don't add window because it can't be compared easily
                    if (this !== window) {
                        bound.push(this);
                        $.unique(bound);
                    }
                    // returns false if the window
                    return this !== window;
                },
                teardown: function() {
                    // we shouldn't have to sort
                    bound = bound.not(this);
                    // returns false if the window
                    return this !== window;
                },
                add: function(handleObj) {
                    var origHandler = handleObj.handler;
                    handleObj.origHandler = origHandler;

                    handleObj.handler = function(ev, data) {
                        var isWindow = this === window;
                        if (attributes && attributes.handler) {
                            var result = attributes.handler.apply(this, arguments);
                            if (result === true) {
                                return;
                            }
                        }

                        // if this is the first handler for this event ...
                        if (count === 0) {
                            // prevent others from doing what we are about to do
                            count++;
                            var where = data === false ? ev.target : this

                            // trigger all this element's handlers
                            dispatch.call(where, ev, data);
                            if (ev.isPropagationStopped()) {
                                count--;
                                return;
                            }

                            // get all other elements within this element that listen to move
                            // and trigger their resize events
                            var index = bound.index(this),
                                length = bound.length,
                                child, sub;

                            // if index == -1 it's the window
                            while (++index < length && (child = bound[index]) && (isWindow || $.contains(where, child))) {

                                // call the event
                                dispatch.call(child, ev, data);

                                if (ev.isPropagationStopped()) {
                                    // move index until the item is not in the current child
                                    while (++index < length && (sub = bound[index])) {
                                        if (!$.contains(child, sub)) {
                                            // set index back one
                                            index--;
                                            break
                                        }
                                    }
                                }
                            }

                            // prevent others from responding
                            ev.stopImmediatePropagation();
                            count--;
                        } else {
                            handleObj.origHandler.call(this, ev, data);
                        }
                    }
                }
            };

            // automatically bind on these
            $([document, window]).bind(name, function() {});

            return $.event.special[name];
        }

        return $;
    })($);

    // ## jquerypp/event/resize/resize.js
    var __m1 = (function($) {
        var
        // bind on the window window resizes to happen
        win = $(window),
            windowWidth = 0,
            windowHeight = 0,
            timer;

        $(function() {
            windowWidth = win.width();
            windowHeight = win.height();
        });

        $.event.reverse('resize', {
                handler: function(ev, data) {
                    var isWindow = this === window;

                    // if we are the window and a real resize has happened
                    // then we check if the dimensions actually changed
                    // if they did, we will wait a brief timeout and
                    // trigger resize on the window
                    // this is for IE, to prevent window resize 'infinate' loop issues
                    if (isWindow && ev.originalEvent) {
                        var width = win.width(),
                            height = win.height();

                        if ((width != windowWidth || height != windowHeight)) {
                            //update the new dimensions
                            windowWidth = width;
                            windowHeight = height;
                            clearTimeout(timer)
                            timer = setTimeout(function() {
                                win.trigger("resize");
                            }, 1);

                        }
                        return true;
                    }
                }
            });

        return $;
    })(__m2);

    // ## jquerypp/event/livehack/livehack.js
    var __m5 = (function($) {

        var event = $.event,

            //helper that finds handlers by type and calls back a function, this is basically handle
            // events - the events object
            // types - an array of event types to look for
            // callback(type, handlerFunc, selector) - a callback
            // selector - an optional selector to filter with, if there, matches by selector
            //     if null, matches anything, otherwise, matches with no selector
            findHelper = function(events, types, callback, selector) {
                var t, type, typeHandlers, all, h, handle,
                    namespaces, namespace,
                    match;
                for (t = 0; t < types.length; t++) {
                    type = types[t];
                    all = type.indexOf(".") < 0;
                    if (!all) {
                        namespaces = type.split(".");
                        type = namespaces.shift();
                        namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
                    }
                    typeHandlers = (events[type] || []).slice(0);

                    for (h = 0; h < typeHandlers.length; h++) {
                        handle = typeHandlers[h];

                        match = (all || namespace.test(handle.namespace));

                        if (match) {
                            if (selector) {
                                if (handle.selector === selector) {
                                    callback(type, handle.origHandler || handle.handler);
                                }
                            } else if (selector === null) {
                                callback(type, handle.origHandler || handle.handler, handle.selector);
                            } else if (!handle.selector) {
                                callback(type, handle.origHandler || handle.handler);

                            }
                        }


                    }
                }
            };


        event.find = function(el, types, selector) {
            var events = ($._data(el) || {}).events,
                handlers = [],
                t, liver, live;

            if (!events) {
                return handlers;
            }
            findHelper(events, types, function(type, handler) {
                handlers.push(handler);
            }, selector);
            return handlers;
        };

        event.findBySelector = function(el, types) {
            var events = $._data(el).events,
                selectors = {},
                //adds a handler for a given selector and event
                add = function(selector, event, handler) {
                    var select = selectors[selector] || (selectors[selector] = {}),
                        events = select[event] || (select[event] = []);
                    events.push(handler);
                };

            if (!events) {
                return selectors;
            }
            //first check live:

            //then check straight binds
            findHelper(events, types, function(type, handler, selector) {
                add(selector || "", type, handler);
            }, null);

            return selectors;
        };
        event.supportTouch = "ontouchend" in document;

        $.fn.respondsTo = function(events) {
            if (!this.length) {
                return false;
            } else {
                //add default ?
                return event.find(this[0], $.isArray(events) ? events : [events]).length > 0;
            }
        };
        $.fn.triggerHandled = function(event, data) {
            event = (typeof event == "string" ? $.Event(event) : event);
            this.trigger(event, data);
            return event.handled;
        };

        event.setupHelper = function(types, startingEvent, onFirst) {
            if (!onFirst) {
                onFirst = startingEvent;
                startingEvent = null;
            }
            var add = function(handleObj) {
                var bySelector,
                    selector = handleObj.selector || "",
                    namespace = handleObj.namespace ? '.' + handleObj.namespace : '';

                if (selector) {
                    bySelector = event.find(this, types, selector);
                    if (!bySelector.length) {
                        $(this).delegate(selector, startingEvent + namespace, onFirst);
                    }
                } else {
                    //var bySelector = event.find(this, types, selector);
                    if (!event.find(this, types, selector).length) {
                        event.add(this, startingEvent + namespace, onFirst, {
                                selector: selector,
                                delegate: this
                            });
                    }

                }

            },
                remove = function(handleObj) {
                    var bySelector, selector = handleObj.selector || "";
                    if (selector) {
                        bySelector = event.find(this, types, selector);
                        if (!bySelector.length) {
                            $(this).undelegate(selector, startingEvent, onFirst);
                        }
                    } else {
                        if (!event.find(this, types, selector).length) {
                            event.remove(this, startingEvent, onFirst, {
                                    selector: selector,
                                    delegate: this
                                });
                        }
                    }
                };
            $.each(types, function() {
                event.special[this] = {
                    add: add,
                    remove: remove,
                    setup: function() {},
                    teardown: function() {}
                };
            });
        };

        return $;
    })($);

    // ## jquerypp/event/swipe/swipe.js
    var __m4 = (function($) {
        var isPhantom = /Phantom/.test(navigator.userAgent),
            supportTouch = !isPhantom && "ontouchend" in document,
            scrollEvent = "touchmove scroll",
            // Use touch events or map it to mouse events
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove",
            data = function(event) {
                var d = event.originalEvent.touches ?
                    event.originalEvent.touches[0] :
                    event;
                return {
                    time: (new Date).getTime(),
                    coords: [d.clientX, d.clientY],
                    origin: $(event.target)
                };
            };

        var swipe = $.event.swipe = {

            delay: 500,

            max: 320,

            min: 30
        };

        $.event.setupHelper([

                "swipe",

                'swipeleft',

                'swiperight',

                'swipeup',

                'swipedown'
            ], touchStartEvent, function(ev) {
                var
                // update with data when the event was started
                start = data(ev),
                    stop,
                    delegate = ev.delegateTarget || ev.currentTarget,
                    selector = ev.handleObj.selector,
                    entered = this;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    // update stop with the data from the current event
                    stop = data(event);

                    // prevent scrolling
                    if (Math.abs(start.coords[0] - stop.coords[0]) > 10) {
                        event.preventDefault();
                    }
                };

                // Attach to the touch move events
                $(document.documentElement).bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function(event) {
                        $(this).unbind(touchMoveEvent, moveHandler);
                        // if start and stop contain data figure out if we have a swipe event
                        if (start && stop) {
                            // calculate the distance between start and stop data
                            var deltaX = Math.abs(start.coords[0] - stop.coords[0]),
                                deltaY = Math.abs(start.coords[1] - stop.coords[1]),
                                distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                            // check if the delay and distance are matched
                            if (stop.time - start.time < swipe.delay && distance >= swipe.min && distance <= swipe.max) {
                                var events = ['swipe'];
                                // check if we moved horizontally
                                if (deltaX >= swipe.min && deltaY < swipe.min) {
                                    // based on the x coordinate check if we moved left or right
                                    events.push(start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight");
                                } else
                                // check if we moved vertically
                                if (deltaY >= swipe.min && deltaX < swipe.min) {
                                    // based on the y coordinate check if we moved up or down
                                    events.push(start.coords[1] < stop.coords[1] ? "swipedown" : "swipeup");
                                }

                                // trigger swipe events on this guy
                                $.each($.event.find(delegate, events, selector), function() {
                                    this.call(entered, ev, {
                                            start: start,
                                            end: stop
                                        })
                                })

                            }
                        }
                        // reset start and stop
                        start = stop = undefined;
                    })
            });

        return $;
    })($, __m5);
})(jQuery);