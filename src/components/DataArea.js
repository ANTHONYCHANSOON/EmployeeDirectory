import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";
import EmpContext from "../utils/EmpContext";
//import { deepStrictEqual } from "assert";

function DataArea() {

  const [developerState, setDeveloperState] = useState({
    users: [{}],
    order: "descend",
    filteredUsers: [{}],
    headings: [
      { name: "Image", width: "10%" },
      { name: "Name", width: "10%" },
      { name: "Phone", width: "20%" },
      { name: "Email", width: "20%" },
      { name: "DOB", width: "10%" }
    ]
  });


  const handleSort = heading => {

    // console.log(developerState.order)
    // console.log(heading);


    console.log(developerState.order);
    const newState = { ...developerState };
    if (newState.order === "descend") {
      newState.order = "ascend";
    } else {
      newState.order = "descend";
    }

    const compareFnc = (a, b) => {
      if (developerState.order === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        } else if (heading === "dob") {
          return a[heading].age < b[heading].age ? 1 : -1;
        } else if (heading === "email") {
          return a[heading].charAt(0).localeCompare(b[heading].charAt(0));
        } else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else if (heading === "phone") {
          return b[heading].replace(/\D/g, "") < a[heading].replace(/\D/g, "")
            ? 1
            : -1;
        } else {
          return a[heading] - b[heading];
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        } else if (heading === "dob") {
          return a[heading].age > b[heading].age ? 1 : -1;
        } else if (heading === "email") {
          return b[heading].charAt(0).localeCompare(a[heading].charAt(0));
        } else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        } else if (heading === "phone") {
          return b[heading].replace(/\D/g, "") > a[heading].replace(/\D/g, "")
            ? 1
            : -1;
        } else {
          return b[heading] - a[heading];
        }
      }
    };
    const sortedUsers = developerState.filteredUsers.sort(compareFnc);
    setDeveloperState({
      ...newState,
      filteredUsers: sortedUsers
    });
  };
    // if (developerState.order === "descend") {
    //   setDeveloperState({ ...developerState, order: "ascend" })
    //  console.log("order", developerState.order);
    // } else {
    //   setDeveloperState({ ...developerState, order: "descend" })
    //   console.log("order", developerState.order);
    // }

  //   console.log("order", developerState.order);

  //   const compareFnc = (a, b) => {
  //     if (developerState.order === "ascend") {
  //       // account for missing values
  //       if (a[heading] === undefined) {
  //         return 1;
  //       } else if (b[heading] === undefined) {
  //         return -1;
  //       }
  //       // numerically
  //       else if (heading === "name") {
  //         return a[heading].first.localeCompare(b[heading].first);
  //       } else {
  //         return a[heading] - b[heading];
  //       }
  //     } else {
  //       // account for missing values
  //       if (a[heading] === undefined) {
  //         return 1;
  //       } else if (b[heading] === undefined) {
  //         return -1;
  //       }
  //       // numerically
  //       else if (heading === "name") {
  //         return b[heading].first.localeCompare(a[heading].first);
  //       } else {
  //         return b[heading] - a[heading];
  //       }
  //     }

  //   }
  //   const sortedUsers = developerState.filteredUsers.sort(compareFnc);
  //   setDeveloperState({ ...developerState, filteredUsers: sortedUsers });
  // }

  function handleSearchChange (event) {
    //console.log("HANDLESEARCHCHANGE ARGUMENT", event.target.value);
    const filter = event.target.value;
    const filteredList = developerState.users.filter(item => {
      // merge data together, then see if user input is anywhere inside
      //console.log("item", item);

      let values = Object.values(item)
        .join("")
        .toLowerCase();

      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    //console.log("FILTER", filteredList);
    setDeveloperState({ ...developerState, filteredUsers: filteredList });
  }

useEffect(() => {
  API.getUsers().then(results => {
    setDeveloperState({ ...developerState, users: results.data.results, filteredUsers: results.data.results })
    console.log("order", developerState.order);
  });
}, []);

return (
  <>
    <EmpContext.Provider value={{ developerState, handleSort, handleSearchChange }} >
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

  //     handleSort: heading => {

  //       if (this.state.order === "descend") {
  //         this.setState({
  //           order: "ascend"
  //         })
  //       } else {
  //         this.setState({
  //           order: "descend"
  //         })
  //       }

  //       const compareFnc = (a, b) => {
  //         if (this.state.order === "ascend") {
  //           // account for missing values
  //           if (a[heading] === undefined) {
  //             return 1;
  //           } else if (b[heading] === undefined) {
  //             return -1;
  //           }
  //           // numerically
  //           else if (heading === "name") {
  //             return a[heading].first.localeCompare(b[heading].first);
  //           } else {
  //             return a[heading] - b[heading];
  //           }
  //         } else {
  //           // account for missing values
  //           if (a[heading] === undefined) {
  //             return 1;
  //           } else if (b[heading] === undefined) {
  //             return -1;
  //           }
  //           // numerically
  //           else if (heading === "name") {
  //             return b[heading].first.localeCompare(a[heading].first);
  //           } else {
  //             return b[heading] - a[heading];
  //           }
  //         }

  //       }
  //       const sortedUsers = this.state.filteredUsers.sort(compareFnc);
  //       this.setState({ filteredUsers: sortedUsers });
  //     },
  //     handleSearchChange: event => {
  //       console.log(event.target.value);
  //       const filter = event.target.value;
  //       const filteredList = this.state.users.filter(item => {
  //         // merge data together, then see if user input is anywhere inside
  //         let values = Object.values(item)
  //           .join("")
  //           .toLowerCase();
  //         return values.indexOf(filter.toLowerCase()) !== -1;
  //       });
  //       this.setState({ filteredUsers: filteredList });
  //     }
  //   };
  // }

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
