
// JavaScript source code
// JavaScript source code
// JavaScript source code
var app = angular.module('myapp', ['ngStorage'])



app.directive('onFinishRender', function ($timeout) {

    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});


var ctrl = app.controller('myCtrl', function ($scope, $http, $localStorage) {
    if ($localStorage.uname == null) {
        window.location.href = "login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.Roleid = $scope.userdetails[0].roleid;
    $scope.isAdmin = ($scope.Roleid == 1) ? 1 : 0;


    $scope.isSuperUser = ($scope.Roleid == 2) ? 2 : 0;

    $scope.dashboardDS = $localStorage.dashboardDS;

    $scope.getObjects = function () {
        $http.get('/api/Objects/getObjects?objid=-1').then(function (res, data) {
            $scope.NewObjects = res.data;
        });
    }

    //$scope.GetApplications = function () {
    //    $http.get('/api/objects/GetApplications').then(function (res, data) {
    //        $scope.application = res.data;
    //    });
    //}

    $scope.example1model = [];
    $scope.example1data = [{ id: 1, label: "David" }
        , { id: 2, label: "Jhon" }
        , { id: 3, label: "Danny" }
    ];


    $scope.save = function (NewObject, flag) {

        if (NewObject == null) {
            alert('please enter Name');
            return;
        }
        if (NewObject.Name == null) {
            alert('Please Enter Name');
            return;
        }

        if ($scope.p.Id == null) {
            alert('Please Enter ParentId');
            return;
        }
        if (NewObject.RootObjectId == null) {
            alert('Please Enter RootObjectId');
            return;
        }

        var SelNewObjects = {
            Name: NewObject.Name,
            Description: NewObject.Description,
            ParentId: $scope.p.Id,
            RootObjectId: NewObject.RootObjectId,
            Access: NewObject.Access,
            insupdflag: 'I',
            Active: 1,



        }

        var req = {
            method: 'POST',
            url: '/api/objects/saveObjects',
            data: SelNewObjects
        }
        $http(req).then(function (response) {

            alert("Saved successfully!");
            $scope.getObjects();
            $scope.NewObject = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            alert(errmssg);
        });
        $scope.currRole = null;
    };



    $scope.newChildObject = function (NewObject) {

        if (NewObject == null) {
            alert('Please enter name.');
            return;
        }

        if (NewObject.Name == null) {
            alert('Please enter name.');
            return;
        }

        var SelNewObjects = {


            Id: -1,
            Name: NewObject.Name,
            Description: NewObject.Description,
            ParentId: $scope.mt.Id,
            RootObjectId:NewObject.RootObjectId,
            ApplicationId: $scope.mt.ApplicationId,

            Active: 1,
            insupdflag: 'I'
        };

        var req = {
            method: 'POST',
            url: '/api/Objects/saveObjects',
            data: SelNewObjects
        }

        $http(req).then(function (response) {

            alert("Saved successfully!");
            $('#Modal-header-new').modal("hide");
            $scope.NewObject = null;
            $scope.newType = null;
            $scope.getObjects();

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            alert(errmssg);
        });
        $scope.currRole = null;
    };

    $scope.DelObj = function (ss) {        
        $scope.dlobj = ss;
        
    }

    $scope.remove_node = function (ma) {

       

        var SelNewObjects = {


            Id: ma.Id,
            Name: ma.Name,
            Description: ma.Description,
            ParentId: ma.ParentId,
            RootObjectId: ma.RootObjectId,
            ApplicationId: ma.ApplicationId,

            Active: 1,
            insupdflag: 'D'
        };

        var req = {
            method: 'POST',
            url: '/api/Objects/saveObjects',
            data: SelNewObjects
        }

        $http(req).then(function (response) {
            $('#Modal-header-delete').modal("hide");
            alert("Deleted successfully!");            
            $scope.Group = null;
            $scope.getObjects();

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            alert(errmssg);
        });
    }

    $scope.setCurrRole = function (grp) {
        $scope.currRole = grp;
    };

    $scope.clearCurrRole = function () {
        $scope.currRole = null;

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

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        $("#example2").treetable({
            initialState: 'expanded'
            , expandable: true
            , onNodeCollapse: function () {

                console.log($(this.row));
            }
        }, true);

    });

}

);

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, mssg) {

    $scope.mssg = mssg;
    $scope.ok = function () {
        $uibModalInstance.close('test');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});





