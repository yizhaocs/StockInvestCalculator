/**
 * @author JASON GAO[jason.gao@adara.com ]
 * @author YI ZHAO[yi.zhao@adara.com]
 */

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        var base = '/';

        // use the HTML5 History API
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                title: 'Intrinsic Value Calculator',
                templateUrl: 'static/html/intrinsic-value-calculator-pages/calculator.html',
                controller: 'intrinsicValueCalculatorController'
            })

            .when(base + 'intrinsic-value-calculator', {
                title: 'Intrinsic Value Calculator',
                templateUrl: 'static/html/intrinsic-value-calculator-pages/calculator.html',
                controller: 'intrinsicValueCalculatorController'
            })

            .when(base + 'yield-to-call', {
                title: 'Yield to Call Calculator',
                templateUrl: 'static/html/yield-to-call-pages/calculator.html',
                controller: 'yieldToCallCalculatorController'
            })

            .when(base + 'yield-to-maturity', {
                title: 'Yield to Maturity Calculator',
                templateUrl: 'static/html/yield-to-maturity-pages/calculator.html',
                controller: 'yieldToMaturityCalculatorController'
            })

            .when(base + 'bonds-market-price-calculator', {
                title: 'Bonds Market Price Calculator',
                templateUrl: 'static/html/bonds-market-price-calculator-pages/calculator.html',
                controller: 'bondsMarketPriceCalculatorController'
            })



            .when(base + 'dfc-calculator', {
                title: 'DCF Calculator',
                templateUrl: 'static/html/dcf-calculator-pages/calculator.html',
                controller: 'dfcCalculatorController'
            })

            .otherwise({
                templateUrl: 'static/html/intrinsic-value-calculator-pages/calculator.html',
                redirectTo: base + 'intrinsic-value-calculator'
            });
    }]);

