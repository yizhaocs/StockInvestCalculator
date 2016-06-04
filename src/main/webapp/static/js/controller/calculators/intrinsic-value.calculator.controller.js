'use strict';

app.controller('intrinsicValueCalculatorController', function ($scope) {
    //Average Book Value change
    $scope.gain = function gain(){
        var cbv=$scope.frontendData.cbv; // Current Book Value
        var obv=$scope.frontendData.obv; // Old Book Value
        var years=$scope.frontendData.years; // # of Years between Book Values

        var upper=1/years;
        var base=cbv/obv;
        var a=Math.pow(base,upper);
        var c=100*(a-1);
        $scope.frontendData.totals=c;
    }


    //Intrinsic Value
    $scope.multiply = function multiply(){
        var coupon=$scope.frontendData.coupon; // Cash Taken out of business[This is dividends recieved for 1 year]
        var par=$scope.frontendData.par; // Current Book Value[We need to know this so we can determine the base value that's changing]
        var year=$scope.frontendData.year; // This will most likely be 10 (if you're comparing a 10 year federal note)[This will most likely be 10(if you are comparing a 10 year federal note)]
        var r=$scope.frontendData.r; // (Discount Rate) 10 year federal note (%)[Look up the ten year treasury note by clicking on this text]
        var bvc=$scope.frontendData.bvc; // Average Percent Change in book value per year[This will determine the estimate BV at the end of the next 10 years]

        var perc=(1+bvc/100);
        var base=Math.pow(perc,year);
        var parr=par*base;
        r=r/100;

        var extra=Math.pow((1+r),year);

        var c=coupon*(1-(1/extra))/r+parr/extra;

        $scope.frontendData.total=c;
    }
});