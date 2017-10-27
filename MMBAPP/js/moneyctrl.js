/*
 * @Author: zhengwei
 * @Date:   2016-10-25 17:06:01
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-27 11:35:55
 */

'use strict';
$(function() {
    var pageid = getQueryString("pageid") || 1;
    getMoneyCtrl(pageid)

    function getMoneyCtrl(pageid) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getmoneyctrl",
            data: {
                "pageid": pageid
            },
            success: function(data) {
                var html = template("moneyCtrlTmp", data);
                console.log(html);
                $('.product-list').html(html);
                var page = Math.ceil(data.totalCount / data.pagesize);
                // console.log(page);
                var pageli = "";
                for (var i = 0; i < page; i++) {
                    //循环生成 第几页的li标签
                    // var url = "moneyctrl.html?categoryid=" + categoryId + "pageid=" + pageid;
                    // var url = "moneyctrl.html?categoryid=" + categoryId + "&pageid=" + (i+1);
                    var url = "moneyctrl.html?pageid=" + (i + 1);
                    pageli += "<li><a href=" + url + ">第" + (i + 1) + "/" + (page) + "页</a></li>";
                }
                $('#dLabel').html("第" + pageid + "页" + '<span class="caret"></span>');
                //如果当前页数已经到了第一页 给当前页面数变成2  2 -1 就只能 == 1
                if (pageid <= 1) {
                    pageid = 2;
                } else if (pageid >= page) {
                    //如果当前页数已经到了第最后一页 给当前页数变成最后一页 - 1  3+1 == 4
                    pageid = page - 1;
                }
                var prevUrl = "moneyctrl.html?pageid=" + (pageid - 1);
                var nextUrl = "moneyctrl.html?pageid=" + (parseInt(pageid) + 1);
                $('.page-prev').attr("href", prevUrl);
                $('.page-next').attr("href", nextUrl);
                // $('#dLabel').append('<span class="caret"></span>');
                $('.dropdown-menu').html(pageli);
            }
        })
    }
    //是用来获取url中的参数的值的 根据参数名获取参数值
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
})
