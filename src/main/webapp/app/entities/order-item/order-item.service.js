(function() {
    'use strict';
    angular
        .module('simplePosjHipsterApp')
        .factory('OrderItem', OrderItem);

    OrderItem.$inject = ['$resource'];

    function OrderItem ($resource) {
        var resourceUrl =  'api/order-items/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
