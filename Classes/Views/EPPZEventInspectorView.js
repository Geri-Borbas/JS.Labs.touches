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

var EPPZEventInspectorView = EPPZView.extend
({
    /**
     */
    construct: function()
    {
        // Model.
        this.event = null;
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

        // Outlets.
        this.div = null;
        this.propertyLabels = [];

        this.build();
        this.update();
    },

    /**
     * Enumerator
     */

        eachInspectableProperty: function(callback)
        {
            for (var index = 0; index < this.inspectableProperties.length; index++)
            {
                var eachProperty = this.inspectableProperties[index];
                callback(eachProperty);
            }
        },

        eachPropertyLabel: function(callback)
        {
            for (var index = 0; index < this.propertyLabels.length; index++)
            {
                var eachPropertyLabel = this.propertyLabels[index];
                callback(eachPropertyLabel);
            }
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

            // Create.
            var div = document.createElement('div');
                div.className = 'EPPZEventInspectorView';

                // Property labels.
                var propertyLabels = [];
                // <ul>
                var ul = document.createElement('ul');
                this.eachInspectableProperty(function(eachProperty)
                {
                    // <li>
                    var li = document.createElement('li');

                        // <label>
                        var titleLabel =  document.createElement('label');
                            titleLabel.innerText = eachProperty;

                        // <label>
                        var propertyLabel =  document.createElement('span');
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
                div.appendChild(ul);

            // Set.
            this.div = div;
            this.div.view = this;
        },

        update: function()
        {
            $super.batman();

            var event = this.event;
            if (event == null) return;

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
        },

        batman: function()
        {
            this.$.batman();
            log('Superman');
        }

});