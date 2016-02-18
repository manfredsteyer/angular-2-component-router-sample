
export class BookFlightController {

    constructor($http, $log, baseUrl, $rootScope) {
        this.$http = $http;
        this.$log = $log;
        this.baseUrl = baseUrl;
        
        $rootScope.flugBuchen = this;

    }

    clearMessage() {
        this.message = "";
    }

    loadPassagiere() {

        var that = this;

        var params = {};

        if (that.passagierNameFilter) {
            params.name = that.passagierNameFilter;
        } else if (that.passagierNrFilter) {
            params.pNummer = that.passagierNrFilter;
        }
        
        // ?name=Mustermann
        // ?pNummer=1244

        this.$http
            .get(this.baseUrl + "/api/passagier", { params: params })
            .then((result) => {

                that.processPassagiere(result.data);

            }).catch((p) => {

                that.message = "Beim Laden der Daten ist ein Fehler aufgetreten";

                that.$log.error("Fehler beim Laden von Passagieren");
                that.$log.error(p.data);
                that.$log.error(p.status);

            });

    }

    processPassagiere(p) {

        if (angular.isArray(p)) {
            this.passagiere = p;   
        } else {
            this.passagiere = [p];   
        }
    }


    selectPassagier(p) {
        this.selectedPassagier = p;
    }

    loadFluege() {

        var that = this;
        var params = {};

        if (this.flugNrFilter) {
            params.flugNummer = this.flugNrFilter;
        } else if (this.flugVonFilter && this.flugNachFilter) {
            params.abflugOrt = this.flugVonFilter;
            params.zielOrt = this.flugNachFilter;
        }

        this.$http.get(this.baseUrl + "/api/flug", { params: params }).then((result) => {

            var passagiere = result.data;
            that.processFluege(passagiere);

        }).catch((p) => {
                that.message = "Beim Laden der Daten ist ein Fehler aufgetreten";

                that.$log.error("Fehler beim Laden von Flügen");
                that.$log.error(p.data);
                that.$log.error(p.status);
        });
    }

    processFluege(fluege) {

        if (!angular.isArray(fluege)) {
            var flug = fluege;
            this.fluege = new Array(flug);
        }
        else {
            this.fluege = fluege;
        }
    }

    selectFlug(flug) {
        this.selectedFlug = flug;
    }

    buchen() {

        var that = this;

        if (!this.selectedFlug || !this.selectedPassagier) {
            this.message = "Bitte wählen Sie einen Flug und einen Passagier aus!";
            return;
        }

        var buchung = {
            FlugID: that.selectedFlug.id,
            PassagierID: that.selectedPassagier.id
        };

        that.$http.post(this.baseUrl + "/api/buchung", buchung).then((result) => {
            that.message = "Gebucht!";
        }).catch((reason) => {
                that.message = "Der Flug konnte nicht gebucht werden: " + reason;
        });

    }

    processBuchungen(fluege) {
        this.buchungen = fluege;
    }

}
