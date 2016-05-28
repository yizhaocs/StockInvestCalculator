'use strict';

app.controller('listCtrlDeriveConversion', function ($scope) {
    $scope.multiply = function multiply(){
        var coupon=$scope.frontendData.coupon;
        var par=$scope.frontendData.par;
        var year=$scope.frontendData.year;
        var price=$scope.frontendData.price;

        var c=((coupon+(par-price)/year)/((par+price)/2))*100;
        $scope.frontendData.total=c;
    }
});