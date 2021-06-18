var myApp = angular.module("myApp", ['ngStorage']);


myApp.controller("myCtrl", function ($scope, $http, $localStorage) {
    if ($localStorage.uname == null) {
        window.location.href = "login.html";
    }
    $scope.uname = $localStorage.uname;
    $scope.userdetails = $localStorage.userdetails;
    //$scope.Roleid = $scope.userdetails[0].roleid;


    $scope.GetRoles = function () {
        $http.get("/api/Roles/GetRoles?allroles=-1").then(function (res, data) {
            $scope.roles = res.data;
            
        }
            , function (err) {
                alert(err)
            })
    }  
   
    //--------------------------------------------------------------------------------------------------------------------
    $scope.SaveRole = function (newrole) {

        if (newrole == null) {
            alert('please enter details');

        }

        if (newrole.Name == null) {
            alert('Please enter role name.');
            return;
        }
        if (newrole.Description == null) {
            alert('Please enter role name.');
            return;
        }


        var selRole = {
            flag: "I",
            Name: newrole.Name,
            Description: newrole.Description,
            Active: newrole.Active,
            IsPublic: newrole.IsPublic
        }

        var postreq = {
            method: 'POST',
            url: '/api/Roles/InsUpDelroles',
            data: selRole
        }
        $http(postreq).then(function (response) {
            alert('Successfully Roles created...');
            $('#Modal-header-new').modal("hide");
            $scope.newrole = null;
            $scope.GetRoles();



        }, function (err) {
            alert('err');
        });


    };
    //--------------------------------------------------------------------------------------
    $scope.Update = function (editRole) {

        if (editRole == null) {
            alert('please enter details');

        }

        if (editRole.Name == null) {
            alert('Please enter role name.');
            return;
        }
        if (editRole.Description == null) {
            alert('Please enter role name.');
            return;
        }


        var editingroles = {
            flag: "U",
            Id: editRole.Id,
            Name: editRole.Name,
            Description: editRole.Description,
            Active: editRole.Active,
            IsPublic: editRole.IsPublic
        }

        var postreq = {
            url: '/api/Roles/InsUpDelroles',
            data: editingroles,
            method: 'POST'
        }

        $http(postreq).then(function (response) {
            alert('success');
            $('#Modal-header-primary').modal("hide");
            $scope.GetRoles();
            // $scope.updaterole = null;

        }, function (err) {
            alert('err');

        }
        );



    }

    //---------------------------------------------------------------------------
    $scope.SetData = function (grp) {
        $scope.editRole = grp;
    };

    $scope.logout = function () {
        $localStorage.userdetails = null;
        $localStorage.uname = null;
        window.location.href = 'Login.html';
    }

});
