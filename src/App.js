import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const getAllURL = 'http://localhost:8080/get/employees/all';
const getSortedSalaryURL = 'http://localhost:8080/get/employees/sorted/salary';
const getYoungerThanURL = 'http://localhost:8080/get/employees/younger/than/'
const maxlength = 2;
var result = "";
var init = 0;
class App extends Component {
  state = {
    employees: [],
    age: 25
  }

  getAllEmployees = async (e) => {
    e.preventDefault();
    const api_call = await fetch(getAllURL);
    const data = await api_call.json();
    this.setState({
      employees: data
    });
  }
  sortSalaryASC = async (e) => {
    e.preventDefault();
    const api_call = await fetch(getSortedSalaryURL);
    const data = await api_call.json();
    this.setState({
      employees: data
    });
  }
  youngerThan = async (e) => {
    e.preventDefault();
    init++;
    var url = getYoungerThanURL+""+this.state.age;
    const api_call = await fetch(url);
    const data = await api_call.json();
    this.setState({
      employees: data
    });
  }
  changeDisplayAge = (e) => {
    if (e.target.value.length > maxlength) e.target.value = e.target.value.slice(0, maxlength);
    this.setState({
      age: e.target.value
    })
  }

  render() {
    console.log(this.state.employees);
    if(!!this.state.employees.length || init == 0) {
      this.result = "";
    }
    else {
      this.result = "Your search did not match any employee record.";
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Spring Boot React API</h1>
        </header>
        <p className="App-intro">
         
        </p>
        <div className="btnHeader">
          <div className="resultSize">Size: {this.state.employees.length}</div>
          <button id="btn-getAll" className="btn btn-outline-dark" onClick={this.getAllEmployees}>Get All Employees</button>
          <button id="btn-bySalary" className="btn btn-outline-dark" onClick={this.sortSalaryASC}>Get All Employees Sorted ASC by salary</button>
          <button id="btn-youngerBy" className="btn btn-outline-dark" onClick={this.youngerThan}>Get All Employees Younger than {this.state.age}</button>
          <div className="ageDiv">
            <div class="input-group mb-3 ">  
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Age</span>
              </div>
              <input 
                type="number" 
                maxlength="9999"
                minlength="-999" 
                aria-label="Small" 
                aria-describedby="inputGroup-sizing-sm"
                onChange={this.changeDisplayAge}
              />
            </div>
          </div>
        </div>
        <table className="table table-bordered table-dark table-hover table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Join Date</th>
              <th>Age</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Salary</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>

            <p className="noMatches">{this.result}</p>
            {this.state.employees.map((e, index) => {
              var addressString;
              if(typeof e.address === "undefined") {
                addressString = "";
              }
              else {
                addressString = <p>{e.address.street} {e.address.city} {e.address.zipcode}</p>;
              }
              return(
              <tr key={index}>
                <td>{e.name}</td>
                <td>{e.joindate}</td>
                <td>{e.age}</td>
                <td>{e.company}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.salary}</td>
                <td>{addressString}</td>
              </tr>  
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
