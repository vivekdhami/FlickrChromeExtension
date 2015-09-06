module app.controllers {

    'use strict';

    interface IImageScope {
        images: IImage[];
        text: string;
        constructImgUrl(kitten: app.services.IFlickr): string;
        searchImage(text: string): void;
    }

    interface IImage {
        imageUrl: string;
        text: string;
    }

    class KittensController implements IImageScope {
        images: IImage[];
        text: string;

        static $inject = ['app.services.FlickrService'];
        constructor(private flickrService: app.services.FlickrService) {
            this.text = "kittens";
            this.searchImage();
        }

        constructImgUrl(image: app.services.IFlickr): string {
            return "http://farm" + image.farm +
                ".static.flickr.com/" + image.server +
                "/" + image.id +
                "_" + image.secret +
                "_s.jpg";
        }

        searchImage(): void {
            var vm = this;
            vm.images = [];

            this.flickrService
                .getImages(vm.text)
                .then((responseData: app.services.IFlickr[]): void => {
                    responseData.forEach(function (img) {
                        vm.images.push({
                            "imageUrl": vm.constructImgUrl(img),
                            "text": img.title
                        });
                    });

                });
        }
    }

    angular
        .module('KittensApp')
        .controller('app.controllers.ImageController',
            KittensController);
};