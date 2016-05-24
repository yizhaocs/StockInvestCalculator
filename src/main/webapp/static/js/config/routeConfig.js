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
                templateUrl: 'static/html/adobe-pages/mappings.html',
                controller: 'listCtrlAdobe'
            })

            .when(base + 'adobe', {
                title: 'Adobe Mappings',
                templateUrl: 'static/html/adobe-pages/mappings.html',
                controller: 'listCtrlAdobe'
            })

            .when(base + 'derive-conversion', {
                title: 'Derive Combo Pixel Mappings',
                templateUrl: 'static/html/derive-conversion-pages/mappings.html',
                controller: 'listCtrlDeriveConversion'
            })

            .when(base + 'krux-dpkey', {
                title: 'Krux Dpkey Mappings',
                templateUrl: 'static/html/krux-dpkey-pages/mappings.html',
                controller: 'listCtrlKruxDpkey'
            })


            .when(base + 'liveramp', {
                title: 'Liveramp Mappings',
                templateUrl: 'static/html/liveramp-pages/mappings.html',
                controller: 'listCtrlLiveramp'
            })


            .when(base + 'dbm', {
                title: 'Dbm Mappings',
                templateUrl: 'static/html/dbm-pages/mappings.html',
                controller: 'listCtrlDbm'
            })

            .when(base + 'facebook', {
                title: 'Facebook Mappings',
                templateUrl: 'static/html/facebook-pages/mappings.html',
                controller: 'listCtrlFacebook'
            })

            .when(base + 'pixel-data-engine-group', {
                title: 'Pixel Data Engine Groups',
                templateUrl: 'static/html/pixel-data-engine-config/list-group.html',
                controller: 'listPixelGroups'
            })


            .when(base + 'pixel-data-engine-rule', {
                title: 'Pixel Data Engine Rules',
                templateUrl: 'static/html/pixel-data-engine-config/list-rule.html',
                controller: 'listPixelRules'
            })

            .otherwise({
                templateUrl: 'static/html/adobe-pages/mappings.html',
                redirectTo: base + 'adobe'
            });
    }]);

