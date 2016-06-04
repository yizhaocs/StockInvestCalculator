'use strict';

app.controller('dfcCalculatorController', function ($scope) {
        var est_gr;
        var xa;
        var xb;
        //....
        var byfcf = 0;
        var gr = 0;
        var n = 1;
        var dr = 0;
        var fcf = new Array();
        var df = new Array();
        var dfcf = new Array();
        var sdfcf = 0;
        var lgr = 0;
        var dpcf = 0;
        var cso = 0;
        var ivs = 0;
        var mp = 0;
        var html = "";



        $(document).ready(function () {
            $('input[id^="txt_fcf_"]').bind("keyup", function () {
                $scope.est_fcf_calculate();
            })
            $('input[id^="txt_income_"]').bind("keyup", function () {
                $scope.est_gr_calculate();
            })
            $('input[id^="txt_year_"]').bind("keyup", function () {
                $scope.est_gr_calculate();
            })

            $('#calc-wrapper input[id^="txt_fcf_"]').bind("paste", function (e) {
                e.preventDefault();
                var text = (e.originalEvent || e).clipboardData.getData('text/plain');
                var data = new Array();
                var current_number = "";
                for (var i = 0; i < text.length; i++) {
                    var c = text.charAt(i);
                    if (((c >= "0") && (c <= "9")) || (c == ",") || (c == ".") || (c == "-")) {
                        current_number += c;
                    } else {
                        if (current_number.length > 0) {
                            data.push(current_number);
                        }
                        current_number = "";
                    }
                }

                console.log(data);

                var id = $(this).attr('id');
                var last_dash_pos = id.lastIndexOf("_");
                var cell_prefix = id.substr(0, last_dash_pos);
                var cell_id = id.substr(last_dash_pos + 1);
                //console.log(cell_id, cell_prefix);

                var counter = cell_id;
                for (var i = 0; i < data.length; i++) {
                    if (counter > 10) {
                        break;
                    }
                    $('#' + cell_prefix + "_" + counter).val(data[i]);
                    //console.log(data[i]);
                    counter++;
                }

            });

        })

        $scope.cur2num = function cur2num(user_input) {
            user_input = user_input.trim();
            var num_string = "";
            for (var i = 0; i < user_input.length; i++) {
                var c = user_input.charAt(i);
                if ((c >= "0") && (c <= "9") || (c == "-") && (i == 0) || (c == ".")) {
                    num_string += c;
                }
            }

            return parseFloat(num_string);
        }

        $scope.cur2int = function cur2int(user_input) {
            return parseInt($scope.cur2num(user_input));
        }

        $scope.cur2float = function cur2float(user_input) {
            return parseFloat($scope.cur2num(user_input));
        }

        $scope.fndr = function fndr(x) {

            var b = byfcf;
            var l = lgr;
            var gr1 = 1 + gr;
            var x1 = 1 + x;
            var m = n + 1;
            var r = Math.pow(gr1, m);

            var f0 = b * r * (1 + l) / (x - l) / Math.pow(x1, m)
                + b * (1 - Math.pow(gr1 / x1, m)) / (1 - gr1 / x1) - b - mp * cso;

            var fder = -b * (1 + l) * r * (1 / Math.pow(x1, m) / Math.pow(-l + x, 2) + m * Math.pow(x + 1, -1 - m) / (-l + x)) +
                b * (m * r * Math.pow(x1, -1 - m) / (1 - gr1 / x1) - gr1 * (1 - r / Math.pow(x1, m)) / Math.pow((1 - gr1 / x1) * x1, 2));


            var result = x - f0 / fder;

            return result;
        }

        $scope.show_chart_1 = function show_chart_1() {


            // Validate input for Step 1

            $("#wrapper-step1 .input-error").hide();

            byfcf = $scope.cur2float($('#txt-byfcf').val());
            gr = $scope.cur2float($('#txt-gr').val());
            n = $scope.cur2int($('#txt-n').val());

            var input_errors = false;

            if ((isNaN(byfcf)) || (byfcf <= 0)) {
                $("#error-byfcf").show();
                input_errors = true;
            }

            if ((isNaN(gr)) || (gr < 0) || (gr > 100)) {
                $("#error-gr").show();
                input_errors = true;
            }

            if ((isNaN(n)) || (n <= 0) || (n > 10)) {
                $("#error-n").show();
                input_errors = true;
            }

            if (!input_errors) {
                if (gr >= 1) {
                    gr /= 100;
                }

                fcf = new Array();

                for (var i = 1; i <= n; i++) {
                    fcf[i - 1] = Math.round(byfcf * Math.pow((1 + gr), i));
                }

                html = "<tr><td>Year</td>";
                for (var i = 1; i <= n; i++) {
                    html += "<td>" + i + "</td>";
                }
                html += "</tr><tr><td>FCF</td>";
                for (var i = 1; i <= n; i++) {
                    html += "<td>$" + fcf[i - 1] + "</td>";
                }


                html += "</tr><tr><td>GR</td><td>" + (gr * 100).toFixed(2) + "%</td>";
                if (n > 1) {
                    html += "<td colspan=\"" + (n - 1) + "\">&nbsp;</td>";
                }

                html += "</tr>";

                $("#wrapper-step1-results").html("<table class=\"calc-results\">" + html + "</table>");
                $("#wrapper-step1-results").show();

                $("#wrapper-step1-btn").hide();
                $("#wrapper-step2").show();

            }
        }

        $scope.show_chart_2 = function show_chart_2() {

            $scope.show_chart_1();

            // Validate input for Step 2

            $("#wrapper-step2 .input-error").hide();

            dr = $scope.cur2float($('#txt-dr').val());

            var input_errors = false;

            if ((isNaN(dr)) || (dr < 0) || (dr > 100)) {
                $("#error-gr").show();
                input_errors = true;
            }

            if (!input_errors) {
                df = new Array();
                dfcf = new Array();
                sdfcf = 0;

                if (dr >= 1) {
                    dr /= 100;
                }

                sdfcf = 0;
                for (var i = 1; i <= n; i++) {
                    df[i - 1] = Math.pow((1 + dr), i).toFixed(2);
                    dfcf[i - 1] = Math.round(fcf[i - 1] / df[i - 1]);
                    sdfcf += dfcf[i - 1];
                }

                if (gr != dr) {
                    sdfcf = Math.round(byfcf * (1 - Math.pow((1 + gr) / (1 + dr), n + 1)) / ( 1 - (1 + gr) / (1 + dr)) - byfcf);
                } else {
                    sdfcf = Math.round(sdfcf);
                }


                html = "<tr><td>Year</td>";
                for (var i = 1; i <= n; i++) {
                    html += "<td>" + i + "</td>";
                }
                html += "</tr><tr><td>FCF</td>";
                for (var i = 1; i <= n; i++) {
                    html += "<td>$" + fcf[i - 1] + "</td>";
                }
                html += "</tr><tr><td>DF</td>";
                for (var i = 1; i <= n; i++) {
                    html += "<td>" + df[i - 1] + "</td>";
                }
                html += "</tr><tr class=\"calc-results-hl\"><td>DFCF</td>";
                for (var i = 1; i <= n; i++) {
                    html += "<td>$" + dfcf[i - 1] + "</td>";
                }


                html += "</tr><tr>";
                if (n > 2) {
                    html += "<td colspan=\"" + (n - 2) + "\">&nbsp;</td>";
                }

                if (n < 2) {
                    html += "<td class=\"calc-results-hl\">Sum of DFCF</td>";
                } else {
                    html += "<td class=\"calc-results-hl\" colspan=\"2\">Sum of DFCF</td>";
                }

                html += "<td class=\"calc-results-hl\">$" + sdfcf + "</td></tr>";

                $("#wrapper-step1-results").hide();
                $("#wrapper-step2-results").html("<table class=\"calc-results\">" + html + "</table>");
                $("#wrapper-step2-results").show();

                $("#wrapper-step2-btn").hide();
                $("#wrapper-step3").show();

                $('#span-years').html(n);

            }
        }

        $scope.show_chart_3 = function show_chart_3() {

            $scope.show_chart_2();

            // Validate input for Step 3

            $("#wrapper-step3 .input-error").hide();

            lgr = $scope.cur2float($('#txt-lgr').val());

            var input_errors = false;

            if ((isNaN(lgr)) || (lgr < 0) || (lgr > 100)) {
                $("#error-lgr").show();
                input_errors = true;
            }

            if (!input_errors) {

                if (lgr >= 1) {
                    lgr /= 100;
                }

                dpcf = Math.round(byfcf * Math.pow(1 + gr, n + 1) * (1 + lgr) / (dr - lgr) / Math.pow(1 + dr, n + 1));

                html += "<tr>";
                if (n > 5) {
                    html += "<td colspan=\"" + (n - 3) + "\">&nbsp;</td>";
                } else if (n > 2) {
                    html += "<td colspan=\"" + (n - 2) + "\">&nbsp;</td>";
                }

                if (n == 1) {
                    html += "<td class=\"calc-results-hl-final\">Discontinued perpetuity cash flow (DPCF)</td>";
                } else if (n < 6) {
                    html += "<td class=\"calc-results-hl-final\" colspan=\"2\">Discontinued perpetuity cash flow (DPCF)</td>";
                } else {
                    html += "<td class=\"calc-results-hl-final\" colspan=\"3\">Discontinued perpetuity cash flow (DPCF)</td>";
                }

                html += "<td class=\"calc-results-hl-final\">$" + dpcf + "</td></tr>";

                $("#wrapper-step2-results").hide();
                $("#wrapper-step3-results").html("<table class=\"calc-results\">" + html + "</table>");
                $("tr, td").removeClass("calc-results-hl");
                $(".calc-results-hl-final").addClass("calc-results-hl");
                $("#wrapper-step3-results").show();

                $("#wrapper-step3-btn").hide();
                $("#wrapper-step4").show();
            }
        }

        $scope.show_chart_4 = function show_chart_4() {

            $scope.show_chart_3();

            // Validate input for Step 4

            $("#wrapper-step4 .input-error").hide();

            cso = $scope.cur2int($('#txt-cso').val());

            var input_errors = false;

            if ((isNaN(cso)) || (cso <= 0)) {
                $("#error-cso").show();
                input_errors = true;
            }

            if (!input_errors) {
                ivs = (dpcf + sdfcf) / cso;
            }

            html = "<table class=\"calc-results\">" + html + "</table>";

            html += "<br>";
            html += "<p><em>The intrinsic value per share is $" + ivs.toFixed(2) + " at a " + (dr * 100).toFixed(2) + "% annual discount rate</em></p>";

            $("#wrapper-step3-results").hide();
            $("#wrapper-step4-results").html(html);
            $("tr, td").removeClass("calc-results-hl");
            $(".calc-results-hl-final").addClass("calc-results-hl");
            $("#wrapper-step4-results").show();

            $("#wrapper-step4-btn").hide();
            $("#wrapper-step5").show();
        }

        $scope.show_chart_5 = function show_chart_5() {

            $scope.show_chart_4();

            // Validate input for Step 2

            $("#wrapper-step4 .input-error").hide();

            mp = $scope.cur2float($('#txt-mp').val());

            var input_errors = false;

            if ((isNaN(mp)) || (mp < 0)) {
                $("#error-mp").show();
                input_errors = true;
            }

            if (!input_errors) {

                var eps = 0.0001;

                var test_html = "";
                $("#wrapper-step6-results").html("");

                for (var i = 0; i < 50; i++) {
                    xa = xb = i / 100;
                    var counter = 0;
                    do {
                        xa = xb;
                        xb = $scope.fndr(xa);
                        counter++;
                    } while ((Math.abs(xb - xa) > eps) && (counter < 30) && (Math.abs(xb - xa) < 1));

                    if ((Math.abs(xb - xa) <= eps)) {
                        break;

                    }

                }

                if ((Math.abs(xb - xa) <= eps)) {
                    var ndr = xb * 100;
                    html += "<p><em>Based on the cash flows you have forecasted and a market price of $" + mp.toFixed(2) + ", this company may yield a " + ndr.toFixed(2) + "% annual return</em></p>";
                } else {
                    html += "It is not possible to calculate the annual return based on given set of data";
                }


                $("#wrapper-step4-results").hide();
                $("#wrapper-step5-results").html(html);
                $("tr, td").removeClass("calc-results-hl");
                $(".calc-results-hl-final").addClass("calc-results-hl");
                $("#wrapper-step5-results").show();

                //$("#wrapper-step5-btn").hide();
            }
        }

        $scope.show_all = function show_all() {
            $scope.show_chart_5();
        }

        $scope.show_fcf_window = function show_fcf_window() {
            $('#fcf-window').show();
        }

        $scope.hide_fcf_window = function hide_fcf_window() {
            $('#fcf-window').hide();
        }

        $scope.est_fcf_calculate = function est_fcf_calculate() {
            var est_fcf = 0;
            var steps = 0;
            for (var i = 1; i <= 10; i++) {
                var fcf_step = $scope.cur2float($('#txt_fcf_' + i).val());
                if (!isNaN(fcf_step)) {
                    est_fcf += fcf_step;
                    steps++;
                }
            }

            if (steps > 0) {
                est_fcf = Math.round(est_fcf / steps * 100) / 100;
            }
            $('#est-fcf').html('$' + est_fcf.toFixed(2));

            return est_fcf;
        }

        $scope.use_est_fcf = function use_est_fcf() {
            var est_fcf = $scope.est_fcf_calculate();

            $('#txt-byfcf').val(est_fcf);

            $scope.hide_fcf_window();
        }

        $scope.show_gr_window = function show_gr_window() {
            $('#gr-window').show();
        }

        $scope.hide_gr_window = function hide_gr_window() {
            $('#gr-window').hide();
        }

        $scope.est_gr_calculate = function est_gr_calculate() {
            var net_income = new Array();
            var est_gr_step = new Array();
            var est_gr = 0;
            var input_validated = true;
            var steps = 0;

            $('#est-gr-error').hide();

            var net_income_past = $scope.cur2float($('#txt_income_past').val());
            var net_income_current = $scope.cur2float($('#txt_income_current').val());

            var year_past = $scope.cur2int($('#txt_year_past').val());
            var year_current = $scope.cur2int($('#txt_year_current').val());

            if (isNaN(net_income_past) || isNaN(net_income_current)) {
                $('#est-gr-error').html("Please enter valid net income values");
                $('#est-gr-error').show();
                input_validated = false;
            } else if (isNaN(year_past) || isNaN(year_current)) {
                $('#est-gr-error').html("Please enter valid years");
                $('#est-gr-error').show();
                input_validated = false;
            } else if (year_current == year_past) {
                $('#est-gr-error').html("Past year must be different than current year");
                $('#est-gr-error').show();
                input_validated = false;
            }

            if (input_validated) {
                est_gr = Math.round((Math.pow(net_income_current / net_income_past, 1 / (year_current - year_past)) - 1) * 10000) / 100;

                if (!isNaN(est_gr)) {
                    $('#est-gr').html(est_gr.toFixed(2) + "%");
                } else {
                    $('#est-gr').html("N/A");
                }
            } else {
                $('#est-gr').html("N/A");
            }

            if (input_validated) {
                return est_gr;
            } else {
                return NaN;
            }
        }

        $scope.use_est_gr = function use_est_gr() {
            est_gr = $scope.est_gr_calculate();
            if (!isNaN(est_gr)) {
                $('#txt-gr').val(est_gr);

            }

            $scope.hide_gr_window();

        }

        $scope.load_external_gr = function load_external_gr() {
            var ticker = $("#txt_gr_ticker").val().trim().toLowerCase();
            ticker = ticker.replace("/", ".");
            ticker = ticker.replace("\\", ".");
            if (ticker.length > 0) {
                var url = "http://financials.morningstar.com/ratios/r.html?t=" + ticker + "&region=usa&culture=en-US&ownerCountry=USA";
                window.open(url, "_blank");
            }
        }

        $scope.load_external_fcf = function load_external_fcf() {
            var ticker = $("#txt_fcf_ticker").val().trim().toLowerCase();
            ticker = ticker.replace("/", ".");
            ticker = ticker.replace("\\", ".");
            if (ticker.length > 0) {
                var url = "http://financials.morningstar.com/ratios/r.html?t=" + ticker + "&region=usa&culture=en-US&ownerCountry=USA";
                window.open(url, "_blank");
            }
        }
});