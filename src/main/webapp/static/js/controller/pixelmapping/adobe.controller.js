/**
 * @author JASON GAO[jason.gao@adara.com ]
 * @author YI ZHAO[yi.zhao@adara.com]
 */

'use strict';

app.controller('listCtrlAdobe', function ($scope) {
    //Average Book Value change
    $scope.gain = function gain(){
        var cbv=$scope.frontendData.cbv;
        var obv=$scope.frontendData.obv;
        var years=$scope.frontendData.years;

        var upper=1/years;
        var base=cbv/obv;
        var a=Math.pow(base,upper);
        var c=100*(a-1);
        $scope.frontendData.totals=c;
    }


    //Intrinsic Value
    $scope.multiply = function multiply(){
        var coupon=$scope.frontendData.coupon;
        var par=$scope.frontendData.par;
        var year=$scope.frontendData.year;
        var r=$scope.frontendData.r;
        var bvc=$scope.frontendData.bvc;

        var perc=(1+bvc/100);
        var base=Math.pow(perc,year);
        var parr=par*base;
        r=r/100;

        var extra=Math.pow((1+r),year);

        var c=coupon*(1-(1/extra))/r+parr/extra;

        $scope.frontendData.total=c;
    }
});