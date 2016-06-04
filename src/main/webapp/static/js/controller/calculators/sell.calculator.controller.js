'use strict';

app.controller('sellCalculatorController', function ($scope) {
    $(document).ready(function () {
        $('#calc-wrapper input[id^="txt-"]').bind("paste", function (e) {
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

            //console.log(data);

            var id = $(this).attr('id');
            var last_dash_pos = id.lastIndexOf("-");
            var cell_prefix = id.substr(0, last_dash_pos);
            var cell_id = id.substr(last_dash_pos + 1);
            //console.log(cell_id, cell_prefix);

            var counter = cell_id;
            for (var i = 0; i < data.length; i++) {
                if (counter > 10) {
                    break;
                }
                $('#' + cell_prefix + "-" + counter.toString()).val(data[i]);
                //console.log(data[i]);
                counter++;
            }

        });
    })


    $scope.clear_row = function clear_row(e) {
        var id = e.id;
        var row_id = id.substr(10);
        console.log(row_id);
        $("input[id^='txt-" + row_id + "']").val("");
    }
    $scope.cur2num = function cur2num(user_input) {
        user_input = $.trim(user_input);
        var is_percentage = false;
        if (user_input.indexOf("%") != -1) {
            user_input = user_input.replace('%', '');
            is_percentage = true;
        }
        var num_string = "";
        for (var i = 0; i < user_input.length; i++) {
            var c = user_input.charAt(i);
            if ((c >= "0") && (c <= "9") || (c == "-") && (i == 0) || (c == ".")) {
                num_string += c;
            }
        }

        num_string = parseFloat(num_string);
        if (is_percentage) {
            num_string /= 100;
        }

        return num_string;
    }

    $scope.cur2int = function cur2int(user_input) {
        return parseInt($scope.cur2num(user_input));
    }

    $scope.cur2float = function cur2float(user_input) {
        return parseFloat($scope.cur2num(user_input));
    }

    $scope.int2cur = function int2cur(user_input) {
        var user_input = user_input.toString();
        var len = user_input.length;
        var parts = Math.floor(user_input.length / 3);
        var first_part = len % 3;
        var result = user_input.substr(0, first_part);
        for (var i = 0; i < parts; i++) {
            result += "," + user_input.substr(i * 3 + first_part, 3);
        }

        if (result[0] == ",") {
            result = result.substring(1);
        }
        return result;
    }

    $scope.show_sell_criteria = function show_sell_criteria() {
        var csp = $scope.cur2float($scope.frontendData.csp);
        var ns = $scope.cur2int($scope.frontendData.ns);
        var cdr = $scope.cur2float($scope.frontendData.cdr);
        var cg = $scope.cur2float($scope.frontendData.cg);
        var g = $scope.cur2float($scope.frontendData.g);
        var nsp = $scope.cur2float($scope.frontendData.nsp);
        var ndr = $scope.cur2float($scope.frontendData.ndr);

        var stock_current = new Array();
        var stock_new = new Array();

        stock_current[0] = Math.round(csp * ns);
        stock_new[0] = Math.round(stock_current - cg * g);
        for (var i = 5; i <= 30; i += 5) {
            stock_current[i] = Math.round(stock_current[0] * Math.pow(1 + cdr, i));
            stock_new[i] = Math.round(stock_new[0] * Math.pow(1 + ndr, i));
        }

        //console.log(stock_current);
        //console.log(stock_new);

        var html = "<table class=\"calc-results\">";
        html += "<tr>"
        html += "<th>&nbsp;</th>";
        html += "<th>Current Stock</th>";
        html += "<th>New Stock</th>";
        html += "</tr>";
        for (var i = 0; i <= 30; i += 5) {
            html += "<tr><td>" + i.toString() + "</td><td>$" + $scope.int2cur(stock_current[i]) + "</td><td>$" + $scope.int2cur(stock_new[i]) + "</td></tr>";
        }
        html += "</table>";
        $('#results-text-wrapper').html(html);
        $('#results-text-wrapper').show();

        //$.post("/php/graph-sell-criteria.php",
        //    {
        //        stock_current: stock_current.join("|"),
        //        stock_new: stock_new.join("|")
        //    },
        //    function (data) {
        //        var reply = $.parseJSON(data);
        //        if (reply.result == "OK") {
        //            $('#results-image-wrapper').html("<img src='" + reply.file_name + "' width='720' height='400'>");
        //        }
        //
        //    });

    }

    $scope.create_graphs = function create_graphs() {
        var data = new Array();
        for (var i = 0; i <= 5; i++) {
            data[i] = new Array();
        }
        for (var i = 1; i <= 10; i++) {
            data[0][i - 1] = $scope.cur2float($('#txt-eps-' + i.toString()).val());
            data[1][i - 1] = $scope.cur2float($('#txt-dividend-' + i.toString()).val());
            data[2][i - 1] = $scope.cur2float($('#txt-book-value-' + i.toString()).val());
            data[3][i - 1] = $scope.cur2float($('#txt-roi-' + i.toString()).val());
            data[4][i - 1] = $scope.cur2float($('#txt-ratio-' + i.toString()).val());
            data[5][i - 1] = $scope.cur2float($('#txt-debt-equity-' + i.toString()).val());
        }

        for (var i = 0; i <= 5; i++) {
            data[i] = data[i].join("|");
        }
        data = data.join("*");

        window.open("/php/graph-6.php?data=" + data + "&ticker=" + $('#txt_fcf_ticker').val(), "_blank");
    }
});