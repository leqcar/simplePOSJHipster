(function() {
    'use strict';
    angular
        .module('simplePosjHipsterApp')
        .factory('Customer', Customer);

    Customer.$inject = ['$resource'];

    function Customer ($resource) {
        var resourceUrl =  'api/customers/:id';

        var service =  $resource(resourceUrl, {}, {
                        'query': {method: 'GET', isArray: true},
                        'get': {
                            method: 'GET',
                            transformResponse: function (data) {
                                data = angular.fromJson(data);
                                return data;
                            }
                        },
                        'update': { method:'PUT' }
                    });

        return service;
    }

})();
