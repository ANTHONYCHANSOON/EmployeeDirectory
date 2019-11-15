import React, { useContext } from "react";
import DataBody from "./DataBody";
import "../styles/DataTable.css";
import EmpContext from "../utils/EmpContext";

function DataTable() {

  const {developerState} = useContext(EmpContext);
  //console.log("datatable", developerState);
  return (
    // <div>
    //   <h1>hello</h1>
    // </div>
    <div className="datatable mt-5">
      <table
        id="table"
        className="table table-striped table-hover table-condensed"
      >
        <thead>
          <tr>
            {developerState.headings.map(({ name, width }) => {
              return (
                <th
                  className="col"
                  key={name}
                  style={{width}}
                  onClick={() => {
                    developerState.handleSort(name.toLowerCase());
                  }}
                >
                  {name}
                  <span className="pointer"></span>
                </th>
              );
            })}
          </tr>
        </thead>

        <DataBody />
      </table>
    </div>
  );
}

export default DataTable;
