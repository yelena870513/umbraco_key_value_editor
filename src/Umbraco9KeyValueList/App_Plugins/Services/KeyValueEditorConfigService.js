﻿'use strict'

angular.module('umbraco')

  .factory('keyValueEditorConfigService', [ function() {
    return {
      get: function(serverConfig) {

        //default config
        var cfg = {
          autoGenerateKey: false,
          autoGeneratedKeyLength: 6,
          useDescription: false,
          useSortableHeaders: false,
          useFilters: false
        }

        //remove nulls from server config so they don't overwrite the defaults
        if (serverConfig) {
          for (var prop in serverConfig) {
            if (serverConfig.hasOwnProperty(prop) && serverConfig[prop] == null) {
              delete serverConfig[prop]
              continue
            }
            //convert umbraco's storage of booleans to booleans
            if (prop != 'autoGeneratedKeyLength') {
              serverConfig[prop] = (serverConfig[prop] === '1') ? true : false
            }
          }

          //if there is server config update the default config
          cfg = angular.extend(cfg, serverConfig)
        }

        return cfg
      }
    }
  }])