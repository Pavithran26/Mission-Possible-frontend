import React, { useState } from 'react';
import { Play, Sparkles, HelpCircle, Code2, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

interface LanguageConfig {
  id: string;
  name: string;
  label: string;
  displayLang: string;
  defaultCode: string;
  defaultPackages: string[];
}

const LANGUAGES: LanguageConfig[] = [
  {
    id: 'csharp',
    name: 'csharp',
    label: 'C# (.NET 8)',
    displayLang: 'CSHARP',
    defaultCode: `using System;
using System.Collections.Generic;
using System.Linq;

public class Program {
    public static void Main() {
        List<int> salaries = new List<int> { 55000, 82000, 95000, 68000, 110000, 72000 };
        var highEarners = salaries.Where(s => s > 70000).OrderByDescending(s => s);
        
        Console.WriteLine("Filtered Salaries Above $70,000:");
        Console.WriteLine(string.Join(", ", highEarners));
    }
}`,
    defaultPackages: [
      'using System;',
      'using System.Collections.Generic;',
      'using System.Linq;',
      'using System.Threading.Tasks;',
      'using System.Text.Json;',
      'using System.IO;'
    ]
  },
  {
    id: 'sql',
    name: 'sql',
    label: 'SQL (T-SQL / PostgreSQL)',
    displayLang: 'SQL',
    defaultCode: `SELECT 
    EmployeeId,
    Name,
    DepartmentId,
    Salary,
    DENSE_RANK() OVER (PARTITION BY DepartmentId ORDER BY Salary DESC) AS RankWithinDept
FROM Employees
WHERE Salary >= 60000;`,
    defaultPackages: [
      'USE EnterpriseDb;',
      '-- Standard ANSI SQL / T-SQL Dialect',
      '-- Available Extensions: pg_trgm, uuid-ossp',
      '-- Default Schema: dbo / public'
    ]
  },
  {
    id: 'javascript',
    name: 'javascript',
    label: 'JavaScript (Node.js v20)',
    displayLang: 'JAVASCRIPT',
    defaultCode: `const fs = require('fs');
const path = require('path');

async function processData() {
  const records = [
    { id: 101, name: "Alex Vance", score: 95 },
    { id: 102, name: "Sarah Jenkins", score: 88 }
  ];
  
  console.log("Processed Employee Records:");
  console.log(JSON.stringify(records, null, 2));
}

processData();`,
    defaultPackages: [
      'import fs from "fs";',
      'import path from "path";',
      'import http from "http";',
      'import axios from "axios";',
      'import lodash from "lodash";'
    ]
  },
  {
    id: 'typescript',
    name: 'typescript',
    label: 'TypeScript v5.3',
    displayLang: 'TYPESCRIPT',
    defaultCode: `interface StudentRecord {
  id: string;
  name: string;
  batch: string;
  xp: number;
}

const student: StudentRecord = {
  id: "GT-101",
  name: "Alex Vance",
  batch: "GT-2026-Batch-02",
  xp: 2850
};

console.log(\`Student: \${student.name} | Batch: \${student.batch} | XP: \${student.xp}\`);`,
    defaultPackages: [
      'import fs from "fs";',
      'import path from "path";',
      'import { useState, useEffect } from "react";',
      'import type { User, Session } from "./types";'
    ]
  },
  {
    id: 'python',
    name: 'python',
    label: 'Python 3.11',
    displayLang: 'PYTHON',
    defaultCode: `import sys
import json

def calculate_stats(scores):
    avg_score = sum(scores) / len(scores)
    return {"count": len(scores), "average": avg_score, "max": max(scores)}

scores = [85, 92, 78, 95, 88]
print("Python Analysis Output:")
print(json.dumps(calculate_stats(scores), indent=2))`,
    defaultPackages: [
      'import sys',
      'import os',
      'import json',
      'import math',
      'import asyncio',
      'import datetime'
    ]
  },
  {
    id: 'java',
    name: 'java',
    label: 'Java (OpenJDK 21)',
    displayLang: 'JAVA',
    defaultCode: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> trainees = Arrays.asList("Alex", "Sarah", "David", "Jessica");
        List<String> filtered = trainees.stream()
            .filter(t -> t.length() > 4)
            .map(String::toUpperCase)
            .collect(Collectors.toList());
            
        System.out.println("Trainee Names (Length > 4): " + filtered);
    }
}`,
    defaultPackages: [
      'import java.util.*;',
      'import java.io.*;',
      'import java.util.stream.*;',
      'import java.util.concurrent.*;'
    ]
  },
  {
    id: 'cpp',
    name: 'cpp',
    label: 'C++ (GCC 13)',
    displayLang: 'CPP',
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {42, 17, 89, 33, 95};
    std::sort(numbers.rbegin(), numbers.rend());
    
    std::cout << "Sorted Numbers Descending: ";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
    defaultPackages: [
      '#include <iostream>',
      '#include <vector>',
      '#include <string>',
      '#include <algorithm>',
      '#include <memory>',
      '#include <map>'
    ]
  },
  {
    id: 'go',
    name: 'go',
    label: 'Go (Go 1.22)',
    displayLang: 'GO',
    defaultCode: `package main

import (
	"fmt"
	"strings"
)

func main() {
	skills := []string{"C#", "SQL", "React", "Docker"}
	fmt.Printf("GT Skills: %s\\n", strings.Join(skills, " | "))
}`,
    defaultPackages: [
      'import "fmt"',
      'import "strings"',
      'import "time"',
      'import "net/http"',
      'import "encoding/json"'
    ]
  }
];

export const InteractivePlayground: React.FC = () => {
  const [selectedLangId, setSelectedLangId] = useState<string>('csharp');
  const selectedLang = LANGUAGES.find(l => l.id === selectedLangId) || LANGUAGES[0];

  const [code, setCode] = useState<string>(selectedLang.defaultCode);
  const [output, setOutput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(true);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const handleSelectLanguage = (langId: string) => {
    setSelectedLangId(langId);
    const targetLang = LANGUAGES.find(l => l.id === langId) || LANGUAGES[0];
    setCode(targetLang.defaultCode);
    setOutput('');
    setErrorMessage(null);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setOutput('');
    setErrorMessage(null);

    setTimeout(() => {
      setIsExecuting(false);
      const trimmed = code.trim();

      // Check for syntax error simulation (e.g. unclosed bracket or explicit error term)
      if (trimmed.includes('throw') || trimmed.includes('error_test') || (trimmed.match(/\{/g) || []).length !== (trimmed.match(/\}/g) || []).length && selectedLang.id !== 'sql') {
        setErrorMessage(`Compilation Error: Syntax mismatched brackets or explicit exception thrown in ${selectedLang.displayLang}.\nLine 12: Unhandled runtime exception.`);
        setOutput('');
        return;
      }

      // Simulate output based on code or standard response
      if (selectedLang.id === 'csharp') {
        if (trimmed.includes('70000') || trimmed.includes('Where')) {
          setOutput("Filtered Salaries Above $70,000:\n110000, 95000, 82000, 72000");
        } else {
          setOutput("Program executed successfully.\nOutput:\n55000, 82000, 95000, 68000, 110000, 72000");
        }
      } else if (selectedLang.id === 'sql') {
        setOutput("EmployeeId | Name          | DepartmentId | Salary | RankWithinDept\n101        | Alex Vance    | Dept-01      | 110000 | 1\n103        | Sarah Jenkins | Dept-01      | 95000  | 2\n105        | David Kim     | Dept-02      | 82000  | 1");
      } else if (selectedLang.id === 'javascript') {
        setOutput("Processed Employee Records:\n[\n  { \"id\": 101, \"name\": \"Alex Vance\", \"score\": 95 },\n  { \"id\": 102, \"name\": \"Sarah Jenkins\", \"score\": 88 }\n]");
      } else if (selectedLang.id === 'typescript') {
        setOutput("Student: Alex Vance | Batch: GT-2026-Batch-02 | XP: 2850");
      } else if (selectedLang.id === 'python') {
        setOutput("Python Analysis Output:\n{\n  \"count\": 5,\n  \"average\": 87.6,\n  \"max\": 95\n}");
      } else if (selectedLang.id === 'java') {
        setOutput("Trainee Names (Length > 4): [SARAH, DAVID, JESSICA]");
      } else if (selectedLang.id === 'cpp') {
        setOutput("Sorted Numbers Descending: 95 89 42 33 17");
      } else {
        setOutput("GT Skills: C# | SQL | React | Docker");
      }
    }, 500);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-white">
      
      {/* IDE Studio Workstation Header with Unified Blue/Indigo Gradient */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-900/40 rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Browser-Based Multi-Language IDE Studio</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">Code Playground Workstation</h2>
          <p className="text-slate-300 text-xs lg:text-sm max-w-xl">
            Compile, run, and debug enterprise C#, SQL, TypeScript, Python, and C++ code snippets with instant runtime feedback.
          </p>
        </div>

        {/* Dropdown Menu for Language Selection */}
        <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-blue-800/40 shadow-inner">
          <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">Target Language:</span>
          <select
            value={selectedLangId}
            onChange={(e) => handleSelectLanguage(e.target.value)}
            className="bg-slate-900 border border-blue-700/60 hover:border-blue-500 text-blue-300 font-mono text-xs font-bold px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 shadow-inner cursor-pointer"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id} className="bg-slate-900 text-white">
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Code Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Code Editor Window */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            
            {/* Language Display Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                Language: {selectedLang.displayLang}
              </span>

              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showHint ? 'Hide Packages' : 'View Default Packages'}
              </button>
            </div>

            {/* Default Packages Import Hints Box */}
            {showHint && (
              <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl text-xs space-y-2">
                <span className="font-mono font-bold text-amber-400 block text-[11px]">
                  💡 Default Packages & Imports available for {selectedLang.displayLang}:
                </span>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800/80 font-mono text-[11px] text-cyan-300 space-y-1 overflow-x-auto">
                  {selectedLang.defaultPackages.map((pkg, idx) => (
                    <div key={idx} className="whitespace-nowrap">{pkg}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Editor Textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 bg-slate-950 text-cyan-300 font-mono text-xs p-4 rounded-2xl border border-slate-800 focus:outline-none focus:border-blue-500 resize-none leading-relaxed shadow-[inset_2px_2px_8px_rgba(0,0,0,0.8)]"
              spellCheck={false}
              placeholder="Type your code here..."
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
            <button
              onClick={() => {
                setCode(selectedLang.defaultCode);
                setOutput('');
                setErrorMessage(null);
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Template
            </button>

            {/* Execute Button ONLY */}
            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isExecuting ? 'Executing...' : 'Execute'}</span>
            </button>
          </div>
        </div>

        {/* Right: Console Output & Error Window */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Header: Console Output */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Console Output
              </span>
              {errorMessage ? (
                <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" /> Error Encountered
                </span>
              ) : output ? (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <CheckCircle className="w-3.5 h-3.5" /> Execution Successful
                </span>
              ) : null}
            </div>

            {/* Output Field */}
            <div className="space-y-3 font-mono text-xs">
              <span className="block text-slate-400 font-semibold">Output:</span>

              {/* Error Message Box if error occurs */}
              {errorMessage && (
                <div className="bg-rose-950/40 border border-rose-500/40 p-4 rounded-2xl text-rose-300 whitespace-pre-wrap leading-relaxed shadow-inner space-y-1">
                  <div className="font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Runtime / Compilation Exception:
                  </div>
                  <p className="text-[11px] text-rose-200">{errorMessage}</p>
                </div>
              )}

              {/* Standard Output Box */}
              {!errorMessage && (
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-cyan-300 min-h-[220px] whitespace-pre-wrap leading-relaxed shadow-[inset_2px_2px_8px_rgba(0,0,0,0.8)] font-mono">
                  {output || '// Click "Execute" to run the snippet and inspect console output.'}
                </div>
              )}
            </div>

          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400">
            <span className="font-bold text-white block mb-0.5">Console Environment:</span>
            Enterprise Sandbox • Isolated Container Execution • Language: {selectedLang.label}
          </div>
        </div>

      </div>

    </div>
  );
};
