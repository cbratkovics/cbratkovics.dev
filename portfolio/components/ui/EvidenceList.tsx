"use client";

import { ExternalLink } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { Button } from "./button";
import type { EvidenceLink } from "@/types/metrics";

interface EvidenceListProps {
  evidence: EvidenceLink[];
  metricKey: string;
}

export function EvidenceList({ evidence, metricKey }: EvidenceListProps) {
  if (!evidence || evidence.length === 0) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            Evidence
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Evidence for {metricKey}</DrawerTitle>
            <DrawerDescription>
              No public artifacts available for this metric.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          Evidence ({evidence.length})
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Evidence for {metricKey}</DrawerTitle>
          <DrawerDescription>
            Public artifacts and documentation supporting this metric
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 space-y-3">
          {evidence.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors border border-gray-800"
            >
              <ExternalLink className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">
                  {link.label}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {link.href}
                </p>
              </div>
            </a>
          ))}
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
