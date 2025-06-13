import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";

export default function FleetDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://your-backend-url.onrender.com/vehicles").then((res) => {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted">Total Fleet</p>
            <p className="text-2xl font-semibold">{vehicles.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted">Overdue Service</p>
            <p className="text-2xl font-semibold">
              {vehicles.filter((v) => v.service_status === "OVERDUE").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted">In Workshop</p>
            <p className="text-2xl font-semibold">
              {vehicles.filter((v) => v.operational_status === "Workshop").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted">Working Units</p>
            <p className="text-2xl font-semibold">
              {vehicles.filter((v) => v.operational_status === "Working").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Input
        placeholder="Search by ID, Category, or Location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-96"
      />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Mileage</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Next Service</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((v) => (
              <TableRow key={v.id} className={v.service_status === "OVERDUE" ? "bg-red-50" : ""}>
                <TableCell>{v.equipment_id}</TableCell>
                <TableCell>{v.category}</TableCell>
                <TableCell>{v.location}</TableCell>
                <TableCell>{v.brand} {v.model}</TableCell>
                <TableCell>{v.current_mileage?.toLocaleString()}</TableCell>
                <TableCell>{v.service_status}</TableCell>
                <TableCell>{v.next_service_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}