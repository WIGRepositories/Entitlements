// JavaScript source code
var myapp1 = angular.module('myapp', ['ngStorage', 'ui.bootstrap'])
var mycrtl1 = myapp1.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal) {
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

        $http.get('/api/MasterDataGroups/GetMasterDataGroupspaging?curpage=' + curpage + '&maxrows=' + selecting).then(function (res, data) {
            $scope.TypeGroups = res.data.Table;
            $scope.paggin = res.data.Table1;
            
            if ($scope.TypeGroups.length < selecting) {
                $scope.secondvalue = $scope.secondvalue - (selecting - $scope.TypeGroups.length);

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


    //------------------------------



    $scope.save = function (currGroup) {

        if (currGroup == null || currGroup == "") {
            alert('Please enter full details.');
            return;
        }

        if (currGroup.Name == null || currGroup.Name == "") {
            alert('Please enter name.');
            return;
        }

        var SelTypeGroup = {
            Name: currGroup.Name,
            Description: currGroup.Description,
            Active: currGroup.Active,
            Id: currGroup.Id,
            flag: 'U'
        };

        var req = {
            method: 'POST',
            url: '/api/MasterDataGroups/InsUpDelMasterDataGroups',
            data: SelTypeGroup
        }
        $http(req).then(function (response) {
            alert("Saved successfully!");
            $('#Modal-header-primary').modal("hide");
            $scope.currGroup = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "TypeGroup is Not Saved";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            alert(errmssg);
        });


    };


    $scope.saveNew = function (TypeGroup) {

        if (TypeGroup == null || TypeGroup == "") {
            alert('Please enter details.');

        }

        if (TypeGroup.Name == null || TypeGroup.Name == "") {
            alert('Please enter name.');
            return;
        }

        var SelTypeGroup = {
            Name: TypeGroup.Name,
            Description: TypeGroup.Description,
            Active: TypeGroup.Active,
            Id: -1,
            flag: 'I'
        };

        var req = {
            method: 'POST',
            url: '/api/MasterDataGroups/InsUpDelMasterDataGroups',
            data: SelTypeGroup

        }
        $http(req).then(function (response) {
            alert("Saved successfully!");
            $('#Modal-header-new').modal("hide");
            $scope.TypeGroup = null;



        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "Your details are incorrect";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            alert(errmssg);
        });
        $scope.currGroup = null;
    };


    $scope.setTypeGroup = function (grp) {
        $scope.currGroup = grp;
    };

    $scope.cleardatagroups = function () {
        $scope.TypeGroup = null;
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




