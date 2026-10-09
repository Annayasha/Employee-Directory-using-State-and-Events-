
function EmployeeCard({ employee, onEdit, onDelete }) {
  const initials = employee.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="employee-card">
      <div className="employee-card-top">
        <div className="employee-avatar">{initials}</div>

        <div className="employee-main-info">
          <h3>{employee.name}</h3>
          <span className="employee-id">
            ID: {employee.employeeId}
          </span>
        </div>

        <span className="employee-status">
          <span className="status-dot" />
          Registered
        </span>
      </div>

      <div className="employee-card-divider" />

      <div className="employee-details">
        <div className="detail-item">
          <span className="detail-label">DEPARTMENT</span>
          <span className="department-badge">
            {employee.department}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">GENDER</span>
          <span className="detail-value">{employee.gender}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">PHONE NUMBER</span>
          <span className="detail-value">{employee.phone}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">LOCAL ADDRESS</span>
          <span className="detail-value">
            {employee.localAddress}
          </span>
        </div>

        <div className="detail-item detail-full">
          <span className="detail-label">PERMANENT ADDRESS</span>
          <span className="detail-value">
            {employee.permanentAddress}
          </span>
        </div>
      </div>

      <div className="employee-card-actions">
        <button
          type="button"
          className="btn btn-edit"
          onClick={() => onEdit(employee)}
        >
          <span>✎</span> Edit Details
        </button>

        <button
          type="button"
          className="btn btn-delete"
          onClick={() => onDelete(employee.id)}
        >
          <span>×</span> Delete
        </button>
      </div>
    </article>
  );
}

export default EmployeeCard;
