/*
 * @Author: zhengwei
 * @Date:   2016-10-26 13:49:47
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-28 21:43:35
 */

'use strict';
$(function() {
    getbaicaijiaTitle();

    function getbaicaijiaTitle() {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbaicaijiatitle",
            success: function(data) {
                var html = template("baicaijiaTitleTmp", data);
                $('.bcj-title > .ul-wapper > ul').html(html)
                $('.bcj-title').find('.ul-wapper > ul > li').eq(0).addClass("active");

                //获取所有的li计算ul的宽度 
                var ulWidth = 0;
                var lis = $('.bcj-title').find('.ul-wapper > ul > li');
                for (var i = 0; i < lis.length; i++) {
                    ulWidth += $(lis[i]).width();
                }
                $('.bcj-title > .ul-wapper > ul').css("width", ulWidth + "px");
                setSwipe();
                getbaicaijiaProduct(0)
            }
        })
    }


    function getbaicaijiaProduct(titleid) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbaicaijiaproduct",
            data: {
                "titleid": titleid
            },
            success: function(data) {
                var html = template('baicaijiaProductTmp', data);
                $('.bcj-list').html(html);
            }
        })
    }

    function setSwipe() {
        $('.bcj-title').find('.ul-wapper > ul > li > a').on('click', function() {
            $('.bcj-title').find('.ul-wapper > ul > li').removeClass("active");
            $(this).parent().addClass("active");
            var thisTitleId = $(this).data('titleid');
            console.log(thisTitleId);
            var navs = $('.bcj-title').find('.ul-wapper > ul > li');
            var swipeLeft = 0;
            for (var i = 0; i < thisTitleId; i++) {
                swipeLeft -= $(navs[i]).width();
            }
            console.log(swipeLeft);
            if (swipeLeft > minPosition) {
                swipeUl.css("transform", "translateX(" + swipeLeft + "px)");
                swipeUl.css("transition", "all 0.2s");
            } else {
                swipeLeft = minPosition;
                swipeUl.css("transform", "translateX(" + swipeLeft + "px)");
                swipeUl.css("transition", "all 0.2s");
            }

            currentX = swipeLeft;
            //当点击a的时候把a标签上的titleid值传进来获取对应的商品列表
            getbaicaijiaProduct(thisTitleId);
        });
        /**
         * 1. 实现当在 白菜价标题区域滑动的时候 要改变 ul的 位移的值  调整 ul的translateX  
         * 2. 如果是从右往左滑动 ul的translateX 是负值  - 滑动的距离  100px 
         * 3. 如果是从左往右滑动是正值   +100px
         * 4. 当滑动超过最大滑动位置 和最小滑动位置就不让滑了
         * 5. 当超过最大的位移的位置 就要回到最大的位移位置 
         * 6. 当超过最小的位移的位置 就要回到最小的位移位置
         */
        var startX, endX, moveX;
        //当前的滑动位置
        var currentX = 0;
        //当前的滑动距离
        var distanceX = 0;
        // 最大滑动的距离
        var maxSwipe = 0 + 100;
        //最小滑动距离
        var minSwipe = $('.bcj-title').width() - $('.bcj-title').find('.ul-wapper > ul').width() - 100;
        // 最大位移位置
        var maxPosition = 0;
        //最小位移位置
        var minPosition = $('.bcj-title').width() - $('.bcj-title').find('.ul-wapper > ul').width();
        
        var swipeUl = $('.bcj-title').find('.ul-wapper > ul');
        $('.bcj-title').on('touchstart', function(e) {
            // console.log(e.originalEvent.touches[0].clientX);
            startX = e.originalEvent.touches[0].clientX
        })
        $('.bcj-title').on('touchmove', function(e) {
            moveX = e.originalEvent.touches[0].clientX;
            distanceX = moveX - startX;
            // console.log(distanceX);
            //当超过了最大滑动的位置 就不让滑动  小于最大滑动距离才设置滑动
            if ((currentX + distanceX) < maxSwipe && (currentX + distanceX) > minSwipe) {
                swipeUl.css("transform", "translateX(" + (currentX + distanceX) + "px)");
                swipeUl.css("transition", "none");
            }

        })
        $('.bcj-title').on('touchend', function(e) {
            endX = e.originalEvent.changedTouches[0].clientX;
            currentX += distanceX;
            //松开手的时候要弹回去
            if (currentX > maxPosition) {
                currentX = maxPosition;
                swipeUl.css("transform", "translateX(" + currentX + "px)");
                swipeUl.css("transition", "all 0.2s");
            } else if (currentX < minPosition) {
                currentX = minPosition;
                swipeUl.css("transform", "translateX(" + currentX + "px)");
                swipeUl.css("transition", "all 0.2s");
            }
            console.log(minPosition);
        })
    }

    // setTitle($('.bcj-title'), $.getUrlParam('titleid'));
    // setProductList($('.bcj-list'), $.getUrlParam('titleid'));

    // function setTitle(dom, titleid) {
    //     $.ajax({
    //         url: "http://mmb.ittun.com/api/getbaicaijiatitle",
    //         success: function(data) {
    //             var html = template('bcjTitle', data);
    //             dom.html(html);
    //             var titleLi = dom.find('.ul-wapper .tabs li');
    //             var tabsUlWidth = 0;
    //             for (var i = 0; i < titleLi.length; i++) {
    //                 tabsUlWidth += $(titleLi[i]).width();
    //             }
    //             var windowWidth = $(window).width();
    //             if (windowWidth < 768) {
    //                 dom.find('.ul-wapper .tabs').css('width', tabsUlWidth + 38);
    //             }
    //             // $(titleLi[titleid || 0]).addClass('active');
    //             topSwipe(dom.find('.ul-wapper .tabs'), titleid);
    //             $(titleLi[titleid || 0]).addClass('active');
    //             $('.tabs > li > a').on('click', function() {
    //                 var titleid = $(this).data('titleid');
    //                 setProductList($('.bcj-list'), titleid);
    //                 $(titleLi).removeClass('active');
    //                 $(titleLi[titleid || 0]).addClass('active');
    //                 topSwipe(dom.find('.ul-wapper .tabs'), titleid);
    //             })
    //         }
    //     })
    // }

    // function topSwipe(dom, titleid) {
    //     var domWidth = dom.width();
    //     var domParentWidth = dom.parent().width();
    //     var buffer = 50;
    //     var maxPosition = 0;
    //     var minPosition = domParentWidth - domWidth;
    //     var maxSwipe = 0 + buffer;
    //     var minSwipe = minPosition - 50;
    //     var startX = 0;
    //     var moveX = 0;
    //     var endX = 0;
    //     var distanceX = 0;
    //     var currentX = 0;
    //     var li = dom.find('li');
    //     for (var i = 0; i < titleid; i++) {
    //         currentX -= $(li[i]).width();
    //     }
    //     if (currentX < minPosition) {
    //         currentX = minPosition
    //     } else if (currentX > maxPosition) {
    //         currentX = maxPosition;
    //     }
    //     addTransition(dom);
    //     setTranslateX(dom, currentX)
    //     dom[0].addEventListener('touchstart', function(e) {
    //         startX = e.touches[0].clientX;
    //     });
    //     dom[0].addEventListener('touchmove', function(e) {
    //         moveX = e.touches[0].clientX;
    //         distanceX = moveX - startX;
    //         // removeTransition(dom);
    //         if ((currentX + distanceX) > minSwipe && (currentX + distanceX) < maxSwipe) {
    //             // console.log(currentX + distanceX);
    //             addTransition(dom);
    //             setTranslateX(dom, (currentX + distanceX));
    //         }
    //     });
    //     dom[0].addEventListener('touchend', function(e) {
    //         // endX = e.changedTouches[0].;
    //         if ((currentX + distanceX) > maxPosition) {
    //             currentX = maxPosition;
    //             addTransition(dom);
    //             setTranslateX(dom, currentX);
    //         }
    //         //小于最小定位的时候
    //         else if ((currentX + distanceX) < minPosition) {
    //             currentX = minPosition;
    //             addTransition(dom);
    //             setTranslateX(dom, currentX);
    //         } else {
    //             //记录当前滑动完成后的定位
    //             currentX = currentX + distanceX;
    //         }
    //     });

    //     function addTransition(dom) {
    //         dom.css('transition', "all 0.2s");
    //     }

    //     function removeTransition(dom) {
    //         dom.css('transition', "none");
    //     }

    //     function setTranslateX(dom, x) {
    //         dom.css('transform', "translateX(" + x + "px)");
    //     }
    // }

    // function setProductList(dom, titleid, callback) {
    //     $.ajax({
    //         url: "http://mmb.ittun.com/api/getbaicaijiaproduct",
    //         data: { "titleid": titleid || 0 },
    //         success: function(data) {
    //             var html = template('bcjProductList', data);
    //             dom.html(html);
    //         }
    //     })
    // }
})
