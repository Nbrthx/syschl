import React from "react"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const Tugas = () => {
  const user = cookies.get("user")
  if(user == null){
    window.location.href = "/login"
    return null
  }

  const urls = new URLSearchParams(window.location.search)
  const tid = urls.get("id")
  
  const [tugs, setTugs] = React.useState({})
  const [pilgan, setPilgan] = React.useState([])

  const handleSoal = (e) => {
    var newpilgan = pilgan
    newpilgan[e.target.name] = e.target.value
    setPilgan(newpilgan)
  }
  
  var all_soal = []
  const soal = () => {
    if(tugs.soal)
      for(var i = 0; i < tugs.soal.length; i++){
        setPilgan(pilgan.concat("_"))

        all_soal.push(
          <>
            <label className="soal">{tugs.soal[i][0]}</label><br />
            <input type="radio" name={i} value="a" checked={pilgan[i] === "a"} onChange={handleSoal} /><br />
            <input type="radio" name={i} value="b" checked={pilgan[i] === "b"} onChange={handleSoal} /><br />
            <input type="radio" name={i} value="c" checked={pilgan[i] === "c"} onChange={handleSoal} /><br />
            <input type="radio" name={i} value="d" checked={pilgan[i] === "d"} onChange={handleSoal} /><br />
            <br />
          </>
        )
      }
  }
  
  React.useEffect(() => {
    fetch("/api?for=tugas&&id="+tid)
    .then(res => res.json())
    .then(data => { if(data) setTugs(data) })
  }, [])

  return (
    <div className="tugas">
      <div class="card">
        <h1>{tugs.name}</h1>
        {all_soal}
      </div>
    </div>
  )
}

export default Tugas
