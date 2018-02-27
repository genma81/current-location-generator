const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCoordinates)
  } else {
    return
  }

  let position = {}

  let ddtodms = (dd) => {
    var d = parseInt(dd)
    var m = parseInt((dd - d) * 60)
    var s = (dd - d - m / 60) * 3600

    return d.toString() + '°' + m.toString() + '\'' + s.toFixed(3) + '\"'
  }

  function getCoordinates(res) {
    new Promise(resolve => {
      resolve(res)
    })
      .then(res => {
        position.latitude = res.coords.latitude
        position.longitude = res.coords.longitude
      })
      .then(() => {
        let templat = ddtodms(position.latitude)
        let templon = ddtodms(position.longitude)

        if (templat.substr(0, 1) === '-') {
          position.latitudedms = templat + 'S'
        } else {
          position.latitudedms = templat + 'N'
        }

        if (templon.substr(0, 1) === '-') {
          position.longitudedms = templon + 'S'
        } else {
          position.longitudedms = templon + 'N'
        }

        return position
      })
      .then(res => {
        let url = 'https://www.google.com.my/maps/place/' + position.latitudedms + '+' + position.longitudedms + '/@' + position.latitude + ',' + position.longitude + ',17z/data=!3m1!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d' + position.latitude + '!4d' + position.longitude
        window.alert(url)
        console.log(url)
      })
  }
}
