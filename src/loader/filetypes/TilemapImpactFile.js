/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = require('../../utils/Class');
var FileTypesManager = require('../FileTypesManager');
var JSONFile = require('./JSONFile.js');
var TILEMAP_FORMATS = require('../../tilemaps/Formats');

/**
 * @classdesc
 * [description]
 *
 * @class TilemapImpactFile
 * @extends Phaser.Loader.File
 * @memberOf Phaser.Loader.FileTypes
 * @constructor
 * @since 3.7.0
 *
 * @param {string} key - [description]
 * @param {string} url - [description]
 * @param {string} path - [description]
 * @param {XHRSettingsObject} [xhrSettings] - [description]
 */
var TilemapImpactFile = new Class({

    Extends: JSONFile,

    initialize:

    function TilemapImpactFile (loader, key, url, xhrSettings)
    {
        JSONFile.call(this, loader, key, url, xhrSettings);

        this.type = 'tilemapJSON';

        this.cache = loader.cacheManager.tilemap;
    },

    addToCache: function ()
    {
        var tiledata = { format: TILEMAP_FORMATS.WELTMEISTER, data: this.data };

        this.cache.add(this.key, tiledata);

        this.pendingDestroy(tiledata);
    }

});

/**
 * Adds a Tilemap (Weltmeister Format) file to the current load queue.
 *
 * Note: This method will only be available if the Tilemap File type has been built into Phaser.
 *
 * The file is **not** loaded immediately after calling this method.
 * Instead, the file is added to a queue within the Loader, which is processed automatically when the Loader starts.
 *
 * @method Phaser.Loader.LoaderPlugin#tilemapWeltmeister
 * @since 3.0.0
 *
 * @param {string} key - [description]
 * @param {string} url - [description]
 * @param {XHRSettingsObject} [xhrSettings] - [description]
 *
 * @return {Phaser.Loader.LoaderPlugin} The Loader.
 */
FileTypesManager.register('tilemapWeltmeister', function (key, url, xhrSettings)
{
    if (Array.isArray(key))
    {
        for (var i = 0; i < key.length; i++)
        {
            //  If it's an array it has to be an array of Objects, so we get everything out of the 'key' object
            this.addFile(new TilemapImpactFile(this, key[i]));
        }
    }
    else
    {
        this.addFile(new TilemapImpactFile(this, key, url, xhrSettings));
    }

    return this;
});

module.exports = TilemapImpactFile;
