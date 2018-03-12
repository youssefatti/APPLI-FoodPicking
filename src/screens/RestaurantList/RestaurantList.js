// //navigator.geolocation.requestAuthorization();
// var options = {
//   enableHighAccuracy: false,
//   timeout: 10000,
//   maximumAge: 0
// };

// function success(pos) {
//   console.log("pos : ", pos);
//   var crd = pos.coords;

//   console.log("Your current position is:");
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
//   console.log("watchID : ", watchID);
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// let watchID = navigator.geolocation.watchPosition(success, error, options);
// navigator.geolocation.clearWatch(watchID);

// let geohash = "u09tvw47nhxp";

// axios
//   .get(
//     `https://consumer-ow-api.deliveroo.com/orderapp/v2/restaurants?geohash=${geohash}`
//   )
//   .then(response => {
//     //Une fois que l'on récupère la géoloc, on fait appel à la fonction convert coordonate to geohash
//     // let geo = getGeoHash(48.85674155317247, 2.3544311709702015);
//     // console.log(geo);
//     const data = response.data;
//     //console.log(data);
//     //const element = [];
//     // for (let i = 1; i < 30; i++) {
//     //   element.push({
//     //     id: data[i].id,
//     //     web: data[i].links.web
//     //   });
//     //   //console.log(data[i]);
//     // }

//     // data.self = data;
//     // var json = JSON.parse(JSON.stringify(data));

//     console.log(response);
//     //let json = CircularJSON.stringify(response);
//     res.send(data);
//     //console.log(element);
//     //res.json(JSON.stringify(response));
//     //res.send(CircularJSON.parse(json));
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

// //navigator.geolocation.getCurrentPosition(success, error, options);
