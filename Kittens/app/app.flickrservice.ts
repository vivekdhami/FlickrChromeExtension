module app.services {

    export interface IFlickr {
        farm: number;
        id: string;
        server: string;
        secret: string;
        title: string;
    }

    interface IFlickrResponse {
        photos: IFlickrImages;
    }

    interface IFlickrImages {
        photo: IFlickr[];
    }

    interface IFlickrService {
        getImages(searchText: string): void;
    }

    export class FlickrService implements IFlickrService {

        flickrApiBaseUrl: string = "https://api.flickr.com/services/rest/?method=";
        imageSearchMethod: string = "flickr.photos.search";

        static $inject = ['$http', 'apiKey'];
        constructor(private $http: ng.IHttpService, private apiKey: string) {
        }

        getImages(searchText: string): ng.IPromise<IFlickr[]> {
            var apiUrl: string = this.flickrApiBaseUrl +
                this.imageSearchMethod +
                "&api_key=" +
                this.apiKey +
                "&text=" +
                searchText +
                "&format=json&nojsoncallback=?";

            return this.$http.get(apiUrl)
                .then((response: ng.IHttpPromiseCallbackArg<IFlickrResponse>): IFlickr[]=> {

                    var images: IFlickr[] = [];
                    response.data.photos.photo.forEach((photo): void => {
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
        }
    }

    angular
        .module('KittensApp')
        .service('app.services.FlickrService', FlickrService);
}