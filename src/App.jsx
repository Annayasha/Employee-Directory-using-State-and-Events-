import { useState } from "react";

import Header from "./components/Header";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Footer from "./components/Footer";

function App() {

  // -----------------------------------
  // Initial Employee Data
  // -----------------------------------

  const initialEmployees = [
    {
      id: 1,
      name: "Rahul Sharma",
      employeeId: "EMP001",
      department: "Production",
      gender: "Male",
      phone: "9876543210",
      localAddress: "Village Road, Kolkata, West Bengal",
      permanentAddress: "Burdwan, West Bengal",
    },

    {
      id: 2,
      name: "Priya Das",
      employeeId: "EMP002",
      department: "Administration",
      gender: "Female",
      phone: "9123456780",
      localAddress: "Salt Lake, Kolkata, West Bengal",
      permanentAddress: "Howrah, West Bengal",
    },

    {
      id: 3,
      name: "Amit Roy",
      employeeId: "EMP003",
      department: "Agriculture",
      gender: "Male",
      phone: "9834567890",
      localAddress: "Barasat, West Bengal",
      permanentAddress: "Nadia, West Bengal",
    },

    {
      id: 4,
      name: "Sneha Paul",
      employeeId: "EMP004",
      department: "Maintenance",
      gender: "Female",
      phone: "9012345678",
      localAddress: "New Town, Kolkata, West Bengal",
      permanentAddress: "Hooghly, West Bengal",
    },

    {
      id: 5,
      name: "Arjun Ghosh",
      employeeId: "EMP005",
      department: "Security",
      gender: "Male",
      phone: "8967452310",
      localAddress: "Dum Dum, Kolkata, West Bengal",
      permanentAddress: "Murshidabad, West Bengal",
    },

    {
      id: 6,
      name: "Riya Sen",
      employeeId: "EMP006",
      department: "Transport",
      gender: "Female",
      phone: "9087654321",
      localAddress: "Behala, Kolkata, West Bengal",
      permanentAddress: "South 24 Parganas, West Bengal",
    },
  ];


  // -----------------------------------
  // State
  // -----------------------------------

  const [employees, setEmployees] = useState(initialEmployees);

  const [searchTerm, setSearchTerm] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("All");

  const [editingEmployee, setEditingEmployee] = useState(null);


  // -----------------------------------
  // Add Employee
  // -----------------------------------

  const handleAddEmployee = (newEmployee) => {

    setEmployees((previousEmployees) => [
      ...previousEmployees,
      newEmployee,
    ]);

  };


  // -----------------------------------
  // Delete Employee
  // -----------------------------------

  const handleDeleteEmployee = (employeeId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    setEmployees((previousEmployees) =>
      previousEmployees.filter(
        (employee) => employee.id !== employeeId
      )
    );

  };


  // -----------------------------------
  // Start Editing
  // -----------------------------------

  const handleEditEmployee = (employee) => {

    setEditingEmployee(employee);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // -----------------------------------
  // Update Employee
  // -----------------------------------

  const handleUpdateEmployee = (updatedEmployee) => {

    setEmployees((previousEmployees) =>
      previousEmployees.map((employee) =>
        employee.id === updatedEmployee.id
          ? updatedEmployee
          : employee
      )
    );

    setEditingEmployee(null);

  };


  // -----------------------------------
  // Search + Department Filter
  // -----------------------------------

  const filteredEmployees = employees.filter((employee) => {

    const matchesSearch =
      employee.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      employee.employeeId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      employee.phone.includes(searchTerm);


    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;


    return matchesSearch && matchesDepartment;

  });


  // -----------------------------------
  // Department Count
  // -----------------------------------

  const departmentCount = new Set(
    employees.map((employee) => employee.department)
  ).size;


  return (
    <div className="app">

      {/* Header */}
      <Header />


      <main className="main-container">

        {/* -----------------------------------
            Hero Section
        ----------------------------------- */}

        <section className="hero-section">

          <div className="hero-content">

            <span className="hero-tag">
              FARM OPERATIONS
            </span>

            <h2>
              Employee Directory
            </h2>

            <p>
              Manage your farm workforce efficiently
              with a simple and powerful employee
              management system.
            </p>

          </div>

          <div className="hero-icon">
            🌱
          </div>

        </section>


        {/* -----------------------------------
            Statistics
        ----------------------------------- */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon green">
              👥
            </div>

            <div>
              <span>Total Employees</span>
              <strong>{employees.length}</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon blue">
              🏢
            </div>

            <div>
              <span>Departments</span>
              <strong>{departmentCount}</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              🔎
            </div>

            <div>
              <span>Showing</span>
              <strong>{filteredEmployees.length}</strong>
            </div>

          </div>

        </section>


        {/* -----------------------------------
            Employee Form
        ----------------------------------- */}

        <EmployeeForm
          onAddEmployee={handleAddEmployee}
          onUpdateEmployee={handleUpdateEmployee}
          editingEmployee={editingEmployee}
          onCancelEdit={() => setEditingEmployee(null)}
        />


        {/* -----------------------------------
            Directory Section
        ----------------------------------- */}

        <section className="directory-section">

          <div className="directory-header">

            <div>
              <span className="section-label">
                EMPLOYEE DIRECTORY
              </span>

              <h2>All Employees</h2>

              <p>
                Search, filter and manage your farm employees.
              </p>
            </div>

          </div>


          {/* Search + Filter */}

          <div className="toolbar">

            <div className="search-box">

              <span>🔍</span>

              <input
                type="text"
                placeholder="Search by name, ID or phone..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

            </div>


            <div className="filter-box">

              <label>Department</label>

              <select
                value={departmentFilter}
                onChange={(event) =>
                  setDepartmentFilter(event.target.value)
                }
              >

                <option value="All">
                  All Departments
                </option>

                <option value="Production">
                  Production
                </option>

                <option value="Agriculture">
                  Agriculture
                </option>

                <option value="Administration">
                  Administration
                </option>

                <option value="Maintenance">
                  Maintenance
                </option>

                <option value="Security">
                  Security
                </option>

                <option value="Transport">
                  Transport
                </option>

              </select>

            </div>

          </div>


          {/* Employee List */}

          <EmployeeList
            employees={filteredEmployees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />

        </section>

      </main>


      {/* Footer */}

      <Footer />

    </div>
  );
}

export default App;