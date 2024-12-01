"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { WeatherWidget } from "./widgets/weather-widget";
import { TasksWidget } from "./widgets/tasks-widget";
import { FinanceWidget } from "./widgets/finance-widget";
import { AIChatWidget } from "./widgets/ai-chat-widget";
import { SortableWidget } from "./sortable-widget";
import { ClientWrapper } from "./client-wrapper";

const defaultWidgets = [
  { id: "weather", component: WeatherWidget },
  { id: "tasks", component: TasksWidget },
  { id: "finance", component: FinanceWidget },
  { id: "ai-chat", component: AIChatWidget },
];

export function WidgetGrid() {
  const [widgets, setWidgets] = useState(defaultWidgets);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <ClientWrapper>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
            {widgets.map((widget) => (
              <SortableWidget key={widget.id} id={widget.id}>
                <widget.component />
              </SortableWidget>
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </ClientWrapper>
  );
}