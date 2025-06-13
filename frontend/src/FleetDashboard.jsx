import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FleetDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/vehicles").then((res) => {
      setVehicles(res.data);
    });
  }, []);

  const filtered = vehicles.filter(
    (v) =>
      v.equipment_id.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Fleet Maintenance Dashboard</h1>
      <input
        placeholder="Search by ID, Category, or Location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Category</th><th>Location</th><th>Brand</th>
            <th>Mileage</th><th>Status</th><th>Next Service</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((v) => (
            <tr key={v.id}>
              <td>{v.equipment_id}</td>
              <td>{v.category}</td>
              <td>{v.location}</td>
              <td>{v.brand} {v.model}</td>
              <td>{v.current_mileage}</td>
              <td>{v.service_status}</td>
              <td>{v.next_service_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}