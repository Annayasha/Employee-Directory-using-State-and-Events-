function EmployeeCard({ employee, onEdit, onDelete }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <article className="employee-card">

      <div className="employee-card-top">

        <div className="employee-avatar">
          {getInitials(employee.name)}
        </div>

        <div className="employee-main-info">
          <h3>{employee.name}</h3>
          <span className="employee-id">
            {employee.employeeId}
          </span>
        </div>

        <span className="department-badge">
          {employee.department}
        </span>

      </div>

      <div className="employee-details">

        <div className="detail-item">
          <span className="detail-icon">👤</span>

          <div>
            <small>Gender</small>
            <strong>{employee.gender}</strong>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">📞</span>

          <div>
            <small>Phone</small>
            <strong>{employee.phone}</strong>
          </div>
        </div>

        <div className="address-box">
          <span>📍</span>

          <div>
            <small>Local Address</small>
            <p>{employee.localAddress}</p>
          </div>
        </div>

        <div className="address-box">
          <span>🏠</span>

          <div>
            <small>Permanent Address</small>
            <p>{employee.permanentAddress}</p>
          </div>
        </div>

      </div>

      <div className="card-actions">

        <button
          className="edit-btn"
          onClick={() => onEdit(employee)}
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(employee.id)}
        >
          🗑 Delete
        </button>

      </div>

    </article>
  );
}

export default EmployeeCard;