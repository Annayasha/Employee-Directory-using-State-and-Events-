
import EmployeeCard from "./EmployeeCard";

function EmployeeList({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🌱</div>
        <h3>No employees found</h3>
        <p>
          Try changing your search or department filter, or add a new
          employee to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="employee-grid">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default EmployeeList;
