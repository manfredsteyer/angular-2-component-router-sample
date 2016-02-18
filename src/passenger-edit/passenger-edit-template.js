//
// We're using a huge inline-template, cause there is a bug in the current version
// of the Component Router, that prevents using Lifecycle-Hooks when using templateUrl
//
export var passengerEditTemplate = `

<div>
    <div ng-show="passengerEdit.exitWarning.show" class="alert alert-warning">
        <div>
        You didn't save the record. Do you really want to leave?
        </div>
        <div>
            <a href="javascript:void(0)" ng-click="passengerEdit.exitWarning.resolve(true)" class="btn btn-danger">Ja</a>
            <a href="javascript:void(0)" ng-click="passengerEdit.exitWarning.resolve(false)" class="btn btn-default">Nein</a>
            
        </div>
    </div>

    <div ng-show="passengerEdit.message" class="alert alert-warning">
        <div style="float:right">
            <a href="javascript:void(0)" ng-click="passengerEdit.message = ''"><span class="glyphicon glyphicon-remove"></span></a>
        </div>
        <div>{{ passengerEdit.message }}</div>
    </div>

    <h4>Passenger Detail</h4>
    <hr />

    <form name="form">

        <div class="form-group">
            <div>
                <label for="Vorname">First Name</label>
            </div>
            <div>
                <input class="form-control" ng-model="passengerEdit.passenger.vorname" name="Vorname" />
            </div>
        </div>

        <div class="form-group">
            <div>
                <label for="Name">Last Name</label>
            </div>
            <div>
                <input class="form-control" ng-model="passengerEdit.passenger.name" name="Name" />
            </div>
        </div>


            <div class="form-group">
                <div>
                    <label for="Geburtsdatum">Date of Birth</label>
                </div>
                <div>
                    <input class="form-control" ng-model="passengerEdit.passenger.geburtsdatum" name="Geburtsdatum" />

                </div>
            </div>

            <div class="form-group">
                <div>
                    <label for="passengerStatus">Status</label>
                </div>
                <div>
                    <input class="form-control" ng-model="passengerEdit.passenger.passagierStatus" name="passengerStatus" />
                </div>
            </div>

            <div class="form-group">
                <input type="button" class="btn btn-default" ng-click="passengerEdit.save()" value="Speichern" />
            </div>
</form>
</div>

`;