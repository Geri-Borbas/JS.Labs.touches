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

            this.alert();
        },

});