import React from "react";
import Info from "./pages/Weather/info";
import Form from "./pages/Weather/form"
import Weather from "./pages/Weather/weather";
import { useTable } from "react-table"
import "./table.css"

const API_KEY = "da3d0c0d217ce6c14461ac59eaaa39fd";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const COLUMNS = [
  {
    Header: "День та час",
    accessor: "date"
  },
  {
    Header: "Вологість у відсотках",
    accessor: "humudity"
  },
  {
    Header: "Температура у °C",
    accessor: "temp"
  },
  {
    Header: "Направлення вітру у градусах",
    accessor: "wind_degre"
  },
  {
    Header: "Сила вітру (м/с)",
    accessor: "wind_speed"
  }

]

export const BasicTable = (props) => {
  const columns = COLUMNS
  const data = props.data

  const tableInst = useTable({
    columns,
    data,
  })
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInst
  return(
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map( column => (
                <th{...column.getHeaderProps()}>{column.render('Header')}</th>
                ))
              }

            </tr>
          ))
        }

      </thead>
      <tbody {...getTableBodyProps()}>
        {
          rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>

                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}

              </tr>
            )
          })
        }

      </tbody>
    </table>
  )
}

class App extends React.Component{
  constructor() {
      super();
      this.state = {
        disabled : false
      };
      this.array3 = []
  }

  state = {
    city: undefined,
    country: undefined,
    error: undefined
  }



  gettingWeather = async (eve) =>{
    eve.preventDefault();


    if (this.state.disabled) {
        return;
    }else{
      const city = eve.target.elements.city.value;
      console.log("Click");
      this.setState({disabled: true});

      await sleep(1000);

      if(city){
        const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`).then(res => res.json())
        console.log(data)
        console.log(data.hasOwnProperty('message'))
        if (data.cod == '200'){

          const array = await data.list;

          console.log(array)

          const array2 = array.map(function(item){
             return {
                date:item.dt_txt,temp:item.main.temp,wind_degre:item.wind.deg,wind_speed:item.wind.speed, humudity:item.main.humidity
             }
          })

          console.log(array2)

          this.array3 = array2.filter((item)=> {
            if (item.date.includes("9:00:00")) {
              return item
            }
          })

          console.log(this.array3)

          this.setState({
            city:  data.city.name,
            country: data.city.country,
            error:   undefined
          });
        }else{
          this.array3 = []
          this.setState({
              city: undefined,
              country: undefined,
              error:  data.message
            });
        }



      }else{
        this.array3 = []
          this.setState({
            city:  undefined,
            country: undefined,
            error:  "Введіть місто у поле вводу"
          });
      }
      this.setState({disabled: false});
    }



  }
 const
  render(){
    return (
      <div className="wrapper">
        <Info />

        <Form
          getingMethod={this.gettingWeather}
          dis={this.state.disabled}
        />

        <Weather
          city={this.state.city}
          country={this.state.country}
          error={this.state.error}
        />
        <BasicTable data={this.array3}/>
      </div>
    );
  }
}

export default App;
