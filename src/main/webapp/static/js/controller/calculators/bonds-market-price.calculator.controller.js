'use strict';

app.controller('bondsMarketPriceCalculatorController', function ($scope) {
    $scope.multiply = function multiply(){
        var coupon=$scope.frontendData.coupon;
        var par=$scope.frontendData.par;
        var year=$scope.frontendData.year;
        var r=$scope.frontendData.r;

        r=r/100;
        var base=Math.pow((1+r),year);
        var c=coupon*((1-(1/(base)))/r)+par/(base);
        $scope.frontendData.total=c;
    }
});