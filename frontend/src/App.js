// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [clubs, setClubs] = useState([]);
  const [newClub, setNewClub] = useState({
    outletName: "",
    brandName: "",
    location: "",
    status: "in progress",
  });
  const [updateClub, setUpdateClub] = useState(null);
  const [batchUpdateStatus, setBatchUpdateStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    // Fetch and display all clubs
    axios
      .get("/api/clubs")
      .then((response) => {
        setClubs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clubs:", error);
      });
  }, []);

  // function to create a new club
  const clubSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/clubs", newClub)
      .then((response) => {
        setClubs([...clubs, response.data]);
        setNewClub({
          outletName: "",
          brandName: "",
          location: "",
          status: "submitted",
        });
      })
      .catch((error) => {
        console.error("Error creating club:", error);
      });
  };
  // function to update a single club
  const clubUpdate = () => {
    if (updateClub) {
      axios
        .put(`/api/clubs/single/${updateClub._id}`, updateClub)
        .then(() => {
          setUpdateClub(null);
          // Fetch and display all clubs after updating
          axios
            .get("/api/clubs")
            .then((response) => {
              setClubs(response.data);
            })
            .catch((error) => {
              console.error("Error fetching clubs:", error);
            });
        })
        .catch((error) => {
          console.error("Error updating club:", error);
        });
    }
  };
  // function to update status of multiple clubs at once(batch-update)
  const batchUpdate = () => {
    if (batchUpdateStatus) {
      const selectedClubIds = clubs
        .filter((club) => club.selected)
        .map((club) => club._id);

      axios
        .put("/api/clubs/batch-update", {
          // Updated endpoint URL
          jobIds: selectedClubIds,
          status: batchUpdateStatus,
        })
        .then(() => {
          // Fetch and display all clubs after batch update
          axios
            .get("/api/clubs")
            .then((response) => {
              setClubs(response.data);
            })
            .catch((error) => {
              console.error("Error fetching clubs:", error);
            });
        })
        .catch((error) => {
          console.error("Error updating clubs:", error);
        });
    }
  };
  // function to archive a club
  const archiveClub = (id) => {
    // Send a request to archive the job by its ID
    axios
      .put(`/api/clubs/archive/${id}`)
      .then(() => {
        // Fetch and display all clubs after archiving
        axios
          .get("/api/clubs")
          .then((response) => {
            setClubs(response.data);
          })
          .catch((error) => {
            console.error("Error fetching clubs:", error);
          });
      })
      .catch((error) => {
        console.error("Error archiving club:", error);
      });
  };
  // function to filter clubs by status
  const filterClubs = () => {
    if (filterStatus) {
      axios
        .get(`/api/clubs/status/${filterStatus}`)
        .then((response) => {
          setClubs(response.data);
        })
        .catch((error) => {
          console.error("Error fetching clubs:", error);
        });
    }
  };

  return (
    <div className="container">
      <h1>Tracking SAB aligned outlets</h1>

      {/* Create form */}
      <form onSubmit={clubSubmit}>
        <label>
          Outlet Name:
          <input
            type="text"
            name="outletName"
            value={newClub.outletName}
            onChange={(e) =>
              setNewClub({ ...newClub, outletName: e.target.value })
            }
          />
        </label>
        <label>
          Brand Name:
          <input
            type="text"
            name="brandName"
            value={newClub.brandName}
            onChange={(e) =>
              setNewClub({ ...newClub, brandName: e.target.value })
            }
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={newClub.location}
            onChange={(e) =>
              setNewClub({ ...newClub, location: e.target.value })
            }
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* List of clubs (when edit btn is clicked, show text fields to update info with an update btn to confirm)*/}
      <h2>Outlets</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Outlet Name</th>
            <th>Brand Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Date Submitted</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club) => (
            <tr key={club._id}>
              <td>
                <input
                  type="checkbox"
                  checked={club.selected || false}
                  onChange={() => {
                    setClubs(
                      clubs.map((c) =>
                        c._id === club._id ? { ...c, selected: !c.selected } : c
                      )
                    );
                  }}
                />
              </td>
              <td>
                {updateClub && updateClub._id === club._id ? (
                  <input
                    type="text"
                    value={updateClub.outletName}
                    onChange={(e) =>
                      setUpdateClub({
                        ...updateClub,
                        outletName: e.target.value,
                      })
                    }
                  />
                ) : (
                  club.outletName
                )}
              </td>
              <td>
                {updateClub && updateClub._id === club._id ? (
                  <input
                    type="text"
                    value={updateClub.brandName}
                    onChange={(e) =>
                      setUpdateClub({
                        ...updateClub,
                        brandName: e.target.value,
                      })
                    }
                  />
                ) : (
                  club.brandName
                )}
              </td>
              <td>
                {updateClub && updateClub._id === club._id ? (
                  <input
                    type="text"
                    value={updateClub.location}
                    onChange={(e) =>
                      setUpdateClub({ ...updateClub, location: e.target.value })
                    }
                  />
                ) : (
                  club.location
                )}
              </td>
              <td>
                {updateClub && updateClub._id === club._id ? (
                  <select
                    value={updateClub.status}
                    onChange={(e) =>
                      setUpdateClub({ ...updateClub, status: e.target.value })
                    }
                  >
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  club.status
                )}
              </td>
              <td>{new Date(club.dateSubmitted).toLocaleString()}</td>
              <td>
                {updateClub && updateClub._id === club._id ? (
                  <button onClick={clubUpdate}>Update</button>
                ) : (
                  <button
                    onClick={() => {
                      setUpdateClub(club);
                      setClubs(clubs.map((c) => ({ ...c, selected: false })));
                    }}
                  >
                    Edit
                  </button>
                )}
                <button onClick={() => archiveClub(club._id)}>Archive</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Batch update form */}
      <h2>Batch Update</h2>
      <label>
        <select
          value={batchUpdateStatus}
          onChange={(e) => setBatchUpdateStatus(e.target.value)}
        >
          <option value="">-- Select Status --</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <button onClick={batchUpdate}>Update Selected</button>

      {/* Filter clubs by status */}
      <h2>Filter by Status</h2>
      <label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">-- Select Filter --</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <button onClick={filterClubs}>Filter</button>
    </div>
  );
}

export default App;
