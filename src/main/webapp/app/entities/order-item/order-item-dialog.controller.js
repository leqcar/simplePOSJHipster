(function() {
    'use strict';

    angular
        .module('simplePosjHipsterApp')
        .controller('OrderItemDialogController', OrderItemDialogController);

    OrderItemDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'OrderItem', 'OrderEntry', 'Product'];

    function OrderItemDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, OrderItem, OrderEntry, Product) {
        var vm = this;

        vm.orderItem = entity;
        vm.clear = clear;
        vm.save = save;
        vm.orderentries = OrderEntry.query();
        vm.products = Product.query({filter: 'orderitem-is-null'});
        $q.all([vm.orderItem.$promise, vm.products.$promise]).then(function() {
            if (!vm.orderItem.product || !vm.orderItem.product.id) {
                return $q.reject();
            }
            return Product.get({id : vm.orderItem.product.id}).$promise;
        }).then(function(product) {
            vm.products.push(product);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.orderItem.id !== null) {
                OrderItem.update(vm.orderItem, onSaveSuccess, onSaveError);
            } else {
                OrderItem.save(vm.orderItem, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('simplePosjHipsterApp:orderItemUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
