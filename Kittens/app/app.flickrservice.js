var app;
(function (app) {
    var services;
    (function (services) {
        var FlickrService = (function () {
            function FlickrService($http, apiKey) {
                this.$http = $http;
                this.apiKey = apiKey;
                this.flickrApiBaseUrl = "https://api.flickr.com/services/rest/?method=";
                this.imageSearchMethod = "flickr.photos.search";
            }
            FlickrService.prototype.getImages = function (searchText) {
                var apiUrl = this.flickrApiBaseUrl +
                    this.imageSearchMethod +
                    "&api_key=" +
                    this.apiKey +
                    "&text=" +
                    searchText +
                    "&format=json&nojsoncallback=?";
                return this.$http.get(apiUrl)
                    .then(function (response) {
                    var images = [];
                    response.data.photos.photo.forEach(function (photo) {
                        images.push({
                            "farm": photo.farm,
                            "id": photo.id,
                            "server": photo.server,
                            "secret": photo.secret,
                            "title": photo.title
                        });
                    });
                    return images;
                });
            };
            FlickrService.$inject = ['$http', 'apiKey'];
            return FlickrService;
        })();
        services.FlickrService = FlickrService;
        angular
            .module('KittensApp')
            .service('app.services.FlickrService', FlickrService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
