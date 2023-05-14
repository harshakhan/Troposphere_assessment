import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const apiResponse = {
    "Exam Fee": {
      INDIAN: {
        ALL_COURSES: {
          ALL_LEVEL: {
            amount: 400
          }
        }
      },
      FOREIGN: {
        ALL_COURSES: {
          ALL_LEVEL: {
            amount: 100
          }
        }
      },
      NRI: {
        ALL_COURSES: {
          ALL_LEVEL: {
            amount: 600
          }
        }
      },
      SAARC: {
        ALL_COURSES: {
          ALL_LEVEL: {
            amount: 600
          }
        }
      }
    },
    "Application Fee": {
      INDIAN: {
        ALL_COURSES: {
          UG: {
            amount: 200
          },
          "UG-DIPLOMA": {
            amount: 300
          },
          PG: {
            amount: 500
          }
        }
      },
      FOREIGN: {
        ALL_COURSES: {
          UG: {
            amount: 400
          },
          "UG-DIPLOMA": {
            amount: 400
          },
          PG: {
            amount: 700
          }
        }
      }
    }
  };

  const [selectedFee, setSelectedFee] = useState("");
  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [feeAmount, setFeeAmount] = useState(0);

  const handleFeeSelection = (fee) => {
    setSelectedFee(fee);
    setSelectedNationality("");
    setSelectedCourse("");
    setSelectedLevel("");
    setFeeAmount(0);
  };

  const handleNationalitySelection = (nationality) => {
    setSelectedNationality(nationality);
    setSelectedCourse("");
    setSelectedLevel("");
    setFeeAmount(0);
  };

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
    setSelectedLevel("");
    setFeeAmount(0);
  };

  const handleLevelSelection = (level) => {
    setSelectedLevel(level);

    const amount =
      apiResponse[selectedFee][selectedNationality][selectedCourse][level]
        .amount;
    setFeeAmount(amount);
  };

  const renderOptions = (options) => {
    return options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  return (
    <div className="App">
      <div>
        <h2>Fee Calculator</h2>
        <div>
          <label>Select a fee:</label>
          <select
            value={selectedFee}
            onChange={(e) => handleFeeSelection(e.target.value)}
          >
            <option value="">Select Fee</option>
            {renderOptions(Object.keys(apiResponse))}
          </select>
        </div>

        {selectedFee && (
          <>
            <div>
              <label>Select a nationality:</label>
              <select
                value={selectedNationality}
                onChange={(e) => handleNationalitySelection(e.target.value)}
              >
                <option value="">Select Nationality</option>
                {renderOptions(Object.keys(apiResponse[selectedFee]))}
              </select>
            </div>
            {selectedNationality && (
              <>
                <div>
                  <label>Selet a Course: </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => handleCourseSelection(e.target.value)}
                  >
                    <option value=""> Select Course</option>
                    {renderOptions(
                      Object.keys(apiResponse[selectedFee][selectedNationality])
                    )}
                  </select>
                </div>
              </>
            )}
            {selectedCourse && (
              <>
                <div>
                  <label>Select Level: </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => handleLevelSelection(e.target.value)}
                  >
                    <option value=""> Select Level</option>
                    {renderOptions(
                      Object.keys(
                        apiResponse[selectedFee][selectedNationality][
                          selectedCourse
                        ]
                      )
                    )}
                  </select>
                </div>
              </>
            )}
          </>
        )}

        <div>{selectedLevel && <h2> Fees Amount : {feeAmount}</h2>}</div>
      </div>
    </div>
  );
}
