import { useEffect, useState } from "react";

function EmployeeForm({ onAddEmployee, onUpdateEmployee, editingEmployee, onCancelEdit }) {
  const initialForm = {
    name: "",
    employeeId: "",
    department: "Production",
    gender: "Male",
    phone: "",
    localAddress: "",
    permanentAddress: "",
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    } else {
      setFormData(initialForm);
    }
  }, [editingEmployee]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.employeeId ||
      !formData.phone ||
      !formData.localAddress ||
      !formData.permanentAddress
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingEmployee) {
      onUpdateEmployee(formData);
    } else {
      onAddEmployee({
        ...formData,
        id: Date.now(),
      });
    }

    setFormData(initialForm);
  };

  const handleCancel = () => {
    setFormData(initialForm);
    onCancelEdit();
  };

  return (
    <section className="form-section">
      <div className="section-heading">
        <div>
          <span className="section-label">EMPLOYEE FORM</span>

          <h2>
            {editingEmployee ? "Edit Employee" : "Add New Employee"}
          </h2>

          <p>
            {editingEmployee
              ? "Update the employee information below."
              : "Enter employee details to add them to the directory."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="employee-form">

        <div className="form-grid">

          <div className="input-group">
            <label>Employee Name *</label>

            <input
              type="text"
              name="name"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Employee ID *</label>

            <input
              type="text"
              name="employeeId"
              placeholder="Example: EMP001"
              value={formData.employeeId}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Department *</label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="Production">Production</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Administration">Administration</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Security">Security</option>
              <option value="Transport">Transport</option>
            </select>
          </div>

          <div className="input-group">
            <label>Gender *</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Phone Number *</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="input-group full-width">
            <label>Local Address *</label>

            <textarea
              name="localAddress"
              placeholder="Enter local address"
              value={formData.localAddress}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <div className="input-group full-width">
            <label>Permanent Address *</label>

            <textarea
              name="permanentAddress"
              placeholder="Enter permanent address"
              value={formData.permanentAddress}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

        </div>

        <div className="form-actions">

          {editingEmployee && (
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}

          <button type="submit" className="primary-btn">
            {editingEmployee ? "✓ Update Employee" : "+ Add Employee"}
          </button>

        </div>

      </form>
    </section>
  );
}

export default EmployeeForm;