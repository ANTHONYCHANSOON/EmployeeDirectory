import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";
import EmpContext from "../utils/EmpContext";
import { deepStrictEqual } from "assert";

function DataArea() {
  const [developerState, setDeveloperState] = useState({
    users: "",
    order: "decend",
    filteredUsers: [{}],
    headings: [
      { name: "Image", width: "10%" },
      { name: "Name", width: "10%" },
      { name: "Phone", width: "20%" },
      { name: "Email", width: "20%" },
      { name: "DOB", width: "10%" }
    ]
  });

  useEffect(() => {
    API.getUsers().then(results => {

      setDeveloperState({...developerState,users : results.data.results, filteredUsers : results.data.results})

      // this.setState({
      //   users: results.data.results,
      //   filteredUsers: results.data.results
      // });
    });
    //need to put something in the array
  }, [developerState.users]);

  const handleSort = function (heading) {

    if (developerState.order === "descend") {
      setDeveloperState({...developerState, order : "ascend"});
    } else {
      setDeveloperState({...developerState, order : "descend"});
    }

    const compareFnc = (a, b) => {
      if (developerState.order === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return a[heading] - b[heading];
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        } else {
          return b[heading] - a[heading];
        }
      }

    }
    //const sortedUsers = this.state.filteredUsers.sort(compareFnc);
    // this.setState({ filteredUsers: sortedUsers });

    const sortedUsers = developerState.filteredUsers.sort(compareFnc);
    setDeveloperState({...developerState,filteredUsers : sortedUsers});

    const handleSearchChange = function (event) {
      //console.log(event.target.value);
      const filter = event.target.value;

      

      const filteredList = developerState.users.filter(item => {
        // merge data together, then see if user input is anywhere inside
        let values = Object.values(item)
          .join("")
          .toLowerCase();
        return values.indexOf(filter.toLowerCase()) !== -1;
      });
      setDeveloperState({...developerState,filteredUsers : filteredList})
      //this.setState({ filteredUsers: filteredList });
    }
  };


  return (
    <>
      <EmpContext.Provider value={{developerState, handleSort}} >
        <Nav />
        <div className="data-area">
          <DataTable
            
          />
        </div>
      </EmpContext.Provider>
    </>
  );

}

export default DataArea;


// export default class DataArea extends Component {
//   constructor() {
//     super();
//     this.state = {
//       users: [{}],
//       order: "descend",
//       filteredUsers: [{}],
//       headings: [
//         { name: "Image", width: "10%" },
//         { name: "Name", width: "10%" },
//         { name: "Phone", width: "20%" },
//         { name: "Email", width: "20%" },
//         { name: "DOB", width: "10%" }
//       ],

//       handleSort: heading => {

//         if (this.state.order === "descend") {
//           this.setState({
//             order: "ascend"
//           })
//         } else {
//           this.setState({
//             order: "descend"
//           })
//         }

//         const compareFnc = (a, b) => {
//           if (this.state.order === "ascend") {
//             // account for missing values
//             if (a[heading] === undefined) {
//               return 1;
//             } else if (b[heading] === undefined) {
//               return -1;
//             }
//             // numerically
//             else if (heading === "name") {
//               return a[heading].first.localeCompare(b[heading].first);
//             } else {
//               return a[heading] - b[heading];
//             }
//           } else {
//             // account for missing values
//             if (a[heading] === undefined) {
//               return 1;
//             } else if (b[heading] === undefined) {
//               return -1;
//             }
//             // numerically
//             else if (heading === "name") {
//               return b[heading].first.localeCompare(a[heading].first);
//             } else {
//               return b[heading] - a[heading];
//             }
//           }

//         }
//         const sortedUsers = this.state.filteredUsers.sort(compareFnc);
//         this.setState({ filteredUsers: sortedUsers });
//       },
//       handleSearchChange: event => {
//         console.log(event.target.value);
//         const filter = event.target.value;
//         const filteredList = this.state.users.filter(item => {
//           // merge data together, then see if user input is anywhere inside
//           let values = Object.values(item)
//             .join("")
//             .toLowerCase();
//           return values.indexOf(filter.toLowerCase()) !== -1;
//         });
//         this.setState({ filteredUsers: filteredList });
//       }
//     };
//   }

//   componentDidMount() {
//     API.getUsers().then(results => {
//       this.setState({
//         users: results.data.results,
//         filteredUsers: results.data.results
//       });
//     });
//   }

//   render() {
//     return (
//       <>
//         <Nav handleSearchChange={this.state.handleSearchChange} />
//         <div className="data-area">
//           <DataTable
//             headings={this.state.headings}
//             users={this.state.filteredUsers}
//             handleSort={this.state.handleSort}
//           />
//         </div>
//       </>
//     );
//   }
// }
