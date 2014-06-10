/*!
 * jQuery++ - 1.0.1
 * http://jquerypp.com
 * Copyright (c) 2014 Bitovi
 * Tue, 10 Jun 2014 00:52:08 GMT
 * Licensed MIT
 * Download from: http://bitbuilder.herokuapp.com/jquerypp.custom.js?plugins=jquerypp%2Fdom%2Fcookie&plugins=jquerypp%2Fdom%2Fform_params&plugins=jquerypp%2Fdom%2Frange&plugins=jquerypp%2Fdom%2Fselection&plugins=jquerypp%2Fevent%2Fdestroyed&plugins=jquerypp%2Fevent%2Ffastfix&plugins=jquerypp%2Fevent%2Fhover&plugins=jquerypp%2Fevent%2Fkey&plugins=jquerypp%2Fevent%2Fresize&plugins=jquerypp%2Fevent%2Fswipe
 */
(function($) {

    // ## jquerypp/lang/json/json.js
    var __m3 = (function($) {

        $.toJSON = function(o, replacer, space, recurse) {
            if (typeof(JSON) == 'object' && JSON.stringify)
                return JSON.stringify(o, replacer, space);

            if (!recurse && $.isFunction(replacer))
                o = replacer("", o);

            if (typeof space == "number")
                space = "          ".substring(0, space);
            space = (typeof space == "string") ? space.substring(0, 10) : "";

            var type = typeof(o);

            if (o === null)
                return "null";

            if (type == "undefined" || type == "function")
                return undefined;

            if (type == "number" || type == "boolean")
                return o + "";

            if (type == "string")
                return $.quoteString(o);

            if (type == 'object') {
                if (typeof o.toJSON == "function")
                    return $.toJSON(o.toJSON(), replacer, space, true);

                if (o.constructor === Date) {
                    var month = o.getUTCMonth() + 1;
                    if (month < 10) month = '0' + month;

                    var day = o.getUTCDate();
                    if (day < 10) day = '0' + day;

                    var year = o.getUTCFullYear();

                    var hours = o.getUTCHours();
                    if (hours < 10) hours = '0' + hours;

                    var minutes = o.getUTCMinutes();
                    if (minutes < 10) minutes = '0' + minutes;

                    var seconds = o.getUTCSeconds();
                    if (seconds < 10) seconds = '0' + seconds;

                    var milli = o.getUTCMilliseconds();
                    if (milli < 100) milli = '0' + milli;
                    if (milli < 10) milli = '0' + milli;

                    return '"' + year + '-' + month + '-' + day + 'T' +
                        hours + ':' + minutes + ':' + seconds +
                        '.' + milli + 'Z"';
                }

                var process = ($.isFunction(replacer)) ? function(k, v) {
                        return replacer(k, v);
                    } : function(k, v) {
                        return v;
                    },
                    nl = (space) ? "\n" : "",
                    sp = (space) ? " " : "";

                if (o.constructor === Array) {
                    var ret = [];
                    for (var i = 0; i < o.length; i++)
                        ret.push(($.toJSON(process(i, o[i]), replacer, space, true) || "null").replace(/^/gm, space));

                    return "[" + nl + ret.join("," + nl) + nl + "]";
                }

                var pairs = [],
                    proplist;
                if ($.isArray(replacer)) {
                    proplist = $.map(replacer, function(v) {
                        return (typeof v == "string" || typeof v == "number") ?
                            v + "" :
                            null;
                    });
                }
                for (var k in o) {
                    var name, val, type = typeof k;

                    if (proplist && $.inArray(k + "", proplist) == -1)
                        continue;

                    if (type == "number")
                        name = '"' + k + '"';
                    else if (type == "string")
                        name = $.quoteString(k);
                    else
                        continue; //skip non-string or number keys

                    val = $.toJSON(process(k, o[k]), replacer, space, true);

                    if (typeof val == "undefined")
                        continue; //skip pairs where the value is a function.

                    pairs.push((name + ":" + sp + val).replace(/^/gm, space));
                }

                return "{" + nl + pairs.join("," + nl) + nl + "}";
            }
        };


        $.evalJSON = function(src) {
            if (typeof(JSON) == 'object' && JSON.parse)
                return JSON.parse(src);
            return eval("(" + src + ")");
        };


        $.secureEvalJSON = function(src) {
            if (typeof(JSON) == 'object' && JSON.parse)
                return JSON.parse(src);

            var filtered = src;
            filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
            filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
            filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

            if (/^[\],:{}\s]*$/.test(filtered))
                return eval("(" + src + ")");
            else
                throw new SyntaxError("Error parsing JSON, source is not valid.");
        };


        $.quoteString = function(string) {
            if (string.match(_escapeable)) {
                return '"' + string.replace(_escapeable, function(a) {
                    var c = _meta[a];
                    if (typeof c === 'string') return c;
                    c = a.charCodeAt();
                    return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                }) + '"';
            }
            return '"' + string + '"';
        };

        var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;

        var _meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };

        return $;
    })($);

    // ## jquerypp/dom/cookie/cookie.js
    var __m1 = (function($) {

        $.cookie = function(name, value, options) {
            if (typeof value != 'undefined') {
                // name and value given, set cookie
                options = options || {};
                if (value === null) {
                    value = '';
                    options.expires = -1;
                }
                // convert value to JSON string
                if (typeof value == 'object' && $.toJSON) {
                    value = $.toJSON(value);
                }
                var expires = '';
                // Set expiry
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                }
                // CAUTION: Needed to parenthesize options.path and options.domain
                // in the following expressions, otherwise they evaluate to undefined
                // in the packed version for some reason...
                var path = options.path ? '; path=' + (options.path) : '';
                var domain = options.domain ? '; domain=' + (options.domain) : '';
                var secure = options.secure ? '; secure' : '';
                // Set the cookie name=value;expires=;path=;domain=;secure-
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            } else { // only name given, get cookie
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = $.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            // Get the cookie value
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                // Parse JSON from the cookie into an object
                if ($.evalJSON && cookieValue && cookieValue.match(/^\s*\{/)) {
                    try {
                        cookieValue = $.evalJSON(cookieValue);
                    } catch (e) {}
                }
                return cookieValue;
            }
        };

        return $;
    })($, __m3);

    // ## jquerypp/dom/form_params/form_params.js
    var __m4 = (function($) {
        var
        // use to parse bracket notation like my[name][attribute]
        keyBreaker = /[^\[\]]+/g,
            // converts values that look like numbers and booleans and removes empty strings
            convertValue = function(value) {
                if ($.isNumeric(value)) {
                    return parseFloat(value);
                } else if (value === 'true') {
                    return true;
                } else if (value === 'false') {
                    return false;
                } else if (value === '' || value === null) {
                    return undefined;
                }
                return value;
            },
            // Access nested data
            nestData = function(elem, type, data, parts, value, seen, fullName) {
                var name = parts.shift();
                // Keep track of the dot separated fullname. Used to uniquely track seen values
                // and if they should be converted to an array or not
                fullName = fullName ? fullName + '.' + name : name;

                if (parts.length) {
                    if (!data[name]) {
                        data[name] = {};
                    }

                    // Recursive call
                    nestData(elem, type, data[name], parts, value, seen, fullName);
                } else {

                    // Handle same name case, as well as "last checkbox checked"
                    // case
                    if (fullName in seen && type != "radio" && !$.isArray(data[name])) {
                        if (name in data) {
                            data[name] = [data[name]];
                        } else {
                            data[name] = [];
                        }
                    } else {
                        seen[fullName] = true;
                    }

                    // Finally, assign data
                    if ((type == "radio" || type == "checkbox") && !elem.is(":checked")) {
                        return
                    }

                    if (!data[name]) {
                        data[name] = value;
                    } else {
                        data[name].push(value);
                    }

                }

            };


        $.fn.extend({
                formParams: function(params) {

                    var convert;

                    // Quick way to determine if something is a boolean
                    if ( !! params === params) {
                        convert = params;
                        params = null;
                    }

                    if (params) {
                        return this.setParams(params);
                    } else {
                        return this.getParams(convert);
                    }
                },
                setParams: function(params) {

                    // Find all the inputs
                    this.find("[name]").each(function() {
                        var $this = $(this),
                            value = params[$this.attr("name")];

                        // Don't do all this work if there's no value
                        if (value !== undefined) {

                            // Nested these if statements for performance
                            if ($this.is(":radio")) {
                                if ($this.val() == value) {
                                    $this.attr("checked", true);
                                }
                            } else if ($this.is(":checkbox")) {
                                // Convert single value to an array to reduce
                                // complexity
                                value = $.isArray(value) ? value : [value];
                                if ($.inArray($this.val(), value) > -1) {
                                    $this.attr("checked", true);
                                }
                            } else {
                                $this.val(value);
                            }
                        }
                    });
                },
                getParams: function(convert) {
                    var data = {},
                        // This is used to keep track of the checkbox names that we've
                        // already seen, so we know that we should return an array if
                        // we see it multiple times. Fixes last checkbox checked bug.
                        seen = {},
                        current;

                    this.find("[name]:not(:disabled)").each(function() {
                        var $this = $(this),
                            type = $this.attr("type"),
                            name = $this.attr("name"),
                            value = $this.val(),
                            parts;

                        // Don't accumulate submit buttons and nameless elements
                        if (type == "submit" || !name) {
                            return;
                        }

                        // Figure out name parts
                        parts = name.match(keyBreaker);
                        if (!parts.length) {
                            parts = [name];
                        }

                        // Convert the value
                        if (convert) {
                            value = convertValue(value);
                        }

                        // Assign data recursively
                        nestData($this, type, data, parts, value, seen);

                    });

                    return data;
                }
            });

        return $;
    })($);

    // ## jquerypp/dom/compare/compare.js
    var __m6 = (function($) {

        // See http://ejohn.org/blog/comparing-document-position/
        $.fn.compare = function(element) { //usually
            try {
                // Firefox 3 throws an error with XUL - we can't use compare then
                element = element.jquery ? element[0] : element;
            } catch (e) {
                return null;
            }

            // make sure we aren't coming from XUL element
            if (window.HTMLElement) {
                var s = HTMLElement.prototype.toString.call(element)
                if (s == '[xpconnect wrapped native prototype]' || s == '[object XULElement]' || s === '[object Window]') {
                    return null;
                }
            }

            if (this[0].compareDocumentPosition) {
                // For browsers that support it, use compareDocumentPosition
                // https://developer.mozilla.org/en/DOM/Node.compareDocumentPosition
                return this[0].compareDocumentPosition(element);
            }

            // this[0] contains element
            if (this[0] == document && element != document) return 8;

            var number =
            // this[0] contains element
            (this[0] !== element && this[0].contains(element) && 16) +
            // element contains this[0]
            (this[0] != element && element.contains(this[0]) && 8),
                docEl = document.documentElement;

            // Use the sourceIndex
            if (this[0].sourceIndex) {
                // this[0] precedes element
                number += (this[0].sourceIndex < element.sourceIndex && 4)
                // element precedes foo[0]
                number += (this[0].sourceIndex > element.sourceIndex && 2)
                // The nodes are in different documents
                number += (this[0].ownerDocument !== element.ownerDocument ||
                    (this[0] != docEl && this[0].sourceIndex <= 0) ||
                    (element != docEl && element.sourceIndex <= 0)) && 1
            }

            return number;
        }

        return $;
    })($);

    // ## jquerypp/dom/range/range.js
    var __m5 = (function($) {


        $.fn.range = function() {
            return $.Range(this[0])
        }

        var convertType = function(type) {
            return type.replace(/([a-z])([a-z]+)/gi, function(all, first, next) {
                return first + next.toLowerCase()
            }).replace(/_/g, "");
        },
            // reverses things like START_TO_END into END_TO_START
            reverse = function(type) {
                return type.replace(/^([a-z]+)_TO_([a-z]+)/i, function(all, first, last) {
                    return last + "_TO_" + first;
                });
            },
            getWindow = function(element) {
                return element ? element.ownerDocument.defaultView || element.ownerDocument.parentWindow : window
            },
            bisect = function(el, start, end) {
                //split the start and end ... figure out who is touching ...
                if (end - start == 1) {
                    return
                }
            },
            support = {};

        $.Range = function(range) {
            // If it's called w/o new, call it with new!
            if (this.constructor !== $.Range) {
                return new $.Range(range);
            }
            // If we are passed a jQuery-wrapped element, get the raw element
            if (range && range.jquery) {
                range = range[0];
            }
            // If we have an element, or nothing
            if (!range || range.nodeType) {
                // create a range
                this.win = getWindow(range)
                if (this.win.document.createRange) {
                    this.range = this.win.document.createRange()
                } else if (this.win && this.win.document.body && this.win.document.body.createTextRange) {
                    this.range = this.win.document.body.createTextRange()
                }
                // if we have an element, make the range select it
                if (range) {
                    this.select(range)
                }
            }
            // if we are given a point
            else if (range.clientX != null || range.pageX != null || range.left != null) {
                this.moveToPoint(range);
            }
            // if we are given a touch event
            else if (range.originalEvent && range.originalEvent.touches && range.originalEvent.touches.length) {
                this.moveToPoint(range.originalEvent.touches[0])

            }
            // if we are a normal event
            else if (range.originalEvent && range.originalEvent.changedTouches && range.originalEvent.changedTouches.length) {
                this.moveToPoint(range.originalEvent.changedTouches[0])
            }
            // given a TextRange or something else?
            else {
                this.range = range;
            }
        };

        $.Range.

        current = function(el) {
            var win = getWindow(el),
                selection;
            if (win.getSelection) {
                // If we can get the selection
                selection = win.getSelection()
                return new $.Range(selection.rangeCount ? selection.getRangeAt(0) : win.document.createRange())
            } else {
                // Otherwise use document.selection
                return new $.Range(win.document.selection.createRange());
            }
        };

        $.extend($.Range.prototype,

            {

                moveToPoint: function(point) {
                    var clientX = point.clientX,
                        clientY = point.clientY
                    if (!clientX) {
                        var off = scrollOffset();
                        clientX = (point.pageX || point.left || 0) - off.left;
                        clientY = (point.pageY || point.top || 0) - off.top;
                    }
                    if (support.moveToPoint) {
                        this.range = $.Range().range
                        this.range.moveToPoint(clientX, clientY);
                        return this;
                    }

                    // it's some text node in this range ...
                    var parent = document.elementFromPoint(clientX, clientY);

                    //typically it will be 'on' text
                    for (var n = 0; n < parent.childNodes.length; n++) {
                        var node = parent.childNodes[n];
                        if (node.nodeType === 3 || node.nodeType === 4) {
                            var range = $.Range(node),
                                length = range.toString().length;

                            // now lets start moving the end until the boundingRect is within our range
                            for (var i = 1; i < length + 1; i++) {
                                var rect = range.end(i).rect();
                                if (rect.left <= clientX && rect.left + rect.width >= clientX &&
                                    rect.top <= clientY && rect.top + rect.height >= clientY) {
                                    range.start(i - 1);
                                    this.range = range.range;
                                    return this;
                                }
                            }
                        }
                    }

                    // if not 'on' text, recursively go through and find out when we shift to next
                    // 'line'
                    var previous;
                    iterate(parent.childNodes, function(textNode) {
                        var range = $.Range(textNode);
                        if (range.rect().top > point.clientY) {
                            return false;
                        } else {
                            previous = range;
                        }
                    });

                    if (previous) {
                        previous.start(previous.toString().length);
                        this.range = previous.range;
                    } else {
                        this.range = $.Range(parent).range
                    }
                },

                window: function() {
                    return this.win || window;
                },

                overlaps: function(elRange) {
                    if (elRange.nodeType) {
                        elRange = $.Range(elRange).select(elRange);
                    }
                    //if the start is within the element ...
                    var startToStart = this.compare("START_TO_START", elRange),
                        endToEnd = this.compare("END_TO_END", elRange)

                        // if we wrap elRange
                        if (startToStart <= 0 && endToEnd >= 0) {
                            return true;
                        }
                        // if our start is inside of it
                    if (startToStart >= 0 &&
                        this.compare("START_TO_END", elRange) <= 0) {
                        return true;
                    }
                    // if our end is inside of elRange
                    if (this.compare("END_TO_START", elRange) >= 0 &&
                        endToEnd <= 0) {
                        return true;
                    }
                    return false;
                },

                collapse: function(toStart) {
                    this.range.collapse(toStart === undefined ? true : toStart);
                    return this;
                },

                toString: function() {
                    return typeof this.range.text == "string" ? this.range.text : this.range.toString();
                },

                start: function(set) {
                    // return start
                    if (set === undefined) {
                        if (this.range.startContainer) {
                            return {
                                container: this.range.startContainer,
                                offset: this.range.startOffset
                            }
                        } else {
                            // Get the start parent element
                            var start = this.clone().collapse().parent();
                            // used to get the start element offset
                            var startRange = $.Range(start).select(start).collapse();
                            startRange.move("END_TO_START", this);
                            return {
                                container: start,
                                offset: startRange.toString().length
                            }
                        }
                    } else {
                        if (this.range.setStart) {
                            // supports setStart
                            if (typeof set == 'number') {
                                this.range.setStart(this.range.startContainer, set)
                            } else if (typeof set == 'string') {
                                var res = callMove(this.range.startContainer, this.range.startOffset, parseInt(set, 10))
                                this.range.setStart(res.node, res.offset);
                            } else {
                                this.range.setStart(set.container, set.offset)
                            }
                        } else {
                            if (typeof set == "string") {
                                this.range.moveStart('character', parseInt(set, 10))
                            } else {
                                // get the current end container
                                var container = this.start().container,
                                    offset
                                if (typeof set == "number") {
                                    offset = set
                                } else {
                                    container = set.container
                                    offset = set.offset
                                }
                                var newPoint = $.Range(container).collapse();
                                //move it over offset characters
                                newPoint.range.move(offset);
                                this.move("START_TO_START", newPoint);
                            }
                        }
                        return this;
                    }

                },

                end: function(set) {
                    // read end
                    if (set === undefined) {
                        if (this.range.startContainer) {
                            return {
                                container: this.range.endContainer,
                                offset: this.range.endOffset
                            }
                        } else {
                            var
                            // Get the end parent element
                            end = this.clone().collapse(false).parent(),
                                // used to get the end elements offset
                                endRange = $.Range(end).select(end).collapse();
                            endRange.move("END_TO_END", this);
                            return {
                                container: end,
                                offset: endRange.toString().length
                            }
                        }
                    } else {
                        if (this.range.setEnd) {
                            if (typeof set == 'number') {
                                this.range.setEnd(this.range.endContainer, set)
                            } else if (typeof set == 'string') {
                                var res = callMove(this.range.endContainer, this.range.endOffset, parseInt(set, 10))
                                this.range.setEnd(res.node, res.offset);
                            } else {
                                this.range.setEnd(set.container, set.offset)
                            }
                        } else {
                            if (typeof set == "string") {
                                this.range.moveEnd('character', parseInt(set, 10));
                            } else {
                                // get the current end container
                                var container = this.end().container,
                                    offset
                                if (typeof set == "number") {
                                    offset = set
                                } else {
                                    container = set.container
                                    offset = set.offset
                                }
                                var newPoint = $.Range(container).collapse();
                                //move it over offset characters
                                newPoint.range.move(offset);
                                this.move("END_TO_START", newPoint);
                            }
                        }
                        return this;
                    }
                },

                parent: function() {
                    if (this.range.commonAncestorContainer) {
                        return this.range.commonAncestorContainer;
                    } else {

                        var parentElement = this.range.parentElement(),
                            range = this.range;

                        // IE's parentElement will always give an element, we want text ranges
                        iterate(parentElement.childNodes, function(txtNode) {
                            if ($.Range(txtNode).range.inRange(range)) {
                                // swap out the parentElement
                                parentElement = txtNode;
                                return false;
                            }
                        });

                        return parentElement;
                    }
                },

                rect: function(from) {
                    var rect = this.range.getBoundingClientRect();
                    // for some reason in webkit this gets a better value
                    if (!rect.height && !rect.width) {
                        rect = this.range.getClientRects()[0]
                    }
                    if (from === 'page') {
                        // Add the scroll offset
                        var off = scrollOffset();
                        rect = $.extend({}, rect);
                        rect.top += off.top;
                        rect.left += off.left;
                    }
                    return rect;
                },

                rects: function(from) {
                    // order rects by size
                    var rects = $.map($.makeArray(this.range.getClientRects()).sort(function(rect1, rect2) {
                                return rect2.width * rect2.height - rect1.width * rect1.height;
                            }), function(rect) {
                            return $.extend({}, rect)
                        }),
                        i = 0,
                        j,
                        len = rects.length;

                    // safari returns overlapping client rects
                    //     - big rects can contain 2 smaller rects
                    //     - some rects can contain 0 - width rects
                    //     - we don't want these 0 width rects
                    while (i < rects.length) {
                        var cur = rects[i],
                            found = false;

                        j = i + 1;
                        while (j < rects.length) {
                            if (withinRect(cur, rects[j])) {
                                if (!rects[j].width) {
                                    rects.splice(j, 1)
                                } else {
                                    found = rects[j];
                                    break;
                                }
                            } else {
                                j++;
                            }
                        }

                        if (found) {
                            rects.splice(i, 1)
                        } else {
                            i++;
                        }

                    }
                    // safari will be return overlapping ranges ...
                    if (from == 'page') {
                        var off = scrollOffset();
                        return $.each(rects, function(ith, item) {
                            item.top += off.top;
                            item.left += off.left;
                        })
                    }

                    return rects;
                }

            });
        (function() {
            //method branching ....
            var fn = $.Range.prototype,
                range = $.Range().range;


            fn.compare = range.compareBoundaryPoints ? function(type, range) {
                return this.range.compareBoundaryPoints(this.window().Range[reverse(type)], range.range)
            } : function(type, range) {
                return this.range.compareEndPoints(convertType(type), range.range)
            }


            fn.move = range.setStart ? function(type, range) {

                var rangesRange = range.range;
                switch (type) {
                    case "START_TO_END":
                        this.range.setStart(rangesRange.endContainer, rangesRange.endOffset)
                        break;
                    case "START_TO_START":
                        this.range.setStart(rangesRange.startContainer, rangesRange.startOffset)
                        break;
                    case "END_TO_END":
                        this.range.setEnd(rangesRange.endContainer, rangesRange.endOffset)
                        break;
                    case "END_TO_START":
                        this.range.setEnd(rangesRange.startContainer, rangesRange.startOffset)
                        break;
                }

                return this;
            } : function(type, range) {
                this.range.setEndPoint(convertType(type), range.range)
                return this;
            };
            var cloneFunc = range.cloneRange ? "cloneRange" : "duplicate",
                selectFunc = range.selectNodeContents ? "selectNodeContents" : "moveToElementText";

            fn.

            clone = function() {
                return $.Range(this.range[cloneFunc]());
            };

            fn.

            select = range.selectNodeContents ? function(el) {
                if (!el) {
                    var selection = this.window().getSelection();
                    selection.removeAllRanges();
                    selection.addRange(this.range);
                } else {
                    this.range.selectNodeContents(el);
                }
                return this;
            } : function(el) {
                if (!el) {
                    this.range.select()
                } else if (el.nodeType === 3) {
                    //select this node in the element ...
                    var parent = el.parentNode,
                        start = 0,
                        end;
                    iterate(parent.childNodes, function(txtNode) {
                        if (txtNode === el) {
                            end = start + txtNode.nodeValue.length;
                            return false;
                        } else {
                            start = start + txtNode.nodeValue.length
                        }
                    })
                    this.range.moveToElementText(parent);

                    this.range.moveEnd('character', end - this.range.text.length)
                    this.range.moveStart('character', start);
                } else {
                    this.range.moveToElementText(el);
                }
                return this;
            };

        })();

        // helpers  -----------------

        // iterates through a list of elements, calls cb on every text node
        // if cb returns false, exits the iteration
        var iterate = function(elems, cb) {
            var elem, start;
            for (var i = 0; elems[i]; i++) {
                elem = elems[i];
                // Get the text from text nodes and CDATA nodes
                if (elem.nodeType === 3 || elem.nodeType === 4) {
                    if (cb(elem) === false) {
                        return false;
                    }
                    // Traverse everything else, except comment nodes
                } else if (elem.nodeType !== 8) {
                    if (iterate(elem.childNodes, cb) === false) {
                        return false;
                    }
                }
            }

        },
            isText = function(node) {
                return node.nodeType === 3 || node.nodeType === 4
            },
            iteratorMaker = function(toChildren, toNext) {
                return function(node, mustMoveRight) {
                    // first try down
                    if (node[toChildren] && !mustMoveRight) {
                        return isText(node[toChildren]) ?
                            node[toChildren] :
                            arguments.callee(node[toChildren])
                    } else if (node[toNext]) {
                        return isText(node[toNext]) ?
                            node[toNext] :
                            arguments.callee(node[toNext])
                    } else if (node.parentNode) {
                        return arguments.callee(node.parentNode, true)
                    }
                }
            },
            getNextTextNode = iteratorMaker("firstChild", "nextSibling"),
            getPrevTextNode = iteratorMaker("lastChild", "previousSibling"),
            callMove = function(container, offset, howMany) {
                var mover = howMany < 0 ?
                    getPrevTextNode : getNextTextNode;

                // find the text element
                if (!isText(container)) {
                    // sometimes offset isn't actually an element
                    container = container.childNodes[offset] ?
                        container.childNodes[offset] :
                    // if this happens, use the last child
                    container.lastChild;

                    if (!isText(container)) {
                        container = mover(container)
                    }
                    return move(container, howMany)
                } else {
                    if (offset + howMany < 0) {
                        return move(mover(container), offset + howMany)
                    } else {
                        return move(container, offset + howMany)
                    }

                }
            },
            // Moves howMany characters from the start of
            // from
            move = function(from, howMany) {
                var mover = howMany < 0 ?
                    getPrevTextNode : getNextTextNode;

                howMany = Math.abs(howMany);

                while (from && howMany >= from.nodeValue.length) {
                    howMany = howMany - from.nodeValue.length;
                    from = mover(from)
                }
                return {
                    node: from,
                    offset: mover === getNextTextNode ? howMany : from.nodeValue.length - howMany
                }
            },
            supportWhitespace,
            isWhitespace = function(el) {
                if (supportWhitespace == null) {
                    supportWhitespace = 'isElementContentWhitespace' in el;
                }
                return (supportWhitespace ? el.isElementContentWhitespace :
                    (el.nodeType === 3 && '' == el.data.trim()));

            },
            // if a point is within a rectangle
            within = function(rect, point) {

                return rect.left <= point.clientX && rect.left + rect.width >= point.clientX &&
                    rect.top <= point.clientY &&
                    rect.top + rect.height >= point.clientY
            },
            // if a rectangle is within another rectangle
            withinRect = function(outer, inner) {
                return within(outer, {
                        clientX: inner.left,
                        clientY: inner.top
                    }) && //top left
                within(outer, {
                        clientX: inner.left + inner.width,
                        clientY: inner.top
                    }) && //top right
                within(outer, {
                        clientX: inner.left,
                        clientY: inner.top + inner.height
                    }) && //bottom left
                within(outer, {
                        clientX: inner.left + inner.width,
                        clientY: inner.top + inner.height
                    }) //bottom right
            },
            // gets the scroll offset from a window
            scrollOffset = function(win) {
                var win = win || window;
                doc = win.document.documentElement, body = win.document.body;

                return {
                    left: (doc && doc.scrollLeft || body && body.scrollLeft || 0) + (doc.clientLeft || 0),
                    top: (doc && doc.scrollTop || body && body.scrollTop || 0) + (doc.clientTop || 0)
                };
            };

        support.moveToPoint = !! $.Range().range.moveToPoint

        return $;
    })($, __m6);

    // ## jquerypp/dom/selection/selection.js
    var __m7 = (function($) {

        var getWindow = function(element) {
            return element ? element.ownerDocument.defaultView || element.ownerDocument.parentWindow : window
        },
            // A helper that uses range to abstract out getting the current start and endPos.
            getElementsSelection = function(el, win) {
                // get a copy of the current range and a range that spans the element
                var current = $.Range.current(el).clone(),
                    entireElement = $.Range(el).select(el);
                // if there is no overlap, there is nothing selected
                if (!current.overlaps(entireElement)) {
                    return null;
                }
                // if the current range starts before our element
                if (current.compare("START_TO_START", entireElement) < 1) {
                    // the selection within the element begins at 0
                    startPos = 0;
                    // move the current range to start at our element
                    current.move("START_TO_START", entireElement);
                } else {
                    // Make a copy of the element's range.
                    // Move it's end to the start of the selected range
                    // The length of the copy is the start of the selected
                    // range.
                    fromElementToCurrent = entireElement.clone();
                    fromElementToCurrent.move("END_TO_START", current);
                    startPos = fromElementToCurrent.toString().length
                }

                // If the current range ends after our element
                if (current.compare("END_TO_END", entireElement) >= 0) {
                    // the end position is the last character
                    endPos = entireElement.toString().length
                } else {
                    // otherwise, it's the start position plus the current range
                    // TODO: this doesn't seem like it works if current
                    // extends to the left of the element.
                    endPos = startPos + current.toString().length
                }
                return {
                    start: startPos,
                    end: endPos,
                    width: endPos - startPos
                };
            },
            // Text selection works differently for selection in an input vs
            // normal html elements like divs, spans, and ps.
            // This function branches between the various methods of getting the selection.
            getSelection = function(el) {
                var win = getWindow(el);

                // `selectionStart` means this is an input element in a standards browser.
                if (el.selectionStart !== undefined) {

                    if (document.activeElement && document.activeElement != el && el.selectionStart == el.selectionEnd && el.selectionStart == 0) {
                        return {
                            start: el.value.length,
                            end: el.value.length,
                            width: 0
                        };
                    }
                    return {
                        start: el.selectionStart,
                        end: el.selectionEnd,
                        width: el.selectionEnd - el.selectionStart
                    };
                }
                // getSelection means a 'normal' element in a standards browser.
                else if (win.getSelection) {
                    return getElementsSelection(el, win)
                } else {
                    // IE will freak out, where there is no way to detect it, so we provide a callback if it does.
                    try {
                        // The following typically works for input elements in IE:
                        if (el.nodeName.toLowerCase() == 'input') {
                            var real = getWindow(el).document.selection.createRange(),
                                r = el.createTextRange();
                            r.setEndPoint("EndToStart", real);

                            var start = r.text.length
                            return {
                                start: start,
                                end: start + real.text.length,
                                width: real.text.length
                            }
                        }
                        // This works on textareas and other elements
                        else {
                            var res = getElementsSelection(el, win)
                            if (!res) {
                                return res;
                            }
                            // we have to clean up for ie's textareas which don't count for
                            // newlines correctly
                            var current = $.Range.current().clone(),
                                r2 = current.clone().collapse().range,
                                r3 = current.clone().collapse(false).range;

                            r2.moveStart('character', -1)
                            r3.moveStart('character', -1)
                            // if we aren't at the start, but previous is empty, we are at start of newline
                            if (res.startPos != 0 && r2.text == "") {
                                res.startPos += 2;
                            }
                            // do a similar thing for the end of the textarea
                            if (res.endPos != 0 && r3.text == "") {
                                res.endPos += 2;
                            }

                            return res
                        }
                    } catch (e) {
                        return {
                            start: el.value.length,
                            end: el.value.length,
                            width: 0
                        };
                    }
                }
            },
            // Selects text within an element.  Depending if it's a form element or
            // not, or a standards based browser or not, we do different things.
            select = function(el, start, end) {
                var win = getWindow(el);
                // IE behaves bad even if it sorta supports
                // getSelection so we have to try the IE methods first. barf.
                if (el.setSelectionRange) {
                    if (end === undefined) {
                        el.focus();
                        el.setSelectionRange(start, start);
                    } else {
                        el.select();
                        el.selectionStart = start;
                        el.selectionEnd = end;
                    }
                } else if (el.createTextRange) {
                    var r = el.createTextRange();
                    r.moveStart('character', start);
                    end = end || start;
                    r.moveEnd('character', end - el.value.length);

                    r.select();
                } else if (win.getSelection) {
                    var doc = win.document,
                        sel = win.getSelection(),
                        range = doc.createRange(),
                        ranges = [start, end !== undefined ? end : start];
                    getCharElement([el], ranges);
                    range.setStart(ranges[0].el, ranges[0].count);
                    range.setEnd(ranges[1].el, ranges[1].count);

                    // removeAllRanges is necessary for webkit
                    sel.removeAllRanges();
                    sel.addRange(range);

                } else if (win.document.body.createTextRange) { //IE's weirdness
                    var range = document.body.createTextRange();
                    range.moveToElementText(el);
                    range.collapse()
                    range.moveStart('character', start)
                    range.moveEnd('character', end !== undefined ? end : start)
                    range.select();
                }

            },
            // If one of the range values is within start and len, replace the range
            // value with the element and its offset.
            replaceWithLess = function(start, len, range, el) {
                if (typeof range[0] === 'number' && range[0] < len) {
                    range[0] = {
                        el: el,
                        count: range[0] - start
                    };
                }
                if (typeof range[1] === 'number' && range[1] <= len) {
                    range[1] = {
                        el: el,
                        count: range[1] - start
                    }
                }
            },
            getCharElement = function(elems, range, len) {
                var elem,
                    start;

                len = len || 0;
                for (var i = 0; elems[i]; i++) {
                    elem = elems[i];
                    // Get the text from text nodes and CDATA nodes
                    if (elem.nodeType === 3 || elem.nodeType === 4) {
                        start = len
                        len += elem.nodeValue.length;
                        //check if len is now greater than what's in counts
                        replaceWithLess(start, len, range, elem)
                        // Traverse everything else, except comment nodes
                    } else if (elem.nodeType !== 8) {
                        len = getCharElement(elem.childNodes, range, len);
                    }
                }
                return len;
            };

        $.fn.selection = function(start, end) {
            if (start !== undefined) {
                return this.each(function() {
                    select(this, start, end)
                })
            } else {
                return getSelection(this[0])
            }
        };
        // for testing
        $.fn.selection.getCharElement = getCharElement;

        return $;
    })($, __m5);

    // ## jquerypp/event/destroyed/destroyed.js
    var __m8 = (function($) {


        // Store the old jQuery.cleanData
        var oldClean = $.cleanData;

        // Overwrites cleanData which is called by jQuery on manipulation methods
        $.cleanData = function(elems) {
            for (var i = 0, elem;
                (elem = elems[i]) !== undefined; i++) {
                // Trigger the destroyed event
                $(elem).triggerHandler("destroyed");
            }
            // Call the old jQuery.cleanData
            oldClean(elems);
        };
        return $;
    })($);

    // ## jquerypp/event/fastfix/fastfix.js
    var __m9 = (function($) {
        // http://bitovi.com/blog/2012/04/faster-jquery-event-fix.html
        // https://gist.github.com/2377196

        // IE 8 has Object.defineProperty but it only defines DOM Nodes. According to
        // http://kangax.github.com/es5-compat-table/#define-property-ie-note
        // All browser that have Object.defineProperties also support Object.defineProperty properly
        if (Object.defineProperties) {
            var
            // Use defineProperty on an object to set the value and return it
            set = function(obj, prop, val) {
                if (val !== undefined) {
                    Object.defineProperty(obj, prop, {
                            value: val
                        });
                }
                return val;
            },
                // special converters
                special = {
                    pageX: function(original) {
                        if (!original) {
                            return;
                        }

                        var eventDoc = this.target.ownerDocument || document;
                        doc = eventDoc.documentElement;
                        body = eventDoc.body;
                        return original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    },
                    pageY: function(original) {
                        if (!original) {
                            return;
                        }

                        var eventDoc = this.target.ownerDocument || document;
                        doc = eventDoc.documentElement;
                        body = eventDoc.body;
                        return original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                    },
                    relatedTarget: function(original) {
                        if (!original) {
                            return;
                        }

                        return original.fromElement === this.target ? original.toElement : original.fromElement;
                    },
                    metaKey: function(originalEvent) {
                        if (!originalEvent) {
                            return;
                        }
                        return originalEvent.ctrlKey;
                    },
                    which: function(original) {
                        if (!original) {
                            return;
                        }

                        return original.charCode != null ? original.charCode : original.keyCode;
                    }
                };

            // Get all properties that should be mapped
            $.each($.event.keyHooks.props.concat($.event.mouseHooks.props).concat($.event.props), function(i, prop) {
                if (prop !== "target") {
                    (function() {
                        Object.defineProperty($.Event.prototype, prop, {
                                get: function() {
                                    // get the original value, undefined when there is no original event
                                    var originalValue = this.originalEvent && this.originalEvent[prop];
                                    // overwrite getter lookup
                                    return this['_' + prop] !== undefined ? this['_' + prop] : set(this, prop,
                                        // if we have a special function and no value
                                        special[prop] && originalValue === undefined ?
                                        // call the special function
                                        special[prop].call(this, this.originalEvent) :
                                        // use the original value
                                        originalValue)
                                },
                                set: function(newValue) {
                                    // Set the property with underscore prefix
                                    this['_' + prop] = newValue;
                                }
                            });
                    })();
                }
            });

            $.event.fix = function(event) {
                if (event[$.expando]) {
                    return event;
                }
                // Create a jQuery event with at minimum a target and type set
                var originalEvent = event,
                    event = $.Event(originalEvent);
                event.target = originalEvent.target;
                // Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
                if (!event.target) {
                    event.target = originalEvent.srcElement || document;
                }

                // Target should not be a text node (#504, Safari)
                if (event.target.nodeType === 3) {
                    event.target = event.target.parentNode;
                }

                return event;
            }
        }

        return $;
    })($);

    // ## jquerypp/event/livehack/livehack.js
    var __m11 = (function($) {

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

    // ## jquerypp/event/hover/hover.js
    var __m10 = (function($) {

        $.Hover = function() {
            this._delay = $.Hover.delay;
            this._distance = $.Hover.distance;
            this._leave = $.Hover.leave
        };

        $.extend($.Hover, {

                delay: 100,

                distance: 10,
                leave: 0
            })


        $.extend($.Hover.prototype, {

                delay: function(delay) {
                    this._delay = delay;
                    return this;
                },

                distance: function(distance) {
                    this._distance = distance;
                    return this;
                },

                leave: function(leave) {
                    this._leave = leave;
                    return this;
                }
            })
        var event = $.event,
            handle = event.handle,
            onmouseenter = function(ev) {
                // now start checking mousemoves to update location
                var delegate = ev.delegateTarget || ev.currentTarget;
                var selector = ev.handleObj.selector;
                var pending = $.data(delegate, "_hover" + selector);
                // prevents another mouseenter until current has run its course
                if (pending) {
                    // Under some  circumstances, mouseleave may never fire
                    // (e.g., the element is removed while hovered)
                    // so if we've entered another element, wait the leave time,
                    // then force it to release.
                    if (!pending.forcing) {
                        pending.forcing = true;
                        clearTimeout(pending.leaveTimer);
                        var leaveTime = pending.leaving ?
                            Math.max(0, pending.hover.leave - (new Date() - pending.leaving)) :
                            pending.hover.leave;
                        var self = this;

                        setTimeout(function() {
                            pending.callHoverLeave();
                            onmouseenter.call(self, ev);
                        }, leaveTime);
                    }
                    return;
                }
                var loc = {
                    pageX: ev.pageX,
                    pageY: ev.pageY
                },
                    // The current distance
                    dist = 0,
                    // Timer that checks for the distance travelled
                    timer,
                    enteredEl = this,
                    // If we are hovered
                    hovered = false,
                    // The previous event
                    lastEv = ev,
                    // The $.Hover instance passed to events
                    hover = new $.Hover(),
                    // timer if hover.leave has been called
                    leaveTimer,
                    // Callback for triggering hoverleave
                    callHoverLeave = function() {
                        $.each(event.find(delegate, ["hoverleave"], selector), function() {
                            this.call(enteredEl, ev, hover)
                        })
                        cleanUp();
                    },
                    mousemove = function(ev) {
                        clearTimeout(leaveTimer);
                        // Update the distance and location
                        dist += Math.pow(ev.pageX - loc.pageX, 2) + Math.pow(ev.pageY - loc.pageY, 2);
                        loc = {
                            pageX: ev.pageX,
                            pageY: ev.pageY
                        }
                        lastEv = ev
                    },
                    mouseleave = function(ev) {
                        clearTimeout(timer);
                        if (hovered) {
                            // go right away
                            if (hover._leave === 0) {
                                callHoverLeave();
                            } else {
                                clearTimeout(leaveTimer);
                                // leave the hover after the time set in hover.leave(time)
                                pending.leaving = new Date();
                                leaveTimer = pending.leaveTimer = setTimeout(function() {
                                    callHoverLeave();
                                }, hover._leave)
                            }
                        } else {
                            cleanUp();
                        }
                    },
                    cleanUp = function() {
                        // Unbind all events and data
                        $(enteredEl).unbind("mouseleave", mouseleave)
                        $(enteredEl).unbind("mousemove", mousemove);
                        $.removeData(delegate, "_hover" + selector)
                    },
                    hoverenter = function() {
                        $.each(event.find(delegate, ["hoverenter"], selector), function() {
                            this.call(enteredEl, lastEv, hover)
                        })
                        hovered = true;
                    };
                pending = {
                    callHoverLeave: callHoverLeave,
                    hover: hover
                };
                $.data(delegate, "_hover" + selector, pending);

                // Bind the mousemove event
                $(enteredEl).bind("mousemove", mousemove).bind("mouseleave", mouseleave);
                // call hoverinit for each element with the hover instance
                $.each(event.find(delegate, ["hoverinit"], selector), function() {
                    this.call(enteredEl, ev, hover)
                })

                if (hover._delay === 0) {
                    hoverenter();
                } else {
                    timer = setTimeout(function() {
                        // check that we aren't moving around
                        if (dist < hover._distance && $(enteredEl).queue().length == 0) {
                            hoverenter();
                            return;
                        } else {
                            // Reset distance and timer
                            dist = 0;
                            timer = setTimeout(arguments.callee, hover._delay)
                        }
                    }, hover._delay);
                }
            };

        // Attach events
        event.setupHelper([

                "hoverinit",

                "hoverenter",

                "hoverleave",

                "hovermove"
            ], "mouseenter", onmouseenter)

        return $;
    })($, __m11);

    // ## jquerypp/event/key/key.js
    var __m12 = (function($) {

        // copied from jQuery 1.8.3
        var uaMatch = function(ua) {
            ua = ua.toLowerCase();

            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        }

        var keymap = {},
            reverseKeyMap = {},
            currentBrowser = uaMatch(navigator.userAgent).browser;


        $.event.key = function(browser, map) {
            if (browser === undefined) {
                return keymap;
            }

            if (map === undefined) {
                map = browser;
                browser = currentBrowser;
            }

            // extend the keymap
            if (!keymap[browser]) {
                keymap[browser] = {};
            }
            $.extend(keymap[browser], map);
            // and also update the reverse keymap
            if (!reverseKeyMap[browser]) {
                reverseKeyMap[browser] = {};
            }
            for (var name in map) {
                reverseKeyMap[browser][map[name]] = name;
            }
        };

        $.event.key({
                // backspace
                '\b': '8',

                // tab
                '\t': '9',

                // enter
                '\r': '13',

                // special
                'shift': '16',
                'ctrl': '17',
                'alt': '18',

                // others
                'pause-break': '19',
                'caps': '20',
                'escape': '27',
                'num-lock': '144',
                'scroll-lock': '145',
                'print': '44',

                // navigation
                'page-up': '33',
                'page-down': '34',
                'end': '35',
                'home': '36',
                'left': '37',
                'up': '38',
                'right': '39',
                'down': '40',
                'insert': '45',
                'delete': '46',

                // normal characters
                ' ': '32',
                '0': '48',
                '1': '49',
                '2': '50',
                '3': '51',
                '4': '52',
                '5': '53',
                '6': '54',
                '7': '55',
                '8': '56',
                '9': '57',
                'a': '65',
                'b': '66',
                'c': '67',
                'd': '68',
                'e': '69',
                'f': '70',
                'g': '71',
                'h': '72',
                'i': '73',
                'j': '74',
                'k': '75',
                'l': '76',
                'm': '77',
                'n': '78',
                'o': '79',
                'p': '80',
                'q': '81',
                'r': '82',
                's': '83',
                't': '84',
                'u': '85',
                'v': '86',
                'w': '87',
                'x': '88',
                'y': '89',
                'z': '90',
                // normal-characters, numpad
                'num0': '96',
                'num1': '97',
                'num2': '98',
                'num3': '99',
                'num4': '100',
                'num5': '101',
                'num6': '102',
                'num7': '103',
                'num8': '104',
                'num9': '105',
                '*': '106',
                '+': '107',
                '-': '109',
                '.': '110',
                // normal-characters, others
                '/': '111',
                ';': '186',
                '=': '187',
                ',': '188',
                '-': '189',
                '.': '190',
                '/': '191',
                '`': '192',
                '[': '219',
                '\\': '220',
                ']': '221',
                "'": '222',

                // ignore these, you shouldn't use them
                'left window key': '91',
                'right window key': '92',
                'select key': '93',


                'f1': '112',
                'f2': '113',
                'f3': '114',
                'f4': '115',
                'f5': '116',
                'f6': '117',
                'f7': '118',
                'f8': '119',
                'f9': '120',
                'f10': '121',
                'f11': '122',
                'f12': '123'
            });


        $.Event.prototype.keyName = function() {
            var event = this,
                test = /\w/,
                // It can be either keyCode or charCode.
                // Look both cases up in the reverse key map and converted to a string
                key_Key = reverseKeyMap[currentBrowser][(event.keyCode || event.which) + ""],
                char_Key = String.fromCharCode(event.keyCode || event.which),
                key_Char = event.charCode && reverseKeyMap[currentBrowser][event.charCode + ""],
                char_Char = event.charCode && String.fromCharCode(event.charCode);

            if (char_Char && test.test(char_Char)) {
                // string representation of event.charCode
                return char_Char.toLowerCase()
            }
            if (key_Char && test.test(key_Char)) {
                // reverseKeyMap representation of event.charCode
                return char_Char.toLowerCase()
            }
            if (char_Key && test.test(char_Key)) {
                // string representation of event.keyCode
                return char_Key.toLowerCase()
            }
            if (key_Key && test.test(key_Key)) {
                // reverseKeyMap representation of event.keyCode
                return key_Key.toLowerCase()
            }

            if (event.type == 'keypress') {
                // keypress doesn't capture everything
                return event.keyCode ? String.fromCharCode(event.keyCode) : String.fromCharCode(event.which)
            }

            if (!event.keyCode && event.which) {
                // event.which
                return String.fromCharCode(event.which)
            }

            // default
            return reverseKeyMap[currentBrowser][event.keyCode + ""]
        }

        return $;
    })($);

    // ## jquerypp/event/reverse/reverse.js
    var __m14 = (function($) {
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
    var __m13 = (function($) {
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
    })(__m14);

    // ## jquerypp/event/swipe/swipe.js
    var __m15 = (function($) {
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
    })($, __m11);
})(jQuery);