(function() {
    'use strict';
    angular
        .module('simplePosjHipsterApp')
        .factory('OrderEntry', OrderEntry);

    OrderEntry.$inject = ['$resource', 'DateUtils'];

    function OrderEntry ($resource, DateUtils) {
        var resourceUrl =  'api/order-entries/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.transactionDate = DateUtils.convertLocalDateFromServer(data.transactionDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.transactionDate = DateUtils.convertLocalDateToServer(copy.transactionDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.transactionDate = DateUtils.convertLocalDateToServer(copy.transactionDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
