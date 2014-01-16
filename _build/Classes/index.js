/**
 *
 * Created by Borbás Geri on 1/15/14
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


/**
 *
 * Created by Borbás Geri on 1/16/14
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


String.prototype.capitalize = function()
{ return this.charAt(0).toUpperCase() + this.slice(1); }

if (typeof Array.isArray === 'undefined')
{
    Array.isArray = function(object)
    { return Object.toString.call(object) === '[object Array]'; }
};

/**
 * Synthesizes array enumerators for the given object.
 *
 * Object have an array property called 'items'.
 * This call creates a method with the following signature.
 * 'function enumerateItems(callback)' where callback expects the following signature.
 * 'function(eachItem, eachIndex)'
 *
 * @param object Target object.
 */
function synthesizeEnumeratorsForObject(object)
{
    for (var eachPropertyName in object)
    {
        var eachProperty = object[eachPropertyName];
        if (eachProperty == null) continue;

        var isArray = Array.isArray(eachProperty);
        if (isArray)
        {
            var methodName = 'enumerate'+eachPropertyName.capitalize();
            log(methodName);
            object[methodName] = function(callback)
            {
                var array = arguments.callee._array;
                var callingInstance = arguments.callee._object;

                for (var index = 0; index < array.length; index++)
                {
                    var eachItem = array[index];
                    callback.apply(callingInstance, [eachItem, index]);
                }
            };
            object[methodName]._object = object;
            object[methodName]._array = eachProperty;
        }
    }
}
/**
 *
 * Created by Borbás Geri on 1/5/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


/**
 *
 * Created by Borbás Geri on 1/5/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


/**
 *
 * Created by Borbás Geri on 1/5/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


var EPPZView = Class.extend
({
    // Model.
    id: '',

    // Outlets.
    div: null,

    /**
     * @param id The controlled <div>'s id.
     */
    construct: function(id)
    {
        // Will be moved to eppz!js later on.
        synthesizeEnumeratorsForObject(this);

        // Model.
        this.id = id;

        this.build();
        this.update();
    },

    /**
     * UI
     */

        build: function()
        {
            // Create.
            var div = Element.elementOfType('div');
                div.id = this.id;

            // Set.
            this.div = div;
            this.div.view = this;
        },

        update: function()
        {
        },

    /**
     * Interactions
     */

        touchedDown: function()
        {
        },

        touchMoved: function()
        {
        },

        touchedUp: function()
        {
        },

});




var EPPZEventInspectorView = EPPZView.extend
({
    // Model.
    event: null,
    inspectableProperties: [],

    // Outlets.
    propertyLabels: [],

    /**
     * @param id The controlled <div>'s id.
     */
    construct: function(id)
    {
        // Defaults.
        this.inspectableProperties =
            [
                'type', // "mouseover",

                'clientX', // 774,
                'clientY', // 259,

                'target', // body,
                'currentTarget', // null,
                'relatedTarget', // div.scene,

                'srcElement', // body,
                'fromElement', // div.scene,
                'toElement', // body,

                'layerX', // 766,
                'layerY', // 251,

                'offsetX', // 766,
                'offsetY', // 251,

                'pageX', // 774,
                'pageY', // 259,

                'x', // 774,
                'y', // 259,

                'shiftKey', // true,
                'ctrlKey', // false,
                'altKey', // false,
            ];

        // EPPZView.
        this.super.construct(id);
    },

    /**
     * Public
     */

        setEvent: function(event)
        {
            // Set.
            this.event = event;

            // UI.
            this.update();
        },

    /**
     * UI
     */

        build: function()
        {
            // EPPZView.
            this.super.build();
            this.div.addClass('EPPZEventInspectorView');

                // Property labels.
                var propertyLabels = [];

                // <ul>
                var ul = Element.elementOfType('ul');
                this.enumerateInspectableProperties(function(eachProperty)
                {
                    // <li>
                    var li = Element.elementOfType('li');

                        // <label>
                        var titleLabel = Element.elementOfType('label');
                            titleLabel.innerText = eachProperty;

                        // <label>
                        var propertyLabel = Element.elementOfType('span');
                            propertyLabel.propertyName = eachProperty; // Model.

                    // Append.
                    li.appendChild(titleLabel);
                    li.appendChild(propertyLabel);
                    ul.appendChild(li);

                    // Set.
                    propertyLabels.push(propertyLabel);
                });

                // Set.
                this.propertyLabels = propertyLabels;

            // Append.
            this.div.appendChild(ul);
        },

        update: function()
        {
            // EPPZView.
            this.super.update();

            var event = this.event;
            if (event == null) return;

            this.enumeratePropertyLabels(function(eachPropertyLabel)
            {
                var eachValue = event[eachPropertyLabel.propertyName];
                if (typeof eachValue == 'object')
                {
                    if (eachValue != null)
                    {
                        var tagName = eachValue.tagName.toLowerCase().replace(' ', '');
                        var idName = (eachValue.id) ? '#'+eachValue.id : '';
                        var className = (eachValue.className) ? '.'+eachValue.className : '';
                        eachValue = tagName+idName+className;
                    }
                }
                eachPropertyLabel.innerText = eachValue;
            });
        },

});
/**
 *
 * Created by Borbás Geri on 1/5/14
 * Copyright (c) 2014 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

var EPPZSegmentedControl = EPPZView.extend
({
    /**
     * @param items Array of string items.
     */
    construct: function(items)
    {
        // Model.
        this.items = items;

        // Outlets.
        this.div = null;
        this.itemButtons = [];

        this.build();
        this.update();
    },

    /**
     * Enumerator
     */

        eachItem: function(callback)
        {
            for (var index = 0; index < this.items.length; index++)
            {
                var eachProperty = this.items[index];
                callback(eachProperty);
            }
        },

        eachItemButton: function(callback)
        {
            for (var index = 0; index < this.itemButtons.length; index++)
            {
                var eachPropertyLabel = this.itemButtons[index];
                callback(eachPropertyLabel);
            }
        },

    /**
     * UI
     */

        build: function()
        {

            // Create.
            var div = document.createElement('div');
            div.className = 'EPPZEventInspectorView';

            // Property labels.
            var itemButtons = [];
            // <ul>
            var ul = document.createElement('ul');
            this.eachItem(function(eachItem)
            {
                // <li>
                var li = document.createElement('li');

                // <button>
                var itemButton = document.createElement('button');
                    itemButton.innerText = eachItem; // Model.

                // Append.
                li.appendChild(itemButton);
                ul.appendChild(li);

                // Set.
                itemButtons.push(itemButton);
            });

            // Set.
            this.itemButtons = itemButtons;

            // Append.
            div.appendChild(ul);

            // Set.
            this.div = div;
            this.div.view = this;
        },

        update: function()
        {
            var event = this.event;

            /*
            this.eachPropertyLabel(function(eachPropertyLabel)
            {
                var eachValue = event[eachPropertyLabel.propertyName];
                if (typeof eachValue == 'object')
                {
                    if (eachValue != null)
                    {
                        var tagName = eachValue.tagName.toLowerCase().replace(' ', '');
                        var idName = (eachValue.id) ? '#'+eachValue.id : '';
                        var className = (eachValue.className) ? '.'+eachValue.className : '';
                        eachValue = tagName+idName+className;
                    }
                }
                eachPropertyLabel.innerText = eachValue;
            });
            */
        },

});


