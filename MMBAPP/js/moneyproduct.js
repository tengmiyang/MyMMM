 /*
  * @Author: zhengwei
  * @Date:   2016-10-24 22:14:54
  * @Last Modified by:   zhengwei
  * @Last Modified time: 2016-11-27 11:53:12
  */

 'use strict';
 $(function() {
     var productid = getQueryString("productid");
     getMoneyProduct(productid);
     function getMoneyProduct(productid) {
         $.ajax({
             url: "http://mmb.ittun.com/api/getmoneyctrlproduct",
             data: {
                 "productid": productid
             },success:function (data) {
                console.log(data);
                 var html = template("moneyProductTmp",data);
                 $('.money-product').html(html);
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
