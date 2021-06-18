var app = angular.module('myApp', ['ngStorage'])

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

var ctrl = app.controller('myCtrl', function ($scope, $http, $localStorage, $filter) {
    if ($localStorage.uname == null) {
        window.location.href = "login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    $scope.Roleid = $scope.userdetails[0].roleid;

    $scope.dashboardDS = $localStorage.dashboardDS;

    $scope.checkedArr = new Array();
    $scope.uncheckedArr = new Array();

    $scope.GetRoles = function () {
        $http.get('/api/Roles/GetRoles?allroles=-1').then(function (response, data) {
            $scope.roles = response.data;
           // $scope.r = $scope.roles[0];
            $scope.GetAccessTypes();
            $scope.getRoleDetails();
        });
    }

    $scope.example1model = [];
    $scope.example1data = [{ id: 1, label: "View" }, { id: 2, label: "Edit" }, { id: 3, label: "Delete" }, , { id: 4, label: "Create" }];
    $scope.example13settings = {
        smartButtonMaxItems: 5, smartButtonTextConverter: function (itemText, originalItem) {
            if (itemText === 'Jhon') { return 'Jhonny!'; } return itemText;
        }
    };


    $scope.GetApplications = function () {
        $http.get('/api/Objects/GetApplications').then(function (res, data) {
            $scope.application = res.data;
            //$scope.aa = $scope.application[0];
        });
    }

    $scope.GetAccessTypes = function () {
        $http.get('/api/MasterDataGroups/GetDataTypesByGroupId?grpid=36').then(function (res, data) {
            $scope.acesstype = res.data;
        });
    }    

    $scope.getRoleDetails = function (r) {
        var cmpId = ($scope.r == null) ? -1 : $scope.r.Id;
        var aid = ($scope.aa == null) ? -1 : $scope.aa.Id;
        $http.get('/api/Roles/GetRoleDetails?roleId=' + cmpId+'&appid='+aid).then(function (res, data) {
            $scope.roleobjects = res.data.Table;
           // $scope.roleobjts = res.data.Table1;

            //for (var i = 0; i < $scope.application.length; i++) {
            //    if ($scope.application[i].Id == $scope.roleobjts[0].ApplicationId) {
            //        $scope.aa = $scope.application[i];
            //        break;
            //    }
            //}

            //for (var i = 0; i < $scope.roles.length; i++) {
            //    if ($scope.roles[i].Id == $scope.roleobjects.RoleId) {
            //        $scope.r = $scope.roles[i];
            //        break;
            //    }
            //}

            //for (var i = 0; i < $scope.acesstype.length; i++) {
            //    if ($scope.acesstype[i].Id == $scope.roleobjects.TypeId) {
            //        $scope.at = $scope.acesstype[i];
            //        break;
            //    }
            //}
            //$scope.checkedArr = $filter('filter')($scope.roleobjects, { IsMandatory: "1" });
            //$scope.uncheckedArr = $filter('filter')($scope.roleobjects, { IsMandatory: "0" });

            
        });
    }

    $scope.save = function (Roledetails) {
        alert("ok");
        var Roledetails = {
            ObjectName: Roledetails.ObjectName,
            Path: Roledetails.Path,


        }

        var req = {
            method: 'POST',
            url: '/api/Roledetails/saveroledetails',
            data: Roledetails
        }
        $http(req).then(function (response) {

            //$scope.showDialog("Saved successfully!");

            $scope.Group = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            $scope.showDialog(errmssg);
        });
        $scope.currGroup = null;
    };

    $scope.roleobj = [];
    $scope.checkedArr = new Array();

    $scope.SelectedTypes = function (a,ss) {
       
        var seltype = [];        
        seltype.push(a);
        //var seltype1 = [];        
        //seltype1.push(ss);

        if ($scope.aa == null) {
            seltype = [];
            $scope.at = null;
            alert("Please Select Application");
            return;
        }
        if ($scope.r == null) {
            seltype = [];
            $scope.at = null;
            alert("Please Select Role");
            return;
        }
        

        for (var cnt = 0; cnt < seltype.length; cnt++) {
            
                var fr = {
                    flag: (seltype[cnt].Id == null) ? 'I' : 'U',
                    Id: (seltype[cnt].Id == null) ? -1 : seltype[cnt].Id,
                    RoleId: $scope.r.Id,
                    objectId: seltype[cnt].ObjId,
                    TypeId: ss.Id,
                    ApplicationId: $scope.aa.Id

                }
                $scope.roleobj.push(fr);
            
            //else {
            //    var fr = {
            //        flag: 'U',
            //        Id: seltype[cnt].Id,
            //        RoleId: $scope.r.Id,
            //        objectId: seltype[cnt].ObjId,
            //        TypeId: ss[0].Id,
            //        ApplicationId: $scope.aa.Id

            //    }
            //    $scope.roleobj.push(fr);
            //}
        }
       
    }

    $scope.SaveObjects = function () {       

        if ($scope.roleobj == null) {          
            alert("Please Select Details");
            return;
        }       

        var req = {
            method: 'POST',
            url: '/api/Objects/SaveRoleObjects',
            data: $scope.roleobj,
        }
        $http(req).then(function (response) {

            alert("Saved successfully!");

            $scope.Group = null;

        }, function (errres) {
            var errdata = errres.data;
            var errmssg = "";
            errmssg = (errdata && errdata.ExceptionMessage) ? errdata.ExceptionMessage : errdata.Message;
            alert(errmssg);
        });
    }   

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
        $(".js-example-basic-multiple").select2({});
    });


});
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, mssg) {

    $scope.mssg = mssg;
    $scope.ok = function () {
        $uibModalInstance.close('test');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});






