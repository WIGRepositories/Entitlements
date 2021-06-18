var app = angular.module('myApp', ['ngStorage', 'ui.bootstrap'])
var ctrl = app.controller('myCtrl', function ($scope, $http, $localStorage, $uibModal) {

    $scope.RetrivePassword = function () {

        if ($scope.email == null || $scope.email == '') {
            $scope.showDialog("Please enter registered email-id.");
            return
        }

        var vc = {
            Email: $scope.email,
            flag: $scope.usertype
        }
        var req = {
            method: 'POST',
            url: '/api/LOGIN/RetrivePassword',
            data: vc
        }
        $http(req).then(function (res, data) {
            $scope.result = res.data;

            if ($scope.result.length == 0) {
                $scope.showDialog("Invalid email id or email id not registered. Please contact administrator.")
            } else
                //$scope.showDialog("Temporary password has been sent to the registerd email-id:" + $scope.email)
                $scope.inf = res.data;

        }, function () {
            $scope.showDialog("Invalid email id or email id not registered. Please contact administrator.")
        });
    }
    //send the details to db for validation
    $scope.VerifyOtp = function () {

        if ($scope.vcOtp == null) {
            alert("Please enter Otp");
            return;
        }
        var vc = {
            Emailotp: $scope.vcOtp,
            Email: $scope.email,
            flag: $scope.usertype
        }
        var req = {
            method: 'POST',
            url: '/api/LOGIN/RetrivePasswordotp',
            data: vc
        }
        $http(req).then(function (res, data) {
            $scope.otpresult = res.data;
            //alert("your password is")
        }, function (err) {
            alert(err.data.ExceptionMessage);
        });
    }


    $scope.showDialog = function (message) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            backdrop: false,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                mssg: function () {
                    return message;
                }
            }
        });
    }
    $scope.resetpwd = function () {
        if ($scope.newpwd == null || $scope.newpwd == '') {
            alert('Please enter the new Password');
            return;
        }
        if ($scope.newpwd1 == null || $scope.newpwd1 == '') {
            alert('Please Re-enter the new Password');
            return;
        }
        if ($scope.newpwd != $scope.newpwd1) {
            alert('New Password In both the fields do not match');
            return;
        }
        var vc = {
            Password: $scope.newpwd,
            Oldpassword: $scope.otpresult[0].Password,
            flag: $scope.usertype,
            Id: $scope.otpresult[0].Id
        }
        var req = {
            method: 'POST',
            url: '/api/LOGIN/ResetPassword',
            data: vc

        }
        $http(req).then(function (response) {
            alert('Your New password has been updated');
            window.location.href = 'Login.html';

        }, function (err) {
            alert(err.data.ExceptionMessage);
        })
    }
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



