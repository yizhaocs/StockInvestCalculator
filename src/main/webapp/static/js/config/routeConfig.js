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
                title: 'Adobe Mappings',
                templateUrl: 'static/html/adobe-pages/calculator.html',
                controller: 'listCtrlAdobe'
            })

            .when(base + 'adobe', {
                title: 'Adobe Mappings',
                templateUrl: 'static/html/adobe-pages/calculator.html',
                controller: 'listCtrlAdobe'
            })

            .when(base + 'derive-conversion', {
                title: 'Derive Combo Pixel Mappings',
                templateUrl: 'static/html/derive-conversion-pages/calculator.html',
                controller: 'listCtrlDeriveConversion'
            })

            .when(base + 'dbm', {
                title: 'Dbm Mappings',
                templateUrl: 'static/html/dbm-pages/calculator.html',
                controller: 'listCtrlDbm'
            })

            .when(base + 'dfc-calculator', {
                title: 'DCF Calculator',
                templateUrl: 'static/html/dcf-calculator-pages/calculator.html',
                controller: 'dfcCalculatorController'
            })

            .otherwise({
                templateUrl: 'static/html/adobe-pages/calculator.html',
                redirectTo: base + 'adobe'
            });
    }]);

