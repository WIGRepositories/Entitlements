// JavaScript source code
var myapp1 = angular.module('myapp', ['ngStorage'])
var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage) {
    if ($localStorage.uname == null) {
        window.location.href = "login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    //$scope.Roleid = $scope.userdetails[0].roleid;

    $scope.CanCreate = 0;
    $scope.selectedvalue = '10';
    $scope.selectgoto = 1;
    $scope.ty = '-1';

    $scope.getTypesbygrouppid = function () {

        $http.get('/api/MasterDataGroups/GetMasterDataGroups').then(function (res, data) {
            $scope.TypeGroups = res.data;
            $scope.s = $scope.TypeGroups[0];
            $scope.initdata();

        });
    }
    $scope.initdata = function (flag) {
        var selecting = ($scope.selectedvalue == null) ? 10 : $scope.selectedvalue;
        if (flag == '' || flag == null) {
            $scope.page = ($scope.selectgoto == null || $scope.selectgoto == '') ? 1 : $scope.selectgoto;
        }
        if (flag == 'N') {

            $scope.page++;
            curpage = $scope.page;
            $scope.firstvalue = $scope.secondvalue;
            $scope.secondvalue = curpage * selecting;
            $scope.selectgoto = curpage;
        } else if (flag == 'P') {
            $scope.page--
            curpage = $scope.page;
            $scope.secondvalue = $scope.firstvalue;
            $scope.firstvalue = ($scope.firstvalue - selecting);
            if ($scope.firstvalue == 0) {
                $scope.firstvalue = 1;
            }
            $scope.selectgoto = curpage;
        }
        else {
            $scope.page;
            curpage = $scope.page;
            if ($scope.selectgoto > 1) {

                $scope.secondvalue = curpage * selecting;
                $scope.firstvalue = ($scope.secondvalue - selecting);
            }
            else {
                $scope.selectgoto = 1;
                $scope.firstvalue = 1
                $scope.secondvalue = selecting;
            }
        }
        var TypeId = ($scope.s == null) ? -1 : $scope.s.Id;
        $http.get('/api/MasterDataGroups/GetMasterDataTypespaging?TypeId=' + TypeId + ' &curpage=' + curpage + '&maxrows=' + selecting).then(function (res, data) {
            $scope.Types = res.data.Table;
            $scope.paggin = res.data.Table1;            
            if ($scope.Types.length < selecting) {
                $scope.secondvalue = $scope.secondvalue - (selecting - $scope.Types.length);

            }
            var result = [];
            for (var i = 1; i <= $scope.paggin[0].totalpages; i++) {
                result.push(i);
            }
            $scope.jumptotalpages = result;
        });

    }


    //Notification on the top corner side of screen

    $scope.GetNotifications = function () {
        $http.get("/api/notifications/getnotifications").then(function (res, data) {
            $scope.notificaions = res.data;
        }
            , function (err) {
                alert(err)
            })
    }

    $scope.getTypesByGroupId = function (s) {
        var gid = ($scope.s) ? $scope.s.Id : -1;
        $http.get('/api/MasterDataGroups/GetDataTypesByGroupId?grpid=' + gid).then(function (res, data) {
            $scope.Types = res.data;


        });
    }




    $scope.save = function (Types) {

        if (Types == null) {
            alert('Please enter name.');
            return;
        }

        if (Types.Name == null) {
            alert('Please enter name.');


            return;
        }
        if ($scope.s.Id == null) {
            alert('Please select a type group');
            return;
        }

        var Types = {

            Id: Types.Id,
            Name: Types.Name,
            Description: Types.Description,
            Active: Types.Active,
            TypeGroupId: $scope.s.Id,
            listkey: Types.listvalue,
            listvalue: Types.listvalue,
            flag: 'U'
        };

        var req = {
            method: 'POST',
            url: '/api/MasterDataGroups/InSUpDMasterDataTypes',
            data: Types
        }

        $http(req).then(function (response) {

            alert("Saved successfully!");
            $('#Modal-header-primary').modal("hide");

            $scope.getTypes();
            $scope.Group = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog(errmssg);
        });
        $scope.currGroup = null;
    };


    $scope.saveNewType = function (newType) {

        if (newType == null) {
            alert('Please enter the details.');
        }

        if (newType.Name == null) {
            alert('Please enter name.');
            return;
        }

        if (newType.group == null || newType.group.Id == null) {
            alert('Please select a type group');
            return;
        }

        var newTypeData = {

            Id: '-1',
            Name: newType.Name,
            Description: newType.Description,
            Active: 1,//newType.Active,
            TypeGroupId: newType.group.Id,
            listkey: newType.listvalue,
            listvalue: newType.listvalue,
            flag: 'I'
        };

        var req = {
            method: 'POST',
            url: '/api/MasterDataGroups/InSUpDMasterDataTypes',
            data: newTypeData
        }

        $http(req).then(function (response) {
            alert("Saved successfully!");
            $('#Modal-header-new').modal("hide");
            $scope.newType = null;


        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            alert(errmssg);
        });

    };

    $scope.logout = function () {
        $localStorage.userdetails = null;
        $localStorage.uname = null;
        window.location.href = 'Login.html';
    }

    $scope.showDialog = function (message) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                mssg: function () {
                    return message;
                }
            }
        });
    }




    $scope.setTYPES = function (T) {
        $scope.Types1 = T;

        for (i = 0; i < $scope.TypeGroups.length; i++) {
            if ($scope.TypeGroups[i].Id == T.TypeGroupId) {
                $scope.st = $scope.TypeGroups[i];
                break;
            }
        }
    };

    $scope.clearGroup = function () {
        $scope.currGroup = null;

    };
    $scope.showDialog = function (message) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                mssg: function () {
                    return message;
                }
            }
        });
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

    $scope.showDialog = function (message) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                mssg: function () {
                    return message;
                }
            }
        });
    }
});