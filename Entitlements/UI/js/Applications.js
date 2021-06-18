// JavaScript source code
var myapp1 = angular.module('myApp', ['ngStorage'])
var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $filter) {
    if ($localStorage.uname == null) {
        window.location.href = "login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.Roleid = $scope.userdetails[0].roleid;
    $scope.userCmpId = $scope.userdetails[0].CompanyId;
    $scope.dashboardDS = $localStorage.dashboardDS;
    $scope.checkedArr = new Array();
    $scope.uncheckedArr = new Array();
    $scope.cmproles = [];


    $scope.GetApplications = function () {
        $http.get('/api/objects/GetApplications').then(function (res, data) {
            $scope.application = res.data;
        });
    }


    $scope.saveNewApp = function (a) {

        if (a == null) {
            alert('please enter Details');
            return;
        }
        if (a.Name == null) {
            alert('Please Enter Name');
            return;
        }


        var Selapps = {
            Name: a.Name,
            Description: a.Description,
            flag: 'I',
            Active: a.Active,
            CreatedBy: $scope.userdetails[0].Id
        }

        var req = {
            method: 'POST',
            url: '/api/Objects/saveApplications',
            data: Selapps
        }
        $http(req).then(function (response) {

            alert("Saved successfully!");
            $("#Modal-header-new").modal('hide');
            $scope.newapp = null;
            $scope.GetApplications();

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            alert(errmssg);
        });
        $scope.currRole = null;
    };

    $scope.Update = function (m) {

        if (m == null) {
            alert('please enter Details');
            return;
        }
        if (m.Name == null) {
            alert('Please Enter Name');
            return;
        }


        var Selapps = {
            Id: m.Id,
            Name: m.Name,
            Description: m.Description,
            flag: 'U',
            Active: m.Active,
            UpdatedBy: $scope.userdetails[0].Id
        }

        var req = {
            method: 'POST',
            url: '/api/Objects/saveApplications',
            data: Selapps
        }
        $http(req).then(function (response) {

            alert("Updated successfully!");
            $("#Modal-header-primary").modal('hide');
            $scope.currRole = null;
            $scope.GetApplications();

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            alert(errmssg);
        });
        $scope.currRole = null;
    };

    $scope.setCurrRole = function (grp) {
        $scope.editapp = grp;
    };

    $scope.clearCurrRole = function () {
        $scope.currRole = null;
    };


    //This will hide the DIV by default.
    $scope.IsHidden = true;
    $scope.ShowHide = function () {
        //If DIV is hidden it will be visible and vice versa.
        $scope.IsHidden = $scope.IsHidden ? false : true;
    }




    $scope.toggle = function (item) {
        var idx = $scope.checkedArr.indexOf(item);
        if (idx > -1) {
            $scope.checkedArr.splice(idx, 1);
        }
        else {
            $scope.checkedArr.push(item);
        }

        var idx = $scope.uncheckedArr.indexOf(item);
        if (idx > -1) {
            $scope.uncheckedArr.splice(idx, 1);
        }
        else {
            $scope.uncheckedArr.push(item);
        }
    };


    $scope.toggleAll = function () {
        if ($scope.checkedArr.length === $scope.cmproles.length) {
            $scope.uncheckedArr = $scope.checkedArr.slice(0);
            $scope.checkedArr = [];

        } else if ($scope.checkedArr.length === 0 || $scope.cmproles.length > 0) {
            $scope.checkedArr = $scope.cmproles.slice(0);
            $scope.uncheckedArr = [];
        }

    };

    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };


    $scope.isChecked = function () {
        if ($scope.cmproles)
            return $scope.checkedArr.length === $scope.cmproles.length;
        else
            return false;
    };

    $scope.logout = function () {
        $localStorage.userdetails = null;
        $localStorage.uname = null;
        window.location.href = 'Login.html';
    }


});


myapp1.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, mssg) {

    $scope.mssg = mssg;
    $scope.ok = function () {
        $uibModalInstance.close('test');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
