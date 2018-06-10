'use strict';

describe('Controller Tests', function() {

    describe('OrderEntry Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockOrderEntry, MockCustomer, MockOrderItem;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockOrderEntry = jasmine.createSpy('MockOrderEntry');
            MockCustomer = jasmine.createSpy('MockCustomer');
            MockOrderItem = jasmine.createSpy('MockOrderItem');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'OrderEntry': MockOrderEntry,
                'Customer': MockCustomer,
                'OrderItem': MockOrderItem
            };
            createController = function() {
                $injector.get('$controller')("OrderEntryDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'simplePosjHipsterApp:orderEntryUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
