"use client";

import { CheckSquare } from "lucide-react";

export function TasksWidget() {
  return (
    <div>
      <h3 className="font-semibold mb-4">Tasks</h3>
      <div className="flex items-center justify-center h-24">
        <div className="text-center">
          <CheckSquare className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}