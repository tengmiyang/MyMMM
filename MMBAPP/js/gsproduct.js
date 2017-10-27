/*
 * @Author: zhengwei
 * @Date:   2016-10-26 10:56:13
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-29 11:56:08
 */

'use strict';

$(function() {
    getShop();
    getArea();
    getProduct(0, 0);

    function getShop() {
        $.ajax({
            url: "http://mmb.ittun.com/api/getgsshop",
            success: function(data) {
                var html = template("shopTmp", data);
                $('#shop').html(html);
                $('.filter > ul >li').eq(0).html("<a href='#shop' data-shopid=" + data.result[0].shopId + ">" + data.result[0].shopName + "<i></i></a>");
                //给上面的店铺标题添加事件 当点击的时候显示店铺列表
                $('.filter > ul >li').eq(0).find('a').on('click', function(e) {
                    e.preventDefault();
                    $($(this).attr("href")).toggle();
                    // console.log(log);
                    $($('.filter > ul >li').eq(1).find("a").attr("href")).hide();
                });
                // 给店铺列表添加事件 把店铺标题切换成选中的标题
                $('#shop > ul > li > a').on('click', function() {
                    //获取当前店铺列表点击项的shopid
                    var shopid = $(this).data("shopid");
                    $('.filter > ul >li').eq(0).find('a').data("shopid", shopid);
                    //html() 方法不传参表示获取值 
                    // 获取当前店铺列表点击项的shopName
                    var shopName = $(this).html();
                    $('.filter > ul >li').eq(0).find('a').html(shopName + "<i></i>");
                    $('#shop').hide();
                    // console.log(shopid,$('.filter > ul >li').eq(1).find('a').data("areaid"));
                    getProduct(shopid, $('.filter > ul >li').eq(1).find('a').data("areaid"));
                });
                // toggleShop($('.filter > ul >li').eq(0).find('a'), $('#shop > ul > li > a'), $('.filter > ul >li').eq(1).find('a'), "shopid", "areaid");
            }
        })
    }
    // titleDom 标题dom元素 listDom 下面列表的的dom元素
    // function toggleShop(titleDom, listDom, nextTitleDom, shop, area) {
    //     console.log(nextTitleDom);
    //     //给上面的店铺标题添加事件 当点击的时候显示店铺列表
    //     titleDom.on('click', function(e) {
    //         e.preventDefault();
    //         $($(this).attr("href")).toggle();
    //         // console.log(log);
    //         // $(nextTitleDom.attr("href")).hide();
    //     });
    //     // 给店铺列表添加事件 把店铺标题切换成选中的标题
    //     listDom.on('click', function() {
    //         //获取当前店铺列表点击项的shopid
    //         if(shop="shopid"){
    //             var shopid = $(this).data("shopid");
    //             titleDom.data("shopid", shopid);
    //         }else{
    //              var shopid = $(this).data("areaid");
    //             titleDom.data("areaid", shopid);
    //         }
            
    //         //html() 方法不传参表示获取值 
    //         // 获取当前店铺列表点击项的shopName
    //         var shopName = $(this).html();
    //         titleDom.html(shopName.split("（")[0] + "<i></i>");
    //         $(this).parent().parent().parent().hide();
    //         // console.log(shopid,$('.filter > ul >li').eq(1).find('a').data("areaid"));
    //         if (shop = "shopid") {
    //             getProduct(shopid, nextTitleDom.data(area));
    //         } else {
    //             getProduct(nextTitleDom.data(area), shopid);
    //         }
    //         console.log(shopid, nextTitleDom.data(area));
    //     });
    // }

    function getArea() {
        $.ajax({
            url: "http://mmb.ittun.com/api/getgsshoparea",
            success: function(data) {
                var html = template("areaTmp", data);
                $('#area').html(html);
                $('.filter > ul >li').eq(1).html("<a href='#area' data-areaid=" + data.result[0].areaId + ">" + data.result[0].areaName.split("（")[0] + "<i></i></a>");
                //给上面的区域标题添加事件 当点击的时候显示区域列表
                $('.filter > ul >li').eq(1).find('a').on('click', function(e) {
                    e.preventDefault();
                    $($(this).attr("href")).toggle();
                    $($('.filter > ul >li').eq(0).find("a").attr("href")).hide();
                });
                // 给区域列表添加事件 把区域标题切换成选中的区域
                $('#area > ul > li > a').on('click', function() {
                    //获取当前区域列表点击项的areaid
                    var areaid = $(this).data("areaid");
                    $('.filter > ul >li').eq(1).find('a').data("areaid", areaid);
                    //html() 方法不传参表示获取值 
                    // 获取当前区域列表点击项的areaName
                    var areaName = $(this).html();
                    $('.filter > ul >li').eq(1).find('a').html(areaName.split("（")[0] + "<i></i>");
                    $('#area').hide();
                    getProduct($('.filter > ul >li').eq(0).find('a').data("shopid"), areaid);
                });
                // toggleShop($('.filter > ul >li').eq(1).find('a'), $('#area > ul > li > a'), $('.filter > ul >li').eq(0).find('a'), "areaid", "shopid")
            }
        })
    }

    function getProduct(shopid, areaid) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getgsproduct",
            data: {
                "shopid": shopid,
                "areaid": areaid
            },
            success: function(data) {
                var html = template("productTmp", data);
                $('.gs-product-list').html(html);
            }
        })
    }
})
