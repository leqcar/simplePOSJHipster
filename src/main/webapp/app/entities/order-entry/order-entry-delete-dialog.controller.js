(function() {
    'use strict';

    angular
        .module('simplePosjHipsterApp')
        .controller('OrderEntryDeleteController',OrderEntryDeleteController);

    OrderEntryDeleteController.$inject = ['$uibModalInstance', 'entity', 'OrderEntry'];

    function OrderEntryDeleteController($uibModalInstance, entity, OrderEntry) {
        var vm = this;

        vm.orderEntry = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            OrderEntry.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
