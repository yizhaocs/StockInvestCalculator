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

    //
    ////Intrinsic Value
    //function multiply(){
    //    coupon=Number(document.calculator.coupon.value);
    //    par=Number(document.calculator.par.value);
    //    year=Number(document.calculator.year.value);
    //    r=Number(document.calculator.r.value);
    //    bvc=Number(document.calculator.bvc.value);
    //
    //    perc=(1+bvc/100);
    //    base=Math.pow(perc,year);
    //    parr=par*base;
    //    r=r/100;
    //
    //    extra=Math.pow((1+r),year);
    //
    //    c=coupon*(1-(1/extra))/r+parr/extra;
    //
    //    document.calculator.total.value=c;
    //}
});