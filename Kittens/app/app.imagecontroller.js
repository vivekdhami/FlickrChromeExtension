var app;
(function (app) {
    var controllers;
    (function (controllers) {
        'use strict';
        var KittensController = (function () {
            function KittensController(flickrService) {
                this.flickrService = flickrService;
                this.text = "kittens";
                this.searchImage();
            }
            KittensController.prototype.constructImgUrl = function (image) {
                return "http://farm" + image.farm +
                    ".static.flickr.com/" + image.server +
                    "/" + image.id +
                    "_" + image.secret +
                    "_s.jpg";
            };
            KittensController.prototype.searchImage = function () {
                var vm = this;
                vm.images = [];
                this.flickrService
                    .getImages(vm.text)
                    .then(function (responseData) {
                    responseData.forEach(function (img) {
                        vm.images.push({
                            "imageUrl": vm.constructImgUrl(img),
                            "text": img.title
                        });
                    });
                });
            };
            KittensController.$inject = ['app.services.FlickrService'];
            return KittensController;
        })();
        angular
            .module('KittensApp')
            .controller('app.controllers.ImageController', KittensController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
;
