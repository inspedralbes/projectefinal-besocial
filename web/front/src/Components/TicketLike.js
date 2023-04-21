import "../Pages/css/style.css";
import 'leaflet/dist/leaflet.css';

export default function Ticket({ like }) {
  return (
    <div className="w-[270px] h-[260px] rounded-b-lg rounded-t-[50px] bg-white mx-auto">
      <img src={like.photo} className="rounded-t-lg" style={{ width: "300px", height: "160px"}}>
      </img>
      <div className="textTicket">
        <button>Edit</button>
        <p className="titleTicket">{like.name}</p>
        <p>{like.date.split("-")[0]}/{like.date.split("-")[1]}/{like.date.split("-")[2]} - {like.organizerName}</p>
      </div>
    </div>
  )
}
