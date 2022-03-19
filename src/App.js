import React, { useState, useEffect } from "react";
import robotData from "./robots.json";

function RobotList(props) {
  const robotsArray = props.robots;

  function removeRobot(r) {

    let newList = robotsArray.filter((e, i) => {
      return r !== e.name;
    });

    props.onRobotsChange(newList);
  }

  function listRobots() {
    return (
      robotsArray.map((r, i) => {
        return (
          <li key={i}>
            {r.name}, {r.color}, {r.attack}, {r.defense} <button onClick={() => removeRobot(r.name)}>Delete Robot</button>
          </li>
        );
      })
    );
  }

  return(
    <div>
      <h1>ROBOTS</h1>
      <h2>Current Robots</h2>
      <h3>Name, Color, Attack, Defense</h3>
      <ul>
        {listRobots()}
      </ul>
    </div>
  )
}

function AddRobotForm(props) {

  const [colorOptions, setColorOptions] = useState();

  useEffect(() => {
    setColorOptions(
      robotData.colors.map((color, i) => {
        return (
          <option key={i} name={color} value={color}>{color}</option>
        );
      })
    )
  }, []);

  const [attackOptions, setAttackOptions] = useState();

  useEffect(() => {
    setAttackOptions(
      robotData.attacks.map((attack, i) => {
        return (
          <option key={i} name={attack.name} value={attack.name}>{attack.name}</option>
        );
      })
    )
  }, []);

  const [defenseOptions, setDefenseOptions] = useState();

  useEffect(() => {
    setDefenseOptions(
      robotData.defenses.map((defense, i) => {
        return (
          <option key={i} name={defense.name} value={defense.name}>{defense.name}</option>
        );
      })
    )
  }, []);

  function addRobot(event) {
    event.preventDefault();

    const attrib = event.target.elements;

    const newRobot = {
      "name": attrib.robotName.value,
      "color": attrib.robotColor.value,
      "attack": attrib.robotAttack.value,
      "defense": attrib.robotDefense.value
    }

    const newList = props.robots.concat(newRobot);

    props.onRobotsChange(newList);

    event.target.reset();
  }

  return (
    <>
      <h2>Add a Robot</h2>
      <form onSubmit={(e) => addRobot(e)}>
          <div><label htmlFor="robotName">Robot Name:</label> <input type="text" id="robot-name" name="robotName" placeholder="Robot Name" required /></div>
          <div>
            <label htmlFor="robotColor">Robot Color:</label>
            <select name="robotColor" required>
              <option value="">Select Color</option>
              {colorOptions}
            </select>
          </div>
          <div>
            <label htmlFor="robotAttack">Robot Attack:</label>
            <select name="robotAttack" required>
              <option value="">Select Attack</option>
              {attackOptions}
            </select>
          </div>
          <div>
            <label htmlFor="robotDefense">Robot Defense:</label>
            <select name="robotDefense" required>
              <option value="">Select Defense</option>
              {defenseOptions}
            </select>
          </div>
          <input type="submit"></input>
      </form>
    </>
  )
}

function App() {

  const [robots, setRobots] = useState(robotData.robots);

  return (
    <div>
      <RobotList robots={robots} onRobotsChange={setRobots}></RobotList>
      <AddRobotForm robots={robots} onRobotsChange={setRobots}></AddRobotForm>
    </div>
  );

}

export default App;
