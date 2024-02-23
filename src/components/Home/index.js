import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Loader from "../Loader";

const Home = () => {
  const [planetData, setPlanetData] = useState([]);
  const [result, setResult] = useState({});
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async (url) => {
    try {
      const apiUrl = url || "https://swapi.dev/api/planets/?format=json";
      const response = await fetch(apiUrl);
      const result = await response.json();
      setPlanetData(result.results);
      setResult(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShowResidents = (planet) => {
    navigate(`/recidents/:${planet.name}`, {
      state: { data: planet },
    });
  };

  const getImageId = (url) => {
    const id = url.split("/").filter(Boolean).pop();
    return id;
  };

  const handleNextClick = async () => {
    if (result && result.next) {
      setLoading(true);
      await getData(result.next);
    }
  };
  const handlePreviousClick = async () => {
    if (result && result.previous) {
      setLoading(true);
      await getData(result.previous);
    }
  };

  return (
    <div className="main-container">
      <h1>Star Wars Planets</h1>
      <div className="parent-list-container">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center loader-container">
            <Loader />
          </div>
        ) : (
          <>
            <ul className="d-flex flex-wrap">
              {planetData.map((planet) => (
                <li key={planet.name} className="card-item">
                  <Card className="card-container">
                    <Card.Img
                      variant="top"
                      src={`https://starwars-visualguide.com/assets/img/planets/${getImageId(
                        planet.url
                      )}.jpg`}
                      onError={(e) => {
                        e.target.src =
                          "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=740&t=st=1708693217~exp=1708693817~hmac=627395f04c92c5ca5d1c5aff16314df151c1b4793e591e4e7eb76dec389ff609";
                        e.target.onerror = null;
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{planet.name}</Card.Title>
                      <Card.Text className="text-field">
                        Climate: {planet.climate}
                      </Card.Text>
                      <Card.Text className="text-field">
                        Population: {planet.population}
                      </Card.Text>
                      <Card.Text className="text-field">
                        Terrain:{" "}
                        {planet.terrain.length > 20
                          ? planet.terrain.slice(0, 20) + "..."
                          : planet.terrain}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleShowResidents(planet)}
                      >
                        Show Residents
                      </Button>
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
            <div className="buttons-container">
              <button
                type="button"
                className="btn btn-info nav-btns"
                onClick={handlePreviousClick}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-info nav-btns"
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
