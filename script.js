const editButton = document.getElementById("edit-button");
        const form = document.querySelector("#my-form");
    
        form.style.display = "inline";
    
        editButton.addEventListener("click", () => {
            event.stopPropagation();
            form.style.top = form.style.top == "50%" ? "200%" : "50%"
        });
    
        form.addEventListener("submit", handleSubmit);
    
        function handleSubmit(event) {
            event.preventDefault();
            const access = document.querySelector('#access').value;
            const space = document.querySelector('#space').value;
            const food = document.querySelector('#food').value;
            const comments = document.querySelector('#comments').value;
    
            console.log('Access:', access);
            console.log('Space:', space);
            console.log('Food:', food);
            console.log('Comments:', comments);
        }

        

        function initMap() {
            // map options
            var center = new google.maps.LatLng(41.87225, -87.64927);
            var width = 0.1; // Degrees of longitude
            var height = 0.05; // Degrees of latitude
            var sw = new google.maps.LatLng(center.lat() - (height / 2), center.lng() - (width / 2));
            var ne = new google.maps.LatLng(center.lat() + (height / 2), center.lng() + (width / 2));
        
            // Define the bounds of the rectangular region
            var bounds = new google.maps.LatLngBounds(sw, ne);
            var options = {
                zoom: 17,
                gestureHandling: "greedy",
                center: {lat: 41.87225, lng: -87.64927},
                maxZoom: 19,
                minZoom: 17,
                restriction: {
                    latLngBounds: bounds,
                     strictBounds: true
                }
            };
            
            // new map
            var map = new google.maps.Map(document.getElementById('map'), options);
        
            // listen for click on map
            google.maps.event.addListener(map, 'click', function(event){
                // add marker
                addMarker({coords: event.latLng});
            });
        
            // array of markers
            var markers = [
                { 
                    coords: {lat: 41.87192, lng: -87.64925},
                    content: '<h1> Uic Quad </h1>',
                    location_name: "Uic Quad"
                },
        
                { 
                    coords: {lat: 41.87268, lng: -87.64631},
                    content: '<h1> Uic Rec </h1>',
                    location_name: "Uic rec"
                }
            ];
        
            // loop through markers
            for(var i = 0; i < markers.length; i++){
                // add marker
                addMarker(markers[i]);
            }
        
           //add marker function
           function addMarker(props){
                var marker = new google.maps.Marker({
                    position: props.coords,
                    map: map
                });
        
                //check content 
                if(props.content){
                    var infoWindow = new google.maps.InfoWindow({
                        content: props.content
                    });
        
                    marker.addListener('click', function(){
                        infoWindow.open(map, marker);
                    });
                }
           }
        }