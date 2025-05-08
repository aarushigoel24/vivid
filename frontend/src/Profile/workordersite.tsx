import React from 'react';
import './WorkorderCalendar.css';

type StatusType = 'overdue' | 'completedLate' | 'completedOnTime' | 'cancelled' | 'notYetDue';

interface WorkOrder {
  status: StatusType;
  label: string;
}

interface WorkOrderData {
  [day: number]: WorkOrder[];
}

const calendarData: WorkOrderData = {
  1: [],
  2: [{ status: 'completedOnTime', label: '1' }],
  3: [
    { status: 'completedLate', label: '2' },
    { status: 'completedOnTime', label: '3' },
  ],
  4: [{ status: 'completedLate', label: '2' }],
  5: [{ status: 'completedLate', label: '6' }],
  6: [{ status: 'completedLate', label: '1' }],
  10: [
    { status: 'completedOnTime', label: '2' },
    { status: 'notYetDue', label: '2' },
  ],
  11: [{ status: 'notYetDue', label: '4' }],
  12: [
    { status: 'completedOnTime', label: '1' },
    { status: 'notYetDue', label: '1' },
  ],
  16: [{ status: 'completedOnTime', label: '2' }],
  17: [
    { status: 'completedOnTime', label: '1' },
    { status: 'notYetDue', label: '2' },
  ],
  24: [{ status: 'notYetDue', label: '2' }],
};

const getStatusColor = (status: StatusType): string => {
  switch (status) {
    case 'overdue':
      return 'red';
    case 'completedLate':
      return 'yellow';
    case 'completedOnTime':
      return 'green';
    case 'cancelled':
      return 'purple';
    case 'notYetDue':
      return 'gray';
    default:
      return 'transparent';
  }
};

const WorkOrderStatusCalendar: React.FC = () => {
  const daysInMonth = 31;
  const startDay = 4; // May 1st, 2025 is a Thursday

  const renderCalendar = () => {
    const calendarCells = [];
    let dayCounter = 1;

    for (let week = 0; week < 6; week++) {
      const row = [];
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        if (week === 0 && dayOfWeek < startDay) {
          row.push(<td key={`empty-${dayOfWeek}`}></td>);
        } else if (dayCounter <= daysInMonth) {
          const workOrders = calendarData[dayCounter] || [];
          row.push(
            <td key={dayCounter}>
            <div className="day-number">{dayCounter}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {workOrders.map((wo, index) => (
                <div
                  key={index}
                  className="status-label"
                  style={{ backgroundColor: getStatusColor(wo.status) }}
                >
                  {wo.label}
                </div>
              ))}
            </div>
          </td>
          
          );
          dayCounter++;
        } else {
          row.push(<td key={`after-${dayOfWeek}`}></td>);
        }
      }
      calendarCells.push(<tr key={week}>{row}</tr>);
    }
    return calendarCells;
  };

  return (
    <div className="calendar-container1">
      <h3 className="calendar-title">Work Order Status May 2025</h3>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
      <div className="legend">
        <div className="legend-item" style={{ backgroundColor: 'orangered' }}>Overdue</div>
        <div className="legend-item" style={{ backgroundColor: 'yellow' }}>Completed late</div>
        <div className="legend-item" style={{ backgroundColor: 'forestgreen' }}>Completed on time</div>
        <div className="legend-item" style={{ backgroundColor: 'lightblue' }}>Cancelled</div>
        <div className="legend-item" style={{ backgroundColor: 'gray' }}>Not yet due</div>
      </div>
    </div>
  );
};

export default WorkOrderStatusCalendar;
