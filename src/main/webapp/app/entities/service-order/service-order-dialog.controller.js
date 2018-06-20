(function() {
    'use strict';

    angular
        .module('simplePosjHipsterApp')
        .controller('ServiceOrderDialogController', ServiceOrderDialogController);

    ServiceOrderDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'OrderEntry', 'Customer', 'OrderItem'];

    function ServiceOrderDialogController($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, OrderEntry, Customer, OrderItem) {
        var vm = this;

        /*vm.orderEntry = entity;*/
        vm.orderEntry = {}
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        vm.customers = [];
        vm.customer = {}

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
/*            if (vm.orderEntry.id !== null) {
                OrderEntry.update(vm.product, onSaveSuccess, onSaveError);
            } else {
                OrderEntry.save(vm.product, onSaveSuccess, onSaveError);
            }*/
        }

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }

        vm.getCustomerName = function(search) {
            var newCust = vm.customers.slice();
            if (search && newCust.indexOf(search) === -1) {
                search.unshift(search);
            }
            return newCust;
        }

        loadCustomerNames();

        function loadCustomerNames() {
            Customer.query(function(result) {
                for (var x in result) {
                    var fullName = result[x].fullName
                    vm.customers.push(fullName)
                }
            });
        }
    }
})();
