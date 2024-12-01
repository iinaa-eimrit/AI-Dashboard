"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export function AIChatWidget() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <h3 className="font-semibold mb-4">AI Assistant</h3>
      <Card className="h-[300px] flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <MessageSquare className="h-8 w-8 mr-2" />
              <span>Start a conversation</span>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`mb-2 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block rounded-lg px-3 py-1 text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
          {error && (
            <div className="text-center text-destructive text-sm">
              {error.message}
            </div>
          )}
        </ScrollArea>
        <form
          onSubmit={handleSubmit}
          className="border-t p-4 flex gap-2"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask anything..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}