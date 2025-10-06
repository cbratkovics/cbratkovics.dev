"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import metricsData from "@/data/metrics.json";

export default function ImpactPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen py-20 px-4">
        <div className="absolute inset-0 gradient-bg opacity-10" />
        <div className="absolute inset-0 cyber-grid opacity-20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
              Real-World Impact
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Internal employer metrics demonstrating business value.
              These outcomes are not publicly reproducible but represent verified impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {metricsData.impactBullets.map((impact, index) => (
              <motion.div
                key={impact.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-gray-900/50 border-gray-800 h-full hover:border-purple-500/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="destructive" className="text-xs">
                        INTERNAL
                      </Badge>
                      <Badge variant="outline" className="text-xs text-gray-400">
                        Not Reproducible
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl font-bold text-white">
                      {impact.value}{impact.unit}
                    </CardTitle>
                    <CardDescription className="text-gray-300 mt-2">
                      {impact.note}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-500">
                      Source: {impact.provenance.replace('_', ' ')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="glassmorphism-strong p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-4">About Internal Metrics</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                These metrics represent <strong className="text-purple-400">employer-internal outcomes</strong> from
                my professional work. Unlike the project metrics shown elsewhere on this site, these cannot be
                independently verified as the underlying data and systems are proprietary.
              </p>
              <p>
                All internal metrics are clearly labeled as <Badge variant="destructive" className="inline mx-1">INTERNAL</Badge> and
                marked with <code className="text-xs bg-gray-800 px-2 py-1 rounded">reproducible: false</code> in the
                data layer to maintain transparency.
              </p>
              <p>
                For <strong className="text-cyan-400">publicly verifiable metrics</strong>, see the{" "}
                <Link href="/#projects" className="text-blue-400 hover:text-blue-300 underline">
                  Projects section
                </Link>{" "}
                where all claims link to GitHub artifacts.
              </p>
            </div>
          </motion.div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  );
}
