(function () {
    'use strict';

    angular
        .module('simplePosjHipsterApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
