<template>
  <div id="container">
    <div id="mapContainer"></div>
    <MapModalWindow
      v-if="showModal"
      @close="showModal = false"
      @save="createMarker"
      :coordinates="coordinates"
    />
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "@/assets/map-marker.svg";
import MapModalWindow from "@/components/MapModalWindow.vue";

export default {
  name: "Map",

  components: {
    MapModalWindow,
  },

  data() {
    return {
      map: null,
      showModal: false,
      coordinates: {
        longitude: "",
        altitude: "",
      },
    };
  },
  methods: {
    setupLeafletMap: function () {
      this.map = L.map("mapContainer").setView([49.01, 31.28], 6);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      this.map.on('click', (event)=>{
        this.setMarker(event.originalEvent)
      })
    },

    setMarker(event) {
      var latlng = this.map.mouseEventToLatLng(event);
      this.coordinates.longitude = latlng.lng;
      this.coordinates.altitude = latlng.lat;
      console.log(latlng);
      this.showModal = true;
    },

    createMarker({ title, altitude, longitude }, isNew) {
      const mapMarkerIcon = L.icon({
        iconUrl: markerIcon,

        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      });

      const marker = L.marker([altitude, longitude], { icon: mapMarkerIcon })
        .addTo(this.map)
        .bindTooltip(title);

      marker.on('mouseover', ()=>{
        marker.openTooltip()
      })

      this.showModal = false;

      if (isNew) {
        const markers = JSON.parse(localStorage.getItem("markers"));
        if (!markers || !markers.length)
          return localStorage.setItem(
            "markers",
            JSON.stringify([{ title, altitude, longitude }])
          );
        markers.push({ title, altitude, longitude });
        localStorage.setItem("markers", JSON.stringify(markers));
      }
    },
  },
  mounted() {
    this.setupLeafletMap();
    const markers = JSON.parse(localStorage.getItem("markers"));
    if (!markers || !markers.length) return;

    markers.forEach((marker) => {
      this.createMarker(marker);
    });
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 600px;
}
</style>