
import { useState } from "react";
import Header from "./components/Header";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Footer from "./components/Footer";

const initialEmployees = [
  {
    id: 1,
    name: "Rahul Sharma",
    employeeId: "EMP101",
    department: "Agriculture",
    gender: "Male",
    phone: "9876543210",
    localAddress: "Salt Lake, Kolkata",
    permanentAddress: "Howrah, West Bengal",
  },
  {
    id: 2,
    name: "Priya Das",
    employeeId: "EMP102",
    department: "Human Resources",
    gender: "Female",
    phone: "9876543211",
    localAddress: "New Town, Kolkata",
    permanentAddress: "Siliguri, West Bengal",
  },
  {
    id: 3,
    name: "Amit Roy",
    employeeId: "EMP103",
    department: "Finance",
    gender: "Male",
    phone: "9876543212",
    localAddress: "Dum Dum, Kolkata",
    permanentAddress: "Bardhaman, West Bengal",
  },
  {
    id: 4,
    name: "Sneha Ghosh",
    employeeId: "EMP104",
    department: "Operations",
    gender: "Female",
    phone: "9876543213",
    localAddress: "Behala, Kolkata",
    permanentAddress: "Midnapore, West Bengal",
  },
  {
    id: 5,
    name: "Arjun Sen",
    employeeId: "EMP105",
    department: "Livestock",
    gender: "Male",
    phone: "9876543214",
    localAddress: "Rajarhat, Kolkata",
    permanentAddress: "Nadia, West Bengal",
  },
  {
    id: 6,
    name: "Riya Mukherjee",
    employeeId: "EMP106",
    department: "Production",
    gender: "Female",
    phone: "9876543215",
    localAddress: "Jadavpur, Kolkata",
    permanentAddress: "Hooghly, West Bengal",
  },
];

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  function handleAddEmployee(newEmployee) {
    const normalizedId = newEmployee.employeeId.trim().toLowerCase();

    const duplicate = employees.some(
      (employee) =>
        employee.employeeId.trim().toLowerCase() === normalizedId
    );

    if (duplicate) {
      return {
        success: false,
        message: "This Employee ID already exists. Please use a unique ID.",
      };
    }

    setEmployees((previous) => [
      ...previous,
      { ...newEmployee, employeeId: newEmployee.employeeId.trim() },
    ]);

    return { success: true };
  }

  function handleUpdateEmployee(updatedEmployee) {
    const normalizedId = updatedEmployee.employeeId.trim().toLowerCase();

    const duplicate = employees.some(
      (employee) =>
        employee.employeeId.trim().toLowerCase() === normalizedId &&
        employee.id !== updatedEmployee.id
    );

    if (duplicate) {
      return {
        success: false,
        message: "This Employee ID belongs to another employee.",
      };
    }

    setEmployees((previous) =>
      previous.map((employee) =>
        employee.id === updatedEmployee.id
          ? {
              ...updatedEmployee,
              employeeId: updatedEmployee.employeeId.trim(),
            }
          : employee
      )
    );

    setEditingEmployee(null);
    return { success: true };
  }

  function handleDeleteEmployee(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    setEmployees((previous) =>
      previous.filter((employee) => employee.id !== id)
    );

    if (editingEmployee?.id === id) {
      setEditingEmployee(null);
    }
  }

  function handleEditEmployee(employee) {
    setEditingEmployee(employee);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEditingEmployee(null);
  }

  const departments = [
    ...new Set(employees.map((employee) => employee.department)),
  ].sort();

  const filteredEmployees = employees.filter((employee) => {
    const query = searchTerm.trim().toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(query) ||
      employee.employeeId.toLowerCase().includes(query) ||
      employee.phone.includes(query) ||
      employee.department.toLowerCase().includes(query);

    const matchesDepartment =
      selectedDepartment === "All" ||
      employee.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="app">
      <Header />

      <main className="main-container">
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-tag">
              <span className="status-dot" />
              PEOPLE · PURPOSE · PROGRESS
            </span>

            <h1>
              Growing together.
              <br />
              <span>Rooted in people.</span>
            </h1>

            <p className="hero-description">
              A smarter way to organize your workforce. Manage employee
              information, explore your team, and keep every detail
              growing in the right direction.
            </p>

            <a href="#employee-form" className="btn btn-copper hero-button">
              <span>＋</span> Add New Employee
            </a>

            <div className="hero-note">
              <span>✳</span> A healthier workplace starts with better
              organization.
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-center">
              <span className="visual-plant">🌿</span>
              <span className="visual-caption">GROW AS ONE</span>
            </div>
            <div className="floating-leaf leaf-top">✳</div>
            <div className="floating-leaf leaf-bottom">❋</div>
          </div>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <div className="stat-icon icon-forest">♧</div>
            <div className="stat-details">
              <p>Total Employees</p>
              <h2>{employees.length.toString().padStart(2, "0")}</h2>
              <span>People on your team</span>
            </div>
            <div className="stat-decoration">01</div>
          </article>

          <article className="stat-card">
            <div className="stat-icon icon-sage">✿</div>
            <div className="stat-details">
              <p>Departments</p>
              <h2>{departments.length.toString().padStart(2, "0")}</h2>
              <span>Teams working together</span>
            </div>
            <div className="stat-decoration">02</div>
          </article>

          <article className="stat-card">
            <div className="stat-icon icon-copper">⌕</div>
            <div className="stat-details">
              <p>Matching Results</p>
              <h2>{filteredEmployees.length.toString().padStart(2, "0")}</h2>
              <span>Based on your filters</span>
            </div>
            <div className="stat-decoration">03</div>
          </article>
        </section>

        <div id="employee-form" className="form-anchor">
          <EmployeeForm
            employees={employees}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            editingEmployee={editingEmployee}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <section className="directory-section">
          <div className="directory-heading">
            <div>
              <p className="eyebrow">THE PEOPLE BEHIND THE PROGRESS</p>
              <h2>Meet the Workforce<span>.</span></h2>
              <p className="section-description">
                Your employee records, thoughtfully organized in one place.
              </p>
            </div>

            <div className="directory-total">
              <span className="total-number">
                {filteredEmployees.length.toString().padStart(2, "0")}
              </span>
              <span className="total-label">TEAM MEMBERS</span>
            </div>
          </div>

          <div className="directory-controls">
            <label className="search-box">
              <span className="search-icon">⌕</span>
              <input
                type="search"
                placeholder="Search by name, ID, phone or department..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search employees"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>

            <label className="filter-wrap">
              <span>Department</span>
              <select
                value={selectedDepartment}
                onChange={(event) =>
                  setSelectedDepartment(event.target.value)
                }
                aria-label="Filter by department"
              >
                <option value="All">All Departments</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </label>

            {(searchTerm || selectedDepartment !== "All") && (
              <button
                type="button"
                className="btn btn-outline reset-button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDepartment("All");
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          <EmployeeList
            employees={filteredEmployees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
