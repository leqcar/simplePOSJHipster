(function() {
    'use strict';

    angular
        .module('simplePosjHipsterApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('order-entry', {
            parent: 'entity',
            url: '/order-entry',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'OrderEntries'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/order-entry/order-entries.html',
                    controller: 'OrderEntryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('order-entry-detail', {
            parent: 'order-entry',
            url: '/order-entry/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'OrderEntry'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/order-entry/order-entry-detail.html',
                    controller: 'OrderEntryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'OrderEntry', function($stateParams, OrderEntry) {
                    return OrderEntry.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'order-entry',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('order-entry-detail.edit', {
            parent: 'order-entry-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/order-entry/order-entry-dialog.html',
                    controller: 'OrderEntryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['OrderEntry', function(OrderEntry) {
                            return OrderEntry.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('order-entry.new', {
            parent: 'order-entry',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/order-entry/order-entry-dialog.html',
                    controller: 'OrderEntryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                serviceType: null,
                                transactionDate: null,
                                paymentStatus: null,
                                paidFlag: null,
                                totalAmount: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('order-entry', null, { reload: 'order-entry' });
                }, function() {
                    $state.go('order-entry');
                });
            }]
        })
        .state('order-entry.edit', {
            parent: 'order-entry',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/order-entry/order-entry-dialog.html',
                    controller: 'OrderEntryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['OrderEntry', function(OrderEntry) {
                            return OrderEntry.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('order-entry', null, { reload: 'order-entry' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('order-entry.delete', {
            parent: 'order-entry',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/order-entry/order-entry-delete-dialog.html',
                    controller: 'OrderEntryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['OrderEntry', function(OrderEntry) {
                            return OrderEntry.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('order-entry', null, { reload: 'order-entry' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
