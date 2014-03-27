<div class="leftmenu" ng-class="{leftMenuShow: leftMenuShowing}" ng-mouseenter="leftMenuShowing = true" ng-mouseleave="leftMenuShowing = false">

.leftmenu{
    max-width:68px;
    float:left;
    background-color:#333739;
    position:relative;
    height:100%;
    padding: 20px;
    padding-top: 100px;
    overflow: hidden;
    -webkit-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    transition: all 1s ease-in-out;
}

.leftMenuShow{
    max-width: 300px;
}