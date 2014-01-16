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