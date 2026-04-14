import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Droplet, Activity, Settings } from "lucide-react";

export default function LeakDetectionDashboard() {
  const [leakStatus, setLeakStatus] = useState(false);
  const [pressure, setPressure] = useState(72);
  const [flowRate, setFlowRate] = useState(15);
  const [history, setHistory] = useState([]);

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      const newPressure = Math.floor(60 + Math.random() * 20);
      const newFlow = Math.floor(10 + Math.random() * 10);
      const leakDetected = newPressure < 65 || newFlow > 22;

      setPressure(newPressure);
      setFlowRate(newFlow);
      setLeakStatus(leakDetected);

      setHistory((prev) => [
        { time: new Date().toLocaleTimeString(), pressure: newPressure, flow: newFlow, leak: leakDetected },
        ...prev.slice(0, 9),
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Leak Detection Dashboard</h1>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">System Status</p>
              <p className="text-xl font-semibold">
                {leakStatus ? "Leak Detected" : "Normal"}
              </p>
            </div>
            <AlertTriangle className={leakStatus ? "text-red-500" : "text-green-500"} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pressure</p>
              <p className="text-xl font-semibold">{pressure} PSI</p>
            </div>
            <Activity />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Flow Rate</p>
              <p className="text-xl font-semibold">{flowRate} L/min</p>
            </div>
            <Droplet />
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {leakStatus && (
        <Card className="border-red-500">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="text-red-500" />
            <p className="font-medium text-red-600">
              Warning: Possible leak detected! Immediate inspection required.
            </p>
          </CardContent>
        </Card>
      )}

      {/* History Table */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">Time</th>
                  <th className="p-2">Pressure</th>
                  <th className="p-2">Flow</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.time}</td>
                    <td className="p-2">{item.pressure} PSI</td>
                    <td className="p-2">{item.flow} L/min</td>
                    <td className="p-2">
                      {item.leak ? (
                        <span className="text-red-500">Leak</span>
                      ) : (
                        <span className="text-green-500">Normal</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">System Controls</h2>
          <Button variant="outline">
            <Settings className="mr-2" /> Configure
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
