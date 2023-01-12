import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const getData =  (params) => {
    axios({
      method: "GET",
      url: "http://localhost:8080/data",
      params:{...params}
   
    }).then((res)=>setData(res.data)).catch((err)=>console.log(err))
  };

  useEffect(() => {
    let params = {brand:filterValue}
    if(data?.length ==0 || filterValue.length==0 ) {
      getData();
    }else if(filterValue.length>0){

      getData(params)
    }
    
  }, [data?.length,filterValue]);

  const handleImage=(id)=>{
    console.log("It is id",id)
  }

  return (
    <div className="App">
      {/* filters */}
      <div>
        <select onChange={(e) => setFilterValue(e.target.value)}>
          <option value="">select Brand</option>
          <option value="Apple">Apple</option>
          <option value="OPPO">OPPO</option>
          <option value="Samsung">Samsung</option>
          <option value="Huawei">Huawei</option>
        </select>
      </div>
      <br />
      {/* Data */}
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>product name</th>
            <th>description</th>
            <th>brand</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((elem) => (
    
              <tr key={elem.id}>
                <td>{elem.id}</td>
                <td>{elem.title}</td>
                <td>{elem.description}</td>
                <td className={elem.brand==="Apple" ?  "Apple" : elem.brand=="OPPO"?"OPPO": elem.brand=="Samsung"?"Samsung" : "Huawei" }>{elem.brand}</td>
                <td>{elem.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
