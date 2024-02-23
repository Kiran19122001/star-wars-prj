import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./index.css";
import Loader from "../Loader";

const Recident = () => {
  const location = useLocation();
  const recidentsData = location.state.data;
  const [residents, setResidents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const residentPromises = recidentsData.residents.map((url) =>
        fetch(url).then((res) => res.json())
      );
      const result = await Promise.all(residentPromises);
      console.log(result);
      setResidents(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching residents:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{ height: `${residents.length > 4 ? "100%" : "100vh"}` }}
      className="resident-parent-container"
    >
      <div className="parent-resident-container">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center loader-container">
            <Loader />
          </div>
        ) : (
          <>
            <div>
              {residents.length !== 0 && (
                <h1 style={{ textAlign: "center" }}>Residents</h1>
              )}

              <div className="d-flex flex-column w-full align-items-center justify-content-center pt-5">
                {residents.length === 0 ? (
                  <div className="no-residents">No Resident Found</div>
                ) : (
                  residents.map((resident, index) => (
                    <div
                      className="card recident-card"
                      style={{ width: "18rem" }}
                      key={index}
                    >
                      <div className="card-body">
                        <h5 className="card-title">Name: {resident.name}</h5>
                        <p className="card-text">Height: {resident.height}</p>
                        <p className="card-text"> Mass: {resident.mass}</p>
                        <p className="card-text">Gender: {resident.gender}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recident;
