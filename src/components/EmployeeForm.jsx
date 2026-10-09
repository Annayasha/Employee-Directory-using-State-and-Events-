
import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  employeeId: "",
  department: "",
  gender: "",
  phone: "",
  localAddress: "",
  permanentAddress: "",
};

function EmployeeForm({
  employees = [],
  onAddEmployee,
  onUpdateEmployee,
  editingEmployee,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name || "",
        employeeId: editingEmployee.employeeId || "",
        department: editingEmployee.department || "",
        gender: editingEmployee.gender || "",
        phone: editingEmployee.phone || "",
        localAddress: editingEmployee.localAddress || "",
        permanentAddress: editingEmployee.permanentAddress || "",
      });
    } else {
      setFormData(emptyForm);
    }

    setError("");
    setSuccessMessage("");
  }, [editingEmployee]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccessMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    const cleanedData = {
      ...formData,
      name: formData.name.trim(),
      employeeId: formData.employeeId.trim(),
      phone: formData.phone.trim(),
      localAddress: formData.localAddress.trim(),
      permanentAddress: formData.permanentAddress.trim(),
    };

    if (Object.values(cleanedData).some((value) => !value.trim())) {
      setError("Please complete every required field.");
      return;
    }

    const normalizedId = cleanedData.employeeId.toLowerCase();

    const duplicateId = employees.some(
      (employee) =>
        employee.employeeId.trim().toLowerCase() === normalizedId &&
        employee.id !== editingEmployee?.id
    );

    if (duplicateId) {
      setError(
        `Employee ID "${cleanedData.employeeId}" is already in use. Please enter a unique ID.`
      );
      return;
    }

    if (!/^\d{10}$/.test(cleanedData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    const result = editingEmployee
      ? onUpdateEmployee({
          ...editingEmployee,
          ...cleanedData,
        })
      : onAddEmployee({
          ...cleanedData,
          id: Date.now(),
        });

    if (result?.success === false) {
      setError(result.message || "Unable to save this employee.");
      return;
    }

    setFormData(emptyForm);
    setError("");
    setSuccessMessage(
      editingEmployee
        ? "Employee details updated successfully!"
        : "New employee added successfully!"
    );

    if (!editingEmployee) {
      window.setTimeout(() => setSuccessMessage(""), 3000);
    }
  }

  function handleCancel() {
    setFormData(emptyForm);
    setError("");
    setSuccessMessage("");
    onCancelEdit?.();
  }

  return (
    <section className="form-section">
      <div className="form-heading">
        <div className="form-heading-icon">
          {editingEmployee ? "✎" : "＋"}
        </div>

        <div>
          <p className="eyebrow">
            {editingEmployee ? "UPDATE YOUR RECORDS" : "EXPAND YOUR TEAM"}
          </p>
          <h2>{editingEmployee ? "Edit Employee" : "Add a Team Member"}</h2>
          <p className="section-description">
            {editingEmployee
              ? "Make changes to the employee details below."
              : "Every great team starts with a person. Add their details below."}
          </p>
        </div>

        <span className="required-note">* Required fields</span>
      </div>

      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-subheading">
          <span className="subheading-number">01</span>
          <h3>Personal & Work Details</h3>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="employeeId">Unique Employee ID *</label>
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              placeholder="e.g. EMP107"
              value={formData.employeeId}
              onChange={handleChange}
              required
            />
            <small className="input-hint">
              Each employee must have a different ID.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Choose a department</option>
              <option value="Administration">Administration</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Finance">Finance</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Irrigation">Irrigation</option>
              <option value="Livestock">Livestock</option>
              <option value="Logistics">Logistics</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Operations">Operations</option>
              <option value="Production">Production</option>
              <option value="Sales">Sales</option>
              <option value="Security">Security</option>
              <option value="Warehouse">Warehouse</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Choose an option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              required
            />
          </div>
        </div>

        <div className="form-subheading address-subheading">
          <span className="subheading-number">02</span>
          <h3>Address Information</h3>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="localAddress">Local Address *</label>
            <input
              id="localAddress"
              name="localAddress"
              type="text"
              placeholder="Current residential address"
              value={formData.localAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="permanentAddress">Permanent Address *</label>
            <textarea
              id="permanentAddress"
              name="permanentAddress"
              placeholder="Permanent residential address"
              value={formData.permanentAddress}
              onChange={handleChange}
              rows={2}
              required
            />
          </div>
        </div>

        {error && (
          <div className="form-message error-message" role="alert">
            <span>!</span>
            {error}
          </div>
        )}

        {successMessage && (
          <div className="form-message success-message" role="status">
            <span>✓</span>
            {successMessage}
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-forest submit-button">
            <span>{editingEmployee ? "✓" : "＋"}</span>
            {editingEmployee ? "Save Changes" : "Add Employee"}
          </button>

          {editingEmployee && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleCancel}
            >
              Cancel Editing
            </button>
          )}

          <span className="form-footnote">
            <span>✳</span> Employee records are easy to update later.
          </span>
        </div>
      </form>
    </section>
  );
}

export default EmployeeForm;
