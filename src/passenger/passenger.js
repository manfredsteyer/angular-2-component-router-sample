
export class PassengerController {

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

        if (that.nameFilter) {
            params.name = that.nameFilter;
        } else if (that.numberFilter) {
            params.pNummer = that.numberFilter;
        }
        
        // ?name=Mustermann
        // ?pNummer=1244

        this.$http
            .get(this.baseUrl + "/api/passagier", { params: params })
            .then((result) => {

                that.process(result.data);

            }).catch((p) => {

                that.message = "Beim Laden der Daten ist ein Fehler aufgetreten";

                that.$log.error("Fehler beim Laden von passengersn");
                that.$log.error(p.data);
                that.$log.error(p.status);

            });

    }

    process(p) {

        if (angular.isArray(p)) {
            this.passengers = p;   
        } else {
            this.passengers = [p];   
        }
    }


    select(p) {
        this.selectedPassenger = p;
    }

   
}
