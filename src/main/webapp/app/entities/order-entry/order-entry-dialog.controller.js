(function() {
    'use strict';

    angular
        .module('simplePosjHipsterApp')
        .controller('OrderEntryDialogController', OrderEntryDialogController);

    OrderEntryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'OrderEntry', 'Customer', 'OrderItem'];

    function OrderEntryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, OrderEntry, Customer, OrderItem) {
        var vm = this;

        vm.orderEntry = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.customers = Customer.query({filter: 'orderentry-is-null'});
        $q.all([vm.orderEntry.$promise, vm.customers.$promise]).then(function() {
            if (!vm.orderEntry.customer || !vm.orderEntry.customer.id) {
                return $q.reject();
            }
            return Customer.get({id : vm.orderEntry.customer.id}).$promise;
        }).then(function(customer) {
            vm.customers.push(customer);
        });
        vm.orderitems = OrderItem.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.orderEntry.id !== null) {
                OrderEntry.update(vm.orderEntry, onSaveSuccess, onSaveError);
            } else {
                OrderEntry.save(vm.orderEntry, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('simplePosjHipsterApp:orderEntryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.transactionDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