var EPPZBodyController = Class.extend
({
    /**
     * @param inspectableEventTypes Event types to be inspected.
     */
    construct: function(inspectableEventTypes)
    {
        // Outlets.
        this.body = document.body;
        this.inspector = null;
        this.inspectableEventTypes = inspectableEventTypes;

        // UI.
        this.build();

        // Actions.
        this.addActions();
    },

    /**
     * UI
     */

        build: function()
        {
            // Inspector.
            var inspector = new EPPZEventInspectorView('inspector');

            // Segmented control.
            var segmentedControl = new EPPZSegmentedControl(this.inspectableEventTypes);

            // Append.
            this.body.appendChild(inspector.div);

            // Set.
            this.inspector = inspector;
        },

    /**
     * Interactions
     */

        addActions: function()
        {
            this.body.onmouseover = this.eventOccured.bind(this);
            this.body.onmouseout = this.eventOccured.bind(this);

            this.body.onclick = this.eventOccured.bind(this);
            this.body.onmousedown = this.eventOccured.bind(this);
            this.body.onmousemove = this.eventOccured.bind(this);
            this.body.onmouseup = this.eventOccured.bind(this);

            this.body.ontouchstart = this.eventOccured.bind(this);
            this.body.ontouchmove = this.eventOccured.bind(this);
            this.body.touchend = this.eventOccured.bind(this);

            this.body.ontouchcancel = this.eventOccured.bind(this);
            this.body.touchleave = this.eventOccured.bind(this);
        },

        eventOccured: function(event)
        {
            if (arrayHasValue(this.inspectableEventTypes, event.type))
            { this.inspector.setEvent(event); }
        },

        mouseOver: function(event)
        {
        },

        mouseOut: function(event)
        {
        },

        touchedDown: function(event)
        {
        },

        touchMoved: function(event)
        {
        },

        touchedUp: function(event)
        {
        },

        touchedUpOutside: function(event)
        {
        },

        dragOver: function(event)
        {
        },

        dragOut: function(event)
        {
        },
});




// Prevent iOS scroll.
document.body.preventScroll();

// Manager.
var touches = new EPPZBodyController(
    [
        // Inspectable event types.

        'mouseover',
        'mouseout',

        'onclick',
        'mousedown',
        // 'mousemoved',
        'mouseup',

        'touchstart',
        // 'touchmove',
        'touchend',

        'touchcancel',
        'touchleave',
    ]);

// Views.
var scene = document.getElementById('scene');
var view = new EPPZView('view');
scene.appendChild(view.div);