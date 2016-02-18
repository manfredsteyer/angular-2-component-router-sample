export class PassengerEditController {
 
    constructor($http, $log, baseUrl, $window, $q, $scope) {
        this.$http = $http;
        this.$log = $log;
        this.$window = $window;
        this.baseUrl = baseUrl;
        this.$q = $q;
        this.$scope = $scope;
        
        this.exitWarning = {
            show: false  
        }
        
        
    }


    $routerOnActivate(next) {
        this.load(next.params.id);
        this.$log.info("$routerOnActivate");    
    } 

  
    
    $routerCanDeactivate() {

        this.$log.info("canDeactivate");    
        
        if (!this.$scope.form.$dirty) return true;
        
        return this.$q((resolve, reject) => { 
            this.exitWarning = {
                show: true,
                reject: reject,
                resolve: resolve
            }
        }).then((result) => { 
            this.exitWarning.show = false;
            return result; 
        });
        
    }
    
    $routerOnDeactivate() {
        this.$log.info("deactivate");   
        return true;
    }
    
    load(id) {
        var that = this;

        var params = {};
        params.pNummer = id;

        this.$http
            .get(that.baseUrl + "/api/passagier", { params: params })
            .then((result) => {

                that.passenger = result.data;

            }).catch((p) => {
            
                that.message = "Error loading data";
                that.$log.error(that.message);
                that.$log.error(p.data.message);
                that.$log.error(p.data.status);
            
            });
    }

    save() {
        var that = this;

        this
            .$http
            .post(that.baseUrl + "/api/passenger", this.passenger)
            .then((result) => {
                that.message = "passenger wurde gespeichert!";
                that.$scope.form.$setDirty(false);
            })
            .catch((p) => {
                that.message = "Beim Speichern der Daten ist ein Fehler aufgetreten: "  + p.data;

                that.$log.error("Fehler beim Speichern von passengeren: ");
                that.$log.error(p.data);
                that.$log.error(p.status);

            });

    }

    clearMessage() {
        this.message = null;
    }

}