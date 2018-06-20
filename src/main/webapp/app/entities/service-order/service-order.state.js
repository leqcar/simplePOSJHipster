(function() {
    'use strict';

    angular.module('simplePosjHipsterApp').config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('service-order', {
                parent: 'entity',
                url: '/service-order',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Service Orders'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/service-order/service-orders.html',
                        controller: 'ServiceOrderController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {}
            })
            .state('service-order.new', {
                parent: 'service-order',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/entities/service-order/service-order-dialog.html',
                        controller: 'ServiceOrderDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    id: null,
                                    transactionDate: null,
                                    paymentStatus: null,
                                    serviceType: null
                                }
                            }
                        }
                    })

                }]
            })
    }
})();
