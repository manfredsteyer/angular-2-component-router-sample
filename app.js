import angular from 'angular';
import 'node_modules/ngcomponentrouter/angular_1_router';
import { HomeController } from 'home/home';
import { BookFlightController } from 'book-flight/book-flight';
import { PassengerController } from 'passenger/passenger';
import { FlightController } from 'flight/flight';
import { BookingController } from 'booking/booking';
import { PassengerEditController } from 'passenger-edit/passenger-edit';
import { passengerEditTemplate } from 'passenger-edit/passenger-edit-template';

var app = angular.module('app', ['ngComponentRouter']);

app.component('home',  { 
    controller: HomeController,
    controllerAs: 'vm',
    templateUrl: 'components/home/home.html'
});

app.component('bookFlight',  { 
    controller: BookFlightController,
    controllerAs: 'bookFlight',
    templateUrl: 'components/book-flight/book-flight.html',
    $routeConfig: [
        { path: '/', component: 'passenger', name: 'Passenger' },
        { path: '/flight', component: 'flight', name: 'Flight', useAsDefault: true },
        { path: '/booking', component: 'booking', name: 'Booking' },
        { path: '/passenger/:id', component: 'passengerEdit', name: 'PassengerEdit' }
    ]
}); 


app.component('passenger',  { 
    controller: PassengerController,
    controllerAs: 'passenger',
    templateUrl: 'components/passenger/passenger.html'    
});

app.component('flight', { 
    controller: FlightController,
    controllerAs: 'flight',
    templateUrl: 'components/flight/flight.html'    
});

app.component('booking', { 
    controller: BookingController,
    controllerAs: 'booking',
    templateUrl: 'components/booking/booking.html'    
});

app.component('passengerEdit', { 
    controller: PassengerEditController,
    controllerAs: 'passengerEdit',
    //templateUrl: 'components/passenger-edit/passenger-edit.html',
    template: passengerEditTemplate,
    $canActivate: () => {
        console.debug("$canActivate");
        return true;
    }
});


// Alternative for Root-Component
/*
class AppController {
    constructor($router) {
        $router.config([
          { path: '/', component: 'home', name: 'Home', useAsDefault: true },
          { path: '/bookFlight/...', component: 'bookFlight', name: 'BookFlight' }
        ]);
    }
}

app.component('app', { 
    controller: AppController,
    controllerAs: 'app',
    templateUrl: "app.html"
});
*/

class AppController {
   
}

app.component('app', { 
    controller: AppController,
    controllerAs: 'app',
    templateUrl: "app.html",
    $routeConfig: [
        { path: '/', component: 'home', name: 'Home', useAsDefault: true },
        { path: '/bookFlight/...', component: 'bookFlight', name: 'BookFlight' }
    ]
});

app.value('$routerRootComponent', 'app');


app.controller('AppController', AppController);

app.constant("baseUrl", "http://www.angular.at");

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});