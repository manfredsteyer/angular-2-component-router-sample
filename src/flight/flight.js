
export class FlightController {

    constructor($http, $log, baseUrl, $rootScope) {
        this.$http = $http;
        this.$log = $log;
        this.baseUrl = baseUrl;
        
        $rootScope.flugBuchen = this;

    }

    clearMessage() {
        this.message = "";
    }

    load() {

        var that = this;
        var params = {};

        if (this.flightNoFilter) {
            params.flugNummer = this.flightNoFilter;
        } else if (this.flightFromFilter && this.flightToFilter) {
            params.abflugOrt = this.flightFromFilter;
            params.zielOrt = this.flightToFilter;
        }

        this.$http.get(this.baseUrl + "/api/flug", { params: params }).then((result) => {

            var flights = result.data;
            that.process(flights);

        }).catch((p) => {
                that.message = "Error loading data";

                that.$log.error(that.message);
                that.$log.error(p.data);
                that.$log.error(p.status);
        });
    }

    process(flights) {

        if (!angular.isArray(flights)) {
            var f = flights;
            this.flights = new Array(f);
        }
        else {
            this.flights = flights;
        }
    }

    select(flug) {
        this.selectedFlight = flug;
    }


}
