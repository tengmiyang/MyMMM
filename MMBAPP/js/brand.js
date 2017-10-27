/*
 * @Author: zhengwei
 * @Date:   2016-10-24 10:19:37
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-29 15:29:11
 */

'use strict';
$(function() {
    var brandtitleid = getQueryString("brandtitleid");
    getBrandList(brandtitleid);
    getBrandProduct(brandtitleid);

    function getBrandList(brandtitleid) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbrand",
            data: {
                "brandtitleid": brandtitleid
            },
            success: function(data) {
                var html = template("brandListTmp", data);
                $('.brand-list').html(html);
            }
        })
    }

    function getBrandProduct(brandtitleid) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbrandproductlist",
            data: {
                "brandtitleid": brandtitleid,
                "pagesize": 4
            },
            success: function(data) {
                var html = template("brandProductTmp", data);
                $('.product-list').html(html);
                //等商品出来了再加载商品评论
                getBrandProductCom(data.result[0]);
            }
        })
    }

    function getBrandProductCom(product) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductcom",
            data: {
                "productid": product.productId
            },
            success: function(data) {
                // console.log(data);
                // for (var i = 0; i < data.result.length; i++) {
                //     data.result[i].productImg = product.productImg;
                //     data.result[i].productName = product.productName;
                //     data.result[i].comName = data.result[i].comName;
                //     data.result[i].comContent = data.result[i].comContent;
                //     data.result[i].comTime = data.result[i].comTime;
                // }
                data = {
                    "productImg": product.productImg,
                    "productName": product.productName,
                    "result": data.result
                };
                // console.log(data);
                var html = template("brandProductComTmp", data);
                $('.product-com').html(html);
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
});
