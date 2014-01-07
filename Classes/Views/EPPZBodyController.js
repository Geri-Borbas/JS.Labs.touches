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
            var inspector = new EPPZEventInspectorView();

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